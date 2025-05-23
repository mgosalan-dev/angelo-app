'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartContext";

const CartModal: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    isModalOpen,
    closeModal,
  } = useCart();

  // Se o modal não estiver aberto, não renderiza nada
  if (!isModalOpen) return null;

  return (
    <>
      {/* Overlay com fundo fosco */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
        onClick={closeModal}
      >
        {/* Modal container */}
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header do modal */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-stone-800">Seu Carrinho</h2>
            <button
              onClick={closeModal}
              className="text-stone-500 hover:text-stone-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Conteúdo do carrinho */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-stone-600 text-lg">Seu carrinho está vazio</p>
                <p className="text-stone-500 text-sm mt-2">Adicione alguns itens incríveis!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-stone-50 rounded-lg"
                  >
                    {/* Imagem do produto */}
                    <div className="w-16 h-16 bg-stone-200 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Informações do produto */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-stone-800 truncate">{item.name}</h3>
                      <p className="text-stone-600 text-sm">R$ {item.price.toFixed(2)}</p>
                      {/* Verificação de estoque */}
                      {item.quantity > item.stock && (
                        <p className="text-red-500 text-sm">
                          A quantidade ultrapassa o estoque disponível!
                        </p>
                      )}
                    </div>

                    {/* Controles de quantidade */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.quantity - 1);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      </button>

                      <span className="w-8 text-center font-semibold text-stone-800">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => {
                          if (item.quantity < item.stock) {
                            updateQuantity(item.id, item.quantity + 1);
                          }
                        }}
                        className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                        </svg>
                      </button>
                    </div>

                    {/* Botão remover */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer do modal */}
          {items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-stone-800">Total:</span>
                <span className="text-xl font-bold text-amber-600">R$ {totalPrice.toFixed(2)}</span>
              </div>

              {/* Botões */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeModal}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center block"
                >
                  Finalizar Compra
                </Link>

                <Link
                  href="/cart"
                  onClick={closeModal}
                  className="w-full bg-white hover:bg-stone-50 text-stone-800 font-semibold py-3 px-4 rounded-lg border border-stone-300 transition-colors text-center block"
                >
                  Ver Carrinho Completo
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;

// page.tsx
'use client';

import { useCart } from '@/components/CartContext';
import Link from 'next/link';

function CartPage() {
  const { cartItems = [], totalAmount = 0 } = useCart() || {}; // Adicionando valores padrão

  return (
    <div>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-stone-800 mb-4">Carrinho Completo</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-stone-600">
            <p>Seu carrinho está vazio.</p>
            <Link href="/" className="text-amber-600 hover:underline">
              Voltar para a loja
            </Link>
          </div>
        ) : (
          <div>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h2 className="text-xl font-semibold text-stone-800">{item.name}</h2>
                    <p className="text-stone-600">Preço: R${item.price.toFixed(2)}</p>
                  </div>
                  <span className="text-stone-800">Quantidade: {item.quantity}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <h2 className="text-2xl font-bold text-stone-800">Total: R${totalAmount.toFixed(2)}</h2>
            </div>

            <div className="mt-6">
              <Link href="/checkout" className="bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-500">
                Finalizar Compra
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartPage;

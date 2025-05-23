// ProductCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/components/CartContext'; // Importando o contexto do carrinho

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { addItem } = useCart(); // Obtendo a função para adicionar ao carrinho
  const whatsappNumber = '936050675';
  
  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };
  
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Olá! Estou interessado no item: ${product.name} por €${product.price.toFixed(2)}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no botão redirecione para a página do produto
    addItem(product); // Adiciona o produto ao carrinho
  };
  
  return (
    <div 
      className="flex flex-col rounded-lg overflow-hidden bg-amber-80 transition-all hover:shadow-xl cursor-pointer transform hover:-translate-y-1 relative"
      onClick={handleClick}
    >
      <div className="relative h-48 bg-stone-100">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          fill
          className="object-cover mix-blend-multiply"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-serif font-semibold mb-1 text-stone-800">{product.name}</h3>
        <div className="mt-auto">
          <p className="text-xl font-bold text-amber-700 mb-3">€ {product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart} // Adicionando a função de adicionar ao carrinho
            className="w-full py-2 px-4 bg-amber-200 text-stone-800 rounded-full hover:bg-amber-300 transition-colors text-sm font-medium border border-amber-400 shadow-md mb-2"
          >
            Adicionar ao Carrinho
          </button>
          <button
            onClick={handleWhatsAppClick}
            className="w-full py-2 px-4 bg-amber-200 text-stone-800 rounded-full hover:bg-amber-300 transition-colors text-sm font-medium border border-amber-400 shadow-md"
          >
            Fale no WhatsApp para comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

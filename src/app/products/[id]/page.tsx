'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { notFound, useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Desempacotando params com React.use()
  // Usando params diretamente
  const id = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { addItem } = useCart();
  
  const whatsappNumber = '936050675';

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      if (!id || isNaN(Number(id))) {
        notFound();
        return;
      }

      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.status === 404) {
          notFound();
          return;
        }
        if (!response.ok) {
          throw new Error('Erro ao buscar produto');
        }
        const data = await response.json();
        if (!data || typeof data !== 'object') {
          throw new Error('Produto não encontrado');
        }
        setProduct({
          ...data,
          id: Number(data.id),
          price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
          imageUrl: data.imageUrl || '/images/product-placeholder.jpg',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Alterado de params.id para id

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no botão redirecione para a página do produto
    addItem(product); // Adiciona o produto ao carrinho
  };

  const handleWhatsAppClick = useCallback(() => {
    if (!product) return;
    const price = typeof product.price === 'number'
      ? product.price.toFixed(2)
      : parseFloat(product.price).toFixed(2);
    const message = `Olá! Estou interessado no item: ${product.name} (Ref: ${product.id}) por €${price}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [product]);


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md mx-auto">
          <p>{error}</p>
          <button
            onClick={() => router.refresh()}
            className="mt-4 px-4 py-2 bg-amber-100 text-amber-800 rounded hover:bg-amber-200 transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-8 md:py-10 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-[4/3] sm:aspect-square bg-stone-100 rounded-lg overflow-hidden shadow-lg border-2 border-amber-800">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col space-y-6 bg-amber-50 p-6 rounded-lg shadow-md border border-amber-200">
          <div>
            <h1 className="text-2xl sm:text-2xl font-serif font-bold text-stone-800">
              {product.name}
            </h1>
            <div className="text-2xl font-bold text-amber-700 mt-2">
              €{typeof product.price === 'number'
                ? product.price.toFixed(2)
                : parseFloat(product.price).toFixed(2)}
            </div>
          </div>
          {product.description && (
            <div>
              <h2 className="text-xl font-semibold text-stone-800">Descrição</h2>
              <p className="text-stone-600 mt-2 whitespace-pre-line font-serif">
                {product.description}
              </p>
            </div>
          )}
          {product.category && (
            <div>
              <h2 className="text-xl font-semibold text-stone-800">Categoria</h2>
              <p className="text-stone-600 mt-2 italic">{product.category}</p>
            </div>
          )}
          <div className="mt-auto pt-4">
            <button
            onClick={handleAddToCart} // Adicionando a função de adicionar ao carrinho
            className="w-full py-2 px-4 text-sm sm:text-base bg-amber-200 text-stone-800 rounded-full hover:bg-amber-300 transition-colors font-medium flex items-center justify-center gap-1 shadow-md border border-amber-300 mb-2"
          >
            Adicionar ao Carrinho
          </button>
            <button
              onClick={handleWhatsAppClick}
              className="w-full py-2 px-4 text-sm sm:text-base bg-amber-200 text-stone-800 rounded-full hover:bg-amber-300 transition-colors font-medium flex items-center justify-center gap-0 shadow-md border border-amber-300"
            >
              
              <WhatsAppIcon />
              Fale no WhatsApp para comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 448 512" 
      className="w-5 h-5" 
      fill="currentColor"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
}
'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { notFound, useRouter } from 'next/navigation';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const whatsappNumber = '936050675';

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      if (!params.id || isNaN(Number(params.id))) {
        notFound();
        return;
      }

      try {
        // Corrigindo o fetch para usar template string
        const response = await fetch(`/api/products/${params.id}`);
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
  }, [params.id]);

  const handleWhatsAppClick = useCallback(() => {
    if (!product) return;
    const price = typeof product.price === 'number'
      ? product.price.toFixed(2)
      : parseFloat(product.price).toFixed(2);
    // Corrigindo os template strings
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
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden shadow-lg border-2 border-amber-800">
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
            <h1 className="text-3xl font-serif font-bold text-stone-800">
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
              onClick={handleWhatsAppClick}
              className="w-full py-3 px-6 bg-amber-200 text-stone-800 rounded-full hover:bg-amber-300 transition-colors font-medium flex items-center justify-center gap-2 shadow-md border border-amber-300"
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
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z"/>
      <path d="M20.52 3.449C14.174-1.813 4.468.71.399 6.683c-4.56 6.72 1.036 14.42 6.241 17.834l.001-.001.175.107c.035.021.066.046.101.069l.016.011.071.04c.323.214.647.423.979.619.449.262.91.505 1.388.725 8.366 3.956 17.015-2.329 17.015-11.344 0-5.14-3.134-9.752-7.884-11.667zm1.009 11.139c-.221 3.099-1.718 5.847-3.993 7.675-2.65 2.115-6.303 2.736-9.556 1.635-3.256-1.103-5.699-3.755-6.544-7.155-.844-3.396.17-6.944 2.708-9.394 2.324-2.243 5.506-3.369 8.778-3.107l-1.622 1.617 2.043.005c-.016-.006.005-.017-.01-.021l-1.943-.016 1.546-1.545c2.304.642 4.357 2.145 5.733 4.143 1.378 2 2.024 4.55 1.859 7.164z"/>
    </svg>
  );
}
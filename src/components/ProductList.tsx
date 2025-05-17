'use client';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error('Erro ao carregar produtos');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Falha ao carregar os produtos. Tente novamente mais tarde.');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        {/* Spinner mais vintage */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-amber-200 rounded-full"></div>
          <div className="absolute inset-1 border-t-4 border-amber-800 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-amber-800 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 border-2 border-red-200 rounded-lg max-w-lg mx-auto shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-lg text-red-700 font-serif">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200 transition border border-amber-300"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center p-8 bg-amber-50 border-2 border-amber-200 rounded-lg max-w-lg mx-auto shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="text-lg text-stone-600 font-serif">Nenhum produto encontrado.</p>
        <p className="text-sm text-stone-500 mt-2 italic">Volte em breve para conferir novidades!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Elemento decorativo vintage */}
      <div className="flex justify-center mb-8">
        <div className="w-16 h-1 bg-amber-700"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="flex justify-center mt-12">
        <div className="w-16 h-1 bg-amber-700"></div>
      </div>
    </div>
  );
};

export default ProductList;
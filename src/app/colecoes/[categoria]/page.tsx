"use client";
import { getProductsByCategory } from "@/lib/prisma";

import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

interface Props {
  params: {
    categoria: string;
  };
}

export default async function CategoriaPage({ params }: Props) {
  const categoria = params.categoria.toLowerCase();
  const produtos = await getProductsByCategory(categoria);

  if (!produtos || produtos.length === 0) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50">
      {/* Header decorativo vintage */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDQwIE0gMCAwIEwgNDAgNDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            {/* Ornamento superior */}
            <div className="flex justify-center mb-4">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
              <div className="mx-4 text-amber-200 text-2xl">❦</div>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
            </div>
            
            <h1 className="text-5xl font-serif font-bold text-amber-100 capitalize mb-2 tracking-wide drop-shadow-lg">
              {categoria}
            </h1>
            
            <p className="text-amber-200 font-light italic text-lg mb-4">
              Tesouros únicos de uma época especial
            </p>
            
            {/* Ornamento inferior */}
            <div className="flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
              <div className="mx-3 text-amber-200 text-xl">✦</div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Container principal */}
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumb vintage */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-6 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-amber-200 shadow-sm">
            <span className="text-amber-700 font-medium text-sm">
              Coleção Especial
            </span>
            <span className="mx-2 text-amber-400">•</span>
            <span className="text-amber-800 font-semibold capitalize text-sm">
              {categoria}
            </span>
          </div>
        </div>

        {/* Grid de produtos com layout vintage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {produtos.map((produto, index) => (
            <div 
              key={produto.id} 
              className="group transform transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Card wrapper com efeito vintage */}
              <div className="relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 overflow-hidden">
                {/* Canto decorativo */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-amber-600 opacity-80"></div>
                <div className="absolute top-2 right-2 text-amber-100 text-xs">✦</div>
                
                {/* Efeito de envelhecimento nas bordas */}
                <div className="absolute inset-0 rounded-lg border-2 border-amber-200/30 pointer-events-none"></div>
                
                <ProductCard product={produto} />
                
                {/* Selo vintage opcional */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-amber-700 text-amber-100 px-2 py-1 rounded-full text-xs font-semibold transform rotate-[-5deg]">
                    Autêntico
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé decorativo */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <div className="mx-4 text-amber-600 text-3xl">❦</div>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
          
          <p className="text-amber-700 font-serif italic text-lg mb-2">
            "Cada peça conta uma história única"
          </p>
          
          <div className="text-amber-600 text-sm font-light">
            Coleção {categoria} • {produtos.length} {produtos.length === 1 ? 'item' : 'itens'} disponíveis
          </div>
        </div>
      </div>

      {/* Estilos para animação */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Efeito de papel envelhecido */
        .container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(160, 82, 45, 0.1) 0%, transparent 50%);
          pointer-events: none;
          border-radius: inherit;
        }
      `}</style>
    </main>
  );
}
// src/app/sobre/page.tsx
'use client'; // Mantemos o 'use client' por boa prática, caso adicione interatividade depois

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Adicionado caso queira colocar uma imagem no futuro

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl"> {/* Container mais contido */}
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 border border-amber-200"> {/* Cartão central com borda âmbar */}
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6 text-center">
            Sobre a Red Angel Antiguidades
          </h1>
          <p className="text-lg text-stone-700 leading-relaxed mb-6 text-center">
            Bem-vindo ao nosso tesouro escondido! Na **Red Angel Antiguidades**,
            cada peça é um eco do passado, uma história esperando para ser contada.
            Somos curadores de memórias, dedicados a trazer a você a beleza e a
            singularidade de eras passadas.
          </p>
          <p className="text-lg text-stone-700 leading-relaxed mb-6 text-center">
            Nossa paixão reside em desenterrar objetos que transcenderam o tempo,
            desde móveis imponentes a joias delicadas, artefatos misteriosos e
            curiosidades que intrigam. Cada item em nossa coleção é escolhido
            a dedo, não apenas por sua beleza estética, mas por sua alma e a
            jornada que o trouxe até nós.
          </p>
          <p className="text-lg text-stone-700 leading-relaxed mb-8 text-center">
            Convidamos você a explorar nosso acervo e encontrar aquele pedacinho
            da história que ressoa com sua própria alma, adicionando um toque de
            charme e autenticidade ao seu espaço.
          </p>

          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Voltar para a Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
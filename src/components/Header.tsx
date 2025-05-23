'use client';

import Link from 'next/link';
import SearchBar from './SearchBar';
import { useCart } from './CartContext';


function Header() {
  const { totalItems, openModal } = useCart();

  return (
    <header className="bg-yellow-800 p-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-2 md:mb-0">
          <Link href="/" className="text-2xl font-bold text-stone-800 hover:text-stone-600">
            Red Angel Antiguidades
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <nav className="flex space-x-6">
            <Link href="/" className="text-stone-800 hover:text-stone-600">
              Home
            </Link>
            <Link href="/sobre" className="text-stone-800 hover:text-stone-600">
              Sobre
            </Link>
            <Link href="/contato" className="text-stone-800 hover:text-stone-600">
              Contato
            </Link>
          </nav>

          <SearchBar />

          <div className="flex items-center space-x-4">
            {/* Ícone do carrinho com contador */}
            <button
              onClick={openModal}
              className="text-stone-800 hover:text-stone-600 relative group transition-colors"
              aria-label="Abrir carrinho"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 group-hover:scale-110 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>

              {/* Badge do contador */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Ícone do perfil/admin */}
            <Link href="/admin" className="text-stone-800 hover:text-stone-600">
              <span className="sr-only">Perfil</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
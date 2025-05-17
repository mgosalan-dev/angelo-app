import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Antiguidades</h3>
            <p className="text-stone-300">
              Sua loja especializada em objetos únicos com história e valor. 
              Encontre tesouros do passado que contam histórias incríveis.
            </p>
          </div>
          
          <div>
              <li><Link href="/" className="text-stone-300 hover:text-amber-300 transition-colors">Home</Link></li>
            <ul className="space-y-2">
              <li><a href="/sobre" className="text-stone-300 hover:text-amber-300 transition-colors">Sobre Nós</a></li>
              <li><a href="/contato" className="text-stone-300 hover:text-amber-300 transition-colors">Contato</a></li>
              <li><a href="/admin" className="text-stone-300 hover:text-amber-300 transition-colors">Área Admin</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-stone-300">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                Rua das Antiguidades, 123
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                +351 936050675
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                contato@antiguidades.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-stone-700 text-center text-stone-400">
          <p>&copy; {new Date().getFullYear()} Antiguidades. Todos os direitos reservados.</p>
        </div>
        <div>
          <p>
            &copy; {new Date().getFullYear()} Site Desenvolvido por <a href="http://github.com/mgosalan-dev" target="_blank" rel="noopener noreferrer">mgosalan-dev</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
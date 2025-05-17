import Image from "next/image";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-amber-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif font-bold text-stone-800 mb-6">
              Coleções
            </h1>
            <div className="relative h-64 w-full">
              <Image
                src="/images/banner.jpg"
                alt="Antiguidades variadas"
                fill
                className="object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-12 text-center">
            Antiguidades em Destaque
          </h2>
          <ProductList />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Envio Grátis */}
            <div className="text-center p-6">
              <div className="mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 text-amber-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-stone-800">
                Envio Grátis
              </h3>
              <p className="text-stone-600">Em compras acima de 100€</p>
            </div>

            {/* Devolução Fácil */}
            <div className="text-center p-6">
              <div className="mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 text-amber-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-stone-800">
                Devolução Fácil
              </h3>
              <p className="text-stone-600">Em até 30 dias</p>
            </div>

            {/* Pagamento Seguro */}
            <div className="text-center p-6">
              <div className="mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 text-amber-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-stone-800">
                Pagamento Seguro
              </h3>
              <p className="text-stone-600">Métodos seguros de pagamento</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

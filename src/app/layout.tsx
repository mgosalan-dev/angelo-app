import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import { CartProvider } from "@/components/CartContext";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Antiguidades | Peças únicas com história",
  description:
    "Sua loja especializada em objetos antigos de valor e história. Encontre relógios vintage, móveis rústicos e peças decorativas únicas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${inter.variable} ${playfair.variable}`}>
      <body
        className="min-h-screen flex flex-col bg-stone-50"
        cz-shortcut-listen="true"
      >
          <CartProvider>
          <Header />
          <main>{children}</main>
          <CartModal />
        </CartProvider>
      
        <Footer />
      </body>
    </html>
  );
}

'use client';
import { useCart } from '@/components/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items: cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'mbway' | 'multibanco' | ''>('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      alert(`Pedido recebido com método: ${paymentMethod.toUpperCase()}`);
      clearCart();
      router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fdf6e3] py-12">
      <div className="container mx-auto max-w-xl px-4">
        <h1 className="text-4xl font-bold mb-8 text-[#4b3b2a] text-center tracking-wide">Finalizar Compra</h1>
        
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#fff8dc] p-8 rounded-xl shadow-lg border border-[#c2b280]"
        >
          <div>
            <label className="block font-semibold text-[#4b3b2a] mb-2">Nome</label>
            <input
              type="text"
              className="w-full p-3 border border-[#c2b280] rounded bg-[#fefae0]"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#4b3b2a] mb-2">Método de Pagamento</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value as 'mbway' | 'multibanco')}
              className="w-full p-3 border border-[#c2b280] rounded bg-[#fefae0]"
              required
            >
              <option value="">Selecione...</option>
              <option value="mbway">MB WAY</option>
              <option value="multibanco">Referência Multibanco</option>
            </select>
          </div>

          {paymentMethod === 'mbway' && (
            <div>
              <label className="block font-semibold text-[#4b3b2a] mb-2">Telemóvel (MB WAY)</label>
              <input
                type="tel"
                className="w-full p-3 border border-[#c2b280] rounded bg-[#fefae0]"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>
          )}

          <div className="text-lg font-bold text-[#4b3b2a]">
            Total: <span className="text-[#4b3b2a]">€{total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-[#c2b280] hover:bg-[#b8a26f] text-white font-bold py-3 rounded transition"
          >
            {processing ? 'Processando...' : 'Confirmar Pedido'}
          </button>
        </form>
      </div>
    </div>
  );
}

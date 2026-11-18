'use client';

import { useState } from 'react';

export default function StripeCheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      // Redirect diretto a Stripe Checkout
      // L'email viene richiesta da Stripe durante il pagamento (niente prompt qui)
      // Lo sconto LANCIO37 è già applicato automaticamente — il prezzo visualizzato su Stripe è €37
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore nel caricamento del checkout');
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError('Impossibile contattare il servizio di pagamento');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors shadow-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Caricamento...
          </span>
        ) : (
          'Acquista ora con Sconto Lancio — €37'
        )}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
      <p className="text-slate-500 text-xs text-center mt-2">
        Pagamento sicuro · Sconto automatico al checkout
      </p>
    </div>
  );
}

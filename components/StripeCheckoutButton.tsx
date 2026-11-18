'use client';

import { useState } from 'react';

export default function StripeCheckoutButton({
  name = '',
  email = '',
}: {
  name?: string;
  email?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore al caricare il checkout');
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (e) {
      setError('Impossibile contattare il servizio di pagamento');
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors shadow-lg"
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
          'Acquista Kit Base — €97'
        )}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
      <p className="text-slate-500 text-xs text-center mt-2">
        Pagamento sicuro con carta • Sconto lancio automatico applicato
      </p>
    </div>
  );
}

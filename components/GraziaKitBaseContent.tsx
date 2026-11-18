import Link from 'next/link';

export default function GratiaContentInner({ sessionId }: { sessionId?: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      {/* Check Icon */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Pagamento completato.
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Il Kit Base è pronto. Lo trovi anche nella tua email.
        </p>
      </div>

      {/* Download PDF Button */}
      <div className="text-center mb-12">
        <a
          href="/api/pdf/kit-base"
          download
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Scarica ora i 7 moduli
        </a>
        <p className="text-xs text-slate-400 mt-3">
          Se il download non parte, ricontrolla anche la cartella spam della tua email.
        </p>
      </div>

      {/* Area Operative Recap */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
          Le aree operative incluse nel Kit Base
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            'Prima chiamata e segreteria',
            'Messaggi WhatsApp',
            'Email al paziente',
            'Reminder e agenda',
            'Richiesta recensioni',
            'Percorso del paziente',
          ].map((area, i) => (
            <div key={i} className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-700">{area}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Upsell Soft */}
      <section className="bg-sky-50 border border-sky-200 rounded-2xl p-8 mb-12">
        <h3 className="text-xl font-bold text-sky-900 mb-3">Vuoi che tutto giri in automatico?</h3>
        <p className="text-sky-700 mb-6 max-w-xl">
          Con il servizio <strong>Avvio Studio</strong> personalizziamo questi template sul tono del tuo studio,
          configuriamo WhatsApp Business, le automazioni email e formiamo la segreteria.
          Tutto in una call gratuita di 20 minuti.
        </p>
        <a
          href="https://cal.com/marketing-dentisti/avvio-studio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Prenota una call gratuita di 20 min
        </a>
      </section>

      {/* Footer nav */}
      <div className="text-center pt-8 border-t border-slate-200">
        <Link href="/kit-gratis" className="text-slate-500 hover:text-slate-700 text-sm transition-colors">
          Torna alla home
        </Link>
      </div>

      {/* Footer legale */}
      <footer className="border-t border-slate-200 py-8 mt-auto">
        <div className="text-center text-slate-500 text-sm">
          {'\u00A9'} 2026 Marketing dentisti ·{' '}
          <Link href="/privacy" className="hover:text-slate-700">Privacy</Link> ·{' '}
          <Link href="/termini" className="hover:text-slate-700">Termini</Link>
        </div>
      </footer>
    </div>
  );
}

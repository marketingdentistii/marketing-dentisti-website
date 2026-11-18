import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Grazie! Il Kit è in arrivo — Marketing dentisti",
  description: "Conferma dell'invio del Kit e prossimi passi.",
};

export default function GraziePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 flex-grow">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Fatto! Il Kit è in viaggio verso la tua email.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Controlla la casella di posta (e lo spam, nel dubbio). Se non lo trovi entro 5 minuti, scrivici a marketingdentisti.it@gmail.com.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 text-center mb-8">
            Nel frattempo…
          </h2>

          {/* Kit Base Card — PRIMA */}
          <div className="mb-6 bg-blue-600 border-2 border-blue-500 rounded-xl p-6 flex flex-col text-white shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-block bg-amber-300 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Consigliato</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Kit Base · Template per la segreteria</h3>
            <p className="text-blue-100 font-medium mb-1">
              €37 con LANCIO37
              <span className="line-through ml-2 opacity-60">€97</span>
            </p>
            <p className="text-blue-100 text-sm mb-6 flex-grow">
              Il sistema operativo completo per la segreteria: template pronti per ogni contatto con il paziente. WhatsApp, email, reminder e recensioni.
            </p>
            <a href="/kit-base" className="block w-full text-center bg-white hover:bg-blue-50 text-blue-700 font-semibold py-3 px-4 rounded-lg transition-colors">Scopri il Kit Base</a>
          </div>

          <p className="text-center text-slate-700 text-lg mb-8 max-w-2xl mx-auto">
            Vuoi che questi 7 template girino in automatico nel tuo studio, senza che tu o la segreteria debbano farci pensare?
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 flex flex-col">
              <h3 className="text-xl font-bold text-sky-900 mb-1">Prenota una call gratuita di 20 min</h3>
              <p className="text-sky-700 font-medium mb-4">Avvio Studio · €497 una tantum</p>
              <ul className="text-slate-700 space-y-3 mb-6 flex-grow text-sm md:text-base">
                <li>1. Template del Kit personalizzati sul tono di voce del tuo studio</li>
                <li>2. Setup WhatsApp Business (risposte rapide, etichette, messaggio di benvenuto)</li>
                <li>3. Automazione email: benvenuto + richiesta recensione</li>
                <li>4. Sistema reminder pre-appuntamento (WhatsApp o SMS, a tua scelta)</li>
                <li>5. Formazione segreteria: 1 ora, registrata e consegnata in video</li>
                <li>6. Ottimizzazione scheda Google Business</li>
              </ul>
              <Link href="https://cal.com/marketing-dentisti/avvio-studio" className="block w-full text-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">Prenota ora</Link>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-1">Parla della Gestione Totale</h3>
              <p className="text-slate-300 font-medium mb-4">Da €1.500/mese · delega tutto</p>
              <ul className="text-slate-300 space-y-3 mb-6 flex-grow text-sm md:text-base">
                <li>1. 12 contenuti/mese (di cui 4-6 Reel/TikTok motion)</li>
                <li>2. Gestione Meta Ads (budget pubblicitario escluso dal fee)</li>
                <li>3. Gestione recensioni + report mensile</li>
                <li>4. 2 giri di revisione per deliverable</li>
                <li>5. Call mensile di allineamento</li>
              </ul>
              <Link href="https://cal.com/marketing-dentisti/gestione-totale" className="block w-full text-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">Richiedi informazioni</Link>
            </div>
          </div>
        </section>
        <div className="text-center mt-12">
          <Link href="/kit-gratis" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">← Torna alla home</Link>
        </div>
      </div>
      <footer className="border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 Marketing dentisti · <Link href="/privacy" className="hover:text-slate-700">Privacy</Link> · <Link href="/termini" className="hover:text-slate-700">Termini</Link></p>
        </div>
      </footer>
    </main>
  );
}

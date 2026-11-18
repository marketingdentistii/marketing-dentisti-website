import type { Metadata } from 'next';
import Link from 'next/link';
import StripeCheckoutButton from '@/components/StripeCheckoutButton';

export const metadata: Metadata = {
  title: 'Kit Base — Template e Automazioni per studi odontoiatrici | Marketing dentisti',
  description: '7 template operativi, sequenze WhatsApp, email e reminder per strutturare il percorso del nuovo paziente nel tuo studio. Acquistalo subito.',
};

const moduli = [
  {
    titolo: 'Messaggio di benvenuto WhatsApp',
    desc: 'Template pronto per dare il benvenuto al nuovo paziente appena booked. Personalizzabile sul tono del tuo studio.',
  },
  {
    titolo: 'Reminder pre-appuntamento (48h)',
    desc: 'Promemoria WhatsApp/SMS che riduce no-show del 30%. Inserisci data e ora in automatico.',
  },
  {
    titolo: 'Richiesta recensione post-visita',
    desc: 'Sequenza automatica per ottenere recensioni Google da pazienti soddisfatti. Senza essere invadenti.',
  },
  {
    titolo: 'Email di conferma appuntamento',
    desc: 'Template email professionale con tutte le info: dove, quando, cosa portare. Rassicura il paziente.',
  },
  {
    titolo: 'Seguito dopo trattamento',
    desc: 'Follow-up WhatsApp per controllo post-intervento. Dimostra cura e fidelizza.',
  },
  {
    titolo: 'Campaigns promozionali stagionali',
    desc: 'Modelli pronti per sconti natalizi, estate bianca, mese della bellezza. Basta cambiare date.',
  },
  {
    titolo: 'Flusso referral / invita un amico',
    desc: 'Template per trasformare i pazienti felici in ambasciatori dello studio. Con link tracciato.',
  },
];

export default function KitBasePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <span className="inline-block bg-blue-50 text-blue-700 font-medium text-sm px-4 py-1 rounded-full mb-6">
            Pacchetto operativo completo
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            Template e automazioni pronte<br />per far crescere il tuo studio dentale
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            7 template operativi che funzionano dal primo giorno: WhatsApp, email, reminder, richieste recensione e molto altro. Nessuno sa come impostarli — noi te li consegniamo già configurati.
          </p>

          {/* Price */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <div>
              <span className="text-5xl font-bold text-slate-900">€97</span>
              <span className="text-slate-500 ml-2">una tantum</span>
            </div>
            <div className="text-sm text-slate-500">
              Risparmi centinaia di ore di setup — funziona dal primo click
            </div>
            <div className="w-full max-w-md mt-4">
              <StripeCheckoutButton />
            </div>
            <div className="text-xs text-slate-400 mt-2">
              Pagamento sicuro • Sconto lancio automaticamente applicato
            </div>
          </div>
        </div>
      </section>

      {/* Moduli */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          Cosa ottieni nel Kit Base
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          Ogni modulo è un template operativo, pronto per essere personalizzato con i dati del tuo studio. Non serve esperienza tecnica.
        </p>

        <div className="grid gap-6">
          {moduli.map((m, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-colors">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">{m.titolo}</h3>
                  <p className="text-slate-600 mt-1">{m.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Pronto a automatizzare il tuo studio?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            Inizia oggi stesso con template che hanno già aiutato altri studi italiani a ridurre i no-show, aumentare le recensioni e fidelizzare i pazienti.
          </p>
          <div className="max-w-md mx-auto">
            <StripeCheckoutButton />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 Marketing dentisti · <Link href="/privacy" className="hover:text-slate-700">Privacy</Link> · <Link href="/termini" className="hover:text-slate-700">Termini</Link></p>
        </div>
      </footer>
    </main>
  );
}

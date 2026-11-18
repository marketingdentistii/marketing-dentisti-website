import type { Metadata } from 'next';
import Link from 'next/link';
import StripeCheckoutButton from '@/components/StripeCheckoutButton';

export const metadata: Metadata = {
  title: 'Kit Base — Template operativi per la segreteria dello studio dentistico | Marketing dentisti',
  description: 'Template pronti per ogni contatto con il paziente. WhatsApp, email, reminder e recensioni. Lancio €37 con codice LANCIO37.',
};

// COPY PROVVISORIO: finalizzare dopo missione Kit Base
export default function KitBasePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* ═══ Hero Section ═══ */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 text-center">
          {/* Badge Lancio */}
          <span className="inline-block bg-amber-100 text-amber-800 font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
            PREZZO LANCIO · PRIMI 10 STUDI
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            La segreteria del tuo studio,{" "}
            <br className="hidden md:block" />
            con un copione per ogni momento che conta.
          </h1>

          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Il Kit Base raccoglie i template operativi per gestire prima chiamata, WhatsApp, email,
            reminder e recensioni. Testi pronti da personalizzare con il nome del tuo studio
            e da usare da subito.
          </p>

          {/* Banner Codice Sconto */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 mb-8">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-blue-800 font-medium text-sm">
              Codice sconto: <span className="font-bold tracking-wide">LANCIO37</span>
            </span>
          </div>

          {/* Prezzo */}
          <div className="mb-8">
            <div className="flex items-baseline justify-center gap-3 mb-2">
              <span className="text-2xl text-slate-400 line-through">€97</span>
              <span className="text-5xl font-bold text-slate-900">€37</span>
              <span className="text-slate-500 text-sm ml-1">una tantum</span>
            </div>
            <p className="text-sm text-amber-700 font-medium">
              Risparmi €60 — offerte solo per i primi 10 studi
            </p>
          </div>

          {/* CTA */}
          <div className="mb-4">
            <StripeCheckoutButton />
          </div>

          {/* Micro-trust */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-400">
            <span>Pagamento sicuro con carta</span>
            <span>·</span>
            <span>Consegna immediata via email</span>
            <span>·</span>
            <span>Assistenza via email inclusa</span>
          </div>
        </div>
      </section>

      {/* ═══ Sezione Problema ═══ */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Ogni chiamata gestita a intuito è un paziente che può andare altrove.
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Senza copioni chiari, gli appuntamenti vengono dimenticati, le recensioni non si raccolgono,
            e ogni nuovo paziente se ne va senza lasciare tracce. Il Kit Base risolve questo problema,
            senza costi di setup o competenze tecniche.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-50 border border-red-100 rounded-xl p-6">
            <div className="text-red-500 text-xl mb-3">📞</div>
            <h3 className="font-semibold text-slate-900 mb-2">Chiamate senza copione</h3>
            <p className="text-sm text-slate-600">
              La segreteria risponde come può, ma manca un protocollo chiaro.
              Ogni interazione cambia a seconda di chi risponde.
            </p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-6">
            <div className="text-red-500 text-xl mb-3">⏰</div>
            <h3 className="font-semibold text-slate-900 mb-2">Appuntamenti dimenticati</h3>
            <p className="text-sm text-slate-600">
              Nessun reminder inviato, il paziente arriva quando arriva.
              I no-show costano tempo e incasso al tuo studio.
            </p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-6">
            <div className="text-red-500 text-xl mb-3">⭐</div>
            <h3 className="font-semibold text-slate-900 mb-2">Recensioni mai chieste</h3>
            <p className="text-sm text-slate-600">
              Il paziente esce soddisfatto, ma non gli chiedi la recensione.
              Chi fa meglio il marketing prende i pazienti che arrivano dal search.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Cosa trovi dentro ═══ */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
            Cosa trovi dentro il Kit Base
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Template operativi divisi per aree. Non sono moduli tecnici: sono testi,
            sequenze e strutture pronte da personalizzare con il nome del tuo studio.
          </p>

          <div className="space-y-6">
            {[
              {
                icon: '📋',
                title: 'Prima chiamata e segreteria',
                desc: 'Copione telefonico per accogliere chi chiama per la prima volta. Include domande chiave, tono e follow-up.'
              },
              {
                icon: '💬',
                title: 'Messaggi WhatsApp',
                desc: 'Sequenza WhatsApp per messaggio di benvenuto, reminder e seguito post-visita. Pronto per essere adattato.'
              },
              {
                icon: '✉️',
                title: 'Email al paziente',
                desc: 'Template email per appuntamento, conferma e richiesta feedback. Tono professionale, niente spam.'
              },
              {
                icon: '📅',
                title: 'Reminder e agenda',
                desc: 'Struttura di reminder pre-appuntamento per ridurre i no-show. Integrabile con SMS o WhatsApp.'
              },
              {
                icon: '⭐',
                title: 'Richiesta recensioni',
                desc: 'Sequenza per chiedere recensioni Google dopo la visita. Timing corretto, testo naturale, zero invadenza.'
              },
              {
                icon: '🗺️',
                title: 'Percorso del paziente',
                desc: "Mappa completa dei touchpoint dalla prima chiamata alla recensione. Per avere visione d'insieme."
              },
            ].map((area, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-2xl flex-shrink-0 mt-1">{area.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">{area.title}</h3>
                  <p className="text-slate-600 text-sm">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Per chi è / Non è per ═══ */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h3 className="font-bold text-emerald-900 text-lg mb-4">Per chi è</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-emerald-600 flex-shrink-0">✓</span> Studi odontoiatrici in attività da almeno 6 mesi</li>
              <li className="flex gap-2"><span className="text-emerald-600 flex-shrink-0">✓</span> Segreteria che vuole standardizzare le comunicazioni</li>
              <li className="flex gap-2"><span className="text-emerald-600 flex-shrink-0">✓</span> Chi cerca una base operativa solida, non soluzioni complesse</li>
              <li className="flex gap-2"><span className="text-emerald-600 flex-shrink-0">✓</span> Dentisti che vogliono automatizzare senza imparare la tecnologia</li>
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Non è per</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><span className="text-slate-400 flex-shrink-0">×</span> Studi ancora in fase di planning/pre-apertura</li>
              <li className="flex gap-2"><span className="text-slate-400 flex-shrink-0">×</span> Chi cerca software o strumenti digitali da installare</li>
              <li className="flex gap-2"><span className="text-slate-400 flex-shrink-0">×</span> Chi vuole una gestione marketing completa (vedi Gestione Totale)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ Come funziona ═══ */}
      <section className="bg-sky-50 border-y border-sky-100">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
            Come funziona
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Paghi con carta e codice LANCIO37', desc: '€37 invece di €97. Solo per i primi 10 studi.' },
              { num: '2', title: "Ricevi subito l'email con il Kit", desc: "Tutti i template disponibili per il download immediato." },
              { num: '3', title: 'Personalizzi e usi', desc: 'Inserisci il nome del tuo studio e inizia a usarli da subito.' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
          Domande frequenti
        </h2>

        <div className="space-y-6">
          {[
            {
              q: 'Come applico lo sconto con LANCIO37?',
              a: 'Al checkout su Stripe inserisci il codice LANCIO37 nel campo coupon. Vedrai subito €37 al posto di €97.'
            },
            {
              q: 'Come ricevo il Kit Base?',
              a: 'Subito dopo il pagamento, sei reindirizzato alla pagina di ringraziamento dove puoi scaricare i template. Riceverai anche una copia via email.'
            },
            {
              q: "Posso usare i template per più sedi?",
              a: "La licenza è per uso interno di uno studio/dentaista. Se hai più sedi, contattaci per un'offerta dedicata."
            },
            {
              q: "C'è assistenza se ho problemi?",
              a: 'Sì. Scrivi a marketingdentisti.it@gmail.com e ti rispondiamo entro 24 ore lavorative.'
            },
          ].map((faq, i) => (
            <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-slate-900 hover:bg-slate-50 transition-colors flex justify-between items-center">
                <span>{faq.q}</span>
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ═══ CTA finale ═══ */}
      <section className="bg-slate-900 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Inizia oggi con il Kit Base
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            €37 invece di €97. Offerta valida solo per i primi 10 studi.
            Usa il codice <strong className="text-white">LANCIO37</strong> al checkout.
          </p>
          <div className="max-w-md mx-auto mb-4">
            <StripeCheckoutButton />
          </div>
          <p className="text-slate-400 text-xs">
            Pagamento sicuro con carta · Codice LANCIO37 applicabile al checkout
          </p>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 Marketing dentisti ·{' '}
            <Link href="/privacy" className="hover:text-slate-700">Privacy</Link> ·{' '}
            <Link href="/termini" className="hover:text-slate-700">Termini</Link>
          </p>
        </div>
      </footer>
    </main>
  );
}

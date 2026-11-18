import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Privacy — Marketing dentisti",
  description: "Informativa privacy del sito marketing-dentisti.it. Titolare: Marketing dentisti.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <section className="prose prose-slate max-w-none">
          <p className="text-slate-600 text-sm mb-8">Ultimo aggiornamento: Novembre 2026 · marketingdentisti.it@gmail.com</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Titolare del trattamento</h2>
          <p className="text-slate-700">Marketing dentisti · marketingdentisti.it@gmail.com</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Dati raccolti e finalità</h2>
          <p className="text-slate-700">
            Attraverso il form di richiesta del Kit Gratis raccogliamo: nome, indirizzo email e eventuale nome dello studio.
          </p>
          <p className="text-slate-700 mt-2">
            I dati sono utilizzati esclusivamente per:
          </p>
          <ul className="text-slate-700">
            <li>inviare il Kit Gratis richiesto al momento della compilazione del form;</li>
            <li>inoltrarti comunicazioni di natura marketing relative a template e automazioni per studi odontoiatrici.</li>
          </ul>
          <p className="text-slate-700 mt-2">
            Il conferimento dei dati è obbligatorio per l&apos;invio del Kit Gratis; il consenso alle comunicazioni marketing è facoltativo ma necessario per la funzionalità del form. Puoi ritirare il consenso in qualsiasi momento rispondendo all&apos;email ricevuta o cliccando il link di cancellazione presente in ogni comunicazione.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Base giuridica</h2>
          <p className="text-slate-700">
            Esecuzione di una richiesta dell&apos;interessato (Art. 6.1.b GDPR) per l&apos;invio del Kit, e consenso (Art. 6.1.a GDPR) per le comunicazioni marketing successive.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Destinatari dei dati</h2>
          <p className="text-slate-700">
            I dati sono memorizzati in un foglio Google Sheets e possono essere elaborati da servizi terzi come provider di email (SMTP/n8n) e piattaforma di gestione funnel. Non sono oggetto di diffusione né cessione a terzi.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Diritti dell&apos;interessato</h2>
          <p className="text-slate-700">
            Ai sensi degli Artt. 15-22 GDPR hai il diritto di accedere ai tuoi dati, richiederne la rettifica, la cancellazione, la limitazione del trattamento, la portabilità e di opposizione al trattamento. Per esercitare i tuoi diritti, scrivi a marketingdentisti.it@gmail.com o clicca il link di cancellazione presente in ogni email.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Conservazione</h2>
          <p className="text-slate-700">
            I dati sono conservati per 24 mesi dall&apos;ultimo contatto oppure fino a quando non ritiri il consenso o richiedi la cancellazione.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Modifiche</h2>
          <p className="text-slate-700">
            Questa informativa può essere aggiornata. Ti invitiamo a verificarla periodicamente.
          </p>

          <div className="mt-12 p-4 bg-sky-50 rounded-lg border border-sky-200">
            <Link href="/kit-gratis" className="text-sky-700 hover:text-sky-900 font-medium">&larr; Torna alla home</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Termini e Condizioni — Marketing dentisti",
  description: "Condizioni d'uso dei prodotti e servizi di Marketing dentisti.",
};

export default function TerminiPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Termini e Condizioni</h1>
        <section className="prose prose-slate max-w-none">
          <p className="text-slate-600 text-sm mb-8">Ultimo aggiornamento: Novembre 2026 · marketingdentisti.it@gmail.com</p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Prodotti digitali — Licenza d&apos;uso</h2>
          <p className="text-slate-700">
            Tutti i prodotti digitali offerti da Marketing dentisti (Kit Gratis e Kit Base) sono concessi in licenza per uso interno esclusivo dello studio destinatario. È vietata la rivendita, la redistribuzione o la condivisione con soggetti esterni allo studio. La violazione di questa condizione comporta la risoluzione immediata della licenza senza diritto a rimborso.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Kit Base — Rimborzi</h2>
          <p className="text-slate-700">
            Una volta completato il pagamento e avviato il download del Kit Base, non sono previsti rimborsi. Il prodotto digitale viene consegnato integralmente al momento della conferma di pagamento.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Avvio Studio · €497</h2>
          <p className="text-slate-700">
            Il pacchetto Avvio Studio richiede il pagamento del 100% anticipato. Il rimborso è previsto esclusivamente in caso di mancata esecuzione del servizio da parte di Marketing dentisti. Qualora il servizio venga effettivamente erogato, non sono previsti rimborsi parziali o integrali.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Gestione Totale — Mensilità</h2>
          <p className="text-slate-700">
            Il servizio Gestione Totale è fatturato mensilmente in anticipo (100% anticipato). Il cliente ha facoltà di recedere in qualsiasi momento senza preavviso. Il prezzo concordato alla sottoscrizione rimane bloccato per tutti gli anni successivi di fornitura, salvo variazioni contrattuali scritte concordate tra le parti. Le mensilità già pagate non sono rimborsabili in caso di recesso anticipato.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Responsabilità e risultati</h2>
          <p className="text-slate-700">
            I template e gli strumenti operativi forniti da Marketing dentisti sono strumenti di supporto. I risultati ottenuti dipendono dall&apos;applicazione concreta da parte dello studio. Marketing dentisti non garantisce specifici livelli di traffico, prenotazioni o ricavi derivanti dall&apos;utilizzo dei materiali forniti.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Legge applicabile</h2>
          <p className="text-slate-700">
            I presenti termini sono regolati dalla legge italiana. Eventuali controversie saranno sottoposte alla giurisdizione del foro competente del luogo di residenza o domicilio del consumatore.
          </p>

          <div className="mt-12 p-4 bg-sky-50 rounded-lg border border-sky-200">
            <Link href="/kit-gratis" className="text-sky-700 hover:text-sky-900 font-medium">&larr; Torna alla home</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

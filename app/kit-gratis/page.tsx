import React from 'react';
import LeadForm from '@/components/LeadForm';

export const metadata = {
  title: "7 template pronti per strutturare il percorso del nuovo paziente nel tuo studio.",
  description: "Kit Gratis con script segreteria, sequenze WhatsApp, email, reminder e checklist: copia, personalizza, usa da domani mattina. Gratis, via email.",
};

export default function KitPazientiNuoviPage() {
  const bullets = [
    "7 template pronti da personalizzare",
    "Consegna immediata via email",
    "Pensato per studi odontoiatrici italiani",
    "Zero teoria: solo testi e procedure pronte"
  ];
  const cosaTroviDentro = [
    { title: "Script segreteria", desc: "Il flusso completo della prima chiamata: accoglienza, qualifica, appuntamento." },
    { title: "Sequenza WhatsApp", desc: "Quattro messaggi: conferma, reminder, follow-up. Con note su consenso e privacy." },
    { title: "Email di benvenuto", desc: "Il primo contatto dopo la visita, con prossimi passi e riferimenti." },
    { title: "Checklist segretaria", desc: "Dall'arrivo in studio alle 24 ore dopo: niente viene dimenticato." },
    { title: "Email richiesta recensione", desc: "Una richiesta semplice, conforme alle policy di Google." },
    { title: "SMS reminder", desc: "Messaggi brevi e chiari per ridurre le mancate presentazioni." },
    { title: "Mini-guida 5 step", desc: "Il percorso completo del nuovo paziente, in una pagina." }
  ];
  const faqs = [
    { q: "È davvero gratuito?", a: "Sì. Ti chiediamo solo nome ed email per inviartelo." },
    { q: "Cosa succede dopo il download?", a: "Ricevi il Kit via email. Potremmo scriverti in seguito con contenuti utili: puoi cancellarti con un click." },
    { q: "I miei dati sono al sicuro?", a: "Sì: trattamento conforme al GDPR, privacy policy in fondo alla pagina." },
    { q: "Posso condividere il Kit?", a: "No: i template sono per uso interno dello studio destinatario, come indicato nel Kit." }
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              7 template pronti per strutturare il percorso del nuovo paziente nel tuo studio.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              Script segreteria, sequenze WhatsApp, email, reminder e checklist: copia, personalizza, usa da domani mattina. Gratis, via email.
            </p>
            <ul className="space-y-3 mb-8">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start">
                  <svg className="w-6 h-6 text-sky-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full"><LeadForm /></div>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Cosa trovi dentro</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cosaTroviDentro.map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-sky-300 transition-colors">
                <h3 className="text-xl font-semibold text-sky-700 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Per chi è</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border-l-4 border-sky-500 shadow-sm">
              <h3 className="text-xl font-bold text-sky-700 mb-4">PER:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• studi odontoiatrici italiani</li>
                <li>• studi con segreteria/front-office</li>
                <li>• chi vuole sistematizzare il primo contatto</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-4 border-slate-400 shadow-sm">
              <h3 className="text-xl font-bold text-slate-600 mb-4">NON PER:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• chi cerca risultati pronti senza applicare i template</li>
                <li>• chi non ha un punto di contatto con i pazienti</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Domande frequenti</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-400 text-center text-sm">
        <div className="max-w-6xl mx-auto">
          <p>© 2026 Marketing dentisti</p>
          <div className="space-x-4">
            <a href="/privacy" className="hover:text-sky-400 transition-colors">Privacy</a>
            <span>·</span>
            <a href="/termini" className="hover:text-sky-400 transition-colors">Termini</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
import type { Metadata } from 'next';
import GratiaContentInner from '@/components/GraziaKitBaseContent';

export const metadata: Metadata = {
  title: 'Grazie! Il tuo Kit Base è pronto — Marketing dentisti',
  description: 'Pagamento completato. Il tuo Kit Base con i template operativi è pronto per il download.',
};

export default function GrazieKitBasePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <GratiaContentInner />
    </main>
  );
}

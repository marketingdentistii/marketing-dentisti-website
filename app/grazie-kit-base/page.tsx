import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import GratiaContent from '@/components/GraziaKitBaseContent';

export const metadata: Metadata = {
  title: 'Grazie! Il tuo Kit Base è pronto — Marketing dentisti',
  description: 'Pagamento completato. Il tuo Kit Base con i 7 template operativi è pronto per il download.',
};

export default function GrazieKitBasePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      }>
        <GratiaContent />
      </Suspense>
    </main>
  );
}

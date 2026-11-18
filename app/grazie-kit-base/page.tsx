import type { Metadata } from 'next';
import Link from 'next/link';
import GratiaContentInner from '@/components/GraziaKitBaseContent';

export const metadata: Metadata = {
  title: 'Grazie! Il tuo Kit Base è pronto — Marketing dentisti',
  description: 'Pagamento completato. Il tuo Kit Base con i template operativi è pronto per il download.',
};

// Server component — usa la prop searchParams di Next.js 15+ senza bisogno di Suspense
export default async function GrazieKitBasePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="min-h-screen bg-slate-50">
      <GratiaContentInner sessionId={params.session_id} />
    </main>
  );
}

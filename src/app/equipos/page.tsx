import type { Metadata } from 'next';
import { Suspense } from 'react';
import { VistaCatalogo } from '@/components/VistaCatalogo';

export const metadata: Metadata = {
  title: 'Catálogo de equipos',
  description:
    'Catálogo de maquinaria pesada con precio de renta por día, IVA incluido, búsqueda y filtros.',
};

export default function EquiposPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-[36px] font-bold text-carbon md:text-[48px]">Equipos</h1>
      <Suspense fallback={<p className="text-acero">Cargando catálogo…</p>}>
        <VistaCatalogo />
      </Suspense>
    </div>
  );
}

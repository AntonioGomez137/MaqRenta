import type { Metadata } from 'next';
import { SITE_NAME } from '@/config/site';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: `Quiénes somos en ${SITE_NAME}. Texto ficticio de demostración.`,
};

export default function NosotrosPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="font-display text-[36px] font-bold text-carbon md:text-[48px]">Nosotros</h1>
      <p className="text-acero">
        {SITE_NAME} es una empresa ficticia de demostración dedicada a la renta de maquinaria
        pesada en el sureste de México. Operamos sucursales de ejemplo en Villahermosa, Ciudad del
        Carmen y Coatzacoalcos.
      </p>
      <p className="text-acero">
        Este sitio existe para presentar un catálogo con precio por día e IVA incluido. No es una
        operación real: los equipos, marcas, precios y datos de contacto son inventados.
      </p>
    </div>
  );
}

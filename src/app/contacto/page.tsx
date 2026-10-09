import type { Metadata } from 'next';
import { FormularioContacto } from '@/components/FormularioContacto';
import { getEquipoPorSlug } from '@/lib/equipos';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escríbenos por WhatsApp para rentar maquinaria pesada. Formulario de demostración.',
};

interface Props {
  searchParams: Promise<{ equipo?: string }>;
}

export default async function ContactoPage({ searchParams }: Props) {
  const { equipo } = await searchParams;
  const slug = equipo && getEquipoPorSlug(equipo) ? equipo : '';

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="font-display text-[36px] font-bold text-carbon md:text-[48px]">Contacto</h1>
      <p className="text-acero">
        Completa el formulario y se abrirá WhatsApp con tu mensaje. No enviamos correos ni
        guardamos tus datos.
      </p>
      <FormularioContacto equipoInicial={slug} />
    </div>
  );
}

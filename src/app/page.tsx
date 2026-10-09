import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { BuscadorEquipos } from '@/components/BuscadorEquipos';
import { EquipoCard } from '@/components/EquipoCard';
import { SITE_NAME } from '@/config/site';
import { getCategorias, getEquiposDestacados } from '@/lib/equipos';

export const metadata: Metadata = {
  title: 'Inicio',
  description: `Renta maquinaria pesada con ${SITE_NAME}. Precio por día, IVA incluido, y contacto por WhatsApp.`,
};

export default function InicioPage() {
  const categorias = getCategorias();
  const destacados = getEquiposDestacados();

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <h1 className="font-display text-[36px] font-bold leading-tight text-carbon md:text-[48px]">
          Renta maquinaria pesada con precio claro por día
        </h1>
        <p className="max-w-2xl text-acero">
          Explora el catálogo, ve el precio de renta por día con IVA incluido y escríbenos por
          WhatsApp para coordinar. Sitio de demostración con datos ficticios.
        </p>
        <Suspense>
          <BuscadorEquipos modo="inicio" />
        </Suspense>
      </section>

      <section>
        <h2 className="mb-4 font-display text-3xl font-bold">Categorías</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((cat) => (
            <Link
              key={cat.slug}
              href={`/equipos?categoria=${cat.slug}`}
              className="rounded border border-niebla bg-niebla p-4 outline-offset-2 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <p className="font-display text-2xl font-semibold text-carbon">{cat.nombre}</p>
              <p className="mt-1 text-sm text-acero">
                {cat.cantidad} {cat.cantidad === 1 ? 'equipo' : 'equipos'}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-3xl font-bold">Equipos destacados</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {destacados.map((equipo) => (
            <EquipoCard key={equipo.slug} equipo={equipo} />
          ))}
        </div>
      </section>

      <section className="rounded bg-carbon px-6 py-8 text-white">
        <p className="font-display text-3xl font-bold text-primary">Precio claro por día, IVA incluido</p>
        <p className="mt-2 max-w-2xl text-white/80">
          Cada tarjeta y cada ficha muestran el costo diario en pesos mexicanos, sin letras chiquitas.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-display text-3xl font-bold">Cómo rentar</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            { n: '1', t: 'Elige tu equipo', d: 'Filtra el catálogo y abre la ficha con el precio por día.' },
            { n: '2', t: 'Escríbenos por WhatsApp', d: 'Cuéntanos fechas y sucursal. El formulario arma el mensaje.' },
            { n: '3', t: 'Coordina la entrega', d: 'La operación se cierra por el canal comercial, fuera del sitio.' },
          ].map((paso) => (
            <li key={paso.n} className="rounded border border-niebla p-4">
              <p className="font-display text-2xl font-bold text-primary">{paso.n}</p>
              <p className="mt-2 font-display text-xl font-semibold">{paso.t}</p>
              <p className="mt-1 text-sm text-acero">{paso.d}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EquipoCard } from '@/components/EquipoCard';
import { Galeria } from '@/components/Galeria';
import { PrecioDia } from '@/components/PrecioDia';
import { TablaEspecificaciones } from '@/components/TablaEspecificaciones';
import {
  CATEGORIA_NOMBRES,
  getEquipoPorSlug,
  getEquipos,
  getEquiposRelacionados,
} from '@/lib/equipos';
import { formatearPrecio } from '@/lib/formato';
import { construirEnlaceWhatsApp } from '@/lib/whatsapp';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getEquipos().map((equipo) => ({ slug: equipo.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const equipo = getEquipoPorSlug(slug);
  if (!equipo) {
    return { title: 'Equipo no encontrado' };
  }
  return {
    title: equipo.nombre,
    description: `${equipo.nombre}: ${formatearPrecio(equipo.precioDia)} MXN por día, IVA incluido.`,
  };
}

export default async function FichaEquipoPage({ params }: Props) {
  const { slug } = await params;
  const equipo = getEquipoPorSlug(slug);
  if (!equipo) notFound();

  const relacionados = getEquiposRelacionados(equipo.slug, equipo.categoria);
  const wa = construirEnlaceWhatsApp(
    `Hola, me interesa rentar la ${equipo.nombre} (${formatearPrecio(equipo.precioDia)} por día). ¿Está disponible?`,
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: equipo.nombre,
    brand: equipo.marca,
    category: CATEGORIA_NOMBRES[equipo.categoria],
    offers: {
      '@type': 'Offer',
      price: String(equipo.precioDia),
      priceCurrency: 'MXN',
    },
  };

  return (
    <article className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Galeria nombre={equipo.nombre} categoria={equipo.categoria} />
        </div>
        <div className="order-1 space-y-4 lg:order-2">
          <PrecioDia precio={equipo.precioDia} size="lg" />
          <p className="text-sm text-acero">
            {equipo.marca} · {CATEGORIA_NOMBRES[equipo.categoria]}
          </p>
          <h1 className="font-display text-[36px] font-bold leading-tight text-carbon md:text-[48px]">
            {equipo.nombre}
          </h1>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded bg-whatsapp px-5 py-3 font-semibold text-white outline-offset-2 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-carbon"
          >
            Consultar por WhatsApp
          </a>
          <p>
            <Link
              href={`/contacto?equipo=${equipo.slug}`}
              className="text-sm font-semibold text-carbon underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              Escribir desde el formulario
            </Link>
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-3 font-display text-2xl font-bold">Especificaciones</h2>
        <TablaEspecificaciones equipo={equipo} />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-bold">Descripción</h2>
        <p className="text-acero">{equipo.descripcion}</p>
        <h3 className="font-display text-xl font-semibold">Usos recomendados</h3>
        <ul className="list-disc space-y-1 pl-5 text-carbon">
          {equipo.usos.map((uso) => (
            <li key={uso}>{uso}</li>
          ))}
        </ul>
      </section>

      {relacionados.length > 0 ? (
        <section>
          <h2 className="mb-4 font-display text-2xl font-bold">Más equipos de esta categoría</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((item) => (
              <EquipoCard key={item.slug} equipo={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

import Link from 'next/link';
import type { Equipo } from '@/types/equipo';
import { CATEGORIA_NOMBRES } from '@/lib/equipos';
import { PlaceholderImagen } from './PlaceholderImagen';
import { PrecioDia } from './PrecioDia';

interface EquipoCardProps {
  equipo: Equipo;
}

export function EquipoCard({ equipo }: EquipoCardProps) {
  const disponible = equipo.disponibilidad === 'Disponible';

  return (
    <Link
      href={`/equipos/${equipo.slug}`}
      className="block rounded border border-niebla bg-white p-0 outline-offset-2 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="aspect-[400/260] overflow-hidden rounded-t bg-carbon">
        <PlaceholderImagen nombre={equipo.nombre} categoria={equipo.categoria} />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-carbon">{equipo.nombre}</h2>
            <p className="text-sm text-acero">
              {equipo.marca} · {CATEGORIA_NOMBRES[equipo.categoria]}
            </p>
          </div>
          <span
            className={`shrink-0 rounded px-2 py-1 text-xs font-semibold ${
              disponible ? 'bg-ok/15 text-ok' : 'bg-aviso/15 text-aviso'
            }`}
          >
            {equipo.disponibilidad}
          </span>
        </div>
        <PrecioDia precio={equipo.precioDia} size="md" />
        <p className="text-sm text-acero">
          {equipo.potenciaHp} hp · {equipo.capacidad}
        </p>
      </div>
    </Link>
  );
}

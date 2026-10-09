'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { filtrarEquipos, parsearFiltros } from '@/lib/equipos';
import { construirQueryCatalogo, contarFiltrosActivos } from '@/lib/filtros-url';
import { BuscadorEquipos } from './BuscadorEquipos';
import { EquipoCard } from './EquipoCard';
import { EstadoVacio } from './EstadoVacio';
import { ChipsFiltros, FiltrosPanel } from './FiltrosPanel';

export function VistaCatalogo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filtros = parsearFiltros(Object.fromEntries(searchParams.entries()));
  const resultados = filtrarEquipos(filtros);
  const hayFiltros = contarFiltrosActivos(filtros) > 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <FiltrosPanel filtros={filtros} />

      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <BuscadorEquipos modo="catalogo" />
          </div>
          <label className="flex items-center gap-2 text-sm text-carbon">
            <span>Ordenar por</span>
            <select
              value={filtros.orden}
              aria-label="Ordenar por"
              onChange={(e) =>
                router.replace(
                  construirQueryCatalogo({
                    ...filtros,
                    orden: e.target.value as typeof filtros.orden,
                  }),
                  { scroll: false },
                )
              }
              className="rounded border border-niebla bg-white px-3 py-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A-Z</option>
            </select>
          </label>
        </div>

        <ChipsFiltros filtros={filtros} />

        <p className="text-sm text-acero" aria-live="polite">
          {resultados.length} equipos encontrados
        </p>

        {resultados.length === 0 ? (
          <EstadoVacio
            mensaje="No encontramos equipos con esos filtros"
            accion={hayFiltros ? { etiqueta: 'Limpiar filtros', href: '/equipos' } : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resultados.map((equipo) => (
              <EquipoCard key={equipo.slug} equipo={equipo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

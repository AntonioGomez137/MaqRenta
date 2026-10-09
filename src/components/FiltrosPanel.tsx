'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FiltrosCatalogo } from '@/types/equipo';
import { CATEGORIA_NOMBRES, getCategorias, getMarcas, getSucursales } from '@/lib/equipos';
import { construirQueryCatalogo, contarFiltrosActivos } from '@/lib/filtros-url';

interface FiltrosPanelProps {
  filtros: FiltrosCatalogo;
}

function CamposFiltro({
  filtros,
  onChange,
}: {
  filtros: FiltrosCatalogo;
  onChange: (siguientes: FiltrosCatalogo) => void;
}) {
  const categorias = getCategorias();
  const marcas = getMarcas();
  const sucursales = getSucursales();

  function toggleLista(lista: string[], valor: string): string[] {
    return lista.includes(valor) ? lista.filter((item) => item !== valor) : [...lista, valor];
  }

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 font-display text-lg font-semibold text-carbon">Categoría</legend>
        <label className="mb-2 flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="categoria"
            checked={filtros.categoria === ''}
            onChange={() => onChange({ ...filtros, categoria: '' })}
            className="accent-primary"
          />
          Todas
        </label>
        {categorias.map((cat) => (
          <label key={cat.slug} className="mb-2 flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="categoria"
              checked={filtros.categoria === cat.slug}
              onChange={() => onChange({ ...filtros, categoria: cat.slug })}
              className="accent-primary"
            />
            {cat.nombre}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className="mb-2 font-display text-lg font-semibold text-carbon">Marca</legend>
        {marcas.map((marca) => (
          <label key={marca} className="mb-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filtros.marcas.includes(marca)}
              onChange={() => onChange({ ...filtros, marcas: toggleLista(filtros.marcas, marca) })}
              className="accent-primary"
            />
            {marca}
          </label>
        ))}
      </fieldset>

      <fieldset className="grid grid-cols-2 gap-3">
        <legend className="mb-2 font-display text-lg font-semibold text-carbon">Precio por día</legend>
        <div>
          <label htmlFor="precioMin" className="mb-1 block text-sm text-acero">
            Mínimo
          </label>
          <input
            id="precioMin"
            type="number"
            min={0}
            value={filtros.precioMin ?? ''}
            onChange={(e) =>
              onChange({
                ...filtros,
                precioMin: e.target.value === '' ? null : Number(e.target.value),
              })
            }
            className="w-full rounded border border-niebla px-3 py-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          />
        </div>
        <div>
          <label htmlFor="precioMax" className="mb-1 block text-sm text-acero">
            Máximo
          </label>
          <input
            id="precioMax"
            type="number"
            min={0}
            value={filtros.precioMax ?? ''}
            onChange={(e) =>
              onChange({
                ...filtros,
                precioMax: e.target.value === '' ? null : Number(e.target.value),
              })
            }
            className="w-full rounded border border-niebla px-3 py-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 font-display text-lg font-semibold text-carbon">Sucursal</legend>
        {sucursales.map((sucursal) => (
          <label key={sucursal} className="mb-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filtros.sucursales.includes(sucursal)}
              onChange={() =>
                onChange({ ...filtros, sucursales: toggleLista(filtros.sucursales, sucursal) })
              }
              className="accent-primary"
            />
            {sucursal}
          </label>
        ))}
      </fieldset>
    </div>
  );
}

export function FiltrosPanel({ filtros }: FiltrosPanelProps) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const activos = contarFiltrosActivos(filtros);

  function aplicar(siguientes: FiltrosCatalogo) {
    router.replace(construirQueryCatalogo(siguientes), { scroll: false });
  }

  return (
    <div>
      <div className="lg:hidden">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded border border-niebla bg-white px-4 py-2 font-semibold text-carbon outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          onClick={() => setAbierto(true)}
        >
          <SlidersHorizontal size={16} aria-hidden />
          Filtros{activos > 0 ? ` (${activos})` : ''}
        </button>
      </div>

      <aside className="hidden lg:block">
        <CamposFiltro filtros={filtros} onChange={aplicar} />
      </aside>

      {abierto ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-carbon/50"
            aria-label="Cerrar filtros"
            onClick={() => setAbierto(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col bg-white p-4 shadow-none">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-xl font-bold">Filtros</p>
              <button
                type="button"
                aria-label="Cerrar filtros"
                onClick={() => setAbierto(false)}
                className="rounded p-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <X aria-hidden />
              </button>
            </div>
            <div className="overflow-y-auto">
              <CamposFiltro
                filtros={filtros}
                onChange={(siguientes) => {
                  aplicar(siguientes);
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ChipsFiltros({ filtros }: { filtros: FiltrosCatalogo }) {
  const router = useRouter();
  const chips: { clave: string; etiqueta: string; quitar: () => FiltrosCatalogo }[] = [];

  if (filtros.q.trim()) {
    chips.push({
      clave: 'q',
      etiqueta: `Búsqueda: ${filtros.q}`,
      quitar: () => ({ ...filtros, q: '' }),
    });
  }
  if (filtros.categoria) {
    chips.push({
      clave: 'cat',
      etiqueta: CATEGORIA_NOMBRES[filtros.categoria],
      quitar: () => ({ ...filtros, categoria: '' }),
    });
  }
  filtros.marcas.forEach((marca) => {
    chips.push({
      clave: `marca-${marca}`,
      etiqueta: marca,
      quitar: () => ({ ...filtros, marcas: filtros.marcas.filter((m) => m !== marca) }),
    });
  });
  if (filtros.precioMin !== null) {
    chips.push({
      clave: 'min',
      etiqueta: `Mín. ${filtros.precioMin}`,
      quitar: () => ({ ...filtros, precioMin: null }),
    });
  }
  if (filtros.precioMax !== null) {
    chips.push({
      clave: 'max',
      etiqueta: `Máx. ${filtros.precioMax}`,
      quitar: () => ({ ...filtros, precioMax: null }),
    });
  }
  filtros.sucursales.forEach((sucursal) => {
    chips.push({
      clave: `suc-${sucursal}`,
      etiqueta: sucursal,
      quitar: () => ({
        ...filtros,
        sucursales: filtros.sucursales.filter((s) => s !== sucursal),
      }),
    });
  });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.clave}
          type="button"
          onClick={() => router.replace(construirQueryCatalogo(chip.quitar()), { scroll: false })}
          className="inline-flex items-center gap-1 rounded border border-niebla bg-white px-3 py-1 text-sm outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {chip.etiqueta}
          <X size={14} aria-hidden />
          <span className="sr-only">Quitar {chip.etiqueta}</span>
        </button>
      ))}
      <Link
        href="/equipos"
        className="text-sm font-semibold text-carbon underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        Limpiar filtros
      </Link>
    </div>
  );
}

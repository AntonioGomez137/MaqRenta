'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { parsearFiltros } from '@/lib/equipos';
import { construirQueryCatalogo } from '@/lib/filtros-url';

interface BuscadorEquiposProps {
  modo?: 'inicio' | 'catalogo';
}

export function BuscadorEquipos({ modo = 'catalogo' }: BuscadorEquiposProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const filtros = parsearFiltros(Object.fromEntries(searchParams.entries()));
  const [q, setQ] = useState(modo === 'catalogo' ? filtros.q : '');

  useEffect(() => {
    if (modo === 'catalogo') setQ(filtros.q);
    // Solo sincroniza cuando cambia la URL, no en cada tecla.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, modo]);

  useEffect(() => {
    if (modo !== 'catalogo' || pathname !== '/equipos') return;
    const id = window.setTimeout(() => {
      const actuales = parsearFiltros(Object.fromEntries(new URLSearchParams(query).entries()));
      if (q === actuales.q) return;
      router.replace(construirQueryCatalogo({ ...actuales, q }), { scroll: false });
    }, 300);
    return () => window.clearTimeout(id);
  }, [q, modo, pathname, query, router]);

  function onSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (modo === 'inicio') {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      const qs = params.toString();
      router.push(qs ? `/equipos?${qs}` : '/equipos');
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative" role="search">
      <label htmlFor={`busqueda-${modo}`} className="sr-only">
        Buscar equipos
      </label>
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-acero"
        size={18}
      />
      <input
        id={`busqueda-${modo}`}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar por nombre, marca o categoría"
        className="w-full rounded border border-niebla bg-white py-3 pl-10 pr-4 text-carbon outline-offset-2 placeholder:text-acero focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      />
    </form>
  );
}

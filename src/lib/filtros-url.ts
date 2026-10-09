import type { FiltrosCatalogo } from '@/types/equipo';

/** Convierte los filtros actuales a query string para /equipos. */
export function construirQueryCatalogo(filtros: FiltrosCatalogo): string {
  const params = new URLSearchParams();

  if (filtros.q.trim()) params.set('q', filtros.q.trim());
  if (filtros.categoria) params.set('categoria', filtros.categoria);
  if (filtros.marcas.length > 0) params.set('marca', filtros.marcas.join(','));
  if (filtros.precioMin !== null) params.set('precioMin', String(filtros.precioMin));
  if (filtros.precioMax !== null) params.set('precioMax', String(filtros.precioMax));
  if (filtros.sucursales.length > 0) params.set('sucursal', filtros.sucursales.join(','));
  if (filtros.orden !== 'precio-asc') params.set('orden', filtros.orden);

  const qs = params.toString();
  return qs ? `/equipos?${qs}` : '/equipos';
}

export function contarFiltrosActivos(filtros: FiltrosCatalogo): number {
  let n = 0;
  if (filtros.q.trim()) n += 1;
  if (filtros.categoria) n += 1;
  n += filtros.marcas.length;
  if (filtros.precioMin !== null) n += 1;
  if (filtros.precioMax !== null) n += 1;
  n += filtros.sucursales.length;
  return n;
}

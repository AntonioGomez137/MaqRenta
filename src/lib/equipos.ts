import { equipos } from '@/data/equipos';
import type { Categoria, Equipo, FiltrosCatalogo, OrdenCatalogo } from '@/types/equipo';

export const CATEGORIA_NOMBRES: Record<Categoria, string> = {
  excavadoras: 'Excavadoras',
  retroexcavadoras: 'Retroexcavadoras',
  cargadores: 'Cargadores',
  bulldozers: 'Bulldozers',
  motoniveladoras: 'Motoniveladoras',
  compactadores: 'Compactadores',
};

export const CATEGORIAS_ORDEN: Categoria[] = [
  'excavadoras',
  'retroexcavadoras',
  'cargadores',
  'bulldozers',
  'motoniveladoras',
  'compactadores',
];

export const DESTACADOS = [
  'excavadora-ex-220',
  'retroexcavadora-rx-420',
  'cargador-frontal-cf-950',
  'rodillo-rc-10-liso',
] as const;

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

export function getEquipos(): Equipo[] {
  return equipos;
}

export function getEquipoPorSlug(slug: string): Equipo | undefined {
  return equipos.find((equipo) => equipo.slug === slug);
}

export function getCategorias(): { slug: Categoria; nombre: string; cantidad: number }[] {
  return CATEGORIAS_ORDEN.map((slug) => ({
    slug,
    nombre: CATEGORIA_NOMBRES[slug],
    cantidad: equipos.filter((equipo) => equipo.categoria === slug).length,
  }));
}

export function getMarcas(): string[] {
  return Array.from(new Set(equipos.map((equipo) => equipo.marca))).sort((a, b) =>
    a.localeCompare(b, 'es'),
  );
}

export function getSucursales(): Equipo['sucursal'][] {
  return Array.from(new Set(equipos.map((equipo) => equipo.sucursal))).sort((a, b) =>
    a.localeCompare(b, 'es'),
  );
}

export function getEquiposDestacados(): Equipo[] {
  return DESTACADOS.map((slug) => getEquipoPorSlug(slug)).filter(
    (equipo): equipo is Equipo => Boolean(equipo),
  );
}

export function getEquiposRelacionados(slug: string, categoria: Categoria): Equipo[] {
  return equipos.filter((equipo) => equipo.categoria === categoria && equipo.slug !== slug).slice(0, 3);
}

const ORDENES: OrdenCatalogo[] = ['precio-asc', 'precio-desc', 'nombre'];

function esCategoria(valor: string): valor is Categoria {
  return CATEGORIAS_ORDEN.includes(valor as Categoria);
}

function parseLista(valor: string | string[] | undefined): string[] {
  if (!valor) return [];
  const crudo = Array.isArray(valor) ? valor.join(',') : valor;
  return crudo
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseNumero(valor: string | string[] | undefined): number | null {
  if (!valor || Array.isArray(valor)) return valor && Array.isArray(valor) ? parseNumero(valor[0]) : null;
  const n = Number(valor);
  return Number.isFinite(n) ? n : null;
}

function primerValor(valor: string | string[] | undefined): string {
  if (!valor) return '';
  return Array.isArray(valor) ? (valor[0] ?? '') : valor;
}

export function parsearFiltros(searchParams: {
  [key: string]: string | string[] | undefined;
}): FiltrosCatalogo {
  const categoriaCruda = primerValor(searchParams.categoria);
  const ordenCrudo = primerValor(searchParams.orden) as OrdenCatalogo;

  return {
    q: primerValor(searchParams.q),
    categoria: esCategoria(categoriaCruda) ? categoriaCruda : '',
    marcas: parseLista(searchParams.marca),
    precioMin: parseNumero(searchParams.precioMin),
    precioMax: parseNumero(searchParams.precioMax),
    sucursales: parseLista(searchParams.sucursal),
    orden: ORDENES.includes(ordenCrudo) ? ordenCrudo : 'precio-asc',
  };
}

export function filtrarEquipos(filtros: FiltrosCatalogo): Equipo[] {
  const q = normalizar(filtros.q);

  const filtrados = equipos.filter((equipo) => {
    if (q) {
      const hay = [equipo.nombre, equipo.marca, CATEGORIA_NOMBRES[equipo.categoria], equipo.categoria]
        .map(normalizar)
        .some((campo) => campo.includes(q));
      if (!hay) return false;
    }

    if (filtros.categoria && equipo.categoria !== filtros.categoria) return false;

    if (filtros.marcas.length > 0 && !filtros.marcas.includes(equipo.marca)) return false;

    if (filtros.precioMin !== null && equipo.precioDia < filtros.precioMin) return false;
    if (filtros.precioMax !== null && equipo.precioDia > filtros.precioMax) return false;

    if (filtros.sucursales.length > 0 && !filtros.sucursales.includes(equipo.sucursal)) {
      return false;
    }

    return true;
  });

  const ordenados = [...filtrados].sort((a, b) => {
    if (filtros.orden === 'precio-desc') return b.precioDia - a.precioDia;
    if (filtros.orden === 'nombre') return a.nombre.localeCompare(b.nombre, 'es');
    return a.precioDia - b.precioDia;
  });

  return ordenados;
}

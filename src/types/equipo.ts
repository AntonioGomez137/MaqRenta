export type Categoria =
  | 'excavadoras'
  | 'retroexcavadoras'
  | 'cargadores'
  | 'bulldozers'
  | 'motoniveladoras'
  | 'compactadores';

export interface Equipo {
  slug: string;
  nombre: string;
  marca: string;
  categoria: Categoria;
  precioDia: number; // MXN por día, IVA incluido
  pesoOperativoKg: number;
  potenciaHp: number;
  capacidad: string;
  anio: number;
  sucursal: 'Villahermosa' | 'Ciudad del Carmen' | 'Coatzacoalcos';
  disponibilidad: 'Disponible' | 'Consultar';
  descripcion: string; // 2 o 3 frases
  usos: string[]; // 3 usos recomendados
}

export type OrdenCatalogo = 'precio-asc' | 'precio-desc' | 'nombre';

export interface FiltrosCatalogo {
  q: string;
  categoria: Categoria | '';
  marcas: string[];
  precioMin: number | null;
  precioMax: number | null;
  sucursales: string[];
  orden: OrdenCatalogo;
}

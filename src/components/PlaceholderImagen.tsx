import {
  CircleDot,
  Forklift,
  Ruler,
  Shovel,
  Tractor,
  Truck,
} from 'lucide-react';
import type { Categoria } from '@/types/equipo';

const ICONOS: Record<Categoria, typeof Shovel> = {
  excavadoras: Shovel,
  retroexcavadoras: Tractor,
  cargadores: Forklift,
  bulldozers: Truck,
  motoniveladoras: Ruler,
  compactadores: CircleDot,
};

interface PlaceholderImagenProps {
  nombre: string;
  categoria: Categoria;
  variant?: 0 | 1 | 2;
  className?: string;
}

/** Marcador local generado en el proyecto: SVG + ícono de categoría. */
export function PlaceholderImagen({
  nombre,
  categoria,
  variant = 0,
  className = '',
}: PlaceholderImagenProps) {
  const Icono = ICONOS[categoria];
  const iconClass =
    variant === 1
      ? 'left-8 top-8'
      : variant === 2
        ? 'right-8 top-8'
        : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';

  return (
    <div className={`relative aspect-[400/260] w-full overflow-hidden bg-carbon ${className}`}>
      <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden>
        <rect width="400" height="260" fill="#1B1F23" />
        <rect
          x="12"
          y="12"
          width="376"
          height="236"
          fill="none"
          stroke="#F5B800"
          strokeOpacity="0.25"
          strokeDasharray={variant === 0 ? undefined : variant === 1 ? '10 6' : '3 5'}
        />
      </svg>
      <Icono
        size={48}
        strokeWidth={1.5}
        aria-hidden
        className={`pointer-events-none absolute text-primary ${iconClass}`}
      />
      <p className="pointer-events-none absolute inset-x-2 bottom-3 text-center text-sm text-niebla">
        {nombre}
      </p>
    </div>
  );
}

'use client';

import { useState } from 'react';
import type { Categoria } from '@/types/equipo';
import { PlaceholderImagen } from './PlaceholderImagen';

interface GaleriaProps {
  nombre: string;
  categoria: Categoria;
}

export function Galeria({ nombre, categoria }: GaleriaProps) {
  const [activa, setActiva] = useState<0 | 1 | 2>(0);
  const variantes: Array<0 | 1 | 2> = [0, 1, 2];

  return (
    <div>
      <div className="aspect-[400/260] overflow-hidden rounded bg-carbon">
        <PlaceholderImagen nombre={nombre} categoria={categoria} variant={activa} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {variantes.map((variant) => (
          <button
            key={variant}
            type="button"
            onClick={() => setActiva(variant)}
            aria-label={`Ver imagen ${variant + 1} de ${nombre}`}
            aria-pressed={activa === variant}
            className={`overflow-hidden rounded border outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
              activa === variant ? 'border-primary' : 'border-niebla'
            }`}
          >
            <PlaceholderImagen nombre={nombre} categoria={categoria} variant={variant} />
          </button>
        ))}
      </div>
    </div>
  );
}

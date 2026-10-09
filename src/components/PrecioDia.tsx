import { formatearPrecio } from '@/lib/formato';

interface PrecioDiaProps {
  precio: number;
  size?: 'md' | 'lg';
}

export function PrecioDia({ precio, size = 'md' }: PrecioDiaProps) {
  const clases =
    size === 'lg'
      ? 'text-[48px] leading-none'
      : 'text-[32px] leading-none';

  return (
    <div>
      <p className={`font-display font-bold text-carbon ${clases}`}>
        {formatearPrecio(precio)}
      </p>
      <p className="mt-1 text-sm text-acero">MXN por día · IVA incluido</p>
    </div>
  );
}

import Link from 'next/link';

interface EstadoVacioProps {
  mensaje: string;
  accion?: { etiqueta: string; href: string };
}

export function EstadoVacio({ mensaje, accion }: EstadoVacioProps) {
  return (
    <div className="rounded border border-niebla bg-white p-8 text-center">
      <p className="text-carbon">{mensaje}</p>
      {accion ? (
        <Link
          href={accion.href}
          className="mt-4 inline-flex rounded bg-primary px-4 py-2 font-semibold text-carbon outline-offset-2 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-carbon"
        >
          {accion.etiqueta}
        </Link>
      ) : null}
    </div>
  );
}

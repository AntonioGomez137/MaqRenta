import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-[36px] font-bold text-carbon md:text-[48px]">
        Página no encontrada
      </h1>
      <p className="text-acero">El equipo o la página que buscas no existe en este catálogo.</p>
      <Link
        href="/equipos"
        className="inline-flex rounded bg-primary px-4 py-2 font-semibold text-carbon outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-carbon"
      >
        Ver catálogo
      </Link>
    </div>
  );
}

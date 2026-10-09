import Link from 'next/link';
import { CORREO_VISIBLE, SITE_NAME, TELEFONO_VISIBLE } from '@/config/site';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-niebla bg-niebla">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold text-carbon">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-acero">Sitio de demostración. Datos ficticios.</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm" aria-label="Pie de página">
          <Link className="text-carbon underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href="/">
            Inicio
          </Link>
          <Link className="text-carbon underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href="/equipos">
            Equipos
          </Link>
          <Link className="text-carbon underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href="/nosotros">
            Nosotros
          </Link>
          <Link className="text-carbon underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href="/contacto">
            Contacto
          </Link>
          <Link className="text-carbon underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href="/aviso-de-privacidad">
            Aviso de privacidad
          </Link>
        </nav>
        <div className="text-sm text-acero">
          <p>Teléfono: {TELEFONO_VISIBLE}</p>
          <p className="mt-1">{CORREO_VISIBLE}</p>
        </div>
      </div>
    </footer>
  );
}

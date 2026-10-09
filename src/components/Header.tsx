'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SITE_NAME } from '@/config/site';

const ENLACES = [
  { href: '/', etiqueta: 'Inicio' },
  { href: '/equipos', etiqueta: 'Equipos' },
  { href: '/nosotros', etiqueta: 'Nosotros' },
  { href: '/contacto', etiqueta: 'Contacto' },
];

export function Header() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-niebla bg-carbon text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-display text-2xl font-bold text-primary outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {SITE_NAME}
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
          {ENLACES.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className={`text-sm outline-offset-4 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                pathname === enlace.href ? 'text-primary' : 'text-white'
              }`}
            >
              {enlace.etiqueta}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="rounded bg-primary px-4 py-2 text-sm font-semibold text-carbon outline-offset-2 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Contactar
          </Link>
        </nav>
        <button
          type="button"
          className="rounded p-2 text-white outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary md:hidden"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>
      {abierto ? (
        <nav className="space-y-2 border-t border-white/10 px-4 py-4 md:hidden" aria-label="Móvil">
          {ENLACES.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              onClick={() => setAbierto(false)}
              className="block py-2 text-white outline-offset-2 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {enlace.etiqueta}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setAbierto(false)}
            className="mt-2 inline-flex rounded bg-primary px-4 py-2 font-semibold text-carbon"
          >
            Contactar
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

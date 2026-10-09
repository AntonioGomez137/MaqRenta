import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Barlow_Condensed, Inter } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { SITE_NAME } from '@/config/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} · Renta de maquinaria pesada`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    'Renta de maquinaria pesada con precio por día e IVA incluido. Catálogo de demostración con datos ficticios.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${barlow.variable}`}>
      <body className="font-sans text-base">
        <Header />
        <main className="mx-auto min-h-screen max-w-6xl px-4 pb-24 pt-24">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

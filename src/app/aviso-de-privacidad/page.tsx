import type { Metadata } from 'next';
import { SITE_NAME } from '@/config/site';

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: `Aviso de privacidad ficticio de ${SITE_NAME}.`,
};

export default function AvisoPrivacidadPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="font-display text-[36px] font-bold text-carbon md:text-[48px]">
        Aviso de privacidad
      </h1>
      <p className="text-acero">
        Este aviso es un texto de ejemplo para el sitio de demostración de {SITE_NAME}. El
        formulario de contacto no envía ni almacena datos: solo arma un mensaje de WhatsApp en tu
        dispositivo.
      </p>
      <p className="text-acero">
        No recabamos información personal en servidores propios. Si escribes por WhatsApp, el
        tratamiento de ese chat queda sujeto a las políticas de WhatsApp y de la conversación
        comercial. Los equipos, precios y datos de la empresa son ficticios.
      </p>
    </div>
  );
}

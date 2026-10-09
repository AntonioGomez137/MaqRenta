import { MessageCircle } from 'lucide-react';
import { construirEnlaceWhatsApp } from '@/lib/whatsapp';

export function WhatsAppFloat() {
  const href = construirEnlaceWhatsApp(
    'Hola, quiero información sobre la renta de maquinaria.',
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white outline-offset-2 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-carbon"
    >
      <MessageCircle aria-hidden size={28} />
    </a>
  );
}

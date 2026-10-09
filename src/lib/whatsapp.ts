import { WHATSAPP_NUMBER } from '@/config/site';

/** Arma el enlace de wa.me con el mensaje ya codificado. */
export function construirEnlaceWhatsApp(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

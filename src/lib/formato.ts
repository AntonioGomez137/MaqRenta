/** Formatea un precio diario en pesos mexicanos sin decimales. */
export function formatearPrecio(valor: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(valor);
}

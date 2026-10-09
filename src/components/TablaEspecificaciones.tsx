import type { Equipo } from '@/types/equipo';
import { CATEGORIA_NOMBRES } from '@/lib/equipos';

interface TablaEspecificacionesProps {
  equipo: Equipo;
}

export function TablaEspecificaciones({ equipo }: TablaEspecificacionesProps) {
  const filas = [
    ['Marca', equipo.marca],
    ['Categoría', CATEGORIA_NOMBRES[equipo.categoria]],
    ['Peso operativo', `${equipo.pesoOperativoKg.toLocaleString('es-MX')} kg`],
    ['Potencia', `${equipo.potenciaHp} hp`],
    ['Capacidad', equipo.capacidad],
    ['Año', String(equipo.anio)],
    ['Sucursal', equipo.sucursal],
    ['Disponibilidad', equipo.disponibilidad],
  ];

  return (
    <table className="w-full border-collapse text-left text-sm">
      <caption className="sr-only">Especificaciones de {equipo.nombre}</caption>
      <tbody>
        {filas.map(([label, valor]) => (
          <tr key={label} className="border-b border-niebla">
            <th scope="row" className="py-3 pr-4 font-medium text-acero">
              {label}
            </th>
            <td className="py-3 text-carbon">{valor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

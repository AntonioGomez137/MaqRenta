# Decisiones de implementación

Opciones simples tomadas donde el documento no detallaba el cómo.

- Next.js 15 (App Router) + React 19, TypeScript estricto y Tailwind CSS 3, porque el documento pide definir colores en `tailwind.config`.
- Se agregó `VistaCatalogo` (cliente) para sincronizar filtros con la URL sin librería de estado. El documento no lo nombra, pero es el contenedor de `BuscadorEquipos`, `FiltrosPanel` y las tarjetas.
- Se agregó `src/lib/filtros-url.ts` para armar y contar query params; ningún componente importa `src/data/equipos.ts`.
- El buscador de Inicio es un formulario que navega a `/equipos?q=`. En el catálogo actualiza `?q=` con 300 ms de espera.
- `orden=precio-asc` es el default y no se escribe en la URL hasta que el usuario cambia el orden, para no ensuciar el enlace.
- Las tres imágenes de la galería son el mismo marcador con el ícono en el centro, a la izquierda o a la derecha.
- El aviso de privacidad (CON-05, «Debería») quedó como casilla obligatoria.
- WhatsApp se abre con `window.open(..., 'noopener,noreferrer')` más el enlace de respaldo en la misma página.
- No hay `git` ni Node.js preinstalados en esta máquina; el proyecto espera `npm install` con Node 20+.

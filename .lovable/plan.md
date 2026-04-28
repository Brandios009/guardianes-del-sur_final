## Objetivo

Replicar fielmente el proyecto **Guardianes del Sur Digital** (repo: `Brandios009/guardianes-del-sur-digital`) en este proyecto, adaptando el código del stack antiguo (Vite + React Router DOM) al stack moderno de Lovable (TanStack Start, file-based routing). No requiere backend — es 100% frontend.

## Qué se va a portar

El proyecto es una **experiencia/juego interactivo** ambientado en el sur de Colombia, con dos mundos (Vital y Decadente), una mascota guía (Colibrí) y 4 "jefes" temáticos (Lajas, Cocha, Galeras, Juanambú).

### Pantallas / rutas
| Original (React Router) | Nueva ruta (TanStack) | Descripción |
|---|---|---|
| `/` → Loading | `/` (index) | Pantalla de carga inicial |
| Register | `/register` | Registro del jugador |
| Map | `/map` | Mapa principal de selección |
| Boss | `/boss/$bossId` | Pelea contra cada jefe |
| 404 | NotFound de TanStack | Página no encontrada |

### Componentes a portar
- `Colibri` — mascota guía animada
- `WorldToggle` — alternar entre mundo Vital y Decadente
- `ParticleCanvas` — fondo con partículas
- `HowToPlayModal` — modal de instrucciones
- `Notif` — sistema de notificaciones

### Estado global
- `src/store/game.ts` (Zustand) — progreso del jugador, mundo activo, jefes derrotados, etc.

### Assets a copiar (`src/assets/`)
- 4 imágenes de jefes (boss-cocha, boss-galeras, boss-juanambu, boss-lajas)
- 2 colibríes (vital, decadente)
- 2 paisajes (vital, decadente)
- Demonio
- Foto de Las Lajas

### Estilos
- Paleta y tokens de `tailwind.config.ts` original portados a `src/styles.css` (formato Tailwind v4 con `@theme`)
- `index.css` original integrado

## Pasos de implementación

1. **Limpiar placeholder** del `src/routes/index.tsx` actual.
2. **Copiar assets** del repo a `src/assets/` mediante descarga directa desde GitHub raw.
3. **Portar tokens de diseño** del `tailwind.config.ts` v3 al formato Tailwind v4 en `src/styles.css`.
4. **Crear el store Zustand** en `src/store/game.ts` (instalar `zustand`).
5. **Portar componentes** uno a uno (`Colibri`, `WorldToggle`, `ParticleCanvas`, `HowToPlayModal`, `Notif`) — el código React puro funciona sin cambios.
6. **Crear las rutas** en `src/routes/`:
   - `index.tsx` (LoadingScreen)
   - `register.tsx` (RegisterScreen)
   - `map.tsx` (MapScreen)
   - `boss.$bossId.tsx` (BossScreen, con param dinámico para los 4 jefes)
7. **Reemplazar navegación**: cambiar `useNavigate`/`Link` de `react-router-dom` por los equivalentes de `@tanstack/react-router`.
8. **Configurar metadatos `head()`** por ruta (título, og:title, og:description, og:image apuntando al paisaje correspondiente).
9. **Asegurar componentes con APIs del navegador** (canvas de partículas, audio si lo hay) usando `<ClientOnly>` o `useEffect` para evitar errores de SSR.
10. **Verificar shadcn/ui**: los componentes UI (button, dialog, etc.) ya están en este proyecto base; reusar los existentes en lugar de duplicarlos.

## Consideraciones técnicas

- **Sin backend**: no se activa Lovable Cloud. Todo el estado vive en el navegador (Zustand + localStorage si hace falta persistir progreso).
- **SSR-safe**: `ParticleCanvas` y cualquier acceso a `window`/`document` se envuelve en `<ClientOnly>` o `useEffect`.
- **Rutas dinámicas**: `boss.$bossId.tsx` usa `Route.useParams()` para cargar el jefe correcto (lajas | cocha | galeras | juanambu).
- **SEO por ruta**: cada pantalla tendrá su propio `head()` con título e imagen social específica.
- **Dependencias nuevas**: solo `zustand` (lo demás ya viene en el template moderno).

## Lo que NO se incluye

- No se importa el archivo `en progreso y ajustes tras lovablegit branch` (parece ser un archivo de notas accidental, no código).
- No se replica `vitest`/tests del original (a menos que lo pidas explícitamente después).
- No hay sincronización bidireccional con tu repo de GitHub — este es un proyecto Lovable nuevo e independiente. Si más adelante lo conectas a un nuevo repo en GitHub, será otro repositorio distinto al original.

## Resultado esperado

Al finalizar tendrás el sitio funcional en este proyecto, con la misma experiencia visual y de juego que `https://guardianes-del-sur-digital.lovable.app`, pero sobre el stack moderno (mejor SSR, SEO por ruta y soporte a futuro).

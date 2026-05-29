# Archivos para la intro (opcional)

Coloca estos archivos en la carpeta `site/` (junto a `index.html`).

## Opción recomendada: video

| Archivo | Descripción |
|---------|-------------|
| `intro.mp4` | Video corto (3–6 s), sin audio o mute. Formato H.264. |
| `intro.webm` | (Opcional) Misma intro en WebM para mejor carga en Chrome. |

**Recomendaciones:**
- Resolución: 1920×1080 o 1080×1080
- Peso: menos de 3 MB
- Contenido: logo, gorra en slow-mo, humo, ciudad de noche, etc.

## Opción imagen

| Archivo | Descripción |
|---------|-------------|
| `intro-poster.jpg` | Imagen fija para la intro (prioridad si no hay video) |
| `intro.jpg` | Alternativa con otro nombre |

**Recomendaciones:**
- JPG optimizado, menos de 400 KB
- Tono oscuro para que el logo “Galexx” se lea bien

## Si no agregas nada

La intro usa `images/hero-md.jpg` automáticamente.

## Imágenes del sitio

Las fotos grandes (`cap1.png`, etc.) ya tienen versiones optimizadas en `images/*-md.jpg`.
Si cambias fotos, vuelve a generar las versiones `-md` o reemplázalas manualmente (≈800px ancho, JPG 80% calidad).

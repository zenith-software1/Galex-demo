# Preview al compartir (WhatsApp, Instagram, etc.)

El sitio usa **`og-image.jpg`** (1200×630 px) para la miniatura al mandar el link.

- Archivo: `site/og-image.jpg` (también copia en `opengraph.jpg`)
- URL pública: `https://galexx-mx.myzenith.space/og-image.jpg`

Si quieres **tu propia imagen**, reemplaza `og-image.jpg` con:
- Tamaño: **1200 × 630** px (horizontal)
- Formato: JPG, menos de 500 KB
- Texto grande legible: GALEXX MX + “Gorras premium”

WhatsApp guarda caché: si no ves el cambio, prueba [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) y “Scrape Again”.

---

# Medios para la intro y productos

## Video de intro (recomendado)

Coloca en `site/` con el nombre **`intro.mp4`** (opcional: `intro.webm`).

### Qué tipo de video funciona mejor

| Estilo | Descripción |
|--------|-------------|
| **Hero producto** | Gorra en primer plano, fondo negro o desenfocado, luz lateral dorada/azul. 3–5 s. |
| **Slow motion** | Mano ajustando la gorra, gotas, humo suave, cámara lenta. Muy premium. |
| **Logo reveal** | Pantalla negra → flash del logo GALEXX → destello en la visera. |
| **Street / CDMX** | Plano corto calle de noche + corte a la gorra (sin mucho texto). |

### Especificaciones técnicas

- **Duración:** 3 a 6 segundos (máx. 8 s)
- **Formato:** MP4 (H.264), sin audio o mute
- **Resolución:** 1920×1080 (horizontal) o 1080×1920 (vertical, también sirve)
- **Peso:** menos de **3 MB** (ideal 1–2 MB)
- **Frame rate:** 24 o 30 fps
- **Look:** oscuro, alto contraste, colores fríos o dorados — combina con el sitio

### Cómo grabarlo o conseguirlo

- **Celular:** 4K → recortar a 1080p en CapCut / InShot → exportar “para web”
- **Stock gratis:** Pexels / Pixabay — busca `cap black slow motion`, `streetwear hat`, `smoke dark`
- **IA:** Runway / Pika — prompt: *"luxury black cap rotating, dark studio, gold rim light, cinematic"*

### Poster (opcional)

Si no hay video, usa **`intro-poster.jpg`** (una imagen fija, &lt; 400 KB, tono oscuro).

Si no subes nada, la intro usa `images/hero-md.jpg`.

---

## Fotos de productos (gorras)

Para la **tienda**, usa solo fotos donde se vea la gorra aislada:

| Archivo en `site/` | Uso |
|--------------------|-----|
| `cap1.png` | Gorra 1 (negra / Origen) |
| `cap2.png` | Gorra 2 (trucker / logo) |
| `cap3.png` | Gorra 3 (oliva / premium) |
| `hero.png` | Solo hero del home e intro (no mezclar con productos) |
| `lifestyle1.png`, `lifestyle2.png` | Solo lookbook (personas / calle) |

Después de cambiar PNGs, regenera las versiones web en `images/*-md.jpg` (≈800px, JPG 80%).

---

## Después de subir `intro.mp4`

1. Copia el archivo a `d:\galex\site\intro.mp4`
2. Avísanos — el sitio lo detecta solo en la intro (prioridad: `intro.webm` → `intro.mp4` → poster → hero).

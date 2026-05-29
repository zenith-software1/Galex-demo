# Galexx MX — Sitio estático

Sitio premium para gorras **Galexx MX**: intro cinematográfica, diseño liquid glass, tienda y carga optimizada.

## Vista local

Sirve la carpeta `site/` con cualquier servidor estático, o abre `index.html` (la intro con video requiere servidor).

```bash
npx serve site
```

## Intro personalizada

Ver [ASSETS.md](ASSETS.md) para agregar `intro.mp4`, `intro.webm` o `intro-poster.jpg`.

## Imágenes

- Originales: `*.png` en la raíz de `site/`
- Optimizadas para web: `images/*-md.jpg` (~40–110 KB)

## Deploy

GitHub Pages desde la raíz de `site/`. Dominio: `galexx-mx.myzenith.space` (`CNAME`).

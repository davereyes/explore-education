# `public/textures/`

Texturas planetarias para el renderer 3D (`Planet3DCanvas`).

## Fuente y licencia

Descargadas de **Solar System Scope**: <https://www.solarsystemscope.com/textures/>

**Licencia: Creative Commons Attribution 4.0 (CC BY 4.0)**.
Atribución requerida: "Solar Textures by Solar System Scope".

## Inventario

| Archivo                       | Uso                                         |
|-------------------------------|---------------------------------------------|
| `mercury.jpg`                 | Mercurio — diffuse                          |
| `venus_atmosphere.jpg`        | Venus — diffuse (capa de atmósfera)         |
| `earth_daymap.jpg`            | Tierra — diffuse (lado día)                 |
| `earth_clouds.jpg`            | Tierra — usado como `alphaMap` (no `map`) para que las nubes sean translúcidas y no oscurezcan la superficie. |
| `mars.jpg`                    | Marte — diffuse                             |
| `jupiter.jpg`                 | Júpiter — diffuse                           |
| `saturn.jpg`                  | Saturno — diffuse                           |
| `saturn_ring_alpha.png`       | Anillos de Saturno (textura con alpha)      |
| `uranus.jpg`                  | Urano — diffuse                             |
| `neptune.jpg`                 | Neptuno — diffuse                           |
| `moon.jpg`                    | Genérica para TODAS las lunas (Phobos, Deimos, Ío, etc.). Cada luna le aplica un `color tint` para diferenciarse. |
| `stars_milky_way.jpg`         | Disponible pero **no usada** por ahora — actualmente las estrellas son SVG inline en `ExplorerPage.css`. Para usar como skybox: importar y aplicar como background del scene. |

## Tamaño

Todas son **2K** (~2048×1024). Total ~5.5 MB. Resolución suficiente para el zoom máximo del Explorer; si en algún momento queremos más detalle, hay versiones 4K y 8K en la misma fuente.

## Si necesitas agregar un planeta nuevo

```bash
curl -sLf -o "<planet>.jpg" \
  "https://www.solarsystemscope.com/textures/download/2k_<planet>.jpg"
```

Luego en `src/data/planets.ts`, en el `render3D` del planeta, apuntar `textureUrl: '/textures/<planet>.jpg'`.

# AGENTS.md — Sitio web de Lic. Pablo Gago (Kinesiólogo y Fisiatra)

> Leé este archivo completo antes de cada tarea. Es la fuente de verdad del proyecto.
> Respondé siempre en **español (Argentina)**.

---

## 1. Objetivo

Programar el **rediseño completo** del sitio web de **Lic. Pablo Andrés Gago**, kinesiólogo y fisiatra (UBA) con más de 15 años de experiencia, consultorio en CABA.

- Sitio actual (a reemplazar): https://pablo-gago.vercel.app/
- El diseño ya está **cerrado y aprobado en Figma**, en escritorio y en celular. Tu trabajo es **traducirlo a código fielmente**, no rediseñarlo.
- Objetivo de negocio: que el visitante entienda rápido quién es Pablo y qué trata, confíe, y **reserve un turno por WhatsApp**.

---

## 2. Cómo trabajamos (reglas para el agente)

1. **Paso a paso.** Hacé solo lo que pide el prompt actual. No avances a la sección siguiente sin aprobación.
2. **Preguntá antes de instalar** cualquier cosa (Node, paquetes, extensiones, CLIs) o de borrar archivos.
3. **El diseño manda.** Antes de programar una sección, mirá sus imágenes en `design/escritorio/` y `design/celular/`. Si algo del texto de este archivo contradice la imagen, avisá y preguntá.
4. **No inventes contenido.** Usá los textos exactos de la sección 8. Si falta algo, dejá un `TODO` visible y avisá.
5. **No agregues** colores, fuentes, librerías ni secciones que no estén acá.
6. **Al terminar cada tarea**, respondé con: qué hiciste, qué archivos tocaste, cómo verlo (`npm run dev` + URL) y qué quedó pendiente.
7. Código simple y legible. Comentarios en español solo donde aportan.

---

## 3. Stack

- **Astro** (última versión estable), sitio estático, una sola página (`src/pages/index.astro`).
- **CSS propio** con variables (custom properties). Sin Tailwind salvo que se decida explícitamente.
- **JavaScript vanilla** dentro de `<script>` de cada componente para las animaciones. **Sin frameworks de UI** (React, Vue, etc.) y **sin librerías de animación** (GSAP, etc.).
- Deploy en **Vercel** (el sitio actual vive ahí).
- Gestor de paquetes: npm (salvo que el usuario indique otro).

### Estructura sugerida

```
/
├─ AGENTS.md
├─ design/
│  ├─ escritorio/        ← capturas de Figma 1280 px de ancho
│  └─ celular/           ← capturas de Figma 393 px de ancho
├─ docs/
│  └─ referencia-halden.md   ← spec técnica de la referencia de animaciones
├─ images/               ← fotos y logo exportados de Figma (origen, no borrar)
└─ src/
   ├─ assets/images/     ← copia de images/ para optimizar con astro:assets
   ├─ styles/
   │  └─ tokens.css      ← colores, tipografía, espaciados
   ├─ components/
   │  ├─ Navbar.astro
   │  ├─ Hero.astro
   │  ├─ Propuesta.astro
   │  ├─ SobreMi.astro
   │  ├─ Servicios.astro
   │  ├─ Testimonios.astro
   │  ├─ Consultorio.astro
   │  ├─ Ubicacion.astro
   │  ├─ Footer.astro
   │  └─ ui/Boton.astro  ← botón pastilla reutilizable
   ├─ layouts/Base.astro
   └─ pages/index.astro
```

### Imágenes de diseño (`design/`)

Una captura por sección, con estos nombres en ambas carpetas:

`01-hero.png` · `02-propuesta.png` · `03-sobre-mi.png` · `04-servicios.png` · `05-testimonios.png` · `06-consultorio.png` · `07-ubicacion.png` · `08-footer.png`

---

## 4. Colores (usar SIEMPRE estos tokens, nunca hex sueltos en los componentes)

```css
:root {
  --azul-noche: #102656;            /* textos, titulares, botones, fondos oscuros */
  --azul-marca: #2557A4;            /* reservado (azul de la marca original) */
  --celeste: #8FD3F4;               /* resplandor del hero, fondo de Propuesta */
  --azul-suave: #B4CBF0;            /* borde del resplandor del hero */
  --fondo-claro: #E8EDF6;           /* inicio del degradé de Testimonios */
  --blanco: #FFFFFF;
  --sombra: rgb(16 38 86 / 0.06);   /* sombra del navbar */
  --texto-secundario: rgb(16 38 86 / 0.72);  /* párrafos sobre fondo claro */
  --linea: rgb(16 38 86 / 0.14);    /* divisores sobre fondo claro */
  --texto-claro-secundario: rgb(255 255 255 / 0.55); /* texto secundario sobre fondo oscuro */
  --celeste-35: rgb(143 211 244 / 0.35); /* fin del degradé de Testimonios, inicio del de Consultorio */
}
```

- **Prohibido:** verdes, turquesas (como el `#2FE0D0` de la referencia) y lilas. La paleta es solo de azules + blanco.
- Sobre fondo oscuro, las líneas son blanco al 14–16 %.
- Elementos de Google Maps conservan sus colores originales.

---

## 5. Tipografía

- **Albert Sans** (Google Fonts), pesos 400 / 500 / 600. Fallback `system-ui, sans-serif`. `-webkit-font-smoothing: antialiased`.
- Titulares: **500 (Medium)**, `letter-spacing: -0.03em` a `-0.035em`, interlineado ~1.04–1.1.
- Cuerpo: **400**. Títulos chicos (columnas del footer): **600**.
- Albert Sans no tiene flechas (→ ↗): usar **íconos SVG**.

---

## 6. Medidas y reglas generales

- Diseño de escritorio a **1280 × 832** por pantalla (MacBook Air). Márgenes laterales **72 px** (excepciones abajo).
- Diseño de celular a **393 px** de ancho (iPhone 15/16). Márgenes laterales **24 px**. En celular una sección puede medir más que una pantalla.
- Hacerlo **fluido** (clamp, %, vw) entre 393 y 1440+; los valores en px de abajo son los del diseño a 1280 / 393.
- **Botones:** forma de pastilla. Botón principal = fondo azul noche, texto blanco, círculo blanco a la derecha con flecha (chevron) azul noche. Sobre fondo oscuro se invierte (pastilla blanca, texto azul noche, círculo azul noche, flecha blanca). Escritorio ≈ 206 × 58 (texto 16 px, círculo 46); celular 177 × 46 (texto 15, círculo 36).
- **Estado activo** (pestañas, indicadores): azul noche + texto blanco.
- **Voz:** primera persona, como si hablara Pablo, voseando al paciente.
- No hay contenido repetido entre secciones; textos cortos.

---

## 7. Animaciones (referencia: `docs/referencia-halden.md`)

La referencia de movimiento es la landing "Halden". Tomamos su **mecánica**, no sus colores, fuentes, textos ni imágenes.

1. **Resplandor del hero ("bowl glow"):** canvas chico (96×60) estirado a pantalla completa, redibujado con `requestAnimationFrame`. Núcleo `--celeste`, borde `--azul-suave`, afuera `--blanco`. Con el scroll se expande hasta llenar la pantalla de celeste = fondo de la sección Propuesta. Respiración lenta en reposo e intro desde el borde superior.
2. **Titular del hero:** se revela **letra por letra** al cargar (invisible → blanco desenfocado → azul → azul noche). La frase resaltada termina en **blanco**.
3. **Frase de Propuesta:** sección fija (sticky) que se revela **letra por letra con el scroll**; el final resaltado termina en blanco.
4. **Navbar:** fija. Al pasar el hero aparece el botón mini "Reservar turno" (punto → círculo → pastilla).
5. **Sobre mí:** el titular blanco se revela letra por letra con el scroll; las filas aparecen con un fade-up; la foto hace un leve zoom-out al entrar.
6. **Servicios:** acordeón (uno abierto a la vez, animación de alto, la flecha gira 180°).
7. **Testimonios:** escritorio = pestañas que cambian cita y autor con fundido; celular = carrusel con swipe (scroll-snap) y puntos clickeables.
8. **Consultorio:** leve zoom al pasar el mouse; lightbox al hacer clic (opcional).
9. Respetar `prefers-reduced-motion`: sin animaciones de scroll, todo visible.

---

## 8. Secciones y contenido (orden definitivo)

### 0. Navbar (solo visible desde el hero; en código queda fija)
- Pastilla blanca flotante con sombra suave. Izquierda: isotipo + "Pablo Gago". Centro: Servicios · Sobre mí · Consultorio · Testimonios · Ubicación (opacidad 85 %). Derecha: "Contacto" + botón mini "Reservar turno" (aparece al pasar el hero).
- Celular: pastilla con marca + ícono hamburguesa (2 líneas).

### 1. Hero — fondo blanco con resplandor celeste/azul suave desde arriba
- Titular (78 px; celular 44 px en 4 líneas): **"Kinesiología *a tu medida*, / de la lesión al alta"** ("a tu medida" en blanco).
- Bajada (19 px; celular 16): "Lic. Pablo Gago, Kinesiólogo y Fisiatra recibido de la Universidad de Buenos Aires."
- Estadísticas (grilla con línea superior y divisores verticales, `--linea`): **+15** años de experiencia · **7** especialidades · **1 a 1** atención personalizada. Números 44 px (celular 30), etiquetas 14 (celular 12, en 2 líneas). *(TODO: confirmar con Pablo.)*
- Botón "Reservar turno" (WhatsApp). Escritorio: abajo a la izquierda. Celular: debajo de las estadísticas.
- Foto de Pablo con brazos cruzados (PNG sin fondo) a la derecha, apoyada en el borde inferior.

### 2. Propuesta — fondo celeste plano
- Frase centrada (52 px; celular 31): "Evalúo tu caso, diseño tu plan, te trato en cada sesión, ajusto según tu evolución y te acompaño ***hasta que vuelvas a moverte sin dolor***" (final en blanco).

### 3. Sobre mí — bloque azul noche (59 % izq.) + foto a sangre (der.)
- Línea vertical fina a la izquierda y línea horizontal bajo el titular (blanco 16 %).
- Titular blanco (44 px; celular 34): **"Mi trabajo: que / vuelvas a moverte"**.
- Filas (etiqueta 17 px | párrafo 14 px; la primera frase en blanco 500, el resto en `--texto-claro-secundario`):
  - **Formación** — "**Licenciado en Kinesiología y Fisiatría** por la Universidad de Buenos Aires (UBA)."
  - **Mi enfoque** — "**Atención humana y basada en evidencia.** Diseño cada plan a medida de tu cuerpo y tus objetivos."
- Foto: Pablo atendiendo a una paciente. Celular: texto arriba, foto a lo ancho abajo.

### 4. Servicios — fondo blanco
- Titular centrado (56 px; celular 36): **"¿En qué te puedo ayudar?"**
- Acordeón **sin números, sin separadores, sin botón**. Escritorio 2 columnas (4 + 3); celular 1 columna. Nombre 24 px (celular 20) + chevron fino a la derecha; descripción 16 px (celular 15) en `--texto-secundario`.
- Orden y textos (*a validar con Pablo*):
  1. **Rehabilitación física** — Te ayudo a recuperar el movimiento y la función de tu cuerpo después de una lesión, una cirugía o un tiempo de inactividad, con ejercicios guiados y progresivos.
  2. **Fisioterapia** — Uso agentes físicos como ultrasonido, magnetoterapia y electroanalgesia para aliviar el dolor y acelerar la recuperación de los tejidos.
  3. **Kinesioterapia** — Trabajo con ejercicios terapéuticos para que recuperes movilidad, fuerza y control en tu día a día.
  4. **Rehabilitación deportiva** — Te acompaño desde la lesión hasta la vuelta al entrenamiento, con una readaptación específica para tu deporte.
  5. **Acupuntura** — Desde la medicina tradicional china, estimulo puntos específicos del cuerpo para aliviar el dolor de forma natural.
  6. **Taping neuromuscular** — Aplico un vendaje terapéutico que da soporte y estabilidad a músculos y articulaciones sin limitar tu movimiento.
  7. **Método 3 Escuadras** (**siempre último**) — Un método de reeducación postural con el que trabajo desequilibrios del cuerpo para aliviar dolores de espalda, cuello y articulaciones.

### 5. Testimonios — degradé `--fondo-claro` → `--celeste-35`
- Ícono de comillas (SVG azul noche), cita grande (44 px; celular 28), autor con avatar circular celeste con iniciales.
- Escritorio: 3 pestañas pastilla con borde punteado `--linea` (activa: fondo azul noche, texto blanco). Celular: carrusel + indicador (activo 28×8, inactivos 8×8 al 25 %).
- Testimonios (*TODO: confirmar que sean reales*):
  - **María G.** · Rehabilitación de rodilla — "Recuperé mi rodilla gracias a Pablo; muy profesional y claro en el seguimiento. Volví a correr en menos tiempo del esperado."
  - **Juan P.** · Paciente — "Excelente trato y resultados. El consultorio es impecable y la atención súper dedicada. Lo recomiendo al 100%."
  - **Sofía L.** · Método 3 Escuadras — "Llegué con un dolor lumbar crónico y con el método de las 3 escuadras mejoró muchísimo mi postura y calidad de vida."

### 6. Consultorio — galería **sin título**, a sangre — fondo degradé vertical `--celeste-35` (arriba) → `--celeste` (abajo)
- El fondo se ve en las juntas entre fotos y conecta con Testimonios (arriba) y Ubicación (abajo).
- Fotos de borde a borde, juntas de **2 px** (dejan ver el fondo), sin esquinas redondeadas.
- Escritorio: grande a la izquierda (gimnasio/espalderas) · centro 2 apiladas (camilla, sala de espera) · derecha vertical (camilla rosa). Celular: grande arriba · 2 lado a lado · 1 abajo.

### 7. Ubicación — degradé `--celeste` (arriba) → `--blanco` (abajo)
- Mapa grande en tarjeta (margen 12 px, radio 24; celular radio 20): **Google Maps embebido real** de C. Irigoyen 642, CABA, con etiqueta "Consultorio Pablo Gago".
- Izquierda: titular (44 px; celular 36) **"Te espero en / el consultorio"** + "Kinesiología y fisiatría en CABA".
- Derecha: "C. Irigoyen 642, CABA. Atiendo de lunes a viernes de 15:30 a 20:00, siempre con turno previo." + botón azul noche **"Ver en Google Maps"** con flecha diagonal (abre Maps en pestaña nueva).

### 8. Footer — azul noche a sangre
- Logo de Pablo grande decorativo a la derecha, opacidad ~7 %.
- Izquierda: isotipo + "Pablo Gago" + "Kinesiología y fisiatría a tu medida, de la lesión al alta. Consultorio en CABA." + botón "Reservar turno" invertido.
- Columnas (título 600 15 px blanco; ítems 15 px `--texto-claro-secundario`):
  - **Navegación:** Inicio, Sobre mí, Servicios, Testimonios, Consultorio, Ubicación (anclas).
  - **Contacto:** +54 11 5642-6701 · licpablogago@hotmail.com · C. Irigoyen 642, CABA.
  - **Horarios:** Lunes a viernes · 15:30 a 20:00 · Con turno previo.
- Divisoria blanca 14 % + "© 2026 Lic. Pablo Gago. Todos los derechos reservados." + íconos **WhatsApp (logo oficial) y Email** (sin Instagram).
- Celular: marca + botón arriba; grilla 2 columnas (Navegación | Horarios + Contacto); textos 14 px; logo decorativo arriba a la derecha.

---

## 9. Enlaces y datos

- **WhatsApp (todos los "Reservar turno"):** `https://wa.me/5491156426701?text=Hola%20Pablo%2C%20quisiera%20reservar%20un%20turno.`
- **Email:** `mailto:licpablogago@hotmail.com`
- **Dirección:** C. Irigoyen 642, CABA. Horario: lunes a viernes, 15:30 a 20:00, con turno.
- Idioma del sitio: `es-AR`. Agregar meta title/description y Open Graph.

---

## 10. Assets (carpeta `images/` en la raíz del proyecto, exportados de Figma por el usuario)

Son **todas** las imágenes que usa el diseño (las que no se usan fueron eliminadas):

| Archivo | Dónde se usa |
|---|---|
| `isotipo.png` | Logo de Pablo sin fondo: navbar, footer y logo decorativo grande del footer |
| `pablo-brazos-cruzados.png` | Hero (PNG transparente) |
| `pablo-atendiendo.jpg` | Sobre mí |
| `consultorio-gimnasio.jpg` | Consultorio, foto grande |
| `consultorio-camilla.jpg` | Consultorio |
| `consultorio-sala-espera.jpg` | Consultorio |
| `consultorio-camilla-rosa.jpg` | Consultorio |

- `images/` es la **carpeta de origen**: no la borres. Al crear el proyecto, copiá estos archivos a `src/assets/images/` y usalos con `astro:assets` (`<Image />`) para que se optimicen.
- El mapa NO es una imagen: es el embed real de Google Maps.
- Si falta alguno, usá un placeholder gris con el nombre del archivo y avisá.

---

## 11. Pendientes conocidos (no bloquean el código)

Estadísticas del hero, descripciones de servicios, testimonios reales, fotos reales (las de Pablo son generadas con IA para el diseño), crédito del sitio.

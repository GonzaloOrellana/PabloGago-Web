export type RGB = [number, number, number];
export type Letra = { el: HTMLSpanElement; resaltada: boolean };

export interface PaletaRevelado {
  fantasma: RGB;
  acento: RGB;
  final: RGB;
  resaltado: RGB;
}

// Parámetros compartidos entre Propuesta y Navbar (referencia Halden)
export const INICIO_REVELADO_PROPUESTA = 0.56;
export const RANGO_REVELADO_PROPUESTA = 2.03;
export const UMBRAL_NAV_PROPUESTA = 0.4;

export const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

export const smoothstep = (v: number): number => {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
};

export const progresoReveladoPropuesta = (q: number): number =>
  clamp01((q - INICIO_REVELADO_PROPUESTA) / RANGO_REVELADO_PROPUESTA);

// Lee un token de color de :root y lo normaliza a [r, g, b]
let normalizador: CanvasRenderingContext2D | null | undefined;
export function leerColor(token: string): RGB {
  const valor = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();
  if (normalizador === undefined) {
    normalizador = document.createElement("canvas").getContext("2d");
  }
  if (!normalizador || !valor) return [255, 255, 255];
  normalizador.fillStyle = "#000";
  normalizador.fillStyle = valor;
  const n = String(normalizador.fillStyle);
  if (n.startsWith("#")) {
    return [
      parseInt(n.slice(1, 3), 16),
      parseInt(n.slice(3, 5), 16),
      parseInt(n.slice(5, 7), 16),
    ];
  }
  const m = n.match(/[\d.]+/g) ?? ["255", "255", "255"];
  return [Number(m[0]), Number(m[1]), Number(m[2])];
}

// Parte un titular en spans por palabra (.palabra) y por carácter (.letra)
// conservando espacios y saltos de línea (<br>).
export function partirEnLetras(
  elemento: HTMLElement,
  claseResaltado: string,
): Letra[] {
  type Token =
    | { tipo: "letra"; c: string; resaltada: boolean }
    | { tipo: "espacio" }
    | { tipo: "br"; nodo: HTMLBRElement };
  const tokens: Token[] = [];

  const recorrer = (nodo: Node, resaltada: boolean) => {
    nodo.childNodes.forEach((hijo) => {
      if (hijo.nodeType === Node.TEXT_NODE) {
        for (const c of hijo.textContent ?? "") {
          tokens.push(
            /\s/.test(c)
              ? { tipo: "espacio" }
              : { tipo: "letra", c, resaltada },
          );
        }
      } else if (hijo instanceof HTMLBRElement) {
        tokens.push({ tipo: "br", nodo: hijo });
      } else if (hijo instanceof HTMLElement) {
        recorrer(hijo, resaltada || hijo.classList.contains(claseResaltado));
      }
    });
  };
  recorrer(elemento, false);

  const fragmento = document.createDocumentFragment();
  const letras: Letra[] = [];
  let palabra: HTMLSpanElement | null = null;
  let espacioPendiente = false;

  const volcarEspacio = () => {
    if (espacioPendiente && fragmento.childNodes.length) {
      fragmento.append(" ");
    }
    espacioPendiente = false;
  };

  for (const token of tokens) {
    if (token.tipo === "espacio") {
      palabra = null;
      espacioPendiente = true;
    } else if (token.tipo === "br") {
      volcarEspacio();
      palabra = null;
      fragmento.append(token.nodo);
    } else {
      if (!palabra) {
        volcarEspacio();
        palabra = document.createElement("span");
        palabra.className = "palabra";
        fragmento.append(palabra);
      }
      const span = document.createElement("span");
      span.className = "letra";
      span.setAttribute("aria-hidden", "true");
      span.textContent = token.c;
      palabra.append(span);
      letras.push({ el: span, resaltada: token.resaltada });
    }
  }

  elemento.replaceChildren(fragmento);
  return letras;
}

// Pinta cada letra según el progreso global p (0..1) y el spread.
// resplandorListo (0..1) permite retener las letras resaltadas en el color
// acento mientras el fondo celeste termina de llegar detrás (usado en el Hero).
export function pintarLetras(
  letras: Letra[],
  p: number,
  spread: number,
  paleta: PaletaRevelado,
  resplandorListo = 1,
): void {
  const n = letras.length;
  if (!n) return;

  for (let i = 0; i < n; i++) {
    const { el, resaltada } = letras[i];
    const t = clamp01((p * (1 + spread) - i / n) / spread);
    const destino = resaltada ? paleta.resaltado : paleta.final;
    let opacidad: number, desenfoque: number, a: RGB, b: RGB, k: number;

    if (t < 0.35) {
      const f = t / 0.35;
      opacidad = f;
      desenfoque = 8 + (1.5 - 8) * f;
      a = b = paleta.fantasma;
      k = 0;
    } else if (t < 0.7) {
      const f = (t - 0.35) / 0.35;
      opacidad = 1;
      desenfoque = 1.5 * (1 - f);
      a = paleta.fantasma;
      b = paleta.acento;
      k = f;
    } else {
      opacidad = 1;
      desenfoque = 0;
      a = paleta.acento;
      b = destino;
      const tramo = (t - 0.7) / 0.3;
      k = resaltada ? Math.min(tramo, resplandorListo) : tramo;
    }

    const r = Math.round(a[0] + (b[0] - a[0]) * k);
    const g = Math.round(a[1] + (b[1] - a[1]) * k);
    const bl = Math.round(a[2] + (b[2] - a[2]) * k);
    el.style.color = `rgba(${r}, ${g}, ${bl}, ${opacidad.toFixed(3)})`;
    el.style.filter =
      desenfoque > 0.01 ? `blur(${desenfoque.toFixed(2)}px)` : "";
  }
}

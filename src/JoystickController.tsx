import { useId } from "react";
import "./joystick.css";

export type JoystickView = "front" | "back";

type Hotspot = {
  id: string;
  label: string;
  /** Posición de la etiqueta dentro del lienzo de 260 × 380 */
  x: number;
  y: number;
  side: "left" | "right";
};

const frontHotspots: Hotspot[] = [
  { id: "RT", label: "Pulgar", x: 128, y: 6, side: "right" },
  { id: "A", label: "Dedo 1", x: 214, y: 132, side: "right" },
  { id: "B", label: "Dedo 2", x: 214, y: 192, side: "right" },
  { id: "X", label: "Dedo 3", x: 214, y: 252, side: "right" },
];

const backHotspots: Hotspot[] = [
  { id: "LT", label: "Trasero 1", x: 216, y: 136, side: "right" },
  { id: "Y", label: "Trasero 2", x: 216, y: 201, side: "right" },
  { id: "M1", label: "Trasero 3", x: 216, y: 266, side: "right" },
];

type Props = {
  /** "spin" gira solo entre ambas caras; "front"/"back" muestran una cara fija */
  mode?: "spin" | JoystickView;
  selected?: string;
  onSelect?: (id: string) => void;
  /** Muestra las etiquetas clicables de los botones */
  showHotspots?: boolean;
  className?: string;
};

export function JoystickController({
  mode = "spin",
  selected,
  onSelect,
  showHotspots = false,
  className = "",
}: Props) {
  const uid = useId().replace(/:/g, "");
  const interactive = Boolean(onSelect);
  const press = (id: string) => onSelect?.(id);
  const cls = (id: string, base: string) =>
    `${base} ${interactive ? "js-clickable" : ""} ${selected === id ? "js-selected" : ""}`;

  const hotspotLayer = (spots: Hotspot[]) =>
    showHotspots &&
    spots.map((spot) => (
      <button
        key={spot.id}
        type="button"
        className={`js-hotspot ${selected === spot.id ? "active" : ""}`}
        style={{ left: spot.x, top: spot.y }}
        onClick={() => press(spot.id)}
        aria-label={`Seleccionar ${spot.label} (${spot.id})`}
      >
        <b>{spot.id}</b>
        <small>{spot.label}</small>
      </button>
    ));

  return (
    <div className={`joystick-scene ${className}`}>
      <div className="joystick-shadow" />
      <div className="joystick-float">
        <div className={`joystick-turn js-mode-${mode}`}>
          {/* ---------- Vista frontal (3/4): pulgar arriba y tres botones de dedo ---------- */}
          <div className="joystick-face joystick-front">
            <svg viewBox="0 0 260 380" width="260" height="380" aria-hidden={!interactive}>
              <defs>
                <linearGradient id={`${uid}-jsBodyFront`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#2c2729" />
                  <stop offset="0.28" stopColor="#6f6769" />
                  <stop offset="0.5" stopColor="#5d5557" />
                  <stop offset="0.82" stopColor="#3e383a" />
                  <stop offset="1" stopColor="#2a2527" />
                </linearGradient>
                <linearGradient id={`${uid}-jsBodyShade`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.08" />
                  <stop offset="0.7" stopColor="#000000" stopOpacity="0" />
                  <stop offset="1" stopColor="#000000" stopOpacity="0.35" />
                </linearGradient>
                <radialGradient id={`${uid}-jsCap`} cx="0.4" cy="0.35" r="0.75">
                  <stop offset="0" stopColor="#8a8284" />
                  <stop offset="1" stopColor="#4a4446" />
                </radialGradient>
                <radialGradient id={`${uid}-jsRed`} cx="0.4" cy="0.3" r="0.8">
                  <stop offset="0" stopColor="#c4635a" />
                  <stop offset="1" stopColor="#7c3530" />
                </radialGradient>
                <linearGradient id={`${uid}-jsStem`} x1="0" x2="1">
                  <stop offset="0" stopColor="#9c9a9e" />
                  <stop offset="0.5" stopColor="#e4e2e6" />
                  <stop offset="1" stopColor="#77757a" />
                </linearGradient>
              </defs>

              {/* Botones de dedo (detrás del cuerpo, asoman por las ranuras) */}
              {[
                { id: "A", y: 145 },
                { id: "B", y: 205 },
                { id: "X", y: 265 },
              ].map((b, i) => (
                <g
                  key={b.id}
                  className={cls(b.id, `js-finger js-finger-${i}`)}
                  onClick={() => press(b.id)}
                >
                  <rect x="178" y={b.y - 13} width="22" height="26" rx="9" fill={`url(#${uid}-jsRed)`} />
                  <rect
                    x="192"
                    y={b.y - 9}
                    width="5"
                    height="12"
                    rx="2.5"
                    fill="#e08a80"
                    opacity="0.45"
                  />
                </g>
              ))}

              {/* Cuerpo ergonómico con ranuras para los dedos */}
              <path
                className="js-body"
                d="M55 72
                   C52 160 58 262 74 338
                   Q125 370 178 338
                   C186 320 197 308 197 295
                   C198 282 184 278 184 265
                   C184 252 198 248 198 235
                   C198 222 185 218 185 205
                   C185 192 199 188 199 175
                   C199 162 186 158 186 145
                   C186 132 200 128 198 112
                   C197 98 196 85 195 72 Z"
                fill={`url(#${uid}-jsBodyFront)`}
              />
              <path
                d="M55 72 C52 160 58 262 74 338 Q125 370 178 338 C186 320 197 308 197 295 C198 282 184 278 184 265 C184 252 198 248 198 235 C198 222 185 218 185 205 C185 192 199 188 199 175 C199 162 186 158 186 145 C186 132 200 128 198 112 C197 98 196 85 195 72 Z"
                fill={`url(#${uid}-jsBodyShade)`}
              />
              {/* Brillo lateral */}
              <path
                d="M78 95 C74 170 80 250 92 330"
                stroke="#ffffff"
                strokeOpacity="0.1"
                strokeWidth="9"
                fill="none"
                strokeLinecap="round"
              />
              {/* Línea de unión de la carcasa */}
              <path
                d="M150 98 C143 160 136 240 146 350"
                stroke="#1f1b1d"
                strokeWidth="1.6"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M151.5 98 C144.5 160 137.5 240 147.5 350"
                stroke="#ffffff"
                strokeOpacity="0.08"
                strokeWidth="1"
                fill="none"
              />
              {/* Hombro superior trasero */}
              <path
                d="M168 58 C186 52 204 62 206 80 C204 92 196 96 190 96"
                fill="#4d4648"
              />

              {/* Tapa superior */}
              <ellipse cx="125" cy="72" rx="70" ry="26" fill={`url(#${uid}-jsCap)`} />
              <ellipse cx="125" cy="74" rx="46" ry="16" fill="#151214" />
              <ellipse cx="125" cy="77" rx="38" ry="11" fill="#262123" />

              {/* Stick del pulgar */}
              <g className={cls("RT", "js-stick")} onClick={() => press("RT")}>
                <rect x="119" y="40" width="12" height="36" rx="5" fill={`url(#${uid}-jsStem)`} />
                <ellipse cx="125" cy="78" rx="14" ry="5" fill="#bdbbc0" opacity="0.6" />
                <ellipse cx="125" cy="40" rx="26" ry="10" fill="#6b2d29" />
                <ellipse cx="125" cy="36" rx="26" ry="10" fill={`url(#${uid}-jsRed)`} />
                <ellipse cx="118" cy="33" rx="10" ry="3.2" fill="#f0b3aa" opacity="0.35" />
              </g>
            </svg>
            {hotspotLayer(frontHotspots)}
          </div>

          {/* ---------- Vista trasera: tres sensores rojos y dos orificios ---------- */}
          <div className="joystick-face joystick-back">
            <svg viewBox="0 0 260 380" width="260" height="380" aria-hidden={!interactive}>
              <defs>
                <linearGradient id={`${uid}-jsBodyBack`} x1="0" x2="1">
                  <stop offset="0" stopColor="#262123" />
                  <stop offset="0.3" stopColor="#5e5658" />
                  <stop offset="0.55" stopColor="#6c6466" />
                  <stop offset="0.85" stopColor="#3b3537" />
                  <stop offset="1" stopColor="#221e20" />
                </linearGradient>
                <linearGradient id={`${uid}-jsPad`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#5f2a27" />
                  <stop offset="0.5" stopColor="#8a3c36" />
                  <stop offset="1" stopColor="#6a2e2a" />
                </linearGradient>
              </defs>

              <path
                d="M58 78
                   C54 150 60 260 76 336
                   Q130 372 184 336
                   C200 260 206 150 202 78
                   C196 30 64 30 58 78 Z"
                fill={`url(#${uid}-jsBodyBack)`}
              />
              {/* Reposa-pulgar abovedado */}
              <path d="M70 92 C76 40 184 40 190 92 Z" fill="#4a4345" />
              <ellipse cx="130" cy="74" rx="40" ry="15" fill="#2a2527" />
              <ellipse cx="130" cy="70" rx="34" ry="11" fill="#555" opacity="0.5" />
              <ellipse cx="130" cy="66" rx="24" ry="6" fill="#7b7375" opacity="0.6" />
              {/* Junta horizontal */}
              <path d="M62 100 Q130 116 198 100" stroke="#1b1719" strokeWidth="3" fill="none" />
              <path
                d="M62 104 Q130 120 198 104"
                stroke="#ffffff"
                strokeOpacity="0.1"
                strokeWidth="1.5"
                fill="none"
              />

              {/* Bandas y sensores */}
              {[
                { id: "LT", y: 152 },
                { id: "Y", y: 217 },
                { id: "M1", y: 282 },
              ].map((pad, i) => (
                <g key={pad.id}>
                  <path
                    d={`M64 ${pad.y - 34} Q130 ${pad.y - 22} 196 ${pad.y - 34}`}
                    stroke="#1a1618"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.85"
                  />
                  <path
                    d={`M64 ${pad.y - 30} Q130 ${pad.y - 18} 196 ${pad.y - 30}`}
                    stroke="#ffffff"
                    strokeOpacity="0.12"
                    strokeWidth="2"
                    fill="none"
                  />
                  <rect
                    x="80"
                    y={pad.y - 19}
                    width="100"
                    height="38"
                    rx="12"
                    fill="#1c181a"
                    opacity="0.8"
                  />
                  <g
                    className={cls(pad.id, `js-pad js-pad-${i}`)}
                    onClick={() => press(pad.id)}
                  >
                    <rect
                      x="86"
                      y={pad.y - 15}
                      width="88"
                      height="30"
                      rx="9"
                      fill={`url(#${uid}-jsPad)`}
                    />
                    <rect
                      className="js-pad-light"
                      x="86"
                      y={pad.y - 15}
                      width="88"
                      height="30"
                      rx="9"
                      fill="#ff8f80"
                    />
                  </g>
                </g>
              ))}

              {/* Orificios inferiores */}
              <ellipse cx="96" cy="338" rx="6" ry="5" fill="#141113" />
              <ellipse cx="164" cy="338" rx="6" ry="5" fill="#141113" />
              <ellipse cx="96" cy="337" rx="3" ry="2" fill="#000" />
              <ellipse cx="164" cy="337" rx="3" ry="2" fill="#000" />
            </svg>
            {hotspotLayer(backHotspots)}
          </div>
        </div>
      </div>
    </div>
  );
}

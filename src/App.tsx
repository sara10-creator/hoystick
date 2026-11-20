import { useEffect, useRef, useState } from "react";
import { JoystickController, type JoystickView } from "./JoystickController";

type IconName =
  | "grid"
  | "gamepad"
  | "layers"
  | "settings"
  | "bluetooth"
  | "battery"
  | "chevron"
  | "plus"
  | "more"
  | "check"
  | "sliders"
  | "power"
  | "mouse"
  | "sparkle"
  | "help"
  | "search"
  | "user"
  | "shield"
  | "bell"
  | "globe"
  | "lock"
  | "trash";

const paths: Record<IconName, React.ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  gamepad: (
    <>
      <path d="M6.5 8h11a4 4 0 0 1 3.8 5.2l-1.1 3.5a2.7 2.7 0 0 1-4.5 1.1L14 16h-4l-1.7 1.8a2.7 2.7 0 0 1-4.5-1.1l-1.1-3.5A4 4 0 0 1 6.5 8Z" />
      <path d="M7 12v4M5 14h4M16 12h.01M19 14h.01" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
    </>
  ),
  bluetooth: <path d="m7 7 10 10-5 4V3l5 4L7 17" />,
  battery: (
    <>
      <rect x="3" y="7" width="17" height="10" rx="2" />
      <path d="M22 11v2M6 10v4M9 10v4M12 10v4M15 10v4" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  sliders: (
    <>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </>
  ),
  power: (
    <>
      <path d="M12 2v10" />
      <path d="M18.4 6.6a9 9 0 1 1-12.8 0" />
    </>
  ),
  mouse: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="6" />
      <path d="M12 2v7M6 10h12" />
    </>
  ),
  sparkle: (
    <>
      <path d="m12 3 1.1 3.2a6 6 0 0 0 3.7 3.7L20 11l-3.2 1.1a6 6 0 0 0-3.7 3.7L12 19l-1.1-3.2a6 6 0 0 0-3.7-3.7L4 11l3.2-1.1a6 6 0 0 0 3.7-3.7L12 3Z" />
      <path d="m19 3 .3.8a2 2 0 0 0 1.2 1.2l.8.3-.8.3a2 2 0 0 0-1.2 1.2l-.3.8-.3-.8a2 2 0 0 0-1.2-1.2l-.8-.3.8-.3a2 2 0 0 0 1.2-1.2L19 3Z" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 9a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1.2.9-1.2 1.8M12 17h.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
};

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

type Profile = {
  id: number;
  name: string;
  game: string;
  color: string;
  active: boolean;
  bindings: { button: string; action: string }[];
  pressure: number;
  sensitivity: number;
  secondAction: string;
};

const profiles: Profile[] = [
  {
    id: 1,
    name: "Competitivo",
    game: "FPS · Precisión",
    color: "#7c5cff",
    active: true,
    bindings: [
      { button: "GS", action: "Disparar" },
      { button: "BS", action: "Apuntar" },
      { button: "T1", action: "Saltar" },
      { button: "T2", action: "Recargar" },
    ],
    pressure: 62,
    sensitivity: 74,
    secondAction: "Cuerpo a cuerpo · 86%",
  },
  {
    id: 2,
    name: "Aventura",
    game: "RPG · Exploración",
    color: "#20b7ff",
    active: false,
    bindings: [
      { button: "GS", action: "Atacar" },
      { button: "BS", action: "Defender" },
      { button: "T1", action: "Interactuar" },
      { button: "T3", action: "Inventario" },
    ],
    pressure: 48,
    sensitivity: 56,
    secondAction: "Ataque fuerte · 90%",
  },
  {
    id: 3,
    name: "Conducción",
    game: "Carreras · Progresivo",
    color: "#ff6f91",
    active: false,
    bindings: [
      { button: "GS", action: "Acelerar" },
      { button: "BS", action: "Frenar" },
      { button: "T1", action: "Freno de mano" },
      { button: "T3", action: "Cambiar cámara" },
    ],
    pressure: 34,
    sensitivity: 68,
    secondAction: "Nitro · 95%",
  },
];


function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-orb login-orb-one" />
      <div className="login-orb login-orb-two" />

      <section className="login-showcase">
        <div className="login-brand brand">
          <div className="brand-mark">
            <span />
          </div>
          <span>JOYSTICK</span>
        </div>

        <div className="showcase-copy">
          <p className="login-kicker">
            <span />
            CONTROL SIN LÍMITES
          </p>
          <h1>
            Juega a tu manera.
            <br />
            <em>Siempre.</em>
          </h1>
          <p>
            Personaliza cada botón, ajusta cada movimiento y guarda tus configuraciones favoritas en
            un solo lugar.
          </p>
        </div>

        <div className="login-controller" aria-hidden="true">
          <div className="login-controller-glow" />
          <JoystickController mode="spin" className="login-joystick" />
          <div className="floating-feature feature-one">
            <Icon name="sliders" size={16} />
            <span>
              <strong>Presión adaptable</strong>
              <small>Ajuste preciso</small>
            </span>
          </div>
          <div className="floating-feature feature-two">
            <Icon name="layers" size={16} />
            <span>
              <strong>Perfiles rápidos</strong>
              <small>Cambia al instante</small>
            </span>
          </div>
        </div>

        <div className="showcase-footer">
          <span>
            <Icon name="bluetooth" size={15} /> Conexión segura
          </span>
          <span>Compatible con Joystick</span>
        </div>
      </section>

      <section className="login-form-side">
        <div className="mobile-login-brand brand">
          <div className="brand-mark">
            <span />
          </div>
          <span>JOYSTICK</span>
        </div>
        <div className="login-form-wrap">
          <div className="login-title">
            <p className="eyebrow">BIENVENIDO DE NUEVO</p>
            <h2>Inicia sesión</h2>
            <span>Accede a tus perfiles y continúa donde lo dejaste.</span>
          </div>

          <form className="login-form" onSubmit={submit}>
            <label>
              Correo electrónico
              <span className="login-input">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
                </svg>
                <input
                  type="email"
                  placeholder="nombre@correo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                />
              </span>
            </label>

            <label>
              <span className="password-label">
                Contraseña
                <button type="button">¿Olvidaste tu contraseña?</button>
              </span>
              <span className="login-input">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="10" width="14" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={4}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </span>
            </label>

            <label className="remember-row">
              <input type="checkbox" defaultChecked />
              <span>
                <Icon name="check" size={12} />
              </span>
              Mantener mi sesión iniciada
            </label>

            <button className="login-submit" type="submit">
              Entrar a Joystick
              <Icon name="chevron" size={17} />
            </button>
          </form>

          <p className="signup-copy">
            ¿Aún no tienes una cuenta? <button type="button">Crear cuenta</button>
          </p>
          <p className="login-legal">
            Al continuar aceptas los <a href="#terms">Términos de uso</a> y la{" "}
            <a href="#privacy">Política de privacidad</a>.
          </p>
        </div>
      </section>
    </div>
  );
}

const configurableButtons = [
  { id: "GS", name: "Gatillo superior", defaultAction: "Disparar" },
  { id: "BS", name: "Botón superior", defaultAction: "Apuntar" },
  { id: "T1", name: "Botón trasero 1", defaultAction: "Saltar" },
  { id: "T2", name: "Botón trasero 2", defaultAction: "Recargar" },
  { id: "T3", name: "Botón trasero 3", defaultAction: "Cambiar arma" },
  { id: "MS", name: "Sensor tipo mouse", defaultAction: "Mover cámara" },
];

const actionOptions = [
  "Disparar",
  "Apuntar",
  "Saltar",
  "Agacharse",
  "Recargar",
  "Cambiar arma",
  "Cuerpo a cuerpo",
  "Abrir inventario",
];

type PressureLevel = {
  depth: number;
  action: string;
};

function PressureLevelModal({
  initialLevel,
  triggerName,
  onClose,
  onSave,
}: {
  initialLevel?: PressureLevel;
  triggerName: string;
  onClose: () => void;
  onSave: (level: PressureLevel) => void;
}) {
  const [depth, setDepth] = useState(initialLevel?.depth ?? 85);
  const [levelAction, setLevelAction] = useState(initialLevel?.action ?? "Recargar");

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="pressure-modal-backdrop" onMouseDown={onClose}>
      <section
        className="pressure-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pressure-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="pressure-modal-header">
          <span className="pressure-modal-icon">
            <Icon name="layers" size={20} />
          </span>
          <div>
            <p className="eyebrow">GATILLO ADAPTATIVO</p>
            <h2 id="pressure-modal-title">
              {initialLevel ? "Editar nivel de presión" : "Añadir nivel de presión"}
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar ventana">
            ×
          </button>
        </header>

        <div className="pressure-modal-body">
          <p className="pressure-modal-intro">
            Define la profundidad en la que <strong>{triggerName}</strong> activará una acción
            adicional.
          </p>

          <div className="trigger-depth-preview" aria-hidden="true">
            <div className="depth-track">
              <span className="depth-progress" style={{ width: `${depth}%` }} />
              <i style={{ left: `${depth}%` }} />
            </div>
            <div className="depth-preview-labels">
              <span>Reposo</span>
              <strong>{depth}% de profundidad</strong>
              <span>Fondo</span>
            </div>
          </div>

          <label className="pressure-modal-field">
            <span>
              Profundidad de activación
              <output>{depth}%</output>
            </span>
            <input
              aria-label="Profundidad de activación"
              type="range"
              min="10"
              max="100"
              value={depth}
              onChange={(event) => setDepth(Number(event.target.value))}
              style={{ "--range": `${depth}%` } as React.CSSProperties}
            />
            <small>La acción se ejecutará al alcanzar este punto del recorrido.</small>
          </label>

          <label className="pressure-modal-field">
            <span>Acción para este nivel</span>
            <div className="select-wrap">
              <Icon name="gamepad" size={18} />
              <select
                autoFocus
                value={levelAction}
                onChange={(event) => setLevelAction(event.target.value)}
              >
                {actionOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <Icon name="chevron" size={16} />
            </div>
            <small>Esta acción complementa la asignación principal del gatillo.</small>
          </label>
        </div>

        <footer className="pressure-modal-footer">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" onClick={() => onSave({ depth, action: levelAction })}>
            <Icon name="check" size={16} />
            {initialLevel ? "Guardar cambios" : "Añadir nivel"}
          </button>
        </footer>
      </section>
    </div>
  );
}

function ProfileCreator({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: (name: string) => void;
}) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("GS");
  const [action, setAction] = useState("Disparar");
  const [secondAction, setSecondAction] = useState("Sin asignar");
  const [enabled, setEnabled] = useState(true);
  const [pressure, setPressure] = useState(62);
  const [sensitivity, setSensitivity] = useState(74);
  const [feedback, setFeedback] = useState(true);
  const [error, setError] = useState(false);

  const currentButton = configurableButtons.find((button) => button.id === selected)!;

  const chooseButton = (id: string) => {
    const button = configurableButtons.find((item) => item.id === id)!;
    setSelected(id);
    setAction(button.defaultAction);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    onSave(name.trim());
  };

  return (
    <form className="creator-page" onSubmit={submit}>
      <header className="creator-topbar">
        <div className="brand">
          <div className="brand-mark">
            <span />
          </div>
          <span>JOYSTICK</span>
        </div>
        <div className="creator-progress">
          <span className="complete">
            <i>
              <Icon name="check" size={11} />
            </i>
            Perfil
          </span>
          <b />
          <span className="active">
            <i>2</i>
            Configuración
          </span>
          <b />
          <span>
            <i>3</i>
            Confirmar
          </span>
        </div>
        <button className="creator-close" type="button" onClick={onBack} aria-label="Cerrar">
          ×
        </button>
      </header>

      <main className="creator-main">
        <div className="creator-heading">
          <button type="button" onClick={onBack}>
            <Icon name="chevron" size={17} />
          </button>
          <div>
            <p className="eyebrow">NUEVA CONFIGURACIÓN</p>
            <h1>Crea tu perfil de juego</h1>
            <span>Personaliza cada entrada y guarda una configuración adaptada a ti.</span>
          </div>
        </div>

        <section className="creator-name-card">
          <div className="creator-section-icon">
            <Icon name="layers" size={20} />
          </div>
          <div>
            <h2>Nombre de la configuración</h2>
            <p>Elige un nombre fácil de reconocer cuando cambies de perfil.</p>
          </div>
          <label className={error ? "error" : ""}>
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError(false);
              }}
              placeholder="Ej. Competitivo FPS"
              maxLength={28}
              autoFocus
            />
            <small>{error ? "Escribe un nombre para continuar" : `${name.length}/28`}</small>
          </label>
        </section>

        <section className="creator-workspace">
          <aside className="available-buttons">
            <div className="creator-panel-title">
              <div>
                <p className="eyebrow">ENTRADAS</p>
                <h2>Botones disponibles</h2>
              </div>
              <span>{configurableButtons.length}</span>
            </div>
            <p className="creator-panel-help">
              Selecciona un botón para asignar su comportamiento.
            </p>
            <div className="button-list">
              {configurableButtons.map((button) => (
                <button
                  type="button"
                  key={button.id}
                  className={selected === button.id ? "active" : ""}
                  onClick={() => chooseButton(button.id)}
                >
                  <span className="button-key">{button.id}</span>
                  <span>
                    <strong>{button.name}</strong>
                    <small>{button.defaultAction}</small>
                  </span>
                  {selected === button.id && <Icon name="chevron" size={15} />}
                </button>
              ))}
            </div>
          </aside>

          <div className="creator-settings">
            <div className="creator-settings-header">
              <div className="selected-key">{selected}</div>
              <div>
                <p>CONFIGURANDO</p>
                <h2>{currentButton.name}</h2>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(event) => setEnabled(event.target.checked)}
                />
                <span />
              </label>
            </div>

            <div className={`creator-settings-content ${!enabled ? "disabled-settings" : ""}`}>
              <div className="creator-setting-card assignment-card">
                <div className="setting-card-heading">
                  <span className="setting-symbol">
                    <Icon name="gamepad" size={18} />
                  </span>
                  <div>
                    <h3>Asignar botón</h3>
                    <p>Define la acción principal de esta entrada.</p>
                  </div>
                </div>
                <div className="select-wrap">
                  <select
                    value={action}
                    disabled={!enabled}
                    onChange={(event) => setAction(event.target.value)}
                  >
                    <option>Disparar</option>
                    <option>Apuntar</option>
                    <option>Saltar</option>
                    <option>Agacharse</option>
                    <option>Recargar</option>
                    <option>Cambiar arma</option>
                    <option>Mover cámara</option>
                    <option>Sin asignar</option>
                  </select>
                  <Icon name="chevron" size={16} />
                </div>
              </div>

              <div className="creator-setting-card">
                <div className="setting-card-heading compact">
                  <span className="setting-symbol">
                    <Icon name="sliders" size={18} />
                  </span>
                  <div>
                    <h3>Nivel de presión</h3>
                    <p>Presión necesaria para activar la acción.</p>
                  </div>
                  <output>{pressure}%</output>
                </div>
                <input
                  aria-label="Nivel de presión"
                  type="range"
                  min="5"
                  max="100"
                  value={pressure}
                  disabled={!enabled}
                  onChange={(event) => setPressure(Number(event.target.value))}
                  style={{ "--range": `${pressure}%` } as React.CSSProperties}
                />
                <div className="range-labels">
                  <span>Suave</span>
                  <span>Firme</span>
                </div>
              </div>

              <div className="creator-setting-card">
                <div className="setting-card-heading compact">
                  <span className="setting-symbol">
                    <Icon name="mouse" size={18} />
                  </span>
                  <div>
                    <h3>Sensibilidad del sensor</h3>
                    <p>Respuesta del movimiento tipo mouse.</p>
                  </div>
                  <output>{sensitivity}%</output>
                </div>
                <input
                  aria-label="Sensibilidad"
                  type="range"
                  min="0"
                  max="100"
                  value={sensitivity}
                  disabled={!enabled}
                  onChange={(event) => setSensitivity(Number(event.target.value))}
                  style={{ "--range": `${sensitivity}%` } as React.CSSProperties}
                />
                <div className="range-labels">
                  <span>Preciso</span>
                  <span>Rápido</span>
                </div>
              </div>

              <div className="creator-setting-card second-action-card">
                <div className="setting-card-heading">
                  <span className="setting-symbol">
                    <Icon name="layers" size={18} />
                  </span>
                  <div>
                    <h3>Acción de segundo nivel</h3>
                    <p>Al presionar el botón por completo.</p>
                  </div>
                </div>
                <div className="select-wrap">
                  <select
                    value={secondAction}
                    disabled={!enabled}
                    onChange={(event) => setSecondAction(event.target.value)}
                  >
                    <option>Sin asignar</option>
                    <option>Recargar</option>
                    <option>Cambiar arma</option>
                    <option>Cuerpo a cuerpo</option>
                    <option>Abrir inventario</option>
                  </select>
                  <Icon name="chevron" size={16} />
                </div>
              </div>

              <div className="creator-setting-card feedback-card">
                <div className="setting-card-heading">
                  <span className="setting-symbol">
                    <Icon name="sparkle" size={18} />
                  </span>
                  <div>
                    <h3>Respuesta háptica</h3>
                    <p>Vibración al reconocer la acción.</p>
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={feedback}
                    disabled={!enabled}
                    onChange={(event) => setFeedback(event.target.checked)}
                  />
                  <span />
                </label>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="creator-footer">
        <div>
          <Icon name="check" size={15} />
          <span>
            <strong>Progreso guardado automáticamente</strong>
            <small>Puedes volver y continuar después.</small>
          </span>
        </div>
        <span className="creator-footer-actions">
          <button type="button" onClick={onBack}>
            Cancelar
          </button>
          <button type="submit">
            <Icon name="layers" size={16} />
            Guardar configuración
          </button>
        </span>
      </footer>
    </form>
  );
}

function SettingsToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="settings-toggle-row">
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <span className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span />
      </span>
    </label>
  );
}

function ProfilesPage({
  profiles,
  activeProfile,
  onActivate,
  onCreate,
  onDelete,
}: {
  profiles: Profile[];
  activeProfile: number;
  onActivate: (id: number) => void;
  onCreate: () => void;
  onDelete: (id: number) => void;
}) {
  const [pendingDelete, setPendingDelete] = useState<Profile | null>(null);

  return (
    <section className="profiles-page">
      <header className="profiles-page-heading">
        <div>
          <p className="eyebrow">BIBLIOTECA DE CONFIGURACIONES</p>
          <h1>Perfiles</h1>
          <span>Consulta, activa y administra las configuraciones de tu control.</span>
        </div>
        <button type="button" onClick={onCreate}>
          <Icon name="plus" size={16} />
          Nuevo perfil
        </button>
      </header>

      <div className="profiles-overview">
        <span>
          <strong>{profiles.length}</strong>
          <small>Perfiles guardados</small>
        </span>
        <span>
          <strong>{profiles.find((profile) => profile.id === activeProfile)?.name}</strong>
          <small>Perfil activo</small>
        </span>
        <span>
          <strong>{profiles.reduce((total, profile) => total + profile.bindings.length, 0)}</strong>
          <small>Acciones asignadas</small>
        </span>
      </div>

      <div className="profile-config-list">
        {profiles.map((profile) => {
          const isActive = activeProfile === profile.id;
          return (
            <article className={`profile-config-card ${isActive ? "active" : ""}`} key={profile.id}>
              <span className="profile-config-accent" style={{ background: profile.color }} />
              <header>
                <span
                  className="profile-config-icon"
                  style={{ color: profile.color, background: `${profile.color}18` }}
                >
                  <Icon name={profile.id === 3 ? "sliders" : "gamepad"} size={21} />
                </span>
                <div>
                  <span className="profile-name-row">
                    <h2>{profile.name}</h2>
                    {isActive && (
                      <i>
                        <Icon name="check" size={11} /> Activo
                      </i>
                    )}
                  </span>
                  <p>{profile.game}</p>
                </div>
                <button
                  className="delete-profile-button"
                  type="button"
                  disabled={profiles.length === 1}
                  onClick={() => setPendingDelete(profile)}
                  aria-label={`Eliminar perfil ${profile.name}`}
                >
                  <Icon name="trash" size={16} />
                </button>
              </header>

              <div className="profile-config-content">
                <div className="profile-bindings">
                  <span className="profile-config-label">ASIGNACIÓN DE BOTONES</span>
                  <div>
                    {profile.bindings.map((binding) => (
                      <span className="binding-chip" key={binding.button}>
                        <b>{binding.button}</b>
                        <span>{binding.action}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="profile-values">
                  <div>
                    <span className="profile-value-icon">
                      <Icon name="sliders" size={16} />
                    </span>
                    <span>
                      <small>Presión del gatillo</small>
                      <strong>{profile.pressure}%</strong>
                    </span>
                    <i>
                      <b style={{ width: `${profile.pressure}%` }} />
                    </i>
                  </div>
                  <div>
                    <span className="profile-value-icon blue">
                      <Icon name="mouse" size={16} />
                    </span>
                    <span>
                      <small>Sensibilidad</small>
                      <strong>{profile.sensitivity}%</strong>
                    </span>
                    <i>
                      <b style={{ width: `${profile.sensitivity}%` }} />
                    </i>
                  </div>
                  <div>
                    <span className="profile-value-icon pink">
                      <Icon name="layers" size={16} />
                    </span>
                    <span>
                      <small>Segundo nivel</small>
                      <strong>{profile.secondAction}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <footer>
                <span>
                  <Icon name="check" size={13} />
                  Configuración sincronizada
                </span>
                {!isActive && (
                  <button type="button" onClick={() => onActivate(profile.id)}>
                    Activar perfil
                  </button>
                )}
              </footer>
            </article>
          );
        })}

        <button className="profile-create-card" type="button" onClick={onCreate}>
          <span>
            <Icon name="plus" size={21} />
          </span>
          <strong>Crear un perfil nuevo</strong>
          <small>Personaliza botones, presión, sensibilidad y acciones avanzadas.</small>
        </button>
      </div>

      {pendingDelete && (
        <div className="profile-delete-backdrop" onMouseDown={() => setPendingDelete(null)}>
          <section
            className="profile-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-profile-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <span className="delete-modal-icon">
              <Icon name="trash" size={21} />
            </span>
            <h2 id="delete-profile-title">¿Eliminar “{pendingDelete.name}”?</h2>
            <p>
              Se perderán sus asignaciones y niveles de presión. Esta acción no se puede deshacer.
            </p>
            <div>
              <button type="button" onClick={() => setPendingDelete(null)}>
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  onDelete(pendingDelete.id);
                  setPendingDelete(null);
                }}
              >
                <Icon name="trash" size={14} />
                Eliminar perfil
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

function MyControllerPage({
  linked,
  onLinkedChange,
}: {
  linked: boolean;
  onLinkedChange: (linked: boolean) => void;
}) {
  const [statusMessage, setStatusMessage] = useState("");

  const toggleConnection = () => {
    const nextLinked = !linked;
    onLinkedChange(nextLinked);
    setStatusMessage(
      nextLinked ? "Control vinculado correctamente" : "Control desvinculado de esta cuenta",
    );
    window.setTimeout(() => setStatusMessage(""), 2400);
  };

  return (
    <section className="my-controller-page">
      <header className="controller-page-heading">
        <div>
          <p className="eyebrow">DISPOSITIVOS</p>
          <h1>Mi control</h1>
          <span>Consulta el estado y administra tu Joystick.</span>
        </div>
        <span className={`connection-badge ${linked ? "connected" : ""}`}>
          <i />
          {linked ? "Conectado" : "Sin vincular"}
        </span>
      </header>

      <div className={`device-hero ${!linked ? "unlinked" : ""}`}>
        <div className="device-hero-glow" />
        <div className="device-battery">
          <span className="battery-icon-large">
            <i style={{ width: linked ? "84%" : "0%" }} />
          </span>
          <div>
            <strong>{linked ? "84%" : "—"}</strong>
            <small>{linked ? "Batería disponible" : "Sin información de batería"}</small>
          </div>
        </div>

        <div className="device-controller-wrap" aria-hidden="true">
          <div className="device-signal signal-left" />
          <div className="device-signal signal-right" />
          <JoystickController mode="spin" className="device-controller device-joystick" />
        </div>

        <div className="device-identity">
          <span className="device-logo-mark">
            <Icon name="gamepad" size={19} />
          </span>
          <div>
            <p>NOMBRE DEL DISPOSITIVO</p>
            <h2>{linked ? "Joystick" : "Ningún control vinculado"}</h2>
            <span>
              {linked ? "Modelo JS-1 · Control adaptativo" : "Vincula un control para comenzar"}
            </span>
          </div>
        </div>
      </div>

      <div className="device-details-grid">
        <article className="device-info-card">
          <span className="device-info-icon">
            <Icon name="bluetooth" size={18} />
          </span>
          <div>
            <small>CONEXIÓN</small>
            <strong>{linked ? "Bluetooth 5.2" : "No disponible"}</strong>
            <p>{linked ? "Señal estable" : "Esperando un dispositivo"}</p>
          </div>
        </article>
        <article className="device-info-card">
          <span className="device-info-icon violet">
            <Icon name="settings" size={18} />
          </span>
          <div>
            <small>FIRMWARE</small>
            <strong>{linked ? "JOYSTICK OS 2.4.1" : "No disponible"}</strong>
            <p>{linked ? "Software actualizado" : "Se mostrará al vincular"}</p>
          </div>
        </article>
        <article className="device-link-card">
          <div>
            <span className={`link-status-icon ${linked ? "linked" : ""}`}>
              <Icon name={linked ? "check" : "bluetooth"} size={19} />
            </span>
            <span>
              <strong>
                {linked ? "Control vinculado a tu cuenta" : "Vincula tu Joystick"}
              </strong>
              <small>
                {linked
                  ? "Tus perfiles se sincronizan automáticamente."
                  : "Activa Bluetooth y mantén pulsado el botón de encendido."}
              </small>
            </span>
          </div>
          <button className={linked ? "unlink" : ""} type="button" onClick={toggleConnection}>
            <Icon name={linked ? "power" : "bluetooth"} size={16} />
            {linked ? "Desvincular" : "Vincular control"}
          </button>
        </article>
      </div>

      {statusMessage && (
        <div className="device-status-toast" role="status">
          <Icon name="check" size={15} />
          {statusMessage}
        </div>
      )}
    </section>
  );
}

function SettingsPage({ onLogout }: { onLogout: () => void }) {
  const [fullName, setFullName] = useState("Martín Silva");
  const [email, setEmail] = useState("martin@email.com");
  const [language, setLanguage] = useState("Español");
  const [startView, setStartView] = useState("Último perfil usado");
  const [autoSync, setAutoSync] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [largeControls, setLargeControls] = useState(false);
  const [profileAlerts, setProfileAlerts] = useState(true);
  const [batteryAlerts, setBatteryAlerts] = useState(true);
  const [productNews, setProductNews] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const saveSettings = (event: React.FormEvent) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const savePassword = () => {
    setCurrentPassword("");
    setNewPassword("");
    setPasswordOpen(false);
    setPasswordSaved(true);
    window.setTimeout(() => setPasswordSaved(false), 2200);
  };

  return (
    <form className="settings-page" onSubmit={saveSettings}>
      <header className="settings-heading">
        <div>
          <p className="eyebrow">PREFERENCIAS DE JOYSTICK</p>
          <h1>Ajustes</h1>
          <span>Administra tu cuenta y personaliza tu experiencia.</span>
        </div>
        <button className={saved ? "settings-save saved" : "settings-save"} type="submit">
          <Icon name={saved ? "check" : "settings"} size={16} />
          {saved ? "Cambios guardados" : "Guardar cambios"}
        </button>
      </header>

      <section className="settings-account-card">
        <div className="settings-card-title">
          <span className="settings-section-icon">
            <Icon name="user" size={19} />
          </span>
          <div>
            <h2>Información de la cuenta</h2>
            <p>Datos personales asociados a tu cuenta de Joystick.</p>
          </div>
        </div>
        <div className="account-fields">
          <div className="account-avatar">
            <span>MS</span>
            <i />
          </div>
          <label>
            Nombre completo
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </label>
          <label>
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
        </div>
      </section>

      <div className="settings-grid">
        <section className="settings-card">
          <div className="settings-card-title">
            <span className="settings-section-icon blue">
              <Icon name="globe" size={19} />
            </span>
            <div>
              <h2>Preferencias generales</h2>
              <p>Idioma y comportamiento de inicio.</p>
            </div>
          </div>
          <div className="settings-selects">
            <label>
              Idioma
              <div className="select-wrap">
                <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                  <option>Español</option>
                  <option>English</option>
                  <option>Português</option>
                </select>
                <Icon name="chevron" size={15} />
              </div>
            </label>
            <label>
              Pantalla al iniciar
              <div className="select-wrap">
                <select value={startView} onChange={(event) => setStartView(event.target.value)}>
                  <option>Último perfil usado</option>
                  <option>Panel principal</option>
                  <option>Mi control</option>
                </select>
                <Icon name="chevron" size={15} />
              </div>
            </label>
          </div>
          <SettingsToggle
            title="Sincronización automática"
            description="Guarda los cambios en tu control al instante."
            checked={autoSync}
            onChange={setAutoSync}
          />
        </section>

        <section className="settings-card">
          <div className="settings-card-title">
            <span className="settings-section-icon">
              <Icon name="gamepad" size={19} />
            </span>
            <div>
              <h2>Control y accesibilidad</h2>
              <p>Adapta la respuesta de la interfaz.</p>
            </div>
          </div>
          <div className="settings-toggle-list">
            <SettingsToggle
              title="Respuesta háptica"
              description="Vibra al confirmar acciones en el control."
              checked={haptics}
              onChange={setHaptics}
            />
            <SettingsToggle
              title="Controles ampliados"
              description="Aumenta el tamaño de botones y áreas táctiles."
              checked={largeControls}
              onChange={setLargeControls}
            />
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-title">
            <span className="settings-section-icon pink">
              <Icon name="bell" size={19} />
            </span>
            <div>
              <h2>Notificaciones</h2>
              <p>Elige qué avisos quieres recibir.</p>
            </div>
          </div>
          <div className="settings-toggle-list">
            <SettingsToggle
              title="Cambios en perfiles"
              description="Avisar cuando un perfil termine de sincronizarse."
              checked={profileAlerts}
              onChange={setProfileAlerts}
            />
            <SettingsToggle
              title="Batería del control"
              description="Notificar cuando la batería sea inferior al 20%."
              checked={batteryAlerts}
              onChange={setBatteryAlerts}
            />
            <SettingsToggle
              title="Novedades de Joystick"
              description="Recibir noticias sobre funciones y mejoras."
              checked={productNews}
              onChange={setProductNews}
            />
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-title">
            <span className="settings-section-icon green">
              <Icon name="shield" size={19} />
            </span>
            <div>
              <h2>Privacidad</h2>
              <p>Controla cómo se utilizan tus datos.</p>
            </div>
          </div>
          <div className="settings-toggle-list">
            <SettingsToggle
              title="Datos de diagnóstico"
              description="Ayuda a mejorar Joystick con datos de uso anónimos."
              checked={analytics}
              onChange={setAnalytics}
            />
            <SettingsToggle
              title="Mostrar estado en línea"
              description="Permite que otros dispositivos vean tu actividad."
              checked={onlineStatus}
              onChange={setOnlineStatus}
            />
          </div>
        </section>

        <section className="settings-card settings-security-card">
          <div className="settings-card-title">
            <span className="settings-section-icon amber">
              <Icon name="lock" size={19} />
            </span>
            <div>
              <h2>Seguridad y acceso</h2>
              <p>Protege tu cuenta y sesiones activas.</p>
            </div>
            {passwordSaved && (
              <span className="security-success">
                <Icon name="check" size={12} /> Contraseña actualizada
              </span>
            )}
          </div>
          <SettingsToggle
            title="Verificación en dos pasos"
            description="Añade una capa de seguridad al iniciar sesión."
            checked={twoFactor}
            onChange={setTwoFactor}
          />
          <button
            className="password-button"
            type="button"
            onClick={() => setPasswordOpen(!passwordOpen)}
          >
            <span>
              <Icon name="lock" size={16} />
              Cambiar contraseña
            </span>
            <Icon name="chevron" size={15} className={passwordOpen ? "rotate" : ""} />
          </button>
          {passwordOpen && (
            <div className="password-panel">
              <label>
                Contraseña actual
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  minLength={4}
                />
              </label>
              <label>
                Nueva contraseña
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  minLength={8}
                />
              </label>
              <button
                type="button"
                disabled={currentPassword.length < 4 || newPassword.length < 8}
                onClick={savePassword}
              >
                Actualizar contraseña
              </button>
            </div>
          )}
        </section>

        <section className="settings-card settings-session-card">
          <div>
            <span className="settings-section-icon">
              <Icon name="power" size={19} />
            </span>
            <span>
              <h2>Sesión actual</h2>
              <p>Iniciaste sesión en este dispositivo.</p>
            </span>
          </div>
          <button type="button" onClick={onLogout}>
            Cerrar sesión
          </button>
        </section>
      </div>
    </form>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [profileList, setProfileList] = useState(profiles);
  const [activeProfile, setActiveProfile] = useState(1);
  const [selectedButton, setSelectedButton] = useState("GS");
  const [stageView, setStageView] = useState<JoystickView>("front");
  const [enabled, setEnabled] = useState(true);
  const [pressure, setPressure] = useState(62);
  const [sensitivity, setSensitivity] = useState(74);
  const [action, setAction] = useState("Disparar");
  const [saved, setSaved] = useState(false);
  const [deviceOpen, setDeviceOpen] = useState(false);
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [pressureLevels, setPressureLevels] = useState<Record<string, PressureLevel>>({});
  const [pressureModalOpen, setPressureModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "controller" | "profiles" | "settings">(
    "home",
  );
  const [controllerLinked, setControllerLinked] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userMenuOpen) return;

    const closeMenu = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      if (event instanceof MouseEvent && userMenuRef.current?.contains(event.target as Node))
        return;
      setUserMenuOpen(false);
    };

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeMenu);
    };
  }, [userMenuOpen]);

  const selectButton = (id: string) => {
    setSelectedButton(id);
    setSaved(false);
    setAction(
      configurableButtons.find((button) => button.id === id)?.defaultAction || "Sin asignar",
    );
  };

  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const selectedPressureLevel = pressureLevels[selectedButton];
  const selectedButtonName =
    configurableButtons.find((button) => button.id === selectedButton)?.name ??
    `Botón ${selectedButton}`;

  if (creatingProfile) {
    return (
      <ProfileCreator
        onBack={() => setCreatingProfile(false)}
        onSave={(profileName) => {
          const nextId = Math.max(...profileList.map((profile) => profile.id)) + 1;
          setProfileList([
            ...profileList,
            {
              id: nextId,
              name: profileName,
              game: "Personalizado · Adaptativo",
              color: "#8c6cff",
              active: false,
              bindings: [
                { button: "GS", action: "Disparar" },
                { button: "BS", action: "Apuntar" },
                { button: "T1", action: "Saltar" },
                { button: "T2", action: "Recargar" },
              ],
              pressure: 62,
              sensitivity: 74,
              secondAction: "Sin asignar",
            },
          ]);
          setActiveProfile(nextId);
          setCreatingProfile(false);
        }}
      />
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <span />
          </div>
          <span>JOYSTICK</span>
        </div>
        <nav className="side-nav" aria-label="Navegación principal">
          <button
            className={`nav-item ${currentPage === "home" ? "active" : ""}`}
            onClick={() => setCurrentPage("home")}
          >
            <Icon name="grid" />
            <span>Inicio</span>
          </button>
          <button
            className={`nav-item ${currentPage === "controller" ? "active" : ""}`}
            onClick={() => setCurrentPage("controller")}
          >
            <Icon name="gamepad" />
            <span>Mi control</span>
          </button>
          <button
            className={`nav-item ${currentPage === "profiles" ? "active" : ""}`}
            onClick={() => setCurrentPage("profiles")}
          >
            <Icon name="layers" />
            <span>Perfiles</span>
            <span className="nav-count">{profileList.length}</span>
          </button>
          <button
            className={`nav-item ${currentPage === "settings" ? "active" : ""}`}
            onClick={() => setCurrentPage("settings")}
          >
            <Icon name="settings" />
            <span>Ajustes</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <button className="help-card">
            <span className="help-icon">
              <Icon name="help" size={18} />
            </span>
            <span>
              <strong>¿Necesitas ayuda?</strong>
              <small>Visita nuestro centro de soporte</small>
            </span>
            <Icon name="chevron" size={16} />
          </button>
          <div className="user-menu-wrap" ref={userMenuRef}>
            {userMenuOpen && (
              <div className="user-quick-menu" role="menu">
                <div className="quick-menu-account">
                  <div className="avatar">MS</div>
                  <span>
                    <strong>Martín Silva</strong>
                    <small>Cuenta personal</small>
                  </span>
                  <i>En línea</i>
                </div>
                <div className="quick-menu-options">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setCurrentPage("settings");
                      setUserMenuOpen(false);
                    }}
                  >
                    <span className="quick-option-icon">
                      <Icon name="user" size={16} />
                    </span>
                    <span>
                      <strong>Mi cuenta</strong>
                      <small>Datos personales y seguridad</small>
                    </span>
                    <Icon name="chevron" size={14} />
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setCurrentPage("controller");
                      setUserMenuOpen(false);
                    }}
                  >
                    <span className="quick-option-icon blue">
                      <Icon name="gamepad" size={16} />
                    </span>
                    <span>
                      <strong>Mi control</strong>
                      <small>{controllerLinked ? "Conectado · 84%" : "Sin vincular"}</small>
                    </span>
                    <Icon name="chevron" size={14} />
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setCurrentPage("settings");
                      setUserMenuOpen(false);
                    }}
                  >
                    <span className="quick-option-icon">
                      <Icon name="settings" size={16} />
                    </span>
                    <span>
                      <strong>Preferencias</strong>
                      <small>Personaliza tu experiencia</small>
                    </span>
                    <Icon name="chevron" size={14} />
                  </button>
                </div>
                <div className="quick-menu-session">
                  <button type="button" role="menuitem" onClick={onLogout}>
                    <Icon name="user" size={15} />
                    Cambiar de usuario
                  </button>
                  <button className="logout" type="button" role="menuitem" onClick={onLogout}>
                    <Icon name="power" size={15} />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
            <button
              className={`user-card ${userMenuOpen ? "open" : ""}`}
              type="button"
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="avatar">MS</div>
              <span>
                <strong>Martín Silva</strong>
                <small>martin@email.com</small>
              </span>
              <Icon
                name="chevron"
                size={17}
                className={userMenuOpen ? "user-menu-chevron open" : "user-menu-chevron"}
              />
            </button>
          </div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="mobile-brand">
            <div className="brand-mark">
              <span />
            </div>
            <span>JOYSTICK</span>
          </div>
          <div className="welcome">
            <p>
              {currentPage === "settings"
                ? "Tu espacio personal"
                : currentPage === "profiles"
                  ? "Tus configuraciones"
                  : currentPage === "controller"
                    ? "Dispositivo principal"
                    : "Bienvenido de vuelta"}
            </p>
            <h1>
              {currentPage === "settings"
                ? "Configuración"
                : currentPage === "profiles"
                  ? "Perfiles de juego"
                  : currentPage === "controller"
                    ? "Joystick"
                    : "Hola, Martín"}
            </h1>
          </div>
          <div className="top-actions">
            <button className="icon-button search-button" aria-label="Buscar">
              <Icon name="search" />
            </button>
            <button className="device-pill" onClick={() => setDeviceOpen(!deviceOpen)}>
              <span className={`online-dot ${!controllerLinked ? "offline" : ""}`} />
              <span className="device-copy">
                <strong>Joystick</strong>
                <small>{controllerLinked ? "Conectado" : "Sin vincular"}</small>
              </span>
              <Icon name="battery" size={19} />
              <span className="battery-value">{controllerLinked ? "84%" : "—"}</span>
              <Icon name="chevron" size={15} className={deviceOpen ? "rotate" : ""} />
            </button>
          </div>
          {deviceOpen && (
            <div className="device-popover">
              <div className="device-art">
                <Icon name="gamepad" size={30} />
              </div>
              <div>
                <strong>Joystick</strong>
                <p>
                  <span className={!controllerLinked ? "offline" : ""} />{" "}
                  {controllerLinked ? "Conexión estable · Bluetooth" : "Control no vinculado"}
                </p>
              </div>
              <button onClick={() => setDeviceOpen(false)}>Listo</button>
            </div>
          )}
        </header>

        <div className="content">
          <div hidden={currentPage !== "settings"}>
            <SettingsPage onLogout={onLogout} />
          </div>
          <div hidden={currentPage !== "controller"}>
            <MyControllerPage linked={controllerLinked} onLinkedChange={setControllerLinked} />
          </div>
          <div hidden={currentPage !== "profiles"}>
            <ProfilesPage
              profiles={profileList}
              activeProfile={activeProfile}
              onActivate={setActiveProfile}
              onCreate={() => setCreatingProfile(true)}
              onDelete={(id) => {
                setProfileList((current) => {
                  const nextProfiles = current.filter((profile) => profile.id !== id);
                  if (activeProfile === id && nextProfiles.length) {
                    setActiveProfile(nextProfiles[0].id);
                  }
                  return nextProfiles;
                });
              }}
            />
          </div>
          <div hidden={currentPage !== "home"}>
            <section className="profiles-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">CONFIGURACIONES</p>
                  <h2>Tus perfiles</h2>
                </div>
                <button
                  className="text-button"
                  type="button"
                  onClick={() => setCurrentPage("profiles")}
                >
                  <Icon name="layers" size={17} /> Administrar perfiles
                </button>
              </div>
              <div className="profile-row">
                {profileList.map((profile) => (
                  <button
                    key={profile.id}
                    className={`profile-card ${activeProfile === profile.id ? "selected" : ""}`}
                    onClick={() => setActiveProfile(profile.id)}
                  >
                    <span className="profile-accent" style={{ background: profile.color }} />
                    <span
                      className="profile-icon"
                      style={{ color: profile.color, background: `${profile.color}18` }}
                    >
                      <Icon name={profile.id === 3 ? "sliders" : "gamepad"} size={21} />
                    </span>
                    <span className="profile-copy">
                      <strong>{profile.name}</strong>
                      <small>{profile.game}</small>
                    </span>
                    {activeProfile === profile.id && (
                      <span className="active-badge">
                        <Icon name="check" size={11} /> Activo
                      </span>
                    )}
                    <Icon name="more" size={18} className="profile-more" />
                  </button>
                ))}
                <button className="add-profile" onClick={() => setCreatingProfile(true)}>
                  <span>
                    <Icon name="plus" size={19} />
                  </span>
                  <strong>Nuevo perfil</strong>
                  <small>Crear configuración</small>
                </button>
              </div>
            </section>

            <section className="workspace">
              <div className="controller-panel">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">MAPEO VISUAL</p>
                    <h2>Configura tu control</h2>
                  </div>
                  <div className="view-tabs">
                    <button
                      className={stageView === "front" ? "active" : ""}
                      onClick={() => setStageView("front")}
                    >
                      Frontal
                    </button>
                    <button
                      className={stageView === "back" ? "active" : ""}
                      onClick={() => setStageView("back")}
                    >
                      Posterior
                    </button>
                  </div>
                </div>
                <p className="panel-description">
                  Selecciona un botón para personalizar su comportamiento.
                </p>

                <div className="controller-stage">
                  <div className="glow glow-one" />
                  <div className="glow glow-two" />
                  <JoystickController
                    mode={stageView}
                    selected={selectedButton}
                    onSelect={selectButton}
                    showHotspots
                    className="stage-joystick"
                  />
                  <div className="stage-hint">
                    <Icon name="sparkle" size={15} /> Los cambios se previsualizan en tiempo real
                  </div>
                </div>
              </div>

              <aside className="editor-panel">
                <div className="editor-header">
                  <div className="selected-key">{selectedButton}</div>
                  <div>
                    <p>EDITANDO BOTÓN</p>
                    <h3>{selectedButtonName}</h3>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(event) => setEnabled(event.target.checked)}
                    />
                    <span />
                  </label>
                </div>
                <div className="editor-content">
                  <div className="field">
                    <label>Acción asignada</label>
                    <div className="select-wrap">
                      <Icon name="gamepad" size={18} />
                      <select
                        value={action}
                        onChange={(event) => {
                          setAction(event.target.value);
                          setSaved(false);
                        }}
                      >
                        <option>Disparar</option>
                        <option>Apuntar</option>
                        <option>Saltar</option>
                        <option>Agacharse</option>
                        <option>Recargar</option>
                        <option>Cambiar arma</option>
                        <option>Sin asignar</option>
                      </select>
                      <Icon name="chevron" size={16} />
                    </div>
                  </div>

                  <div className={`setting-block ${!enabled ? "disabled" : ""}`}>
                    <div className="setting-title">
                      <span>
                        <Icon name="sliders" size={17} />
                        <strong>Nivel de presión</strong>
                      </span>
                      <output>{pressure}%</output>
                    </div>
                    <p>Define cuánta presión se necesita para activar la acción.</p>
                    <input
                      aria-label="Nivel de presión"
                      type="range"
                      min="5"
                      max="100"
                      value={pressure}
                      disabled={!enabled}
                      onChange={(event) => {
                        setPressure(Number(event.target.value));
                        setSaved(false);
                      }}
                      style={{ "--range": `${pressure}%` } as React.CSSProperties}
                    />
                    <div className="range-labels">
                      <span>Suave</span>
                      <span>Firme</span>
                    </div>
                  </div>

                  <div className={`setting-block ${!enabled ? "disabled" : ""}`}>
                    <div className="setting-title">
                      <span>
                        <Icon name="mouse" size={17} />
                        <strong>Sensibilidad del sensor</strong>
                      </span>
                      <output>{sensitivity}%</output>
                    </div>
                    <p>Ajusta la respuesta del movimiento tipo mouse.</p>
                    <input
                      aria-label="Sensibilidad del sensor"
                      type="range"
                      min="0"
                      max="100"
                      value={sensitivity}
                      disabled={!enabled}
                      onChange={(event) => {
                        setSensitivity(Number(event.target.value));
                        setSaved(false);
                      }}
                      style={{ "--range": `${sensitivity}%` } as React.CSSProperties}
                    />
                    <div className="range-labels">
                      <span>Preciso</span>
                      <span>Rápido</span>
                    </div>
                  </div>

                  <div className="multi-level">
                    <div>
                      <span>
                        <Icon name="layers" size={17} />
                        <strong>Acción de segundo nivel</strong>
                      </span>
                      {selectedPressureLevel ? (
                        <p className="level-summary">
                          <b>{selectedPressureLevel.action}</b>
                          <span>{selectedPressureLevel.depth}% de profundidad</span>
                        </p>
                      ) : (
                        <p>Activa otra acción al alcanzar una profundidad específica.</p>
                      )}
                    </div>
                    <button
                      className={`add-action ${selectedPressureLevel ? "configured" : ""}`}
                      type="button"
                      disabled={!enabled}
                      onClick={() => setPressureModalOpen(true)}
                    >
                      <Icon name={selectedPressureLevel ? "sliders" : "plus"} size={15} />
                      {selectedPressureLevel ? "Editar" : "Añadir nivel"}
                    </button>
                  </div>
                </div>
                <div className="editor-footer">
                  <button className={`save-button ${saved ? "saved" : ""}`} onClick={save}>
                    {saved ? (
                      <>
                        <Icon name="check" size={18} /> Cambios guardados
                      </>
                    ) : (
                      "Guardar cambios"
                    )}
                  </button>
                  <p>
                    {enabled
                      ? "Configuración lista para sincronizar"
                      : "Este botón está desactivado"}
                  </p>
                </div>
              </aside>
            </section>
          </div>
        </div>
      </main>

      <nav className="bottom-nav" aria-label="Navegación móvil">
        <button
          className={currentPage === "home" ? "active" : ""}
          onClick={() => setCurrentPage("home")}
        >
          <Icon name="grid" />
          <span>Inicio</span>
        </button>
        <button
          className={currentPage === "controller" ? "active" : ""}
          onClick={() => setCurrentPage("controller")}
        >
          <Icon name="gamepad" />
          <span>Control</span>
        </button>
        <button
          className={currentPage === "profiles" ? "active" : ""}
          onClick={() => setCurrentPage("profiles")}
        >
          <Icon name="layers" />
          <span>Perfiles</span>
        </button>
        <button
          className={currentPage === "settings" ? "active" : ""}
          onClick={() => setCurrentPage("settings")}
        >
          <Icon name="settings" />
          <span>Ajustes</span>
        </button>
      </nav>

      {pressureModalOpen && (
        <PressureLevelModal
          initialLevel={selectedPressureLevel}
          triggerName={selectedButtonName}
          onClose={() => setPressureModalOpen(false)}
          onSave={(level) => {
            setPressureLevels((current) => ({ ...current, [selectedButton]: level }));
            setSaved(false);
            setPressureModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <Dashboard onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <LoginPage onLogin={() => setIsLoggedIn(true)} />
  );
}

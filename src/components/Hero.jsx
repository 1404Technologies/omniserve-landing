const CERT_TONE = {
  teal: { dot: "bg-teal-500", ring: "ring-teal-400/50" },
  blue: { dot: "bg-blue-500", ring: "ring-blue-400/50" },
  amber: { dot: "bg-amber-500", ring: "ring-amber-400/55" },
  violet: { dot: "bg-violet-500", ring: "ring-violet-400/50" },
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-[12px] h-[12px]">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CertPill({ label, color }) {
  const tone = CERT_TONE[color] ?? CERT_TONE.blue;
  return (
    <span className={`inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.10] rounded-full pl-[6px] pr-4 py-[5px] ring-1 ${tone.ring}`}>
      <span className={`flex items-center justify-center w-5 h-5 rounded-full text-white ${tone.dot}`}>
        <CheckIcon />
      </span>
      <span className="text-[12px] font-semibold text-white">{label}</span>
    </span>
  );
}

const NODES = [
  { label: "Salesforce", logo: "/logos/integrations/salesforce.svg", x: 50, y: 10, anchor: "bottom", delay: "0.0s" },
  { label: "QuickBooks", logo: "/logos/integrations/quickbooks.svg", x: 78, y: 32, anchor: "left", delay: "0.4s" },
  { label: "MS Project", logo: "/logos/integrations/ms-project.svg", x: 68, y: 88, anchor: "top", delay: "0.8s" },
  { label: "Trello", logo: "/logos/integrations/trello.svg", x: 32, y: 88, anchor: "top", delay: "1.2s" },
  { label: "Xero", logo: "/logos/integrations/xero.svg", x: 22, y: 32, anchor: "right", delay: "0.6s" },
];

const ANCHOR_CLASSES = {
  bottom: "-translate-x-1/2 -translate-y-full",
  top: "-translate-x-1/2",
  left: "-translate-y-1/2",
  right: "-translate-x-full -translate-y-1/2",
};

const FLOAT_AXIS = {
  bottom: "float-x",
  top: "float-x",
  left: "float-y",
  right: "float-y",
};

function IntegrationChip({ label, logo, x, y, anchor, delay }) {
  return (
    <div
      className={`absolute z-10 ${ANCHOR_CLASSES[anchor]}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div style={{ animation: `${FLOAT_AXIS[anchor]} 5.5s ease-in-out ${delay} infinite` }}>
        <div className="bg-white rounded-[10px] pt-3 pb-[10px] px-4 flex flex-col items-center gap-[6px] shadow-[0_10px_30px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.04] min-w-[96px]">
          <img src={logo} alt="" className="w-7 h-7 object-contain" />
          <span className="text-[12px] font-semibold text-navy whitespace-nowrap leading-none">{label}</span>
        </div>
      </div>
    </div>
  );
}

function HubVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto">
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(20,184,166,0.18) 0%, rgba(37,99,235,0.10) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          {NODES.map(({ x, y, label }) => (
            <linearGradient
              key={label + "-grad"}
              id={`line-${label.replace(/\s+/g, "")}`}
              gradientUnits="userSpaceOnUse"
              x1="50"
              y1="50"
              x2={x}
              y2={y}
            >
              <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.70" />
            </linearGradient>
          ))}
        </defs>
        {NODES.map(({ x, y, label }) => (
          <line
            key={label + "-line"}
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke={`url(#line-${label.replace(/\s+/g, "")})`}
            strokeWidth="0.7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className="absolute inset-[24%] rounded-full border border-white/[0.10] pointer-events-none" />
      <div className="absolute inset-[12%] rounded-full border border-white/[0.05] pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 -m-10 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(20,184,166,0.45) 0%, rgba(20,184,166,0.15) 35%, transparent 70%)",
              filter: "blur(8px)",
              animation: "pulse-glow 4s ease-in-out infinite",
            }}
          />
          <img
            src="/logos/omniserve_symbol_dark.svg"
            alt="OmniServe"
            className="relative w-[120px] h-[120px] drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>

      {NODES.map((node) => (
        <IntegrationChip key={node.label} {...node} />
      ))}
    </div>
  );
}

export default function Hero({ tag, headline, headlineAccent, subheadline, cta, ctaSecondary, certifications }) {
  return (
    <section className="bg-navy text-white relative overflow-hidden pt-[100px] sm:pt-[120px] pb-16 sm:pb-20 px-4 sm:px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 78% 30%, rgba(20,184,166,0.13) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 10% 75%, rgba(37,99,235,0.16) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 40%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 40%, black 0%, transparent 75%)",
        }}
      />

      <div className="max-w-[1240px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] gap-10 sm:gap-12 lg:gap-16 items-center relative">
        <div>
          <div className="inline-flex items-center gap-[10px] text-[11px] font-semibold tracking-[0.14em] uppercase text-teal-300 bg-teal-400/[0.10] border border-teal-400/[0.30] py-[7px] pl-[10px] pr-4 rounded-full mb-6 sm:mb-7">
            <span className="w-[6px] h-[6px] rounded-full bg-teal-300" />
            {tag}
          </div>
          <h1 className="text-[clamp(28px,5.6vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] mb-5 sm:mb-6">
            {headline}
            <br />
            <span className="text-teal-300 font-semibold">{headlineAccent}</span>
          </h1>
          <p className="text-[15px] sm:text-[16px] text-blue-200 leading-[1.7] mb-7 sm:mb-8 max-w-[520px]">{subheadline}</p>

          <div id="compliance" className="flex flex-wrap gap-2 mb-7 sm:mb-8 scroll-mt-24">
            {certifications.map(({ label, color }) => (
              <CertPill key={label} label={label} color={color} />
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <a href="#contact" className="btn btn--primary">{cta} →</a>
            <a href="#features" className="btn btn--outline-white">{ctaSecondary}</a>
          </div>
        </div>

        <div className="order-first lg:order-last">
          <HubVisual />
        </div>
      </div>
    </section>
  );
}

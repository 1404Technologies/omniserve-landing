import Icon from "./Icon";

const TONE = {
  teal: { dot: "bg-teal-500", ring: "ring-teal-400/50" },
  blue: { dot: "bg-blue-500", ring: "ring-blue-400/50" },
  amber: { dot: "bg-amber-500", ring: "ring-amber-400/55" },
  violet: { dot: "bg-violet-500", ring: "ring-violet-400/50" },
};

export default function CertPill({ label, color }) {
  const tone = TONE[color] ?? TONE.blue;
  return (
    <span className={`inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.10] rounded-full pl-[6px] pr-4 py-[5px] ring-1 ${tone.ring}`}>
      <span className={`flex items-center justify-center w-5 h-5 rounded-full text-white ${tone.dot}`}>
        <Icon name="check" className="w-[12px] h-[12px]" />
      </span>
      <span className="text-[12px] font-semibold text-white">{label}</span>
    </span>
  );
}

interface StatCardProps {
    label: string;
    value: string;
    highlight?: boolean;
    delay?: number;
    visible: boolean;
}

export default function StatCard({ label, value, highlight, delay = 0, visible }: StatCardProps) {
    return (
        <div
            className={`
        flex flex-col items-center justify-center rounded-2xl px-4 py-3 transition-all duration-700
        ${highlight ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50'}
      `}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: `${delay}ms`,
            }}
        >
      <span
          className={`text-xl font-bold tracking-tight ${
              highlight ? 'text-emerald-500' : 'text-slate-800'
          }`}
      >
        {value}
      </span>
            <span className="text-xs text-slate-400 mt-0.5">{label}</span>
        </div>
    );
}
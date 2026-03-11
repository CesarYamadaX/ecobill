'use client';

export type TabOption = 'Diario' | 'Semanal' | 'Mensual';

interface TabSelectorProps {
    active: TabOption;
    onChange: (tab: TabOption) => void;
}

const TABS: TabOption[] = ['Diario', 'Semanal', 'Mensual'];

export default function TabSelector({ active, onChange }: TabSelectorProps) {
    return (
        <div className="flex bg-slate-100 rounded-2xl p-1 gap-1">
            {TABS.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`
            flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer
            ${active === tab
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600'
                    }
          `}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
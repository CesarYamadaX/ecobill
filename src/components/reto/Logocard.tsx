import { Award, Flame, Trophy, Lock , Star} from "lucide-react";
type Logro = {
    id: number;
    title: string;
    desc: string;
    progress: number; // 0-100
    xp?: number;
    unlocked?: boolean;
    icon: 'lock' | 'flame' | 'trophy' | 'award';
};

export default function LogroCard({ logro }: { logro: Logro }) {
    const Icon = logro.icon === 'flame' ? Flame
        : logro.icon === 'trophy' ? Trophy
            : logro.icon === 'award' ? Award
                : Lock;

    const active = logro.unlocked;

    return (
        <div className={`rounded-2xl p-4 flex flex-col items-center gap-2 text-center cursor-pointer transition-all duration-200 hover:scale-[1.02]
            ${active ? 'bg-amber-50' : 'bg-slate-50'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center
                ${active ? 'bg-amber-400' : 'bg-slate-200'}`}>
                <Icon size={26} className={active ? 'text-white' : 'text-slate-400'} />
            </div>
            <p className="text-sm font-bold text-slate-800 leading-tight">{logro.title}</p>
            <p className="text-xs text-slate-400 leading-tight">{logro.desc}</p>
            {logro.xp && (
                <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
    <Star size={12} /> +{logro.xp}
</span>
            )}
            {!logro.unlocked && (
                <>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                            className="bg-teal-400 h-1.5 rounded-full"
                            style={{ width: `${logro.progress}%` }}
                        />
                    </div>
                    <span className="text-xs text-slate-400">
                        {logro.progress > 0 ? `${logro.progress}%` : `${logro.progress - 100}%`}
                    </span>
                </>
            )}
        </div>
    );
}

import { Crown } from 'lucide-react';

interface RankCardProps {
    rank: number;
    profilepic: string;
    Name: string;
    energy: number;
    water: number;
    prevrank: number;
    isCurrentUser?: boolean;
}

function getRankChange(rank: number, prevrank: number) {
    const delta = prevrank - rank;
    if (delta > 0) return { dir: "up", delta };
    if (delta < 0) return { dir: "down", delta: Math.abs(delta) };
    return { dir: "same", delta: 0 };
}

export default function Rankcard({
                                     rank,
                                     profilepic,
                                     Name,
                                     energy,
                                     water,
                                     prevrank,
                                     isCurrentUser = false,
                                 }: RankCardProps) {
    const { dir, delta } = getRankChange(rank, prevrank);

    const avatarBg = isCurrentUser
        ? "bg-emerald-500"
        : rank === 1
            ? "bg-amber-100 text-amber-700"
            : "bg-slate-100 text-slate-500";

    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
        ${
                isCurrentUser
                    ? "bg-emerald-50 border-2 border-emerald-300 shadow-sm"
                    : "bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm"
            }`}
        >
            {/* Rank number or crown */}
            <div className="w-8 flex-shrink-0 flex justify-center">
                {rank === 1 ? (
                    <Crown className={"text-yellow-500"}/>
                ) : (
                    <span
                        className={`text-sm font-semibold ${
                            isCurrentUser ? "text-emerald-600" : "text-slate-400"
                        }`}
                    >
            {rank}
          </span>
                )}
            </div>

            {/* Avatar */}
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
          ${isCurrentUser ? "bg-emerald-500 text-white" : avatarBg}`}
            >
                {profilepic || Name.slice(0, 2).toUpperCase()}
            </div>

            {/* Name + stats */}
            <div className="flex-1 min-w-0">
                <p
                    className={`font-semibold text-sm leading-tight ${
                        isCurrentUser ? "text-slate-900" : "text-slate-700"
                    }`}
                >
                    {isCurrentUser ? "Tu hogar" : Name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
          <span className="text-amber-500 font-medium">
            ⚡{energy.toLocaleString('es-MX')}
          </span>
                    <span>{(water / 1000).toFixed(1)}k L</span>
                </p>
            </div>

            {/* Rank change */}
            <div className="flex-shrink-0 w-10 text-right">
                {dir === "up" && (
                    <span className="text-sm font-bold text-emerald-500">↑{delta}</span>
                )}
                {dir === "down" && (
                    <span className="text-sm font-bold text-red-400">↓{delta}</span>
                )}
                {dir === "same" && (
                    <span className="text-sm font-bold text-slate-300">—</span>
                )}
            </div>
        </div>
    );
}
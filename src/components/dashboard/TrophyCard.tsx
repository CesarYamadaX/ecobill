
import { ReactNode } from 'react';

interface TrophyCardProps {
    logo: ReactNode;
    name: string;
    dots?: number;        // número de puntos debajo (nivel del logro)
    unlocked?: boolean;   // si está desbloqueado o no (gris = locked)
}

export default function TrophyCard({ logo, name, dots = 1, unlocked = true }: TrophyCardProps) {
    return (
        <div
            className={`
        flex flex-col items-center gap-2 p-3 rounded-2xl
        transition-all duration-200 cursor-pointer hover:scale-105
        ${unlocked
                ? 'bg-[#1e2d3d]'
                : 'bg-[#1a2530] opacity-50'
            }
      `}
            style={{ minWidth: '80px' }}
        >
            {/* Icono */}
            <div
                className={`
          w-12 h-12 rounded-xl flex items-center justify-center text-white
          ${unlocked ? '' : 'bg-[#2a3a4a]'}
        `}
            >
                {logo}
            </div>

            {/* Nombre */}
            <p
                className={`text-xs font-semibold text-center leading-tight ${
                    unlocked ? 'text-white' : 'text-slate-500'
                }`}
            >
                {name}
            </p>

            {/* Dots de nivel */}
            <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                    <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                            i < dots
                                ? unlocked
                                    ? 'bg-amber-400'
                                    : 'bg-slate-600'
                                : 'bg-slate-700'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
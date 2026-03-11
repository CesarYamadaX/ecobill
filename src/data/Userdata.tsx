// ── data/Userdata.tsx ─────────────────────────────────────────────────────────
// Única fuente de verdad para datos del usuario, gamificación y ranking.
// Extensión .tsx necesaria por los iconos JSX de los trofeos.

import { Flame, Droplets, Zap, Shield } from 'lucide-react';

// ── Perfil ────────────────────────────────────────────────────────────────────
export const USER_PROFILE = {
    name: 'Carlos Méndez',
    avatarUrl: null,
};

// ── Gamificación ──────────────────────────────────────────────────────────────
export const USER_GAMIFICATION = {
    dayStreak: 16,
    level: 7,
    xp: 2400,
    maxXp: 3000,
    levelName: 'Guardián del Agua',
};

// ── Trofeos ───────────────────────────────────────────────────────────────────
export interface Trophy {
    icon: React.ReactNode;
    name: string;
    dots: number;
    unlocked: boolean;
    bg: string;
}

export const USER_TROPHIES: Trophy[] = [
    { icon: <Droplets size={18} />, name: 'Water Saver', dots: 3, unlocked: true, bg: 'bg-teal-500' },
    { icon: <Zap size={18} />, name: 'Efficiency Pro', dots: 2, unlocked: true, bg: 'bg-amber-400' },
    { icon: <Shield size={18} />, name: 'Drought Hero', dots: 0, unlocked: false, bg: 'bg-slate-600' },
    { icon: <Flame size={18} />, name: 'Streak Master', dots: 1, unlocked: true, bg: 'bg-amber-400' },
];

// ── Ranking ───────────────────────────────────────────────────────────────────
export const USER_RANKING = {
    place: '2',
};

export interface Household {
    rank: number;
    profilepic: string;
    Name: string;
    energy: number;
    water: number;
    prevrank: number;
    isCurrentUser?: boolean;
}

export const HOUSEHOLDS: Household[] = [
    { rank: 1, profilepic: "ML", Name: "Fam. Lopez", energy: 3240, water: 7200, prevrank: 1 },
    { rank: 2, profilepic: "CG", Name: "Tu hogar", energy: 2950, water: 8400, prevrank: 3, isCurrentUser: true },
    { rank: 3, profilepic: "FH", Name: "Fam. Hernandez", energy: 2810, water: 8900, prevrank: 2 },
    { rank: 4, profilepic: "JM", Name: "Fam. Martinez", energy: 2650, water: 9100, prevrank: 6 },
    { rank: 5, profilepic: "PD", Name: "Fam. Diaz", energy: 2480, water: 9600, prevrank: 5 },
    { rank: 6, profilepic: "RS", Name: "Fam. Sanchez", energy: 2310, water: 10200, prevrank: 4 },
    { rank: 7, profilepic: "AT", Name: "Fam. Torres", energy: 2190, water: 10800, prevrank: 8 },
    { rank: 8, profilepic: "LF", Name: "Fam. Flores", energy: 2050, water: 11400, prevrank: 7 },
];

// ── Retos: niveles ────────────────────────────────────────────────────────────
export interface Nivel {
    label: string;
    xp: number;
    done: boolean;
}

export const USER_NIVELES: Nivel[] = [
    { label: 'Novato Eco', xp: 0, done: true },
    { label: 'Guardián del Agua', xp: 10, done: false },
    { label: 'Maestro Sustentable', xp: 15, done: false },
    { label: 'Leyenda EcoBill', xp: 20, done: false },
];

// ── Retos: logros ─────────────────────────────────────────────────────────────
export type LogroIcon = 'lock' | 'flame' | 'trophy' | 'award';

export interface Logro {
    id: number;
    title: string;
    desc: string;
    progress: number; // 0-100
    xp?: number;
    unlocked?: boolean;
    icon: LogroIcon;
}

export const USER_LOGROS: Logro[] = [
    { id: 1, title: 'Ahorrador', desc: 'Reduce 10% tu consumo mensual', progress: 0, icon: 'lock' },
    { id: 2, title: 'Racha 7', desc: '7 días bajo el límite diario', progress: Math.min(Math.round((USER_GAMIFICATION.dayStreak / 7) * 100), 100), xp: 150, unlocked: USER_GAMIFICATION.dayStreak >= 7, icon: 'flame' },
    { id: 3, title: 'Eficiencia Pro', desc: 'Mantén tarifa T1 por 2 meses', progress: 47, icon: 'lock' },
    { id: 4, title: 'Eco Vecino', desc: 'Top 10 de tu colonia', progress: 100, xp: 250, unlocked: true, icon: 'award' },
    { id: 5, title: 'Héroe Sequía', desc: 'Reduce 20% durante alerta', progress: 0, icon: 'lock' },
    { id: 6, title: 'Racha 30', desc: '30 días consecutivos bajo límite', progress: 47, icon: 'lock' },
    { id: 7, title: 'Mentor Verde', desc: 'Invita 3 vecinos a EcoBill', progress: 33, icon: 'lock' },
    { id: 8, title: 'Líder Colonia', desc: '#1 en tu colonia por 1 mes', progress: 72, icon: 'lock' },
    { id: 9, title: 'Maestro Agua', desc: 'Completa todos los retos', progress: 12, icon: 'lock' },
];

// ── Retos: stats de la página ─────────────────────────────────────────────────
export const USER_RETOS_STATS = {
    colonyRank: '#2',
    colonyTotal: 48,
    logrosUnlocked: USER_LOGROS.filter(l => l.unlocked).length,
    logrosTotal: USER_LOGROS.length,
};
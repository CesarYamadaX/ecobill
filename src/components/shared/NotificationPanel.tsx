"use client";

import { Droplets, Zap, Trophy, AlertTriangle, TrendingDown, TrendingUp, Flame, X, Award, Target } from "lucide-react";
import type { ReactNode } from "react";
import { USER_GAMIFICATION, USER_RANKING, USER_LOGROS } from "@/data/Userdata";
import {
    CURRENT_MONTH_STATS,
    CURRENT_TIER,
    NEXT_TIER,
    M3_TO_NEXT_TIER,
    OVER_COUNT,
    BILL_PERFORMANCE,
    BILL_FORECAST_END,
    BILL_SAVING,
    MONTHS,
} from "@/data/Consumptiondata";

export interface Notification {
    id: number;
    icon: ReactNode;
    iconBg: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

// ── Generar notificaciones contextuales ───────────────────────────────────────
function buildNotifications(): Notification[] {
    const notifs: Notification[] = [];
    let id = 1;

    // 1. Alerta si hay días sobre el umbral esta semana
    if (OVER_COUNT.Diario > 0) {
        notifs.push({
            id: id++,
            icon: <AlertTriangle size={16} />,
            iconBg: "bg-amber-100 text-amber-600",
            title: "Alerta de consumo",
            message: `Tuviste ${OVER_COUNT.Diario} día${OVER_COUNT.Diario > 1 ? "s" : ""} por encima del límite diario en los últimos 7 días. Intenta reducir tu uso.`,
            time: "Hoy",
            read: false,
        });
    }

    // 2. Racha activa
    if (USER_GAMIFICATION.dayStreak >= 7) {
        notifs.push({
            id: id++,
            icon: <Flame size={16} />,
            iconBg: "bg-red-100 text-red-500",
            title: `¡Racha de ${USER_GAMIFICATION.dayStreak} días!`,
            message: `Llevas ${USER_GAMIFICATION.dayStreak} días consecutivos ingresando a la app. ¡Sigue así para desbloquear más logros!`,
            time: "Hoy",
            read: false,
        });
    }

    // 3. Logros desbloqueados recientemente
    const unlockedLogros = USER_LOGROS.filter((l) => l.unlocked);
    for (const logro of unlockedLogros) {
        notifs.push({
            id: id++,
            icon: <Trophy size={16} />,
            iconBg: "bg-teal-100 text-teal-600",
            title: "¡Logro desbloqueado!",
            message: `Completaste "${logro.title}": ${logro.desc}. +${logro.xp ?? 0} XP`,
            time: "Hace 2 h",
            read: false,
        });
    }

    // 4. Rendimiento del recibo
    if (BILL_PERFORMANCE === "good" && BILL_SAVING > 0) {
        notifs.push({
            id: id++,
            icon: <TrendingDown size={16} />,
            iconBg: "bg-green-100 text-green-600",
            title: "Buen ritmo de factura",
            message: `Vas camino a pagar ~$${BILL_FORECAST_END} MXN. Podrías ahorrar ~$${BILL_SAVING} vs tu promedio histórico.`,
            time: "Hace 1 día",
            read: true,
        });
    } else if (BILL_PERFORMANCE === "bad") {
        notifs.push({
            id: id++,
            icon: <TrendingUp size={16} />,
            iconBg: "bg-red-100 text-red-500",
            title: "Factura por encima del promedio",
            message: `Tu gasto acumulado va por encima de tu promedio histórico. Proyección: ~$${BILL_FORECAST_END} MXN.`,
            time: "Hace 1 día",
            read: true,
        });
    }

    // 5. Proximidad al siguiente tier
    if (NEXT_TIER && M3_TO_NEXT_TIER !== null && M3_TO_NEXT_TIER < 10) {
        notifs.push({
            id: id++,
            icon: <Droplets size={16} />,
            iconBg: "bg-blue-100 text-blue-600",
            title: "Cerca del siguiente tramo",
            message: `Estás a ${M3_TO_NEXT_TIER.toFixed(1)} m³ de pasar a ${NEXT_TIER.label}. Eso incrementaría tu tarifa a $${NEXT_TIER.pricePerM3}/m³.`,
            time: "Hace 1 día",
            read: true,
        });
    }

    // 6. Cambio porcentual mes a mes (promedio diario para comparar justamente)
    const currentMonth = MONTHS[MONTHS.length - 1];
    const prevMonth = MONTHS[MONTHS.length - 2];
    const currentAvgDaily = currentMonth.rawDays.length > 0
        ? currentMonth.total / currentMonth.rawDays.length
        : 0;
    const prevAvgDaily = prevMonth.rawDays.length > 0
        ? prevMonth.total / prevMonth.rawDays.length
        : 0;
    const dailyChange = prevAvgDaily > 0
        ? Math.round(((currentAvgDaily - prevAvgDaily) / prevAvgDaily) * 100)
        : 0;

    if (dailyChange < 0) {
        notifs.push({
            id: id++,
            icon: <TrendingDown size={16} />,
            iconBg: "bg-green-100 text-green-600",
            title: "Consumo diario a la baja",
            message: `Tu promedio diario en ${CURRENT_MONTH_STATS.monthName} es ${Math.abs(dailyChange)}% menor que en ${prevMonth.label}. ¡Excelente!`,
            time: "Hace 2 días",
            read: true,
        });
    } else if (dailyChange > 5) {
        notifs.push({
            id: id++,
            icon: <AlertTriangle size={16} />,
            iconBg: "bg-amber-100 text-amber-600",
            title: "Consumo diario al alza",
            message: `Tu promedio diario en ${CURRENT_MONTH_STATS.monthName} es ${dailyChange}% mayor que en ${prevMonth.label}. Revisa tus hábitos.`,
            time: "Hace 2 días",
            read: true,
        });
    }

    // 7. Posición en ranking
    notifs.push({
        id: id++,
        icon: <Award size={16} />,
        iconBg: "bg-purple-100 text-purple-600",
        title: "Tu posición en el ranking",
        message: `Estás en el lugar #${USER_RANKING.place} de tu colonia. ¡Sigue así para llegar al #1!`,
        time: "Hace 3 días",
        read: true,
    });

    // 8. Progreso de XP
    const xpRemaining = USER_GAMIFICATION.maxXp - USER_GAMIFICATION.xp;
    notifs.push({
        id: id++,
        icon: <Zap size={16} />,
        iconBg: "bg-orange-100 text-orange-600",
        title: "Progreso de nivel",
        message: `Nivel ${USER_GAMIFICATION.level} "${USER_GAMIFICATION.levelName}". Te faltan ${xpRemaining} XP para subir de nivel.`,
        time: "Hace 3 días",
        read: true,
    });

    // 9. Tip contextual según tier
    notifs.push({
        id: id++,
        icon: <Target size={16} />,
        iconBg: "bg-teal-100 text-teal-600",
        title: "Tip de ahorro",
        message: CURRENT_TIER.id === "T1"
            ? "Estás en tarifa básica. Usa la lavadora con carga completa para mantenerte aquí."
            : `Estás en ${CURRENT_TIER.label}. Reducir duchas a 5 min puede ahorrarte hasta 50L/día.`,
        time: "Hace 4 días",
        read: true,
    });

    return notifs;
}

const NOTIFICATIONS = buildNotifications();

interface NotificationPanelProps {
    onClose: () => void;
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
    const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="absolute right-0 top-full mt-2 z-50 w-[340px] max-h-[420px] overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800 text-sm">
                            Notificaciones
                        </h3>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* List */}
                <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
                    {NOTIFICATIONS.map((n) => (
                        <div
                            key={n.id}
                            className={`flex gap-3 px-4 py-3 transition-colors hover:bg-gray-50 cursor-pointer ${
                                !n.read ? "bg-teal-50/40" : ""
                            }`}
                        >
                            {/* Icon */}
                            <div
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${n.iconBg}`}
                            >
                                {n.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm font-medium text-gray-800 leading-tight">
                                        {n.title}
                                    </p>
                                    {!n.read && (
                                        <span className="flex-shrink-0 w-2 h-2 mt-1 bg-teal-500 rounded-full" />
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-2">
                                    {n.message}
                                </p>
                                <p className="text-[11px] text-gray-400 mt-1">
                                    {n.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-4 py-2.5">
                    <button className="w-full text-center text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors cursor-pointer">
                        Marcar todas como leídas
                    </button>
                </div>
            </div>
        </>
    );
}

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  description: string;
  value: number | string;
  suffix?: string;
  icon: ReactNode;
  color: 'blue' | 'emerald' | 'amber' | 'violet';
  trend?: { value: number; label: string };
  animate?: boolean;
}

const COLOR_MAP = {
  blue: {
    bg: 'dark:bg-blue-500/10 bg-blue-50',
    icon: 'dark:bg-blue-500/20 dark:text-blue-400 bg-blue-100 text-blue-600',
    value: 'dark:text-blue-400 text-blue-700',
    ring: 'dark:ring-blue-500/20 ring-blue-200',
    trend: 'dark:text-blue-400 text-blue-600',
    bar: 'bg-blue-500',
  },
  emerald: {
    bg: 'dark:bg-emerald-500/10 bg-emerald-50',
    icon: 'dark:bg-emerald-500/20 dark:text-emerald-400 bg-emerald-100 text-emerald-600',
    value: 'dark:text-emerald-400 text-emerald-700',
    ring: 'dark:ring-emerald-500/20 ring-emerald-200',
    trend: 'dark:text-emerald-400 text-emerald-600',
    bar: 'bg-emerald-500',
  },
  amber: {
    bg: 'dark:bg-amber-500/10 bg-amber-50',
    icon: 'dark:bg-amber-500/20 dark:text-amber-400 bg-amber-100 text-amber-600',
    value: 'dark:text-amber-400 text-amber-700',
    ring: 'dark:ring-amber-500/20 ring-amber-200',
    trend: 'dark:text-amber-400 text-amber-600',
    bar: 'bg-amber-500',
  },
  violet: {
    bg: 'dark:bg-violet-500/10 bg-violet-50',
    icon: 'dark:bg-violet-500/20 dark:text-violet-400 bg-violet-100 text-violet-600',
    value: 'dark:text-violet-400 text-violet-700',
    ring: 'dark:ring-violet-500/20 ring-violet-200',
    trend: 'dark:text-violet-400 text-violet-600',
    bar: 'bg-violet-500',
  },
};

function useAnimatedCounter(target: number, duration = 1200, enabled = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) { setCount(target); return; }
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, enabled]);

  return count;
}

export default function StatsCard({
  title,
  description,
  value,
  suffix = '',
  icon,
  color,
  trend,
  animate = true,
}: StatsCardProps) {
  const colors = COLOR_MAP[color];
  const numericValue = typeof value === 'number' ? value : 0;
  const isNumeric = typeof value === 'number';
  const displayCount = useAnimatedCounter(numericValue, 1200, animate && isNumeric);

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-5
        ring-1 ${colors.ring}
        dark:bg-slate-800/60 bg-white
        shadow-sm hover:shadow-md
        transition-all duration-300 hover:-translate-y-0.5
        group
      `}
    >
      {/* Background accent */}
      <div className={`absolute inset-0 ${colors.bg} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />

      <div className="relative">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors.icon} flex-shrink-0`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-semibold ${colors.trend}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
              {trend.value}%
            </div>
          )}
        </div>

        {/* Value */}
        <div className={`text-3xl font-black tracking-tight mb-1 ${colors.value}`}>
          {isNumeric ? displayCount.toLocaleString() : value}
          {suffix && <span className="text-lg font-bold ml-0.5">{suffix}</span>}
        </div>

        {/* Title */}
        <div className="text-sm font-semibold dark:text-slate-200 text-slate-800 mb-0.5">
          {title}
        </div>

        {/* Description */}
        <div className="text-xs dark:text-slate-400 text-slate-500">
          {description}
        </div>

        {/* Trend label */}
        {trend && (
          <div className="mt-3 text-xs dark:text-slate-400 text-slate-500">
            {trend.label}
          </div>
        )}
      </div>
    </div>
  );
}

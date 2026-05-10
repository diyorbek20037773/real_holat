import { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { ViloyatStats } from '../types';

interface ChartsProps {
  viloyatStats: ViloyatStats[];
  totalSchools: number;
  inspectedSchools: number;
  satisfiedSchools: number;
}

// ── Bar Chart ──────────────────────────────────────────────────────────────
function BarChart({ stats }: { stats: ViloyatStats[] }) {
  const { t } = useLanguage();
  const sorted = useMemo(
    () => [...stats].sort((a, b) => b.maktablar_soni - a.maktablar_soni).slice(0, 10),
    [stats]
  );
  const max = Math.max(...sorted.map((s) => s.maktablar_soni), 1);

  const COLORS = [
    '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#ec4899', '#14b8a6', '#f97316', '#6366f1',
  ];

  if (!sorted.length) return null;

  return (
    <div>
      <h3 className="text-sm font-bold dark:text-slate-200 text-slate-700 mb-4">
        {t.barChartTitle}
      </h3>
      <div className="space-y-2.5">
        {sorted.map((s, i) => {
          const pct = (s.maktablar_soni / max) * 100;
          const shortName = s.nom
            .replace(' viloyati', '')
            .replace(' Respublikasi', ' R.')
            .replace(' shahar', ' sh.');
          return (
            <div key={s.kod} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs dark:text-slate-400 text-slate-600 truncate max-w-[140px]">
                  {shortName}
                </span>
                <span className="text-xs font-bold dark:text-slate-300 text-slate-700 ml-2 flex-shrink-0">
                  {s.maktablar_soni}
                </span>
              </div>
              <div className="h-2 dark:bg-slate-700 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: COLORS[i % COLORS.length],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] dark:text-slate-500 text-slate-400 mt-3 text-right">
        {t.byRegion}
      </p>
    </div>
  );
}

// ── Pie / Donut Chart ──────────────────────────────────────────────────────
function DonutChart({
  total,
  inspected,
  satisfied,
}: {
  total: number;
  inspected: number;
  satisfied: number;
}) {
  const { t } = useLanguage();
  const notInspected = Math.max(0, total - inspected);
  const needsAttention = Math.max(0, inspected - satisfied);

  const segments = [
    { label: t.statusGood, value: satisfied, color: '#22c55e' },
    { label: t.statusWarning, value: needsAttention, color: '#f59e0b' },
    { label: t.statusUnknown, value: notInspected, color: '#94a3b8' },
  ].filter((s) => s.value > 0);

  const totalVal = segments.reduce((s, seg) => s + seg.value, 0) || 1;

  // Build SVG arcs
  const cx = 60, cy = 60, r = 48, strokeWidth = 14;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const arcs = segments.map((seg) => {
    const fraction = seg.value / totalVal;
    const dash = fraction * circumference;
    const arc = { ...seg, dash, offset, fraction };
    offset += dash;
    return arc;
  });

  const satisfiedPct = total > 0 ? Math.round((satisfied / total) * 100) : 0;

  return (
    <div>
      <h3 className="text-sm font-bold dark:text-slate-200 text-slate-700 mb-4">
        {t.pieChartTitle}
      </h3>
      <div className="flex items-center gap-6">
        {/* SVG Donut */}
        <div className="relative flex-shrink-0">
          <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
            {/* Background circle */}
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="dark:text-slate-700 text-slate-100"
            />
            {arcs.map((arc, i) => (
              <circle
                key={i}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={arc.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${arc.dash} ${circumference - arc.dash}`}
                strokeDashoffset={-arc.offset + circumference * 0.25}
                strokeLinecap="butt"
                style={{ transition: 'stroke-dasharray 0.8s ease' }}
              />
            ))}
          </svg>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-black dark:text-slate-100 text-slate-800">
              {satisfiedPct}%
            </span>
            <span className="text-[9px] dark:text-slate-400 text-slate-500 font-medium">
              {t.satisfied}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2.5 flex-1 min-w-0">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-xs dark:text-slate-400 text-slate-600 truncate flex-1">
                {seg.label}
              </span>
              <span className="text-xs font-bold dark:text-slate-300 text-slate-700 flex-shrink-0">
                {seg.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Trend / Line Chart ─────────────────────────────────────────────────────
function TrendChart({ total }: { total: number }) {
  const { t } = useLanguage();

  // Generate synthetic monthly trend data based on total
  const months = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      const factor = 0.55 + (i / 5) * 0.45;
      const jitter = 0.92 + Math.random() * 0.16;
      return {
        label: d.toLocaleString('default', { month: 'short' }),
        value: Math.round(total * factor * jitter),
      };
    });
  }, [total]);

  const maxVal = Math.max(...months.map((m) => m.value), 1);
  const W = 280, H = 80, PAD = 10;
  const points = months.map((m, i) => {
    const x = PAD + (i / (months.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((m.value / maxVal) * (H - PAD * 2));
    return { x, y, ...m };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ');
  const area = [
    `${points[0].x},${H - PAD}`,
    ...points.map((p) => `${p.x},${p.y}`),
    `${points[points.length - 1].x},${H - PAD}`,
  ].join(' ');

  return (
    <div>
      <h3 className="text-sm font-bold dark:text-slate-200 text-slate-700 mb-4">
        {t.trendChartTitle}
      </h3>
      <div className="relative">
        <svg
          width="100%"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-label={t.monthlyTrend}
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* Area fill */}
          <polygon points={area} fill="url(#trendGrad)" />
          {/* Line */}
          <polyline
            points={polyline}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dots */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#3b82f6" stroke="white" strokeWidth="1.5" />
          ))}
        </svg>
        {/* X-axis labels */}
        <div className="flex justify-between mt-1">
          {points.map((p, i) => (
            <span key={i} className="text-[9px] dark:text-slate-500 text-slate-400">
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Charts Component ──────────────────────────────────────────────────
export default function Charts({ viloyatStats, totalSchools, inspectedSchools, satisfiedSchools }: ChartsProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold dark:text-slate-100 text-slate-900">
          {t.chartsTitle}
        </h2>
        <p className="text-sm dark:text-slate-400 text-slate-500 mt-0.5">
          {t.chartsSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Bar chart */}
        <div className="dark:bg-slate-800/60 bg-white rounded-2xl p-5 shadow-sm ring-1 dark:ring-slate-700/50 ring-slate-200">
          <BarChart stats={viloyatStats} />
        </div>

        {/* Donut chart */}
        <div className="dark:bg-slate-800/60 bg-white rounded-2xl p-5 shadow-sm ring-1 dark:ring-slate-700/50 ring-slate-200">
          <DonutChart
            total={totalSchools}
            inspected={inspectedSchools}
            satisfied={satisfiedSchools}
          />
        </div>

        {/* Trend chart */}
        <div className="dark:bg-slate-800/60 bg-white rounded-2xl p-5 shadow-sm ring-1 dark:ring-slate-700/50 ring-slate-200 md:col-span-2 xl:col-span-1">
          <TrendChart total={inspectedSchools} />
        </div>
      </div>
    </div>
  );
}

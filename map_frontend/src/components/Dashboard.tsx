import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import {
  fetchViloyatStats,
} from '../api';
import type { ViloyatStats } from '../types';
import StatsCard from './StatsCard';
import Charts from './Charts';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import UzbekistanMap from './UzbekistanMap';

// ── Icons ──────────────────────────────────────────────────────────────────
function SchoolIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function PercentIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h.01M15 17h.01M7 17L17 7M7 7a2 2 0 100 4 2 2 0 000-4zm10 10a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  );
}

// ── Tab types ──────────────────────────────────────────────────────────────
type Tab = 'overview' | 'map' | 'regions' | 'charts';

// ── Regional Table ─────────────────────────────────────────────────────────
function RegionalTable({ stats }: { stats: ViloyatStats[] }) {
  const { t } = useLanguage();
  const sorted = [...stats].sort((a, b) => b.maktablar_soni - a.maktablar_soni);

  const COLORS = [
    '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#ec4899', '#14b8a6', '#f97316', '#6366f1',
    '#84cc16', '#e11d48', '#0ea5e9', '#a855f7',
  ];

  return (
    <div className="dark:bg-slate-800/60 bg-white rounded-2xl shadow-sm ring-1 dark:ring-slate-700/50 ring-slate-200 overflow-hidden">
      <div className="px-5 py-4 border-b dark:border-slate-700 border-slate-100">
        <h2 className="text-base font-bold dark:text-slate-100 text-slate-900">
          {t.regionalBreakdown}
        </h2>
        <p className="text-xs dark:text-slate-400 text-slate-500 mt-0.5">
          {t.regionalBreakdownDesc}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="dark:bg-slate-700/30 bg-slate-50">
              <th className="text-left px-5 py-3 text-xs font-semibold dark:text-slate-400 text-slate-500 uppercase tracking-wide">
                #
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold dark:text-slate-400 text-slate-500 uppercase tracking-wide">
                {t.regionName}
              </th>
              <th className="text-right px-5 py-3 text-xs font-semibold dark:text-slate-400 text-slate-500 uppercase tracking-wide">
                {t.schoolCount}
              </th>
              <th className="text-right px-5 py-3 text-xs font-semibold dark:text-slate-400 text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                {t.promises}
              </th>
              <th className="text-right px-5 py-3 text-xs font-semibold dark:text-slate-400 text-slate-500 uppercase tracking-wide">
                {t.satisfactionScore}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-700/50 divide-slate-100">
            {sorted.map((s, i) => {
              const color = COLORS[i % COLORS.length];
              // Synthetic satisfaction score per region
              const satPct = 45 + Math.round(((i * 7 + 23) % 40));
              return (
                <tr
                  key={s.kod}
                  className="dark:hover:bg-slate-700/30 hover:bg-slate-50 transition-colors duration-150"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold dark:text-slate-500 text-slate-400">
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="font-medium dark:text-slate-200 text-slate-800 text-sm">
                        {s.nom
                          .replace(' viloyati', '')
                          .replace(' Respublikasi', ' R.')
                          .replace(' shahar', ' sh.')}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="font-bold dark:text-slate-200 text-slate-800">
                      {s.maktablar_soni.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right hidden sm:table-cell">
                    <span className="dark:text-slate-400 text-slate-600">
                      {s.vaadalar_soni.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 dark:bg-slate-700 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${satPct}%`,
                            backgroundColor: satPct >= 70 ? '#22c55e' : satPct >= 40 ? '#f59e0b' : '#ef4444',
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-bold"
                        style={{
                          color: satPct >= 70 ? '#22c55e' : satPct >= 40 ? '#f59e0b' : '#ef4444',
                        }}
                      >
                        {satPct}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Loading Skeleton ───────────────────────────────────────────────────────
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`dark:bg-slate-700/50 bg-slate-200 rounded-xl animate-pulse ${className}`}
    />
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="dark:bg-slate-800/60 bg-white rounded-2xl p-5 ring-1 dark:ring-slate-700/50 ring-slate-200">
          <Skeleton className="w-11 h-11 mb-4" />
          <Skeleton className="h-8 w-24 mb-2" />
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-3 w-40" />
        </div>
      ))}
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [viloyatStats, setViloyatStats] = useState<ViloyatStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(false);
    fetchViloyatStats()
      .then((stats) => {
        setViloyatStats(stats);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Derived stats
  const totalSchools = viloyatStats.reduce((s, v) => s + v.maktablar_soni, 0) || 11139;
  const inspectedSchools = Math.round(totalSchools * 0.64);
  const satisfiedSchools = Math.round(totalSchools * 0.41);
  const satisfactionPct = totalSchools > 0 ? Math.round((satisfiedSchools / totalSchools) * 100) : 0;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: t.tabOverview },
    { key: 'map', label: t.tabMap },
    { key: 'regions', label: t.tabRegions },
    { key: 'charts', label: t.tabCharts },
  ];

  const now = new Date().toLocaleDateString(
    isDark ? 'en-GB' : 'uz-UZ',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="min-h-screen dark:bg-slate-900 bg-slate-50 transition-colors duration-300">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 dark:bg-slate-900/95 bg-white/95 backdrop-blur-md border-b dark:border-slate-800 border-slate-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo + Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/30">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-black dark:text-white text-slate-900 leading-tight truncate">
                {t.appName}
              </h1>
              <p className="text-[10px] dark:text-slate-400 text-slate-500 leading-tight hidden sm:block">
                {t.dashboard}
              </p>
            </div>
          </div>

          {/* Nav tabs — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                  ${activeTab === tab.key
                    ? 'dark:bg-blue-600/20 dark:text-blue-400 bg-blue-50 text-blue-700'
                    : 'dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile tab bar */}
        <div className="md:hidden flex border-t dark:border-slate-800 border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex-1 py-2.5 text-xs font-medium transition-colors duration-200 cursor-pointer
                ${activeTab === tab.key
                  ? 'dark:text-blue-400 dark:border-b-2 dark:border-blue-400 text-blue-700 border-b-2 border-blue-600'
                  : 'dark:text-slate-500 text-slate-500'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Error state */}
        {error && (
          <div className="rounded-2xl dark:bg-red-900/20 bg-red-50 dark:ring-red-800/30 ring-1 ring-red-200 p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 dark:text-red-400 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm dark:text-red-300 text-red-700">{t.errorLoading}</p>
            </div>
            <button
              onClick={loadData}
              className="text-sm font-semibold dark:text-red-400 text-red-700 dark:hover:text-red-300 hover:text-red-900 cursor-pointer flex-shrink-0"
            >
              {t.retry}
            </button>
          </div>
        )}

        {/* ── Overview Tab ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Page heading */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black dark:text-slate-100 text-slate-900">
                  {t.statistics}
                </h2>
                <p className="text-sm dark:text-slate-400 text-slate-500 mt-0.5">
                  {t.lastUpdated}: {now}
                </p>
              </div>
              {/* Live indicator */}
              <div className="flex items-center gap-2 dark:bg-emerald-900/20 bg-emerald-50 dark:ring-emerald-800/30 ring-1 ring-emerald-200 rounded-full px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold dark:text-emerald-400 text-emerald-700">Live</span>
              </div>
            </div>

            {/* Stats cards */}
            {loading ? (
              <StatsSkeleton />
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatsCard
                  title={t.totalSchools}
                  description={t.totalSchoolsDesc}
                  value={totalSchools}
                  icon={<SchoolIcon />}
                  color="blue"
                  trend={{ value: 2.4, label: t.lastUpdated }}
                />
                <StatsCard
                  title={t.inspectedSchools}
                  description={t.inspectedSchoolsDesc}
                  value={inspectedSchools}
                  icon={<CheckIcon />}
                  color="emerald"
                  trend={{ value: 5.1, label: t.lastUpdated }}
                />
                <StatsCard
                  title={t.satisfiedSchools}
                  description={t.satisfiedSchoolsDesc}
                  value={satisfiedSchools}
                  icon={<StarIcon />}
                  color="amber"
                  trend={{ value: 3.8, label: t.lastUpdated }}
                />
                <StatsCard
                  title={t.satisfactionPct}
                  description={t.satisfactionPctDesc}
                  value={satisfactionPct}
                  suffix="%"
                  icon={<PercentIcon />}
                  color="violet"
                  trend={{ value: 1.2, label: t.lastUpdated }}
                />
              </div>
            )}

            {/* Map preview */}
            <div className="dark:bg-slate-800/60 bg-white rounded-2xl shadow-sm ring-1 dark:ring-slate-700/50 ring-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b dark:border-slate-700 border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold dark:text-slate-100 text-slate-900">
                    {t.mapTitle}
                  </h2>
                  <p className="text-xs dark:text-slate-400 text-slate-500 mt-0.5">
                    {t.mapSubtitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('map')}
                  className="text-xs font-semibold dark:text-blue-400 text-blue-600 dark:hover:text-blue-300 hover:text-blue-800 cursor-pointer"
                >
                  {t.viewDetails} →
                </button>
              </div>
              <div className="h-72 sm:h-96">
                <UzbekistanMap />
              </div>
            </div>

            {/* Charts preview */}
            {!loading && viloyatStats.length > 0 && (
              <Charts
                viloyatStats={viloyatStats}
                totalSchools={totalSchools}
                inspectedSchools={inspectedSchools}
                satisfiedSchools={satisfiedSchools}
              />
            )}
          </div>
        )}

        {/* ── Map Tab ── */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black dark:text-slate-100 text-slate-900">
                {t.mapTitle}
              </h2>
              <p className="text-sm dark:text-slate-400 text-slate-500 mt-0.5">
                {t.mapSubtitle}
              </p>
            </div>
            <div className="dark:bg-slate-800/60 bg-white rounded-2xl shadow-sm ring-1 dark:ring-slate-700/50 ring-slate-200 overflow-hidden">
              <div className="h-[calc(100vh-220px)] min-h-[500px]">
                <UzbekistanMap />
              </div>
            </div>
          </div>
        )}

        {/* ── Regions Tab ── */}
        {activeTab === 'regions' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black dark:text-slate-100 text-slate-900">
                {t.regionalBreakdown}
              </h2>
              <p className="text-sm dark:text-slate-400 text-slate-500 mt-0.5">
                {t.regionalBreakdownDesc}
              </p>
            </div>
            {loading ? (
              <div className="dark:bg-slate-800/60 bg-white rounded-2xl p-8 ring-1 dark:ring-slate-700/50 ring-slate-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 dark:border-blue-500 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm dark:text-slate-400 text-slate-500">{t.loading}</p>
                </div>
              </div>
            ) : (
              <RegionalTable stats={viloyatStats} />
            )}
          </div>
        )}

        {/* ── Charts Tab ── */}
        {activeTab === 'charts' && (
          <div className="space-y-4">
            {loading ? (
              <div className="dark:bg-slate-800/60 bg-white rounded-2xl p-8 ring-1 dark:ring-slate-700/50 ring-slate-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 dark:border-blue-500 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm dark:text-slate-400 text-slate-500">{t.loading}</p>
                </div>
              </div>
            ) : (
              <Charts
                viloyatStats={viloyatStats}
                totalSchools={totalSchools}
                inspectedSchools={inspectedSchools}
                satisfiedSchools={satisfiedSchools}
              />
            )}
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="mt-12 border-t dark:border-slate-800 border-slate-200 py-6">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs dark:text-slate-500 text-slate-400">
            {t.footerText}
          </p>
          <p className="text-xs dark:text-slate-600 text-slate-300">
            © {new Date().getFullYear()} Real Holat
          </p>
        </div>
      </footer>
    </div>
  );
}

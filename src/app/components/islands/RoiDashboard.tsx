import React, { useState, useCallback, useMemo } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Legend,
} from 'recharts';

/* ──────────────────────────────────────────────
 * Data model
 * ────────────────────────────────────────────── */

interface Platform {
  id: string;
  name: string;
  tagline: string;
  color: string;
  metrics: {
    velocity: number;       // Dev velocity uplift %
    quality: number;        // Code quality improvement %
    costSavings: number;    // Cost savings %
    adoption: number;       // Team adoption rate %
    automation: number;     // Workflow automation coverage %
    satisfaction: number;   // Developer satisfaction score
  };
  highlights: string[];
}

const PLATFORMS: Platform[] = [
  {
    id: 'toolbox',
    name: 'Toolbox',
    tagline: 'CLI & developer productivity suite',
    color: '#33FF88',
    metrics: {
      velocity: 42,
      quality: 35,
      costSavings: 28,
      adoption: 88,
      automation: 65,
      satisfaction: 91,
    },
    highlights: [
      'Modular CLI architecture with aliaser.zsh ecosystem',
      'Cross-machine config sync via dotfiles + SSH identity switching',
      'rg/fzf/bat pipeline: 3x faster code navigation',
    ],
  },
  {
    id: 'workflow',
    name: 'Workflow',
    tagline: 'Agentic development orchestration',
    color: '#3B82F6',
    metrics: {
      velocity: 58,
      quality: 44,
      costSavings: 36,
      adoption: 72,
      automation: 82,
      satisfaction: 87,
    },
    highlights: [
      'ActivityWatch → local LLM → digest pipeline',
      'State-Mode Development methodology across Angular/React',
      'Zellij multiplexer with persistent session architecture',
    ],
  },
  {
    id: 'evalengine',
    name: 'EvalEngine',
    tagline: 'AI assistant benchmarking & evaluation',
    color: '#F59E0B',
    metrics: {
      velocity: 34,
      quality: 62,
      costSavings: 22,
      adoption: 64,
      automation: 48,
      satisfaction: 78,
    },
    highlights: [
      'Comparative benchmarks: Claude Opus 4.5, GPT-4o, GPT-5.2',
      'Shared frontend/backend prompt suite in Cursor IDE',
      'judge CLI: LLM-powered code review via Anthropic API',
    ],
  },
  {
    id: 'automation',
    name: 'Automation',
    tagline: 'Infrastructure & pipeline automation',
    color: '#F472B6',
    metrics: {
      velocity: 52,
      quality: 48,
      costSavings: 55,
      adoption: 76,
      automation: 92,
      satisfaction: 84,
    },
    highlights: [
      'ProxyMockApi (.NET 8/YARP) chaos/resilience testing',
      'ScraperJobRunner (Node.js 22) scheduled scraping pipeline',
      'ermis-transcriber: 13-stage Whisper ASR normalization, 20/20 suite',
    ],
  },
  {
    id: 'onboarded',
    name: 'Onboarded',
    tagline: 'Full-stack monorepo & portal platform',
    color: '#A78BFA',
    metrics: {
      velocity: 46,
      quality: 56,
      costSavings: 40,
      adoption: 68,
      automation: 72,
      satisfaction: 82,
    },
    highlights: [
      'Nx v22 monorepo with Angular 20 portal (@onboarded/portal)',
      'Fully scoped Nx CLI syntax with justfile/Makefile tooling',
      'datagen CLI for AI training data generation',
    ],
  },
];

const METRIC_LABELS: Record<string, string> = {
  velocity: 'Dev Velocity',
  quality: 'Code Quality',
  costSavings: 'Cost Savings',
  adoption: 'Team Adoption',
  automation: 'Automation',
  satisfaction: 'Satisfaction',
};

/* ──────────────────────────────────────────────
 * Sub-components
 * ────────────────────────────────────────────── */

const MetricBar: React.FC<{ label: string; value: number; color: string; maxValue?: number }> = ({
  label, value, color, maxValue = 100,
}) => (
  <div className="flex items-center gap-3">
    <span className="w-24 text-xs text-right shrink-0" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#94A3B8' }}>
      {label}
    </span>
    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#1E293B' }}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${(value / maxValue) * 100}%`, backgroundColor: color }}
      />
    </div>
    <span className="w-10 text-xs text-right" style={{ fontFamily: 'JetBrains Mono, monospace', color }}>
      {value}%
    </span>
  </div>
);

const PlatformCard: React.FC<{
  platform: Platform;
  isActive: boolean;
  onClick: () => void;
}> = ({ platform, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left p-4 rounded-lg border transition-all duration-300"
    style={{
      backgroundColor: isActive ? `${platform.color}10` : '#121926',
      borderColor: isActive ? `${platform.color}40` : '#33415520',
      boxShadow: isActive ? `0 0 20px ${platform.color}12` : 'none',
    }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: platform.color }} />
      <span className="text-sm font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: isActive ? platform.color : '#E2E8F0' }}>
        {platform.name}
      </span>
    </div>
    <p className="text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#94A3B8' }}>
      {platform.tagline}
    </p>
  </button>
);

/* ──────────────────────────────────────────────
 * Custom tooltip
 * ────────────────────────────────────────────── */

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded border"
      style={{ backgroundColor: '#0A0E17', borderColor: '#334155', fontFamily: 'JetBrains Mono, monospace' }}
    >
      <p className="text-xs mb-1" style={{ color: '#94A3B8' }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-xs font-medium" style={{ color: p.color || p.fill }}>
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  );
};

/* ──────────────────────────────────────────────
 * Comparison bar chart data
 * ────────────────────────────────────────────── */

type MetricKey = keyof Platform['metrics'];
const METRIC_KEYS: MetricKey[] = ['velocity', 'quality', 'costSavings', 'adoption', 'automation', 'satisfaction'];

/* ──────────────────────────────────────────────
 * Main dashboard
 * ────────────────────────────────────────────── */

export const RoiDashboard: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('toolbox');
  const [view, setView] = useState<'radar' | 'compare'>('radar');

  const activePlatform = useMemo(
    () => PLATFORMS.find((p) => p.id === activeId)!,
    [activeId]
  );

  const radarData = useMemo(
    () =>
      METRIC_KEYS.map((key) => ({
        metric: METRIC_LABELS[key],
        value: activePlatform.metrics[key],
        fullMark: 100,
      })),
    [activePlatform]
  );

  const comparisonData = useMemo(
    () =>
      METRIC_KEYS.map((key) => {
        const row: Record<string, any> = { metric: METRIC_LABELS[key] };
        PLATFORMS.forEach((p) => {
          row[p.id] = p.metrics[key];
        });
        return row;
      }),
    []
  );

  const handleSelect = useCallback((id: string) => setActiveId(id), []);

  /* Aggregate headline stats */
  const avgVelocity = Math.round(PLATFORMS.reduce((s, p) => s + p.metrics.velocity, 0) / PLATFORMS.length);
  const avgQuality = Math.round(PLATFORMS.reduce((s, p) => s + p.metrics.quality, 0) / PLATFORMS.length);
  const avgCost = Math.round(PLATFORMS.reduce((s, p) => s + p.metrics.costSavings, 0) / PLATFORMS.length);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#E2E8F0' }}>
      {/* ── Headline metrics ─────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Avg Velocity Uplift', value: `+${avgVelocity}%`, color: '#33FF88' },
          { label: 'Avg Quality Gain', value: `+${avgQuality}%`, color: '#3B82F6' },
          { label: 'Avg Cost Savings', value: `${avgCost}%`, color: '#F59E0B' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="p-4 rounded-lg border text-center"
            style={{ backgroundColor: '#0A0E1780', borderColor: `${color}20` }}
          >
            <p className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', color }}>
              {value}
            </p>
            <p className="text-[10px] md:text-xs uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#94A3B8' }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* ── View toggle ─────────────────── */}
      <div className="flex items-center gap-2 mb-6">
        {(['radar', 'compare'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className="px-4 py-1.5 rounded text-xs transition-all duration-200"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              backgroundColor: view === v ? '#33FF8815' : 'transparent',
              color: view === v ? '#33FF88' : '#94A3B8',
              border: `1px solid ${view === v ? '#33FF8830' : '#33415530'}`,
            }}
          >
            {v === 'radar' ? 'Platform Drill-down' : 'Cross-platform Compare'}
          </button>
        ))}
      </div>

      {/* ── Main content ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar: platform selector */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          {PLATFORMS.map((p) => (
            <PlatformCard
              key={p.id}
              platform={p}
              isActive={activeId === p.id}
              onClick={() => handleSelect(p.id)}
            />
          ))}
        </div>

        {/* Chart area */}
        <div className="lg:col-span-8">
          <div
            className="rounded-lg border p-4 md:p-6"
            style={{ backgroundColor: '#0A0E1760', borderColor: '#33415530' }}
          >
            {view === 'radar' ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activePlatform.color }} />
                  <h3
                    className="text-sm font-semibold"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: activePlatform.color }}
                  >
                    {activePlatform.name} — ROI Profile
                  </h3>
                </div>

                <div className="w-full" style={{ height: 320 }}>
                  <ResponsiveContainer>
                    <RadarChart data={radarData} cx="50%" cy="50%">
                      <PolarGrid stroke="#33415540" />
                      <PolarAngleAxis
                        dataKey="metric"
                        tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fill: '#334155', fontSize: 9, fontFamily: 'JetBrains Mono, monospace' }}
                      />
                      <Radar
                        name={activePlatform.name}
                        dataKey="value"
                        stroke={activePlatform.color}
                        fill={activePlatform.color}
                        fillOpacity={0.15}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Metric bars */}
                <div className="mt-4 space-y-2">
                  {METRIC_KEYS.map((key) => (
                    <MetricBar
                      key={key}
                      label={METRIC_LABELS[key]}
                      value={activePlatform.metrics[key]}
                      color={activePlatform.color}
                    />
                  ))}
                </div>

                {/* Highlights */}
                <div className="mt-6 pt-4" style={{ borderTop: '1px solid #33415530' }}>
                  <p
                    className="text-xs uppercase tracking-widest mb-3"
                    style={{ fontFamily: 'JetBrains Mono, monospace', color: '#64748B' }}
                  >
                    Key Outcomes
                  </p>
                  <ul className="space-y-2">
                    {activePlatform.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: '#CBD5E1' }}>
                        <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: activePlatform.color }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <h3
                  className="text-sm font-semibold mb-4"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#E2E8F0' }}
                >
                  Cross-platform ROI Comparison
                </h3>

                <div className="w-full" style={{ height: 380 }}>
                  <ResponsiveContainer>
                    <BarChart data={comparisonData} barGap={2} barCategoryGap="20%">
                      <CartesianGrid strokeDasharray="3 3" stroke="#33415530" />
                      <XAxis
                        dataKey="metric"
                        tick={{ fill: '#94A3B8', fontSize: 9, fontFamily: 'JetBrains Mono, monospace' }}
                        angle={-20}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis
                        tick={{ fill: '#334155', fontSize: 9, fontFamily: 'JetBrains Mono, monospace' }}
                        domain={[0, 100]}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}
                      />
                      {PLATFORMS.map((p) => (
                        <Bar key={p.id} dataKey={p.id} name={p.name} fill={p.color} radius={[2, 2, 0, 0]} />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoiDashboard;

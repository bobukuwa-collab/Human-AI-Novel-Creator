'use client'

type Props = {
  sessionCount: number
}

const LEVELS = [
  { min: 0,  max: 0,  label: '未診断',     color: 'bg-gray-100 text-gray-500',         bar: 0  },
  { min: 1,  max: 2,  label: '診断中',     color: 'bg-yellow-100 text-yellow-700',      bar: 20 },
  { min: 3,  max: 4,  label: '輪郭が見えてきた', color: 'bg-orange-100 text-orange-700', bar: 45 },
  { min: 5,  max: 9,  label: '精度 高め',  color: 'bg-indigo-100 text-indigo-700',      bar: 70 },
  { min: 10, max: Infinity, label: '精度 最高', color: 'bg-purple-100 text-purple-700', bar: 100 },
]

function getLevel(count: number) {
  return LEVELS.find((l) => count >= l.min && count <= l.max) ?? LEVELS[0]
}

export function AccuracyBadge({ sessionCount }: Props) {
  const level = getLevel(sessionCount)

  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-gray-500">診断精度</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${level.color}`}>
            {level.label}
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-700"
            style={{ width: `${level.bar}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">
          {sessionCount} 回のセッションを反映 — 書けば書くほど精度が上がります
        </p>
      </div>
    </div>
  )
}

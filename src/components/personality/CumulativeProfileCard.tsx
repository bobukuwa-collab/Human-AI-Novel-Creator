'use client'

import { AccuracyBadge } from './AccuracyBadge'

type Props = {
  sessionCount: number
  psychopathy_score: number
  strategist_score: number
  narcissism_score: number
  empathy_score: number
  vocabulary_score: number
  writer_type: string
  analysis_text: string
}

type BarProps = { label: string; value: number; color: string; emoji: string }

function ScoreBar({ label, value, color, emoji }: BarProps) {
  const display = Math.round(value)
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="font-medium text-gray-700">{emoji} {label}</span>
        <span className="font-bold" style={{ color }}>{display}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${display}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function CumulativeProfileCard({
  sessionCount,
  psychopathy_score,
  strategist_score,
  narcissism_score,
  empathy_score,
  vocabulary_score,
  writer_type,
  analysis_text,
}: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border border-indigo-200 shadow-lg">
      {/* ヘッダー */}
      <div className="p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <p className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-1">あなたの作家本質</p>
        <h2 className="text-2xl font-black">{writer_type}</h2>
        <p className="text-xs opacity-70 mt-1">{sessionCount} 作品の累積分析</p>
      </div>

      {/* 精度バッジ */}
      <div className="bg-white px-5 pt-4 pb-2">
        <AccuracyBadge sessionCount={sessionCount} />
      </div>

      {/* スコアバー */}
      <div className="bg-white px-5 pb-5 pt-3 space-y-3.5">
        <ScoreBar label="サイコパス度" value={psychopathy_score} color="#ef4444" emoji="🧊" />
        <ScoreBar label="策士度"       value={strategist_score}  color="#f97316" emoji="♟️" />
        <ScoreBar label="自己愛度"     value={narcissism_score}  color="#eab308" emoji="👑" />
        <ScoreBar label="共感力"       value={empathy_score}     color="#ec4899" emoji="💗" />
        <ScoreBar label="語彙知性"     value={vocabulary_score}  color="#8b5cf6" emoji="📖" />
      </div>

      {/* 分析テキスト */}
      <div className="bg-indigo-50 border-t border-indigo-100 px-5 py-4">
        <p className="text-sm text-indigo-800 leading-relaxed italic">&ldquo;{analysis_text}&rdquo;</p>
      </div>
    </div>
  )
}

'use client'

export function OnboardingBanner() {
  return (
    <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-5">
      <div className="flex items-start gap-4">
        <div className="text-3xl">✍️</div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-indigo-900 mb-1">
            書くほど、診断が育ちます
          </h3>
          <p className="text-xs text-indigo-700 leading-relaxed">
            Anima は、あなたが書き続けることで診断の精度が上がっていきます。
            初回はおおまかなプロファイル。3回書けば輪郭が見え始め、
            10回を超えると「本質」に迫ります。
          </p>
          <div className="flex gap-3 mt-3 text-xs text-indigo-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />1回 — 診断スタート
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />3回 — 輪郭が見える
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />10回 — 精度最高
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

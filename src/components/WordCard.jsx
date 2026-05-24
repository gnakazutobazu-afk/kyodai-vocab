import { THEME_LABELS } from "./FilterBar";

const THEME_COLORS = {
  general:    "bg-gray-100 text-gray-700",
  science:    "bg-blue-100 text-blue-700",
  philosophy: "bg-purple-100 text-purple-700",
  psychology: "bg-pink-100 text-pink-700",
  history:    "bg-amber-100 text-amber-700",
  society:    "bg-green-100 text-green-700",
  language:   "bg-indigo-100 text-indigo-700",
  arts:       "bg-rose-100 text-rose-700",
  technology: "bg-cyan-100 text-cyan-700",
  nature:     "bg-emerald-100 text-emerald-700",
  human_mind: "bg-violet-100 text-violet-700",
  culture:    "bg-orange-100 text-orange-700",
  medicine:   "bg-teal-100 text-teal-700",
};

const LEVEL_COLORS = {
  頻出: "bg-red-600 text-white",
  重要: "bg-navy text-white",
  発展: "bg-emerald-700 text-white",
};

function highlightWord(sentence, word) {
  if (!sentence || !word) return sentence;
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped}(?:ed|ing|s|es|er|est|ly|tion|ness|ment)?)`, "gi");
  const parts = sentence.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="highlight-word">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function renderJapanese(text) {
  if (!text) return null;
  const parts = text.split(/(【[^】]+】)/g);
  return parts.map((part, i) => {
    if (part.startsWith("【") && part.endsWith("】")) {
      return (
        <strong key={i} className="font-bold text-navy-dark">
          {part.slice(1, -1)}
        </strong>
      );
    }
    return part;
  });
}

export default function WordCard({ word: data, isOpen, onToggle }) {
  const themeLabel = THEME_LABELS[data.theme_tag] || data.theme_tag;
  const themeColor = THEME_COLORS[data.theme_tag] || "bg-gray-100 text-gray-700";
  const levelColor = LEVEL_COLORS[data.level] || "bg-gray-400 text-white";

  return (
    <div
      className={`bg-white rounded-xl border transition-shadow ${
        isOpen ? "shadow-lg border-gold" : "shadow-sm border-gray-200 hover:shadow-md"
      }`}
    >
      {/* Card header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-4 sm:p-5"
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-garamond text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                {data.word}
              </span>
              <span className="font-noto-sans text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {data.pos_ja}
              </span>
            </div>
            <p className="font-noto-sans text-sm text-muted mt-1 leading-relaxed">
              {data.meaning_ja}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className={`font-noto-sans text-xs font-bold px-2 py-0.5 rounded ${levelColor}`}>
              {data.level}
            </span>
            <svg
              className={`w-4 h-4 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <span className={`font-noto-sans text-xs px-2 py-0.5 rounded-full ${themeColor}`}>
            ● {themeLabel}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <>
          <div className="h-0.5 bg-gold mx-4" />
          <div className="p-4 sm:p-5 space-y-5">

            {/* 📖 例文ブロック */}
            {data.example_en && (
              <div>
                <h3 className="font-noto-sans text-xs font-semibold text-navy uppercase tracking-wide mb-2 flex items-center gap-1">
                  <span>📖 例文</span>
                  {data.example_citation && (
                    <span className="text-gold font-normal normal-case">
                      （{data.example_citation}年 京大入試より）
                    </span>
                  )}
                </h3>
                <div className="border-l-2 border-gold pl-3">
                  <p className="font-garamond text-base sm:text-lg text-ink leading-relaxed">
                    {highlightWord(data.example_en, data.word)}
                  </p>
                  {data.example_ja && (
                    <p className="font-noto-sans text-sm text-muted mt-1 leading-relaxed">
                      {renderJapanese(data.example_ja)}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 🔍 解説ブロック */}
            {!data.has_detail ? (
              <div className="text-center py-3 text-muted font-noto-sans text-sm">
                📝 解説は順次追加中です
              </div>
            ) : (
              <div>
                <h3 className="font-noto-sans text-xs font-semibold text-navy uppercase tracking-wide mb-3">
                  🔍 解説
                </h3>
                <div className="space-y-2">
                  {/* 🌱 語源 — full width */}
                  {data.etymology && (
                    <DetailRow emoji="🌱" label="語源" content={data.etymology} />
                  )}

                  {/* 🔁 類義語 + ↔️ 対義語 — 2カラム */}
                  {(data.synonyms || data.antonyms) && (
                    <div className="grid grid-cols-2 gap-2">
                      {data.synonyms && (
                        <DetailRow emoji="🔁" label="類義語" content={data.synonyms} compact />
                      )}
                      {data.antonyms && (
                        <DetailRow emoji="↔️" label="対義語" content={data.antonyms} compact />
                      )}
                    </div>
                  )}

                  {/* 📌 京大での使われ方 — full width */}
                  {data.kyodai_usage && (
                    <DetailRow emoji="📌" label="京大での使われ方" content={data.kyodai_usage} accent />
                  )}
                </div>

                {/* 💡 覚え方 — ゴールド背景ボックス */}
                {data.memory_tip && (
                  <div className="mt-3 rounded-lg p-3 bg-gold/10 border border-gold/30">
                    <p className="font-noto-sans text-xs font-semibold text-gold-dark mb-1">
                      💡 覚え方
                    </p>
                    <p className="font-noto-sans text-sm text-ink leading-relaxed">
                      {data.memory_tip}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function DetailRow({ emoji, label, content, accent, compact }) {
  return (
    <div
      className={`rounded-lg p-2.5 ${
        accent ? "bg-navy-dark/5 border border-navy/20" : "bg-cream"
      } ${compact ? "" : "w-full"}`}
    >
      <dt
        className={`font-noto-sans text-xs font-semibold mb-0.5 ${
          accent ? "text-navy" : "text-muted"
        }`}
      >
        {emoji} {label}
      </dt>
      <dd className="font-noto-sans text-sm text-ink leading-relaxed">{content}</dd>
    </div>
  );
}

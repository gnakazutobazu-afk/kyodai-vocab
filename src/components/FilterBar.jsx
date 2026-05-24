const THEME_LABELS = {
  general:    "汎用語",
  science:    "科学",
  philosophy: "哲学",
  psychology: "心理",
  history:    "歴史",
  society:    "社会",
  language:   "言語",
  arts:       "芸術",
  technology: "テクノロジー",
  nature:     "自然",
  human_mind: "人間の心",
  culture:    "文化",
  medicine:   "医学",
};

const LEVEL_OPTIONS = ["頻出", "重要", "発展"];

const LEVEL_COLORS = {
  頻出: { active: "bg-red-600 text-white border-red-600", hover: "hover:border-red-400 hover:text-red-600" },
  重要: { active: "bg-navy text-white border-navy",       hover: "hover:border-navy hover:text-navy" },
  発展: { active: "bg-emerald-700 text-white border-emerald-700", hover: "hover:border-emerald-600 hover:text-emerald-700" },
};

export default function FilterBar({
  selectedThemes,
  onThemeToggle,
  selectedLevel,
  onLevelChange,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount,
}) {
  return (
    <div className="sticky top-[68px] z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 space-y-3">
        {/* ジャンルフィルタ */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="font-noto-sans text-xs text-muted font-medium mr-1 shrink-0">ジャンル</span>
          <button
            onClick={() => onThemeToggle(null)}
            className={`font-noto-sans text-xs px-3 py-1 rounded-full border transition-colors ${
              selectedThemes.length === 0
                ? "bg-navy text-white border-navy"
                : "bg-white text-ink border-gray-300 hover:border-navy hover:text-navy"
            }`}
          >
            すべて
          </button>
          {Object.entries(THEME_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => onThemeToggle(key)}
              className={`font-noto-sans text-xs px-3 py-1 rounded-full border transition-colors ${
                selectedThemes.includes(key)
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-ink border-gray-300 hover:border-navy hover:text-navy"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 頻度フィルタ + 検索 + カウンター */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-noto-sans text-xs text-muted font-medium shrink-0">頻度</span>
          <button
            onClick={() => onLevelChange(null)}
            className={`font-noto-sans text-xs px-3 py-1 rounded-full border transition-colors ${
              selectedLevel === null
                ? "bg-gray-600 text-white border-gray-600"
                : "bg-white text-ink border-gray-300 hover:border-gray-400 hover:text-gray-600"
            }`}
          >
            すべて
          </button>
          {LEVEL_OPTIONS.map((level) => {
            const colors = LEVEL_COLORS[level];
            return (
              <button
                key={level}
                onClick={() => onLevelChange(level)}
                className={`font-noto-sans text-xs px-3 py-1 rounded-full border transition-colors ${
                  selectedLevel === level
                    ? colors.active
                    : `bg-white text-ink border-gray-300 ${colors.hover}`
                }`}
              >
                {level}
              </button>
            );
          })}

          {/* 検索 */}
          <div className="ml-auto flex items-center gap-2">
            <input
              type="search"
              placeholder="単語・意味を検索..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="font-noto-sans text-sm border border-gray-300 rounded-lg px-3 py-1.5 w-48 sm:w-64 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
            />
            <span className="font-noto-sans text-xs text-muted whitespace-nowrap">
              {filteredCount} / {totalCount} 語
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { THEME_LABELS };

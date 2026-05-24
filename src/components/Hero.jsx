const BADGES = [
  "📅 2000〜2026年 全問対応",
  "📖 語源・類義語・対義語つき",
  "🎯 京大頻出パターン解説",
  "🔖 頻出・重要・発展 3段階分類",
];

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-navy-dark to-navy-mid text-white py-14 px-4 sm:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-noto-serif text-3xl sm:text-5xl font-bold tracking-tight mb-3">
          京大英語頻出単語
        </h1>
        <p className="font-garamond text-lg sm:text-2xl text-gold-light italic mb-6 tracking-wide">
          Complete Vocabulary Database 2000–2026
        </p>
        <p className="font-noto-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">
          2000〜2026年の京都大学英語入試を独自に分析。出現頻度の高い単語および重要な学術語を2,000語以上収録。語源・類義語・対義語・京大頻出パターンの解説つきで、本番で使える語彙力の習得を支援します。
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {BADGES.map((badge) => (
            <span
              key={badge}
              className="font-noto-sans text-xs sm:text-sm bg-white/10 border border-white/20 text-white/90 px-3 py-1.5 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

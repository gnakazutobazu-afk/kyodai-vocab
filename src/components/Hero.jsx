const BADGES = [
  "📅 2000〜2026年 京大入試を集計",
  "📚 テーマ別 1,222語",
  "✍️ 例文はすべて書き下ろし",
  "🔖 京大出題回数・年度つき",
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
          書籍『京単』のWeb版。2000〜2026年の京都大学英語入試の英文を集計し、京大受験に必要な1,222語をテーマ別に収録。各語に京大での出題回数・出題年度、派生語・語法、書き下ろし例文をつけています。
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

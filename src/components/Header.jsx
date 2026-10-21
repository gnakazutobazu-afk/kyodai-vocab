export default function Header({ totalCount }) {
  return (
    <header className="sticky top-0 z-50 bg-navy-dark shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex flex-col leading-tight">
          <span className="font-garamond text-xs sm:text-sm text-gold tracking-widest">
            Kyoto University · English Vocabulary Database
          </span>
          <span className="font-noto-serif text-lg sm:text-2xl font-bold text-white tracking-wide">
            京単オンライン
          </span>
        </a>
        <div className="font-noto-sans text-sm text-white/70 shrink-0 flex items-center gap-3">
          <a href="/guide" className="text-white/90 hover:text-gold-light underline underline-offset-4">使い方</a>
          <span>
            <span className="text-gold-light font-semibold">{totalCount.toLocaleString()}</span>
            <span className="ml-1">語収録</span>
          </span>
        </div>
      </div>
    </header>
  );
}

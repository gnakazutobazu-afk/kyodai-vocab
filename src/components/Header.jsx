export default function Header({ totalCount }) {
  return (
    <header className="sticky top-0 z-50 bg-navy-dark shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="font-garamond text-xs sm:text-sm text-gold tracking-widest">
            Kyoto University · English Vocabulary Database
          </span>
          <span className="font-noto-serif text-lg sm:text-2xl font-bold text-white tracking-wide">
            京大英語頻出単語
          </span>
        </div>
        <div className="font-noto-sans text-sm text-white/70 shrink-0">
          <span className="text-gold-light font-semibold">{totalCount.toLocaleString()}</span>
          <span className="ml-1">語収録</span>
        </div>
      </div>
    </header>
  );
}

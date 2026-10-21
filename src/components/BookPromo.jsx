import { BOOK } from "../book";

function BuyButton({ href, label, sub }) {
  if (!href) {
    return (
      <span className="font-noto-sans text-sm px-4 py-2 rounded-lg border border-white/30 text-white/60 cursor-default">
        {label}（準備中）
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-noto-sans text-sm px-4 py-2 rounded-lg bg-white text-navy-dark font-semibold hover:bg-gold-light transition-colors"
    >
      {label}
      {sub && <span className="ml-1 text-xs font-normal text-muted">{sub}</span>}
    </a>
  );
}

export default function BookPromo({ compact = false }) {
  return (
    <section className={`bg-navy-dark text-white rounded-xl ${compact ? "p-5" : "p-6 sm:p-8"}`}>
      <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
        <div className="shrink-0 mx-auto sm:mx-0 w-24 h-36 bg-navy border border-white/20 rounded flex flex-col items-center justify-center shadow-lg">
          <span className="font-garamond text-[7px] tracking-widest text-gold-light">KYOTO UNIV. VOCAB</span>
          <span className="font-noto-serif text-3xl font-bold tracking-widest mt-1">京単</span>
        </div>
        <div className="flex-1">
          <p className="font-garamond text-xs tracking-widest text-gold-light">THE BOOK</p>
          <h2 className="font-noto-serif text-xl sm:text-2xl font-bold mt-1">書籍『{BOOK.title}』</h2>
          <p className="font-noto-sans text-sm text-white/80 mt-1">{BOOK.subtitle}</p>
          <p className="font-noto-sans text-sm text-white/80 mt-3 leading-relaxed">
            このサイトの1,222語を、テーマ別15章・赤シート対応の単語帳にまとめました。
            書籍の例文はすべて書き下ろしで、このサイトの過去問例文とは別のものです。
            <strong className="text-white">本で覚えて、サイトで京大の実際の英文を確かめる</strong>使い方がおすすめです。
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <BuyButton href={BOOK.paperbackUrl} label="Amazonで紙の本を買う" sub="税込2,420円" />
            <BuyButton href={BOOK.kindleUrl} label="Kindle版を買う" sub="1,650円" />
          </div>
        </div>
      </div>
    </section>
  );
}

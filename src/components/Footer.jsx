export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/60 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center font-noto-sans text-sm space-y-1">
        <p className="text-white/80 font-semibold">京大英語頻出単語</p>
        <p>2000〜2026年の京都大学英語入試を独自に分析したデータベース</p>
        <p className="text-xs mt-2 text-white/40">
          掲載の例文は学習目的のため引用しています。著作権は各年度の出題機関に帰属します。
        </p>
        <p className="text-xs mt-3">
          <a href="/privacy-policy.html" className="text-white/40 hover:text-white/70 underline underline-offset-2">
            プライバシーポリシー
          </a>
        </p>
      </div>
    </footer>
  );
}

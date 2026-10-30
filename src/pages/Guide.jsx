import BookPromo from "../components/BookPromo";
import { REPORT_FORM_URL } from "../book";

export function Section({ title, children }) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
      <h2 className="font-noto-serif text-lg sm:text-xl font-bold text-navy-dark border-b-2 border-gold pb-2 mb-3">
        {title}
      </h2>
      <div className="font-noto-sans text-sm sm:text-base text-ink leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function Guide() {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 space-y-5">
      <div>
        <a href="/" className="font-noto-sans text-sm text-navy hover:underline">← 単語一覧に戻る</a>
        <h1 className="font-noto-serif text-2xl sm:text-3xl font-bold text-navy-dark mt-3">京単オンラインの使い方</h1>
        <p className="font-noto-sans text-sm text-muted mt-2">
          京大英語の頻出語1,222語を、実際の入試英文の例文・語源・覚え方とあわせて確認できる無料の単語データベースです。
        </p>
      </div>

      <Section title="1. このサイトについて">
        <p>2000〜2026年度の京都大学の英語入試に出た英文を集計し、京大受験に必要な1,222語を選びました。書籍『京単』と同じ語を収録しています。</p>
        <p>各単語には次の情報があります。</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>京大 n回</strong>：その語が京大入試の英文に出た年度の数と、出題年度</li>
          <li><strong>例文</strong>：実際の京大入試の英文から選んだ1文と和訳（出題年度つき）</li>
          <li><strong>語源・覚え方</strong>：語の成り立ちと、同じ語根を持つ語とのつながり</li>
          <li><strong>派生語・語法</strong>：品詞の変化、よく使う形、紛らわしい語との区別</li>
        </ul>
      </Section>

      <Section title="2. 単語を探す">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>ジャンル</strong>：「科学」「心と感情」など、書籍の章に対応したテーマで絞り込めます。複数選ぶこともできます。</li>
          <li><strong>頻度</strong>：京大での出題回数で絞り込めます。<span className="text-red-600 font-semibold">頻出</span>は5回以上、<span className="text-navy font-semibold">重要</span>は2〜4回、<span className="text-emerald-700 font-semibold">発展</span>は京大の英文には出ていないものの難関大で頻出の語です。</li>
          <li><strong>検索</strong>：英単語でも、日本語の意味でも検索できます。</li>
        </ul>
        <p>カードをタップすると、例文や語源などの詳しい解説が開きます。</p>
      </Section>

      <Section title="3. おすすめの学習法">
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>まず「頻出」から</strong>：頻度で「頻出」を選び、京大で何度も出ている語を優先して固めます。</li>
          <li><strong>例文で文脈ごと覚える</strong>：京大の英文は硬い論説文が中心です。単語の意味だけでなく、どんな話題・どんな文で使われるかを例文で確認しましょう。</li>
          <li><strong>語源で仲間をまとめる</strong>：「spect＝見る」のように語根を押さえると、知らない語の意味も推測できるようになります。和訳問題での語の処理にも効きます。</li>
          <li><strong>書籍と併用する</strong>：書籍『京単』は赤シートで繰り返しテストする用、このサイトは京大の実際の英文で確かめる用、と役割を分けると効率的です。</li>
        </ol>
      </Section>

      <Section title="4. 書籍『京単』との違い">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cream">
                <th className="text-left p-2 border border-gray-200"></th>
                <th className="text-left p-2 border border-gray-200">書籍『京単』</th>
                <th className="text-left p-2 border border-gray-200">京単オンライン</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border border-gray-200 font-semibold">収録語</td><td className="p-2 border border-gray-200">1,222語（同じ）</td><td className="p-2 border border-gray-200">1,222語（同じ）</td></tr>
              <tr><td className="p-2 border border-gray-200 font-semibold">例文</td><td className="p-2 border border-gray-200">覚えやすい書き下ろし例文</td><td className="p-2 border border-gray-200">京大入試の実際の英文</td></tr>
              <tr><td className="p-2 border border-gray-200 font-semibold">得意なこと</td><td className="p-2 border border-gray-200">赤シートでの反復テスト・通し学習</td><td className="p-2 border border-gray-200">検索・語源・本番の英文での確認</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <BookPromo />

      <Section title="ご利用にあたって">
        <p>例文は学習目的で京都大学の入試問題から引用しています。著作権は各原著作者に帰属します。和訳は当サイトによるものです。</p>
        <p>
          内容の誤りに気づいた場合は、お手数ですが
          <a href={REPORT_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-navy underline underline-offset-2">ご報告フォーム</a>
          からお知らせください。これまでの修正は<a href="/errata" className="text-navy underline underline-offset-2">修正履歴</a>にまとめています。
        </p>
      </Section>
    </main>
  );
}

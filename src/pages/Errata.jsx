import { useState } from "react";
import { Section } from "./Guide";
import { REPORT_FORM_URL } from "../book";
import { NUMBER_MAP, MOVED } from "./errataData";

// 版・刷ごとの修正内容。新しいものを上に足していく
const BOOK_HISTORY = [
  {
    edition: "第2版第2刷",
    date: "2026年10月30日",
    note: "Amazonの販売ページへの反映には数日かかることがあります。見出し語番号・ページ数（226ページ）は第2版と同じです。",
    items: [
      {
        title: "赤シートで赤い文字が透けて見えることがある問題を改善（紙の本）",
        body: "赤い文字（訳語・例文の該当部分など）の印刷色を、赤シートで消えやすい色に変えました。以前の色は印刷時にわずかに青み・黒みが混ざり、赤シート越しに字の形がうっすら残ることがありました。",
      },
      {
        title: "見出し語と例文で品詞が食い違っていた8語を修正（紙の本・Kindle版）",
        table: [
          ["0562", "flock", "名「群れ」→ 動「群がる，集まる」（例文 Tourists flock to the temple に合わせた）"],
          ["0570", "stem", "名「茎，幹」→ 動「（stem from）〜に由来する」"],
          ["1048", "record", "例文を The temperature hit a record high（記録的な）から She broke the world record（記録）に差し替え"],
          ["1103", "range", "名「範囲」→ 動「（range from A to B）AからBに及ぶ」"],
          ["1120", "target", "名「標的」→ 動「標的にする；対象にする」"],
          ["1173", "parallel", "形「平行の」→ 名「類似（点）」（例文 interesting parallels に合わせた）"],
          ["1201", "span", "名「期間」→ 動「（期間・範囲に）わたる，及ぶ」"],
          ["1220", "doom", "名「運命」→ 動「（be doomed to）〜する運命にある」"],
        ],
        body: "もとの品詞の意味は「派生語・語法」欄に移しています。",
      },
    ],
  },
  {
    edition: "第2版",
    date: "2026年10月28日",
    note: "ページ数が222ページから226ページになりました。",
    items: [
      {
        title: "熟語の章に入っていた43語を、内容に合う章へ移動",
        body: "第13章「京大で差がつく熟語」に、熟語ではない単語が43語入っていたため、それぞれのテーマの章へ移しました。語が章をまたいで移動したため、初版と第2版では多くの見出し語の番号が変わっています（下の「番号の対応」で調べられます）。",
        moved: true,
      },
      {
        title: "長い見出し語が単語の途中で改行されていたのを修正",
        body: "notwithstanding などの長い見出し語が「notwithstandin / g」のように途中で切れていたため、欄に収まるよう文字の大きさを調整しました。",
      },
      {
        title: "前付けに「Web版（京単オンライン）について」を追加",
        body: "京単オンラインの紹介とQRコードを加え、「本書の使い方」の記号（品詞など）の説明を一覧の形にして見やすくしました。",
      },
    ],
  },
  {
    edition: "初版",
    date: "2026年10月21日",
    items: [{ title: "発行（1,222語・テーマ別15章）" }],
  },
];

const SITE_HISTORY = [
  {
    date: "2026年10月30日",
    items: [
      "京大入試の例文と見出しで品詞が食い違っていた25語の見出しを、例文での使われ方に合わせました（例：doubt を動詞「SVではないと思う」から、例文 beyond doubt に合わせて名詞「疑い」に）。もとの意味は「派生語・語法」欄に移しています。",
      "対象の25語：pride, puzzle, torment, individual, mature, conflict, praise, ridicule, exile, broadcast, routine, fluid, retreat, substitute, doubt, subordinate, force, focus, matter, feature, concern, balance, encounter, track, core",
      "例文が派生語で使われている語（intellectually, comforting など）は、見出しはそのままで「派生語・語法」欄にその派生語を書き足しました。",
      "同じつづりで品詞の違う項目が2つある語（figure, object, prompt, sanction, attribute）は、同じ例文が両方に付いていたため、例文に合う項目だけに載せるようにしました。",
      "書籍の第2版第2刷に合わせて stem・doom を動詞の見出しにしました。",
    ],
  },
  {
    date: "2026年10月27日",
    items: ["書籍の第2版に合わせて、43語のジャンル（章）を変更しました。"],
  },
  {
    date: "2026年10月21日",
    items: ["公開（書籍『京単』と同じ1,222語。京大入試の例文・語源・覚え方つき）。"],
  },
];

function NumberLookup() {
  const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();
  let hits = [];
  if (/^\d+$/.test(s)) {
    const n = Number(s);
    hits = NUMBER_MAP.filter(([a]) => a === n);
  } else if (s) {
    hits = NUMBER_MAP.filter(([, , w]) => w.toLowerCase().startsWith(s)).slice(0, 8);
  }
  return (
    <div className="mt-3 rounded-lg bg-cream p-3">
      <label className="block text-sm font-semibold text-navy-dark">
        番号の対応（初版 → 第2版以降）
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="初版の番号（例：1027）か単語"
          className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-base font-normal"
        />
      </label>
      {s && (
        <ul className="mt-2 space-y-1 text-sm">
          {hits.length === 0 && <li className="text-muted">見つかりませんでした。</li>}
          {hits.map(([a, b, w]) => (
            <li key={`${a}-${w}`}>
              <span className="font-garamond font-semibold">{w}</span>：初版 {String(a).padStart(4, "0")} → 第2版以降{" "}
              <strong>{String(b).padStart(4, "0")}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MovedList() {
  return (
    <details className="mt-2">
      <summary className="cursor-pointer text-sm text-navy underline underline-offset-2">移動した43語の一覧</summary>
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-cream">
              <th className="text-left p-2 border border-gray-200">見出し語</th>
              <th className="text-left p-2 border border-gray-200">初版</th>
              <th className="text-left p-2 border border-gray-200">第2版以降</th>
            </tr>
          </thead>
          <tbody>
            {MOVED.map(([w, from, to, ch, chJa]) => (
              <tr key={w}>
                <td className="p-2 border border-gray-200 font-garamond font-semibold">{w}</td>
                <td className="p-2 border border-gray-200">{String(from).padStart(4, "0")}（第13章）</td>
                <td className="p-2 border border-gray-200">
                  {String(to).padStart(4, "0")}（第{ch}章 {chJa}）
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function ReportButton() {
  return (
    <a
      href={REPORT_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block font-noto-sans text-sm px-4 py-2 rounded-lg bg-navy text-white font-semibold hover:bg-navy-dark"
    >
      誤植・修正点を報告する（Googleフォーム）
    </a>
  );
}

export default function Errata() {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 space-y-5">
      <div>
        <a href="/" className="font-noto-sans text-sm text-navy hover:underline">← 単語一覧に戻る</a>
        <h1 className="font-noto-serif text-2xl sm:text-3xl font-bold text-navy-dark mt-3">修正履歴・誤植のご報告</h1>
        <p className="font-noto-sans text-sm text-muted mt-2">
          書籍『京単』と京単オンラインに加えた修正を、版・刷ごとにまとめています。お手元の本の版・刷は、最終ページ（奥付）の「〇〇発行」のいちばん下の行で確かめられます。
        </p>
      </div>

      <Section title="誤植・修正点のご報告">
        <p>誤植や誤り、使いにくい点に気づいたら、下のフォームからお知らせください。確認のうえ、書籍は次の刷で、サイトは随時修正し、このページに記録します。</p>
        <ReportButton />
      </Section>

      <Section title="書籍『京単』">
        {BOOK_HISTORY.map((v) => (
          <div key={v.edition} className="border-l-2 border-gold pl-4 space-y-2">
            <h3 className="font-noto-serif font-bold text-navy-dark">
              {v.edition}
              <span className="ml-2 font-noto-sans text-sm font-normal text-muted">{v.date}</span>
            </h3>
            {v.note && <p className="text-sm text-muted">{v.note}</p>}
            <ol className="list-decimal pl-5 space-y-3">
              {v.items.map((it) => (
                <li key={it.title}>
                  <strong>{it.title}</strong>
                  {it.body && <p className="mt-1">{it.body}</p>}
                  {it.table && (
                    <div className="overflow-x-auto mt-2">
                      <table className="w-full text-sm border-collapse">
                        <tbody>
                          {it.table.map(([no, w, d]) => (
                            <tr key={w}>
                              <td className="p-2 border border-gray-200 whitespace-nowrap">{no}</td>
                              <td className="p-2 border border-gray-200 font-garamond font-semibold">{w}</td>
                              <td className="p-2 border border-gray-200">{d}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {it.moved && (
                    <>
                      <NumberLookup />
                      <MovedList />
                    </>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </Section>

      <Section title="京単オンライン">
        {SITE_HISTORY.map((v) => (
          <div key={v.date} className="border-l-2 border-gold pl-4">
            <h3 className="font-noto-serif font-bold text-navy-dark">{v.date}</h3>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              {v.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="誤植・修正点のご報告">
        <p>このページにない誤りに気づいた場合も、お気軽にお知らせください。</p>
        <ReportButton />
      </Section>
    </main>
  );
}

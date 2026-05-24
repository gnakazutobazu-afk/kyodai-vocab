#!/bin/bash
# 毎週自動デプロイスクリプト
# launchd から実行されるため PATH を明示的に設定

export PATH="/Users/nakaz/.nvm/versions/node/v24.15.0/bin:/opt/anaconda3/bin:/usr/local/bin:/usr/bin:/bin"
export HOME="/Users/nakaz"

PROJ="/Users/nakaz/kyodai-vocab"
EXCEL="/Users/nakaz/Library/Mobile Documents/com~apple~CloudDocs/001_ビジネス/109_note/京大英語過去問/京大英語完全対策英単語リスト_fix01.xlsx"
LOG="$PROJ/deploy.log"

echo "======================================" >> "$LOG"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 週次デプロイ開始" >> "$LOG"

cd "$PROJ" || { echo "[ERROR] ディレクトリが見つかりません" >> "$LOG"; exit 1; }

# 1. Excel → JSON 変換
echo "[$(date '+%H:%M:%S')] Excel 変換中..." >> "$LOG"
python3 scripts/excel_to_json.py \
  --input "$EXCEL" \
  --output ./public/data/words.json >> "$LOG" 2>&1

if [ $? -ne 0 ]; then
  echo "[ERROR] Excel 変換失敗" >> "$LOG"
  bash ~/scripts/line_send.sh "❌ 京大英語頻出単語 週次デプロイ失敗：Excel変換エラー（$(date '+%Y-%m-%d %H:%M')）"
  exit 1
fi

# 2. ビルド
echo "[$(date '+%H:%M:%S')] ビルド中..." >> "$LOG"
npm run build >> "$LOG" 2>&1

if [ $? -ne 0 ]; then
  echo "[ERROR] ビルド失敗" >> "$LOG"
  bash ~/scripts/line_send.sh "❌ 京大英語頻出単語 週次デプロイ失敗：ビルドエラー（$(date '+%Y-%m-%d %H:%M')）"
  exit 1
fi

# 3. Vercel デプロイ
echo "[$(date '+%H:%M:%S')] Vercel デプロイ中..." >> "$LOG"
npx vercel --prod --yes >> "$LOG" 2>&1

if [ $? -ne 0 ]; then
  echo "[ERROR] デプロイ失敗" >> "$LOG"
  bash ~/scripts/line_send.sh "❌ 京大英語頻出単語 週次デプロイ失敗：Vercelエラー（$(date '+%Y-%m-%d %H:%M')）"
  exit 1
fi

echo "[$(date '+%H:%M:%S')] ✅ 完了" >> "$LOG"

# 語数をカウントしてLINE通知
WORD_COUNT=$(python3 -c "import json; d=json.load(open('public/data/words.json')); print(len(d))" 2>/dev/null || echo "不明")
bash ~/scripts/line_send.sh "✅ 京大英語頻出単語 週次デプロイ完了（$(date '+%Y-%m-%d %H:%M')）
📚 収録語数：${WORD_COUNT}語
🌐 https://kyodai-vocab.vercel.app"

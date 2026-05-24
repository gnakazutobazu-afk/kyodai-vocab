#!/usr/bin/env python3
"""
Excelファイルの変更を監視し、変更があれば words.json を自動更新するウォッチャー。
使用例:
    python scripts/watch_excel.py
"""

import subprocess
import sys
import time
from pathlib import Path

EXCEL_PATH = Path(
    "/Users/nakaz/Library/Mobile Documents/com~apple~CloudDocs"
    "/001_ビジネス/109_note/京大英語過去問/京大英語完全対策英単語リスト_fix01.xlsx"
)
OUTPUT_PATH = Path(__file__).parent.parent / "public/data/words.json"
SCRIPT_PATH = Path(__file__).parent / "excel_to_json.py"
POLL_INTERVAL = 3  # seconds


def run_conversion():
    result = subprocess.run(
        [sys.executable, str(SCRIPT_PATH), "--input", str(EXCEL_PATH), "--output", str(OUTPUT_PATH)],
        capture_output=True,
        text=True,
    )
    if result.returncode == 0:
        print(f"[watch] ✅ 変換完了 → {OUTPUT_PATH.name}", flush=True)
    else:
        print(f"[watch] ❌ 変換エラー: {result.stderr}", flush=True)


def main():
    if not EXCEL_PATH.exists():
        print(f"[watch] ❌ Excelファイルが見つかりません: {EXCEL_PATH}", flush=True)
        sys.exit(1)

    last_mtime = EXCEL_PATH.stat().st_mtime
    print(f"[watch] 👀 監視開始: {EXCEL_PATH.name}", flush=True)
    print(f"[watch]    更新間隔: {POLL_INTERVAL}秒 | Ctrl+C で停止", flush=True)

    while True:
        time.sleep(POLL_INTERVAL)
        try:
            mtime = EXCEL_PATH.stat().st_mtime
            if mtime != last_mtime:
                last_mtime = mtime
                print(f"[watch] 🔄 変更検知 → 変換中...", flush=True)
                run_conversion()
        except FileNotFoundError:
            print(f"[watch] ⚠️  ファイルが見つかりません（iCloudの同期中？）", flush=True)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n[watch] 停止しました。", flush=True)

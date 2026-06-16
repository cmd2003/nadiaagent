#!/bin/bash
# Generates all BallotDA/Nadia Agent app icons from a single source wordmark PNG.
# Square icons: wordmark letterboxed onto a white square (per design choice).
# In-app logos: original wordmark, transparent, just resized.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${1:-$ROOT/branding-source/ballotda-logo.png}"
TMP="$ROOT/branding-source/.tmp"
mkdir -p "$TMP"

[ -f "$SRC" ] || { echo "ERROR: source logo not found at $SRC"; exit 1; }
echo "Source: $SRC"
sips -g pixelWidth -g pixelHeight "$SRC"

# 1) Square master (1024) — fit wordmark to width, pad to square on white.
cp "$SRC" "$TMP/work.png"
sips --resampleWidth 1024 "$TMP/work.png" --out "$TMP/w.png" >/dev/null
sips --padToHeightWidth 1024 1024 --padColor FFFFFF "$TMP/w.png" --out "$TMP/square-1024.png" >/dev/null
echo "square master built"

# 2) Square PNG sizes for ICO
for s in 16 32 48 64 128 256; do
  sips --resampleHeightWidth $s $s "$TMP/square-1024.png" --out "$TMP/sq-$s.png" >/dev/null
done

# 3) Windows .ico (multi-res). Try png-to-ico; fall back to sips single-res.
if npx --yes png-to-ico "$TMP/sq-16.png" "$TMP/sq-32.png" "$TMP/sq-48.png" "$TMP/sq-64.png" "$TMP/sq-128.png" "$TMP/sq-256.png" > "$TMP/icon.ico" 2>/dev/null; then
  echo "icon.ico built via png-to-ico (multi-res)"
else
  echo "WARN: png-to-ico unavailable (offline?) — falling back to sips 256px ico"
  sips -s format ico "$TMP/sq-256.png" --out "$TMP/icon.ico" >/dev/null
fi

# 4) Install square assets
cp "$TMP/square-1024.png" "$ROOT/apps/desktop/resources/icon.png"
cp "$TMP/icon.ico"         "$ROOT/apps/desktop/resources/icon.ico"

# 5) In-app logos (keep transparent wordmark) + favicon (square)
sips --resampleWidth 512 "$SRC" --out "$TMP/logo-512.png" >/dev/null
for app in web desktop; do
  cp "$TMP/logo-512.png" "$ROOT/apps/$app/public/assets/logo-1.png"
  cp "$TMP/logo-512.png" "$ROOT/apps/$app/public/assets/logo.png"
  cp "$TMP/sq-256.png"   "$ROOT/apps/$app/public/assets/accomplish-favicon.png"
  cp "$TMP/sq-256.png"   "$ROOT/apps/$app/public/assets/accomplish-icon.png"
done

echo "DONE. Installed:"
echo "  apps/desktop/resources/icon.png  (1024 square)"
echo "  apps/desktop/resources/icon.ico  (Windows)"
echo "  apps/{web,desktop}/public/assets/{logo-1,logo,accomplish-favicon,accomplish-icon}.png"

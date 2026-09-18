#!/usr/bin/env bash
# Monta dist/ so com o que vai ao ar no Cloudflare Pages (build command do projeto).
# functions/ fica na raiz do repo: o Pages le de la.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf dist
mkdir -p dist
cp index.html 404.html design.css script.js robots.txt sitemap.xml _headers _redirects dist/
cp -r assets dist/assets
rm -f dist/assets/paleta.png

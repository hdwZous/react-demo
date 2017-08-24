# npm build
npm_build_date_start=$(date +%s)
npm run test
npm_build_date_end=$(date +%s)
echo "npm build 用时：$((npm_build_date_end-npm_build_date_start))秒"

node lib/create-index-html.js



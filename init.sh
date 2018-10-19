#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd vuepress

# 如果是发布到自定义域名
echo 'www.queryphp.com' > CNAME

git init
git add -A
git commit -m 'first commit'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:hunzhiwange/queryphp.com.git master:gh-pages

cd -

git clone -b gh-pages git@github.com:hunzhiwange/queryphp.com.git .deploy

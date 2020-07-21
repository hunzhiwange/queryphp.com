#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

commit=$(date "+Update site %Y-%m-%d %H:%M:%S")

# 生成静态文件
yarn build

# 进入生成的文件夹
cp -rf ./docs/.vuepress/dist/* ./.deploy/

cd .deploy

git add -A
git commit -m "$commit"

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push git@github.com:hunzhiwange/queryphp.com.git gh-pages

cd -

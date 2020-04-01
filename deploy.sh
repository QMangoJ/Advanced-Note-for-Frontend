#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://QMangoJ.github.io
# git push -f git@github.com:QMangoJ/Advanced-Note-for-Frontend.github.io.git master

# 如果发布到 https://QMangoJ.github.io/Advanced-Note-for-Frontend
git push -f git@github.com:QMangoJ/Advanced-Note-for-Frontend.git master:gh-pages

cd -
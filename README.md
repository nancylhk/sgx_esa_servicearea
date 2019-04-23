1.安装环境
先安装nodejs，然后执行以下命令

a.全局执行
npm -g install npm
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install -g vue-cli

b.进入项目所在的目录执行
cnpm install
cnpm install sass-loader node-sass vue-style-loader --D
cnpm install axios
cnpm install --save babel-polyfill

2.运行
npm run dev

3.打包
npm run build
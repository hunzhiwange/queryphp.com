# queryphp.com

This site is built with [VuePress](https://vuepress.vuejs.org). 

## Developing

Start a dev server at `localhost:8088`:

```
$ yarn add -D vuepress # or npm install -D vuepress
$ yarn run dev # or npx vuepress dev docs
& sh ./init.sh # need remove note
```

## Publish

You can publish your modify by use the command:

```
sh ./deploy.sh
```

## Node set

``` sh
npm install -g increase-memory-limit cross-env
npm run fix-memory-limit #cross-env LIMIT=8192 increase-memory-limit
```

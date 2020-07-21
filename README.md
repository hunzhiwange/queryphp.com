# queryphp.com

This site is built with [VuePress](https://vuepress.vuejs.org). 

## Developing

Start a dev server at `localhost:8088`:

```
$ yarn install # or npm install
$ yarn run dev # or npm run dev 
& sh ./init.sh # need remove note
```

## Publish

You can publish your modify by use the command:

```
sh ./deploy.sh
```

## Node Memory Limit

``` sh
npm install -g increase-memory-limit cross-env
npm run fix-memory-limit #cross-env LIMIT=8192 increase-memory-limit
```

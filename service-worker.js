/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "924fa02f669343b2389bd57428062931"
  },
  {
    "url": "about/index.html",
    "revision": "c9fa87ef5de345314fe443f953e7a3c7"
  },
  {
    "url": "assets/css/0.styles.50f10735.css",
    "revision": "1dd33c2b80d80eaeb00186fe273ae1ef"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.4f888ab6.js",
    "revision": "14e8443ef780654ef0ba5fb8a33d620e"
  },
  {
    "url": "assets/js/11.21c8a391.js",
    "revision": "0699c3153f56434c972cb008fce586d3"
  },
  {
    "url": "assets/js/12.0ac0d8a3.js",
    "revision": "755ad99e6fb8b6ed40e5f44741d62edd"
  },
  {
    "url": "assets/js/13.0cabf298.js",
    "revision": "2c5981955abd8480f1d7dcea761a250b"
  },
  {
    "url": "assets/js/14.8c0e2ac0.js",
    "revision": "a8a2e77179295563a0112b1ab3b24bb4"
  },
  {
    "url": "assets/js/15.69cbcbea.js",
    "revision": "db5ffa4e71f67fc754c8c3f17c017503"
  },
  {
    "url": "assets/js/16.5440578f.js",
    "revision": "28800172a7355b4c344029ff56d881b0"
  },
  {
    "url": "assets/js/17.da867bb2.js",
    "revision": "65edba9424c747ad712cf0e87f8e96c8"
  },
  {
    "url": "assets/js/18.daeb9b0b.js",
    "revision": "82d3903132baab1fb15114a779c9f1ba"
  },
  {
    "url": "assets/js/19.24e49fa1.js",
    "revision": "e2633e55baa239377d23983ad463258a"
  },
  {
    "url": "assets/js/20.0af81c86.js",
    "revision": "e543727e855d468d548090fd87d62ffb"
  },
  {
    "url": "assets/js/21.b1089046.js",
    "revision": "049aa74f5ab1b5ec77fbe981d56f36cb"
  },
  {
    "url": "assets/js/22.604d020e.js",
    "revision": "1edf868035ff5c823d2d9d39aea7c7ee"
  },
  {
    "url": "assets/js/23.110911ab.js",
    "revision": "62d4f3e1063569c1af49df2bb9edc0f3"
  },
  {
    "url": "assets/js/24.05e401ec.js",
    "revision": "61515e9ed2fac33833905900fd719503"
  },
  {
    "url": "assets/js/25.2807c5ac.js",
    "revision": "d0a924429409cf7f2faf9366cf3ed327"
  },
  {
    "url": "assets/js/26.38f90aab.js",
    "revision": "84cea32f960cfb43fc64390bad2579ff"
  },
  {
    "url": "assets/js/27.094bad2b.js",
    "revision": "6a9c7c087b7d193be7f01631668a0c3e"
  },
  {
    "url": "assets/js/28.137f4297.js",
    "revision": "9b1a3ff8d49f1e3aff7aa115e75681e7"
  },
  {
    "url": "assets/js/29.c492e8fa.js",
    "revision": "624a60d301cf64d0de6962baada57c4c"
  },
  {
    "url": "assets/js/3.ce8c3442.js",
    "revision": "c6e002a10726263927d63b8df4bed586"
  },
  {
    "url": "assets/js/30.9d33c92c.js",
    "revision": "5f227eafb361dd2d8fe090ea5e876d10"
  },
  {
    "url": "assets/js/31.68c6735b.js",
    "revision": "25f49f6e05f36c40e3dec50b6fabc344"
  },
  {
    "url": "assets/js/32.f3707bc0.js",
    "revision": "a28617b45e02f2227462ca696e1adc2a"
  },
  {
    "url": "assets/js/33.cf4ff178.js",
    "revision": "9908397ce7f3a3be33d55db20af3a857"
  },
  {
    "url": "assets/js/34.d61933a6.js",
    "revision": "df3c411642babfcb54b7f2c44ce5bc1f"
  },
  {
    "url": "assets/js/35.e9c201b9.js",
    "revision": "673874da5a39f02c9d0a8baf5fd32478"
  },
  {
    "url": "assets/js/36.18790282.js",
    "revision": "d303abaa9c8c7bf5592ce80973c28735"
  },
  {
    "url": "assets/js/37.f6a1ab53.js",
    "revision": "9e01b87f286dc806d1422a786a78ef73"
  },
  {
    "url": "assets/js/38.444e526d.js",
    "revision": "849c76f016cea447b585f742e7c77e84"
  },
  {
    "url": "assets/js/39.72f904ac.js",
    "revision": "7a3c5bcef977457f2ee0f30c3aa7ac57"
  },
  {
    "url": "assets/js/4.0986f570.js",
    "revision": "9516cee531b5df8780c74c3d31b9b2b6"
  },
  {
    "url": "assets/js/40.2f12f066.js",
    "revision": "2b31b5c87bef7e2547b57089d42226b1"
  },
  {
    "url": "assets/js/41.68adc8d5.js",
    "revision": "e8429dd8f5c6d151d0686f54ab0e746f"
  },
  {
    "url": "assets/js/42.661ab03e.js",
    "revision": "04fa599e4b7fd65eac3de2544cf18452"
  },
  {
    "url": "assets/js/43.ca91a864.js",
    "revision": "0faa09e68d08b6a4ce9bc25f375dc0bc"
  },
  {
    "url": "assets/js/44.228583b6.js",
    "revision": "9bdcc04dd82cc212c36fbe4a84237c4b"
  },
  {
    "url": "assets/js/45.94dbc589.js",
    "revision": "5562ba80c81ec69db9586cf8f0c44db5"
  },
  {
    "url": "assets/js/46.22c5d2fe.js",
    "revision": "1d89b6cae014e0ab06eb22efd9d4c35c"
  },
  {
    "url": "assets/js/47.6406e1a9.js",
    "revision": "9e063553f10e8040b1d42a81228fc4e6"
  },
  {
    "url": "assets/js/48.582d5bd0.js",
    "revision": "23cb546fa5a230a9cd424488594e83af"
  },
  {
    "url": "assets/js/49.24c86895.js",
    "revision": "1017060ebac8ac22f3d06a5f45dd9cf9"
  },
  {
    "url": "assets/js/5.4980778e.js",
    "revision": "12d22f0039fa0141979030705803d123"
  },
  {
    "url": "assets/js/50.132966e6.js",
    "revision": "9cc5cbbbd2043c772e9cf97a1f77f8e8"
  },
  {
    "url": "assets/js/51.28279d8f.js",
    "revision": "0375598e196886d21cda64d8f905f366"
  },
  {
    "url": "assets/js/52.433ced40.js",
    "revision": "83f6e643781c2c33a5764c9157ce1aea"
  },
  {
    "url": "assets/js/53.9d064e3f.js",
    "revision": "020c3d09f078b36009006afe97ce0225"
  },
  {
    "url": "assets/js/54.cd248350.js",
    "revision": "20a6126cc86fd709cc8eb19929c8a218"
  },
  {
    "url": "assets/js/55.a5fec41d.js",
    "revision": "b0b29c9612c05febefcc19a509228760"
  },
  {
    "url": "assets/js/56.3a029a39.js",
    "revision": "51d3265df4ce15bcfdfd27417a9986ce"
  },
  {
    "url": "assets/js/57.046e0771.js",
    "revision": "da5a995e659e8b473d9ab99b579e5fa9"
  },
  {
    "url": "assets/js/58.3a0aa246.js",
    "revision": "f12a869715c69348c3bb0a9cf25a216c"
  },
  {
    "url": "assets/js/59.0c201127.js",
    "revision": "47e580b8f18abc8a01d77c8049abec37"
  },
  {
    "url": "assets/js/6.c6cd87e7.js",
    "revision": "b250434f38d8fed51ec1667ae34263c9"
  },
  {
    "url": "assets/js/60.89509ab4.js",
    "revision": "0ad6aca477e034e331d1b84df1fb46fc"
  },
  {
    "url": "assets/js/61.ac6b6254.js",
    "revision": "46984162396626730af958f1fd9199cf"
  },
  {
    "url": "assets/js/62.79215707.js",
    "revision": "850283ea4fe21a150cfac809e7b2bdd0"
  },
  {
    "url": "assets/js/63.f74ba3e4.js",
    "revision": "c481a2534183332fe7f92dd125d015b5"
  },
  {
    "url": "assets/js/64.af7ddfe9.js",
    "revision": "b95e033a695f306cd9ad9962f28adbeb"
  },
  {
    "url": "assets/js/65.dd9aa683.js",
    "revision": "f38838a24c7457e90120e2da9d39a39c"
  },
  {
    "url": "assets/js/66.3128d2c4.js",
    "revision": "4629aa6ea2fe98c9ec289b4408aa8bb6"
  },
  {
    "url": "assets/js/67.69451096.js",
    "revision": "7626f9dafa9e1fa4d295eaa3288f5662"
  },
  {
    "url": "assets/js/68.e1dfc283.js",
    "revision": "bc86f0393a07dfbf0f1b3ef105ecede3"
  },
  {
    "url": "assets/js/69.4e4449f3.js",
    "revision": "4573d70cf4f614aac7ea6f6170eca0d6"
  },
  {
    "url": "assets/js/7.928871e5.js",
    "revision": "40a7c75f619351c326fd833e699c55cf"
  },
  {
    "url": "assets/js/70.1f081f7d.js",
    "revision": "655ada27bf7ff7ce63768d0a118a0171"
  },
  {
    "url": "assets/js/71.7e6f3d26.js",
    "revision": "29b88e639cb64ffb12670addadbf7122"
  },
  {
    "url": "assets/js/72.05bcfba4.js",
    "revision": "222fc484ce16fdcfcf1f95e19170e4b5"
  },
  {
    "url": "assets/js/73.22240d7c.js",
    "revision": "2a053fb6d72fa76e243a02a113c9d428"
  },
  {
    "url": "assets/js/74.0b670cc8.js",
    "revision": "9837865f2e770bd427ec8f7bcc383434"
  },
  {
    "url": "assets/js/75.33b3fffa.js",
    "revision": "4209859665916e8a1edf9dc3572aca6f"
  },
  {
    "url": "assets/js/76.d3ce8576.js",
    "revision": "5d37cc77112671faa0b68f7e2f2f0e38"
  },
  {
    "url": "assets/js/77.4c16e69a.js",
    "revision": "496326be20d24d97a0ddef07a1de224f"
  },
  {
    "url": "assets/js/78.0e849b72.js",
    "revision": "3588dae004b3888ce617e664af43588c"
  },
  {
    "url": "assets/js/79.6bb24e03.js",
    "revision": "bfe62840975869a8ee0c0ede86e68d8b"
  },
  {
    "url": "assets/js/8.a5da796a.js",
    "revision": "4dd228a40760c8bcd7c6a7e121fb9dda"
  },
  {
    "url": "assets/js/80.eee9d07d.js",
    "revision": "71e636dadfc08709a9b11593c21c5b3a"
  },
  {
    "url": "assets/js/81.75ff23aa.js",
    "revision": "95ea7cf953ade85d93932ebfbf3f8775"
  },
  {
    "url": "assets/js/82.e6fb33bb.js",
    "revision": "912ea217d62ab6644f24f1b466a143db"
  },
  {
    "url": "assets/js/83.c0bf96b6.js",
    "revision": "153192fcabf075a01e93d6554633ec64"
  },
  {
    "url": "assets/js/84.79512c7c.js",
    "revision": "e128afa9cd06adc90f2383944f5b5576"
  },
  {
    "url": "assets/js/9.b1d6cab4.js",
    "revision": "ab0ba18ffbfe1880dc9b3e75d0ba04ba"
  },
  {
    "url": "assets/js/app.d68718d1.js",
    "revision": "7bbac26ea9135b8e416667539ba03ade"
  },
  {
    "url": "assets/js/vendors~flowchart.5a4d067b.js",
    "revision": "d6f84e566072519b778a6c436be6d3d3"
  },
  {
    "url": "docs/architecture/fn.html",
    "revision": "13d9b520ead71c20f22601041832e656"
  },
  {
    "url": "docs/architecture/index.html",
    "revision": "36f976db460183e05f0aa59044e8693c"
  },
  {
    "url": "docs/architecture/ioc.html",
    "revision": "0affaea1e254f2f224278b984f1dcc26"
  },
  {
    "url": "docs/component/debug.html",
    "revision": "829053bde86c7898e1579cf715726026"
  },
  {
    "url": "docs/component/encryption.html",
    "revision": "12443f3f256d2a0900ab38363db41406"
  },
  {
    "url": "docs/component/safe.html",
    "revision": "391c04bab6e7b580fb6047ad5ff052ee"
  },
  {
    "url": "docs/component/support/arr.html",
    "revision": "f9832831aff0eee37b3126fea04ed995"
  },
  {
    "url": "docs/component/support/str.html",
    "revision": "522975b956b5c51a2207b0941a304817"
  },
  {
    "url": "docs/component/validate/assert.html",
    "revision": "211048e834cc8f7c90eac3baf4f117bd"
  },
  {
    "url": "docs/database/config.html",
    "revision": "c25279ac71f2280b921b17905ba6e549"
  },
  {
    "url": "docs/database/create/insert.html",
    "revision": "ac08f63ceda38cbd65a518925e66f4c1"
  },
  {
    "url": "docs/database/create/insertall.html",
    "revision": "b3cbf499c6c2c8686dc7c49b85b68bf7"
  },
  {
    "url": "docs/database/delete/delete.html",
    "revision": "11b08dd9b5410260062d7e2d0fa84b31"
  },
  {
    "url": "docs/database/index.html",
    "revision": "ca6be0d51e16356d4aecbcaeb2243b46"
  },
  {
    "url": "docs/database/query/aggregate.html",
    "revision": "e924c12e974252c88b6eaa5b8ee45b6d"
  },
  {
    "url": "docs/database/query/bind.html",
    "revision": "158e934c6f0e93d5ccb2487fb5d26f35"
  },
  {
    "url": "docs/database/query/columns.html",
    "revision": "f95150eafc8d88233aa36cf144d2a43f"
  },
  {
    "url": "docs/database/query/distinct.html",
    "revision": "9bccea03b7a4696101c8d2bb2a840143"
  },
  {
    "url": "docs/database/query/flow.html",
    "revision": "a8d23cc801d931a38819f58b9ad8edfb"
  },
  {
    "url": "docs/database/query/forceindex.html",
    "revision": "c1e716370a3355053fb06ed5ad9a8847"
  },
  {
    "url": "docs/database/query/forupdate.html",
    "revision": "b1e6d5625f32c0b002a6469a5e61612b"
  },
  {
    "url": "docs/database/query/groupby.html",
    "revision": "6c5652dfe004914bbbfbc533c656bfdf"
  },
  {
    "url": "docs/database/query/having.html",
    "revision": "2f0f435666c75f991c9447a991c23a14"
  },
  {
    "url": "docs/database/query/join.html",
    "revision": "2ad89a95b07ad97a34cdb0e026f3c29c"
  },
  {
    "url": "docs/database/query/limit.html",
    "revision": "500ef651e33b44c134da0bc61409632f"
  },
  {
    "url": "docs/database/query/orderby.html",
    "revision": "666ace200fada9c8397109f4b3cfcb16"
  },
  {
    "url": "docs/database/query/prefix.html",
    "revision": "7af125b4330dbbf2907c17f2e22f2467"
  },
  {
    "url": "docs/database/query/reset.html",
    "revision": "f8b69075f0cf069e875075a6410ee739"
  },
  {
    "url": "docs/database/query/sql.html",
    "revision": "c3c6a1191189d10edd8d5a6a4ea5cc93"
  },
  {
    "url": "docs/database/query/table.html",
    "revision": "0e0fd36dd613852fc591c11870cc794c"
  },
  {
    "url": "docs/database/query/union.html",
    "revision": "2ed15c847452c8700f9e52bbfd576a7f"
  },
  {
    "url": "docs/database/query/where.html",
    "revision": "7d9ee5a79224c659ee9c76d90b9c006c"
  },
  {
    "url": "docs/database/read/aggregate.html",
    "revision": "4c4a62bfa9a8261ad45a30270214801f"
  },
  {
    "url": "docs/database/read/find.html",
    "revision": "a44343ec3fa33dff27776d480d7b3db0"
  },
  {
    "url": "docs/database/read/findall.html",
    "revision": "76bc1406a52ca4abfbc8c28086f5e723"
  },
  {
    "url": "docs/database/read/finddynamics.html",
    "revision": "3f0d64a8375a74973f986b91d555b302"
  },
  {
    "url": "docs/database/read/findone.html",
    "revision": "aec9cf00bb17116f34255ce82421c12a"
  },
  {
    "url": "docs/database/read/lists.html",
    "revision": "d45dab991e7c0bdd2bbc5acc81ff7f43"
  },
  {
    "url": "docs/database/read/select.html",
    "revision": "8543deb345aa640616418dcf91d159dc"
  },
  {
    "url": "docs/database/read/valuepull.html",
    "revision": "51ccc52580675d09baac8eacc40f3c04"
  },
  {
    "url": "docs/database/truncate.html",
    "revision": "6dd8d8251ce9fb06edac5a9d63988c8b"
  },
  {
    "url": "docs/database/update/update.html",
    "revision": "31de083ccc9c0b7d99b3c3ab0202995b"
  },
  {
    "url": "docs/database/update/updatecolumn.html",
    "revision": "436c438ca3dcf447f5dba70f7096a0bb"
  },
  {
    "url": "docs/database/update/updatedecrease.html",
    "revision": "39b1438f7a4950cc9c081a86c0df8f33"
  },
  {
    "url": "docs/database/update/updateincrease.html",
    "revision": "01a98f52451d8c46dcc0a57ed6e36da3"
  },
  {
    "url": "docs/developer/index.html",
    "revision": "f03dca12690bfef16d1123ed6a21afb9"
  },
  {
    "url": "docs/index.html",
    "revision": "af026cdd1464a26808ab432ffc1d3781"
  },
  {
    "url": "docs/orm/create.html",
    "revision": "4d4b27264511bee4ddc2a108cf9581de"
  },
  {
    "url": "docs/orm/index.html",
    "revision": "1f2e8fde0ea25df422e7c88e99d3e064"
  },
  {
    "url": "docs/orm/unitofwork.html",
    "revision": "a02a73c0161e3449a2c08aeb72f72436"
  },
  {
    "url": "docs/router/index.html",
    "revision": "55a1c573c3b6d28db67db95d272d5700"
  },
  {
    "url": "docs/started/directory.html",
    "revision": "151eea5ac3d895c4834c0e2a90a1c46d"
  },
  {
    "url": "docs/started/index.html",
    "revision": "b5faf8beb0d38e9be566200f1cdbd1fe"
  },
  {
    "url": "docs/started/install.html",
    "revision": "4c8fa6739016f30609f64a794a1bef6d"
  },
  {
    "url": "docs/started/specification.html",
    "revision": "3a8925d4bdeeefcd26272f4bdab57607"
  },
  {
    "url": "docs/template/assign.html",
    "revision": "83393635001220bee2cf6a6002c0d670"
  },
  {
    "url": "docs/template/break.html",
    "revision": "d91086f0348effdd1994d8f0d8ab96da"
  },
  {
    "url": "docs/template/css.html",
    "revision": "eb2f6ba4188ab34d30ce14fa3ab2d33c"
  },
  {
    "url": "docs/template/for.html",
    "revision": "346f2c99963eaf7d8001369c0e46a2a7"
  },
  {
    "url": "docs/template/if.html",
    "revision": "2557ba123d7b869f4e22689134173d16"
  },
  {
    "url": "docs/template/include.html",
    "revision": "87d7fa82da06bdd4561a959aeede7808"
  },
  {
    "url": "docs/template/index.html",
    "revision": "c737e0a89475b91cb8ea5f138a2b699b"
  },
  {
    "url": "docs/template/list.html",
    "revision": "dbb0609629bd0fee8abff7efb8c11efc"
  },
  {
    "url": "docs/template/lists.html",
    "revision": "5310501a172a9a457971085dac89cc6d"
  },
  {
    "url": "docs/template/php.html",
    "revision": "98c32e193eeb0cec9c7f37db1b53f504"
  },
  {
    "url": "docs/template/quick.html",
    "revision": "57fff4a6c7a3670ff892ded1d58dc267"
  },
  {
    "url": "docs/template/tagself.html",
    "revision": "c4bc3602c246d33cbaa9c97611d26826"
  },
  {
    "url": "docs/template/var.html",
    "revision": "2af2cb3fb3c06cd9e8a55043639d0d90"
  },
  {
    "url": "docs/template/while.html",
    "revision": "44716a24a08a2f35cd6078135e8b5464"
  },
  {
    "url": "ecosystem/index.html",
    "revision": "090e98c5c8c5bc5729af36e2fda6be3d"
  },
  {
    "url": "guide/index.html",
    "revision": "069f545f23758a2b1255c2d33835dc9f"
  },
  {
    "url": "hero-old.png",
    "revision": "18be2abba10f4b34805e9f73ba2ba89d"
  },
  {
    "url": "hero.png",
    "revision": "66466feca260b39aaf28b0d2ca7c404e"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "d1d294e692f9a1d75eef45cec29202d8"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "18be2abba10f4b34805e9f73ba2ba89d"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "0674b4c8e4a012d9f709ec91fd7054f1"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "185851c4f1d14083f50067f6f4cf61ac"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "f00bb073d038401f5310497d9b1336c1"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "72bedc1e05cf8386f6ea9ebc746f772f"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "fac13de9d0f63e9d9b7e6e6b64f22321"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "5b7d2533c9d006a272a0712b66533d4f"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "4614e0e83690becafa6146243b960d45"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "c34d5ba45e000b01e240d2037ed8f62c"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "b5477d534af952093a4a04e67307f21d"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "66466feca260b39aaf28b0d2ca7c404e"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "f22d501a35a87d9f21701cb031f6ea17"
  },
  {
    "url": "index.html",
    "revision": "20801aadc033f689e427459768264e2b"
  },
  {
    "url": "line-numbers-desktop.png",
    "revision": "7c8ccab7c4953ac2fb9e4bc93ecd25ac"
  },
  {
    "url": "line-numbers-mobile.gif",
    "revision": "580b860f45436c9a15a9f3bd036edd97"
  },
  {
    "url": "link/hzwg.png",
    "revision": "7ee4d00c7604c950a93458a2d53c0e25"
  },
  {
    "url": "link/leevel.png",
    "revision": "5ebd90ee632f216fa0ea842e934dc49f"
  },
  {
    "url": "link/queryphp-use-leevel.png",
    "revision": "f15d477af0c6973065617a35875194f5"
  },
  {
    "url": "logo.png",
    "revision": "54f732ba525975e4908b264f0bb66793"
  },
  {
    "url": "plugin.png",
    "revision": "3e325210d3e3752e32818385fc4afbc9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})

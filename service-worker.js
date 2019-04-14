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
    "revision": "20f2211697d2ab4e6909799a8b87715a"
  },
  {
    "url": "about/index.html",
    "revision": "548f0b32d2da9a96d07df39aef49b4db"
  },
  {
    "url": "assets/css/0.styles.6b5656aa.css",
    "revision": "31f51762f83fe987d94c6bcd4f274566"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.9117444e.js",
    "revision": "f9024c83431662815f67d1d718c19dd3"
  },
  {
    "url": "assets/js/11.21c8a391.js",
    "revision": "0699c3153f56434c972cb008fce586d3"
  },
  {
    "url": "assets/js/12.8026183f.js",
    "revision": "dccc66a38a961610e9d2881a90a844ce"
  },
  {
    "url": "assets/js/13.9f103cc5.js",
    "revision": "9c5b9e1a6dc653e239cf9ca361d2bea4"
  },
  {
    "url": "assets/js/14.181c3971.js",
    "revision": "2e31d96b907874ae58555adb2a4545c3"
  },
  {
    "url": "assets/js/15.8c208886.js",
    "revision": "d0ac232440e6fce0b1ff7fb8ba4f11f1"
  },
  {
    "url": "assets/js/16.5440578f.js",
    "revision": "28800172a7355b4c344029ff56d881b0"
  },
  {
    "url": "assets/js/17.7bafc579.js",
    "revision": "cad963bf2f0e87a226984e7f11096ad0"
  },
  {
    "url": "assets/js/18.7a29936f.js",
    "revision": "3653f54ad75889c327e9e2fe43733ea2"
  },
  {
    "url": "assets/js/19.6d023a2a.js",
    "revision": "6fe0531ef8ee16b78050b9a9812a804b"
  },
  {
    "url": "assets/js/20.9e466413.js",
    "revision": "22d673f7ca9fd28bb7b09267c1a14d64"
  },
  {
    "url": "assets/js/21.63b6ce43.js",
    "revision": "cc913ec4c915394a5b008a5c919351ab"
  },
  {
    "url": "assets/js/22.21430217.js",
    "revision": "e43f502e101b0bad604e01100fc6e027"
  },
  {
    "url": "assets/js/23.590b07f8.js",
    "revision": "ab0145923667f05788e52e3d22031def"
  },
  {
    "url": "assets/js/24.36ceafea.js",
    "revision": "58c941fe66f928e04db2b4b5b9f5c45e"
  },
  {
    "url": "assets/js/25.196fbd71.js",
    "revision": "28a296d8cb7664b2d63f461445e2e904"
  },
  {
    "url": "assets/js/26.28501d13.js",
    "revision": "aa8000e9bb787de451a38d9c5f0ed57e"
  },
  {
    "url": "assets/js/27.626011e8.js",
    "revision": "4b4bfaa99efd636b8e92b226a8ca7dcb"
  },
  {
    "url": "assets/js/28.bc398cc1.js",
    "revision": "7fa8d3d68a02e68b53c212ae1c42e574"
  },
  {
    "url": "assets/js/29.b6d6dd84.js",
    "revision": "7366dcc8cf038fb348f13ba71b1c29cb"
  },
  {
    "url": "assets/js/3.ce8c3442.js",
    "revision": "c6e002a10726263927d63b8df4bed586"
  },
  {
    "url": "assets/js/30.fdad5610.js",
    "revision": "36a756470eaa0c04338049b5043bcdc9"
  },
  {
    "url": "assets/js/31.fddc0bfd.js",
    "revision": "2ef8e86ad6df2f8b3256374b08db1101"
  },
  {
    "url": "assets/js/32.df7519c8.js",
    "revision": "18281ce1bae43cc3770654e7a8514985"
  },
  {
    "url": "assets/js/33.03d07b79.js",
    "revision": "51c71c84e7279cd7b1b0a0ec86cf6d9f"
  },
  {
    "url": "assets/js/34.4f83ef99.js",
    "revision": "dfc0da6726c4498dea1856b8a2919659"
  },
  {
    "url": "assets/js/35.f8372c76.js",
    "revision": "cd61beed8ee60ddfbca6e9b6aef4db8a"
  },
  {
    "url": "assets/js/36.24025176.js",
    "revision": "02196db03d49bb0c7fa7c49ce136b08a"
  },
  {
    "url": "assets/js/37.91fd3faa.js",
    "revision": "856a794e972759d722ab6f7f809b0c38"
  },
  {
    "url": "assets/js/38.2eee1815.js",
    "revision": "bb414a8e98143b7ab8c600a196ace9ad"
  },
  {
    "url": "assets/js/39.eba8ee37.js",
    "revision": "3bdb5e5172a128befd61d471d811fb2b"
  },
  {
    "url": "assets/js/4.cd9fe626.js",
    "revision": "b22e7c023031865490914675faef1793"
  },
  {
    "url": "assets/js/40.659dd4b0.js",
    "revision": "42d22f0765663186ab5e676477a7e086"
  },
  {
    "url": "assets/js/41.5248a6c0.js",
    "revision": "f1fb2141dd8c7d18338ac75b2123e09a"
  },
  {
    "url": "assets/js/42.24b0d219.js",
    "revision": "caf6788fbd682fc58c27e1a6a2c234f1"
  },
  {
    "url": "assets/js/43.f88380e0.js",
    "revision": "2a232c73d40b182349114ea42f34d430"
  },
  {
    "url": "assets/js/44.949522a6.js",
    "revision": "c234ebdebca0d8f7488366e507dd09aa"
  },
  {
    "url": "assets/js/45.5820de8b.js",
    "revision": "c19fd2886827473ec9a1631459ff3f8f"
  },
  {
    "url": "assets/js/46.2335acff.js",
    "revision": "d53310cacffaddcb69366a8d44f35b65"
  },
  {
    "url": "assets/js/47.fd264cc7.js",
    "revision": "992a841ca632cb4a76eeece9ef334cad"
  },
  {
    "url": "assets/js/48.84279cd5.js",
    "revision": "5e3efc0eb4d8cdff9ba321ec1fb15f22"
  },
  {
    "url": "assets/js/49.a93e5fdc.js",
    "revision": "3e0a60eeeea97c8cafad22d2709fa81a"
  },
  {
    "url": "assets/js/5.4980778e.js",
    "revision": "12d22f0039fa0141979030705803d123"
  },
  {
    "url": "assets/js/50.f7904018.js",
    "revision": "f7f3ac01f9e8744cc4a5358c2a56bea5"
  },
  {
    "url": "assets/js/51.eed81748.js",
    "revision": "60214e5a1d9d4c755fb481be57746876"
  },
  {
    "url": "assets/js/52.116c186f.js",
    "revision": "5dc34f8544892d72f9f0c60037aeed9d"
  },
  {
    "url": "assets/js/53.b590effa.js",
    "revision": "84cc99d766e629869a2e9373001b71ca"
  },
  {
    "url": "assets/js/54.8412781f.js",
    "revision": "872bcba94c53b7536d1864e7818e2a7b"
  },
  {
    "url": "assets/js/55.312e54d7.js",
    "revision": "323e2d2a4e601a727baaed6201015e3d"
  },
  {
    "url": "assets/js/56.3fa6e575.js",
    "revision": "c96f8ff33ebbc0b838026546836df6f1"
  },
  {
    "url": "assets/js/57.973fccb8.js",
    "revision": "fa83d0812fe82efa8168a174e016b9b9"
  },
  {
    "url": "assets/js/58.b8fd01fe.js",
    "revision": "c8d1130d771e6bf478b4095cd6c51f15"
  },
  {
    "url": "assets/js/59.f67b5030.js",
    "revision": "cc3e68d07c0e26bf10dd98cf84fd1237"
  },
  {
    "url": "assets/js/6.0265af51.js",
    "revision": "425a512d91b1906772275f545433e4c8"
  },
  {
    "url": "assets/js/60.ab1ffa87.js",
    "revision": "c9cbbf9d0dbe272d909d051a3ce0410c"
  },
  {
    "url": "assets/js/61.9d880b3d.js",
    "revision": "11e4ff7df3045cd70acd70ebd49b7a5c"
  },
  {
    "url": "assets/js/62.3245ec39.js",
    "revision": "79dd7432715faf7094496da576eeb318"
  },
  {
    "url": "assets/js/63.05977736.js",
    "revision": "f32ffaa6a47c63c731ddda07f4d951bf"
  },
  {
    "url": "assets/js/64.1441e59b.js",
    "revision": "606407062859c1516eaf8ea72fe7d9d0"
  },
  {
    "url": "assets/js/65.b7c1cbeb.js",
    "revision": "cf4c2bf73c638e83268bd95c591a4a7c"
  },
  {
    "url": "assets/js/66.f0902b61.js",
    "revision": "b3b0def768a7d30e60d4939a24c595d0"
  },
  {
    "url": "assets/js/67.334f9b7f.js",
    "revision": "e390baebd8cefb8721819736deff7446"
  },
  {
    "url": "assets/js/68.f246acae.js",
    "revision": "b189e8cba5682ce33d713e95eea7faaf"
  },
  {
    "url": "assets/js/69.861b98a6.js",
    "revision": "210aed7ef2c2d16de94eb1b8e6eeb67f"
  },
  {
    "url": "assets/js/7.928871e5.js",
    "revision": "40a7c75f619351c326fd833e699c55cf"
  },
  {
    "url": "assets/js/70.80626183.js",
    "revision": "868c973b5d2982ccda91157b70b0946c"
  },
  {
    "url": "assets/js/71.f6298ff8.js",
    "revision": "214bb5fc6102e2798a09f07d6ea5f620"
  },
  {
    "url": "assets/js/72.7f3e58a5.js",
    "revision": "2439943c920181165fdf38a9008dac03"
  },
  {
    "url": "assets/js/73.2ac8862f.js",
    "revision": "933fb9b26c58fb3e0ed2c5ea6205d0d2"
  },
  {
    "url": "assets/js/74.d14977b9.js",
    "revision": "358b97981223dc7a75f2b4d28e029370"
  },
  {
    "url": "assets/js/75.b878c6ba.js",
    "revision": "5dcab7277023350179b87339b54e57f0"
  },
  {
    "url": "assets/js/76.50fa4e2d.js",
    "revision": "a5d70c834d3eab0caffba32cea6bd0f5"
  },
  {
    "url": "assets/js/77.ed9216ba.js",
    "revision": "8996f48c31a35c1fc43598adf20cee33"
  },
  {
    "url": "assets/js/78.d1f4491a.js",
    "revision": "b3800d7ec89c96495e7ed5c8c457b136"
  },
  {
    "url": "assets/js/79.e0b45d7a.js",
    "revision": "2c6fe310583777cd0f5a473d94c33e6d"
  },
  {
    "url": "assets/js/8.6f5f6877.js",
    "revision": "b18d932f92ab4da0623ffa9de99d5115"
  },
  {
    "url": "assets/js/80.1920167e.js",
    "revision": "36f2881804993d53e97605ef3224d3ad"
  },
  {
    "url": "assets/js/81.1437ac33.js",
    "revision": "895407b5a365a996a5a525f682e6c43c"
  },
  {
    "url": "assets/js/82.fa64db5d.js",
    "revision": "0d99956bea3e7420599d481548f87dda"
  },
  {
    "url": "assets/js/9.b1d6cab4.js",
    "revision": "ab0ba18ffbfe1880dc9b3e75d0ba04ba"
  },
  {
    "url": "assets/js/app.1b2a4cce.js",
    "revision": "82787f26e338cb495e00bf4f0c8313fe"
  },
  {
    "url": "assets/js/vendors~flowchart.5a4d067b.js",
    "revision": "d6f84e566072519b778a6c436be6d3d3"
  },
  {
    "url": "docs/architecture/fn.html",
    "revision": "ce8e4a2781db2dc8b6d4abf6fabb1dd7"
  },
  {
    "url": "docs/architecture/index.html",
    "revision": "f931586631bc5f0168492c5824be6b7b"
  },
  {
    "url": "docs/architecture/ioc.html",
    "revision": "64b453517e8e2e12b754a9e417d7dc74"
  },
  {
    "url": "docs/component/debug.html",
    "revision": "df5efa7f54ba968a090d049996ad93f7"
  },
  {
    "url": "docs/component/encryption.html",
    "revision": "c22f8347eab4567c4665fd23b0e99deb"
  },
  {
    "url": "docs/component/safe.html",
    "revision": "66165edffc726e01fb9480e5c1e8f9ab"
  },
  {
    "url": "docs/component/support/arr.html",
    "revision": "aea0141f3ab08b89b2310f867a0b5e3f"
  },
  {
    "url": "docs/component/support/str.html",
    "revision": "af092f8f68f7ac3d9d3696328c569bec"
  },
  {
    "url": "docs/database/config.html",
    "revision": "c673e23457208a9948e7957d0c84d3aa"
  },
  {
    "url": "docs/database/create/insert.html",
    "revision": "b77c2a6651daa3789bb4bf81df1befd4"
  },
  {
    "url": "docs/database/create/insertall.html",
    "revision": "8785e07f8c9cd74dd4e8357b38f0969a"
  },
  {
    "url": "docs/database/delete/delete.html",
    "revision": "7e124c2d6d899f6190f7888c0c9c925b"
  },
  {
    "url": "docs/database/index.html",
    "revision": "05c3c96378774afec5a187a0f3fedacf"
  },
  {
    "url": "docs/database/query/aggregate.html",
    "revision": "294d67db3e8c40f28b6fb7b8a11065a0"
  },
  {
    "url": "docs/database/query/bind.html",
    "revision": "0a7c6f30aebefe3a109a199ebdb1022d"
  },
  {
    "url": "docs/database/query/columns.html",
    "revision": "9581b81d2118853beb11e998e643bff8"
  },
  {
    "url": "docs/database/query/distinct.html",
    "revision": "45478d9b848e36571c67c331ae7b7d06"
  },
  {
    "url": "docs/database/query/flow.html",
    "revision": "0c8101237880c9f9e904f44af099bf0f"
  },
  {
    "url": "docs/database/query/forceindex.html",
    "revision": "df00e122fb3e1a31578e7643fb9ff079"
  },
  {
    "url": "docs/database/query/forupdate.html",
    "revision": "7de360fcc8f4d766a98707dc9a9ef58b"
  },
  {
    "url": "docs/database/query/groupby.html",
    "revision": "e4e613f999a569a48884dd0c80c01284"
  },
  {
    "url": "docs/database/query/having.html",
    "revision": "c6497fdff89c02427b8590010d70ac83"
  },
  {
    "url": "docs/database/query/join.html",
    "revision": "8dc4d52d5b90fc28c8c906941748816f"
  },
  {
    "url": "docs/database/query/limit.html",
    "revision": "cb3cc6a6a80defcbdb6d1f340bceb329"
  },
  {
    "url": "docs/database/query/orderby.html",
    "revision": "56447b80a7359e6a41350e0560358cff"
  },
  {
    "url": "docs/database/query/prefix.html",
    "revision": "302e9efe3e0e7952f0b4e689b2c56dae"
  },
  {
    "url": "docs/database/query/reset.html",
    "revision": "c4a4fbdc5c8e5ba173087fe17f5b199f"
  },
  {
    "url": "docs/database/query/sql.html",
    "revision": "7837db5ac2d069839158d1b195b19721"
  },
  {
    "url": "docs/database/query/table.html",
    "revision": "eacbf71c3e495f447a63614856a27b76"
  },
  {
    "url": "docs/database/query/union.html",
    "revision": "9b2f3e22082ddbd783d3373b2bb9774b"
  },
  {
    "url": "docs/database/query/where.html",
    "revision": "89139c8b330baa91c00e9ec688c1c6df"
  },
  {
    "url": "docs/database/read/aggregate.html",
    "revision": "a892eb2dd92a2ec5952193c7cd7b46ae"
  },
  {
    "url": "docs/database/read/find.html",
    "revision": "e936f5174d481b5758c8df6996a1a13f"
  },
  {
    "url": "docs/database/read/findall.html",
    "revision": "efa557d176e754cd2071bb5a681607ec"
  },
  {
    "url": "docs/database/read/finddynamics.html",
    "revision": "aaa297bed295e8e9b235d3276f53b726"
  },
  {
    "url": "docs/database/read/findone.html",
    "revision": "4f33bd079f5f5594e6862b1394f9bde2"
  },
  {
    "url": "docs/database/read/lists.html",
    "revision": "a323aadcbd3f82cc4b20b83468009e72"
  },
  {
    "url": "docs/database/read/select.html",
    "revision": "4d35ee6c98abbfa12c6cf3dd88349cd8"
  },
  {
    "url": "docs/database/read/valuepull.html",
    "revision": "a53f42a9dcc09c68fbd242eedae6cac7"
  },
  {
    "url": "docs/database/truncate.html",
    "revision": "c256d089a14f085f1445c929f979990a"
  },
  {
    "url": "docs/database/update/update.html",
    "revision": "51a95a102e1008e90cffa130e12c8dfc"
  },
  {
    "url": "docs/database/update/updatecolumn.html",
    "revision": "a9d624aae7b064bc85b5eadf66915860"
  },
  {
    "url": "docs/database/update/updatedecrease.html",
    "revision": "aa704b90fcbde2e22542f26110530d0e"
  },
  {
    "url": "docs/database/update/updateincrease.html",
    "revision": "0f42e421d7a93f182f7224d1b41f4651"
  },
  {
    "url": "docs/index.html",
    "revision": "e70435fd57d8c1cd6c3b2b4f23880b3c"
  },
  {
    "url": "docs/orm/create.html",
    "revision": "22d62650c780c0da88ec2dc9ba7fecd9"
  },
  {
    "url": "docs/orm/index.html",
    "revision": "13916e3fc0fdfa19b80458ecf3aa50b4"
  },
  {
    "url": "docs/orm/unitofwork.html",
    "revision": "dba37621aa9594a91027a5efec2867e0"
  },
  {
    "url": "docs/router/index.html",
    "revision": "e62badbad12fbb1740284a95249bcc7e"
  },
  {
    "url": "docs/started/directory.html",
    "revision": "8a90c5a7aeeefddba3ec5968f92f600c"
  },
  {
    "url": "docs/started/index.html",
    "revision": "a1219a55f849e7d92f7524c8f9387ba1"
  },
  {
    "url": "docs/started/install.html",
    "revision": "3345101fe1850b6f0214498300a412ed"
  },
  {
    "url": "docs/started/specification.html",
    "revision": "7ea3d119a4fc9997f9c639697d101bbf"
  },
  {
    "url": "docs/template/assign.html",
    "revision": "9df109d62384657401f04be1a8419dd2"
  },
  {
    "url": "docs/template/break.html",
    "revision": "916b7acd2ded1955e58bebc570481b04"
  },
  {
    "url": "docs/template/css.html",
    "revision": "2714ac582b3d6cf618ca59a0aa353512"
  },
  {
    "url": "docs/template/for.html",
    "revision": "1ada42f8e88db347b4fdcc1b471781ab"
  },
  {
    "url": "docs/template/if.html",
    "revision": "2bd5cf7bbfacedaed24fc9f597805620"
  },
  {
    "url": "docs/template/include.html",
    "revision": "5c841552cdf1c9b796f683e904fcc0bb"
  },
  {
    "url": "docs/template/index.html",
    "revision": "0d4651d8414d73d40cc56f7aeed3284e"
  },
  {
    "url": "docs/template/list.html",
    "revision": "f05caaa86686f246c407b13b04f9b6d6"
  },
  {
    "url": "docs/template/lists.html",
    "revision": "dcc6a63d0ea5bd08013322520cc1e252"
  },
  {
    "url": "docs/template/php.html",
    "revision": "e337f5e7cf7811f5a8fac6fd3eb9577f"
  },
  {
    "url": "docs/template/quick.html",
    "revision": "cd13808ce618aa407b1f1230f2c8e3d9"
  },
  {
    "url": "docs/template/tagself.html",
    "revision": "5cabefaf0c57cd244eab263f0c4ab130"
  },
  {
    "url": "docs/template/var.html",
    "revision": "244f070a285f75b3d857bcb0bc921f4a"
  },
  {
    "url": "docs/template/while.html",
    "revision": "084e760ae2ee3a5f05fc5f04a7beb646"
  },
  {
    "url": "ecosystem/index.html",
    "revision": "88107fb9fc40c7d69bebfdf05476c1ff"
  },
  {
    "url": "guide/index.html",
    "revision": "da0d9eae817460962e16090cb9c7b9a9"
  },
  {
    "url": "hero.png",
    "revision": "18be2abba10f4b34805e9f73ba2ba89d"
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
    "revision": "345835c58637a3717b793269e4169995"
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
    "revision": "18be2abba10f4b34805e9f73ba2ba89d"
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

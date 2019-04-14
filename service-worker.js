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
    "revision": "5280bd64e831eebe191d1c9b7e7404b3"
  },
  {
    "url": "about/index.html",
    "revision": "938e18c6acdbcbf57095b9289ecb8d01"
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
    "url": "assets/js/12.0ac0d8a3.js",
    "revision": "755ad99e6fb8b6ed40e5f44741d62edd"
  },
  {
    "url": "assets/js/13.805b3261.js",
    "revision": "343a9960772bc0439e7ba490165e44d3"
  },
  {
    "url": "assets/js/14.1853126b.js",
    "revision": "3096378df5d9e72b808cc9a8dda53a4b"
  },
  {
    "url": "assets/js/15.740518a0.js",
    "revision": "1332a0fb79858e3a75bb7eccf934f3b0"
  },
  {
    "url": "assets/js/16.674cdf2e.js",
    "revision": "8e4724cc7c522bb029d19939f85b15b6"
  },
  {
    "url": "assets/js/17.7bafc579.js",
    "revision": "cad963bf2f0e87a226984e7f11096ad0"
  },
  {
    "url": "assets/js/18.cbd7110b.js",
    "revision": "91809fe7ebcfd99ac5de91616855379f"
  },
  {
    "url": "assets/js/19.42fae1de.js",
    "revision": "cb13bc1db663f55826314b479dc3c445"
  },
  {
    "url": "assets/js/20.26926196.js",
    "revision": "a18dc35e02a0e8163ed6793488fa0297"
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
    "url": "assets/js/23.6a27b098.js",
    "revision": "b5919e4ab4e1071f8e5c0834c6b4a68d"
  },
  {
    "url": "assets/js/24.cde91420.js",
    "revision": "429330c6787d3989114a00998bf47328"
  },
  {
    "url": "assets/js/25.24c28359.js",
    "revision": "fac8bd77f699f77ad1c4e852251c3945"
  },
  {
    "url": "assets/js/26.5c5d6068.js",
    "revision": "394351f7493e70597abdcd2f6d44bb03"
  },
  {
    "url": "assets/js/27.15c77098.js",
    "revision": "6436fea99d34eadba28956101dffa3bf"
  },
  {
    "url": "assets/js/28.1ee84284.js",
    "revision": "713942be35fce4e9d9f11a9dea04b7c1"
  },
  {
    "url": "assets/js/29.b6d6dd84.js",
    "revision": "7366dcc8cf038fb348f13ba71b1c29cb"
  },
  {
    "url": "assets/js/3.296f809e.js",
    "revision": "c72f94c9bae315d3e33bd47bdec53601"
  },
  {
    "url": "assets/js/30.5121492e.js",
    "revision": "dbc23865f15efb0cfb583e6d23733aee"
  },
  {
    "url": "assets/js/31.e5e684da.js",
    "revision": "c5a97f31d6030b92dfa867144a4dfb90"
  },
  {
    "url": "assets/js/32.9fa4f6ee.js",
    "revision": "473e9247d0ebf474e175673853213b3e"
  },
  {
    "url": "assets/js/33.2c1d0658.js",
    "revision": "ef542198c3307186e4fbe14c82c4f58f"
  },
  {
    "url": "assets/js/34.627536b5.js",
    "revision": "aa5693513dc1a63d670911ed41997a8c"
  },
  {
    "url": "assets/js/35.f8372c76.js",
    "revision": "cd61beed8ee60ddfbca6e9b6aef4db8a"
  },
  {
    "url": "assets/js/36.c05d8b02.js",
    "revision": "43de8b5eb0b765d0ded4989e8954ea26"
  },
  {
    "url": "assets/js/37.43769c49.js",
    "revision": "003eb75f4e578f6928a4fa5d564e7073"
  },
  {
    "url": "assets/js/38.4417c37c.js",
    "revision": "f3c295ab8f6d448cdf01c60f2d0f2d71"
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
    "url": "assets/js/40.9f7b73bf.js",
    "revision": "f6a8513dc260fc9caf2ae1bc1c4702ef"
  },
  {
    "url": "assets/js/41.b294c3f9.js",
    "revision": "4cd71b1eb4683be4ac6c68dc250fec69"
  },
  {
    "url": "assets/js/42.42906030.js",
    "revision": "ed65fb3e0e446377f177f70c660a4ff7"
  },
  {
    "url": "assets/js/43.48c609c9.js",
    "revision": "f23c6c4ef0ccc405b472a804fef4e1c6"
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
    "url": "assets/js/46.72fbe8ab.js",
    "revision": "41aa3e4d95fc8cd2b5858c57c8ea377e"
  },
  {
    "url": "assets/js/47.d6d99a36.js",
    "revision": "61ae14848d2f125e10d6a92fc7a29961"
  },
  {
    "url": "assets/js/48.a5dc5d48.js",
    "revision": "376ada2e6964abfe70146cab80cb1e5c"
  },
  {
    "url": "assets/js/49.82b47075.js",
    "revision": "c7f7b899d2e40c6866245ba5db2b6710"
  },
  {
    "url": "assets/js/5.4980778e.js",
    "revision": "12d22f0039fa0141979030705803d123"
  },
  {
    "url": "assets/js/50.6e5b6ae0.js",
    "revision": "aca6a8c7906b736d0f36d448659a3f0c"
  },
  {
    "url": "assets/js/51.3e43183c.js",
    "revision": "1bb0a5c4ae898e1c94fcf61ebbe0dad2"
  },
  {
    "url": "assets/js/52.92cd9891.js",
    "revision": "b194e17c8088fc82c9cb71044971fbe8"
  },
  {
    "url": "assets/js/53.ff13aab6.js",
    "revision": "d02a942e7c71958524951c35170b4edc"
  },
  {
    "url": "assets/js/54.399497c8.js",
    "revision": "4f08e467c00d062f33a149d0dae953ab"
  },
  {
    "url": "assets/js/55.16444772.js",
    "revision": "2cb6f9ca4bb3125eb9ae618626217b9b"
  },
  {
    "url": "assets/js/56.f72c5047.js",
    "revision": "04d4e323e8569d1dbce671ecbe2934c5"
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
    "url": "assets/js/64.a86fc5b4.js",
    "revision": "3a303e6d90c7bf9c4ffbeea903ead96b"
  },
  {
    "url": "assets/js/65.0ce5bbf7.js",
    "revision": "618364b4517902f4821c073dcf3fb676"
  },
  {
    "url": "assets/js/66.f0902b61.js",
    "revision": "b3b0def768a7d30e60d4939a24c595d0"
  },
  {
    "url": "assets/js/67.03b56b7d.js",
    "revision": "074bfefc3fc73c7fce1b175afa59c5cd"
  },
  {
    "url": "assets/js/68.3ac5fcb3.js",
    "revision": "106571262d8c47b52ffb80e845f8758d"
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
    "url": "assets/js/71.3569e26e.js",
    "revision": "6a7dd160891310ff2df6a5911eb65d6a"
  },
  {
    "url": "assets/js/72.f1c083c3.js",
    "revision": "4e3477b871adc58bff26a1e66d635856"
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
    "url": "assets/js/75.e0ee7988.js",
    "revision": "ac0d694703a8d4550044774465a08191"
  },
  {
    "url": "assets/js/76.ba26dd66.js",
    "revision": "cbe804dd86b29b8a6f7a498a01653b52"
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
    "url": "assets/js/app.3aada31d.js",
    "revision": "f1ab305ad17afdcad00862235e6b80ec"
  },
  {
    "url": "assets/js/vendors~flowchart.5a4d067b.js",
    "revision": "d6f84e566072519b778a6c436be6d3d3"
  },
  {
    "url": "docs/architecture/fn.html",
    "revision": "ba407d8566de3117b47783e3346f5372"
  },
  {
    "url": "docs/architecture/index.html",
    "revision": "a68ebda3f43ccab362a6d9b37f992b9f"
  },
  {
    "url": "docs/architecture/ioc.html",
    "revision": "9a5056f1c9922d1bb349bc31ee46b05d"
  },
  {
    "url": "docs/component/debug.html",
    "revision": "8b796689d6515a7d2670a8dde02b60b2"
  },
  {
    "url": "docs/component/encryption.html",
    "revision": "16b1b66298966da65a0fda22f478f45c"
  },
  {
    "url": "docs/component/safe.html",
    "revision": "f5bdd1b68149ab9ede1257fdc8b87bcc"
  },
  {
    "url": "docs/component/support/arr.html",
    "revision": "4176787f887ba767b022a27867a48c6d"
  },
  {
    "url": "docs/component/support/str.html",
    "revision": "cd7c272515906d2084dff2ac9c3108f0"
  },
  {
    "url": "docs/database/config.html",
    "revision": "f99078fde8a625c4cabadff07b8ae0c2"
  },
  {
    "url": "docs/database/create/insert.html",
    "revision": "fa175ecbf7bd6d478e156e15945013e5"
  },
  {
    "url": "docs/database/create/insertall.html",
    "revision": "1803d6d903b6b96aeed2b6a270c85d82"
  },
  {
    "url": "docs/database/delete/delete.html",
    "revision": "c14c40a5ca8e45ea6930b9a784202062"
  },
  {
    "url": "docs/database/index.html",
    "revision": "b1d7b78cf815b8bef78aa47f3a6953ef"
  },
  {
    "url": "docs/database/query/aggregate.html",
    "revision": "66a6daddeb4a7b1e75d7cda9030286be"
  },
  {
    "url": "docs/database/query/bind.html",
    "revision": "1e877fed08ace98f6205855aab77825b"
  },
  {
    "url": "docs/database/query/columns.html",
    "revision": "80d72a0dc67187e51c9b54feefab4721"
  },
  {
    "url": "docs/database/query/distinct.html",
    "revision": "8721c8e6acd170def1082b3656705627"
  },
  {
    "url": "docs/database/query/flow.html",
    "revision": "e58b6c762b7826285b5f1abb25ec074f"
  },
  {
    "url": "docs/database/query/forceindex.html",
    "revision": "0832f2f89a4be1cb67e2968398edd0c8"
  },
  {
    "url": "docs/database/query/forupdate.html",
    "revision": "b37dabe4399ed1978f03aa8c1dab7924"
  },
  {
    "url": "docs/database/query/groupby.html",
    "revision": "b0c1c0dfddc3fa8b4f66923f9d9a17d9"
  },
  {
    "url": "docs/database/query/having.html",
    "revision": "a95b223ad48b23d61672ce3c6a94403a"
  },
  {
    "url": "docs/database/query/join.html",
    "revision": "c90daebae46a20ff8ea8835b40d1f3b2"
  },
  {
    "url": "docs/database/query/limit.html",
    "revision": "8dfd85b157b26df4bb4c27dfae15c7f4"
  },
  {
    "url": "docs/database/query/orderby.html",
    "revision": "6bd81bdd8e86f06e2e04e07775604f09"
  },
  {
    "url": "docs/database/query/prefix.html",
    "revision": "daf1eb3cd6c4e0fa0079ae687a47aadb"
  },
  {
    "url": "docs/database/query/reset.html",
    "revision": "bbea0502ff89789a98fc15d6048554bb"
  },
  {
    "url": "docs/database/query/sql.html",
    "revision": "a38a6de3f2de40e43f93e75dcb9b2e7c"
  },
  {
    "url": "docs/database/query/table.html",
    "revision": "ce71a88c81165733bff10724832e33d7"
  },
  {
    "url": "docs/database/query/union.html",
    "revision": "3ab9b552659e0306162d97d39f96b378"
  },
  {
    "url": "docs/database/query/where.html",
    "revision": "50244940260e5c85188f2c6cd807dd5c"
  },
  {
    "url": "docs/database/read/aggregate.html",
    "revision": "99cf258dfb62846134d2a2519f5b2e7f"
  },
  {
    "url": "docs/database/read/find.html",
    "revision": "d610ddf12e21106a0a2202d1ca7e28fd"
  },
  {
    "url": "docs/database/read/findall.html",
    "revision": "d406a1121600d5852b1e04715e73d3bc"
  },
  {
    "url": "docs/database/read/finddynamics.html",
    "revision": "149262080bbe9f4c3cab06a81ca34da1"
  },
  {
    "url": "docs/database/read/findone.html",
    "revision": "6cc3bb114cee895bc9c54ffa856dd48e"
  },
  {
    "url": "docs/database/read/lists.html",
    "revision": "fe52f9598b6c6282df088600e5477494"
  },
  {
    "url": "docs/database/read/select.html",
    "revision": "d3cb8cae10fd7a5008f6c71279d08003"
  },
  {
    "url": "docs/database/read/valuepull.html",
    "revision": "723855344d54400e0f8b5e89efeacc32"
  },
  {
    "url": "docs/database/truncate.html",
    "revision": "2e46a06c45cce4e41de945d603b4aa12"
  },
  {
    "url": "docs/database/update/update.html",
    "revision": "68956b9b700545cf75607fb1693c62e1"
  },
  {
    "url": "docs/database/update/updatecolumn.html",
    "revision": "d76f5bf8d9ff3c4415ac160339eff13b"
  },
  {
    "url": "docs/database/update/updatedecrease.html",
    "revision": "e410ba1e3613f29f1a7260bc6f2a8c81"
  },
  {
    "url": "docs/database/update/updateincrease.html",
    "revision": "6ef826ed87f7b45e31f39bef204dc04c"
  },
  {
    "url": "docs/index.html",
    "revision": "0d4ac45d1475cbd4581e866aa717d14b"
  },
  {
    "url": "docs/orm/create.html",
    "revision": "db564ef116b748664b65891ba5efac18"
  },
  {
    "url": "docs/orm/index.html",
    "revision": "ac67ccca18d84d003e7829f82af3f2ab"
  },
  {
    "url": "docs/orm/unitofwork.html",
    "revision": "db428692130a269edcd50b66d2b51bcb"
  },
  {
    "url": "docs/router/index.html",
    "revision": "64f26054b1c43825e19115862a1e4848"
  },
  {
    "url": "docs/started/directory.html",
    "revision": "62f85578752965ddba1dc5478fabae02"
  },
  {
    "url": "docs/started/index.html",
    "revision": "e28a23abecb8f1e4043c998c1d2dfa32"
  },
  {
    "url": "docs/started/install.html",
    "revision": "42a25a32ae2ca23248407ed48a6cd17e"
  },
  {
    "url": "docs/started/specification.html",
    "revision": "d57e631454229a8b8513a18e29c518d3"
  },
  {
    "url": "docs/template/assign.html",
    "revision": "9b207f1ca6f09cf05a63992c669a969d"
  },
  {
    "url": "docs/template/break.html",
    "revision": "a9d4beb671ecdebdf6725c0d3fd0641e"
  },
  {
    "url": "docs/template/css.html",
    "revision": "7623b06bc8fee327e0830fc56d2cffb0"
  },
  {
    "url": "docs/template/for.html",
    "revision": "91b6c94e4fffef3d421f05266efeca90"
  },
  {
    "url": "docs/template/if.html",
    "revision": "b1b41c8f084a31bc54eaec0ed4647dad"
  },
  {
    "url": "docs/template/include.html",
    "revision": "cfd0cfd6ed89c0335546b5c5e26908aa"
  },
  {
    "url": "docs/template/index.html",
    "revision": "a1d15512b3c2bd6e66147d21fc83a5b6"
  },
  {
    "url": "docs/template/list.html",
    "revision": "d8a1bac8b960a16068184caecbaf1e20"
  },
  {
    "url": "docs/template/lists.html",
    "revision": "a862c077de9ca5bfa3c062a92d676a4c"
  },
  {
    "url": "docs/template/php.html",
    "revision": "7d40d6f23d1879699c974c5cf85fe7bd"
  },
  {
    "url": "docs/template/quick.html",
    "revision": "5ecb632d1217c5c7431860a78a19b7fc"
  },
  {
    "url": "docs/template/tagself.html",
    "revision": "ff88a86b20be0c0c0ff32ff50670b95c"
  },
  {
    "url": "docs/template/var.html",
    "revision": "9f57fcb786ce6e6c0fde2d1c46cc9437"
  },
  {
    "url": "docs/template/while.html",
    "revision": "1cb007b92f30e537d0a00341cc49e9f8"
  },
  {
    "url": "ecosystem/index.html",
    "revision": "f9d6181976ed9bef1a43076e979307a2"
  },
  {
    "url": "guide/index.html",
    "revision": "210c416e7847a4427ee34237d2989f24"
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
    "revision": "ac5f933564fe7b8d5bb5e0adc6a1f1a5"
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

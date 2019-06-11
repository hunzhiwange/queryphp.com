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
    "revision": "8980b17e39c11e302c64f3aa3e0a200d"
  },
  {
    "url": "about/index.html",
    "revision": "f9114d1aee4dedde09f4bc743cac36c7"
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
    "url": "assets/js/10.9aa58987.js",
    "revision": "226609d7492a16cf9682e259fc1e6c33"
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
    "url": "assets/js/13.56a74653.js",
    "revision": "65d9ae8f446fb30def4b60f57507750a"
  },
  {
    "url": "assets/js/14.1853126b.js",
    "revision": "3096378df5d9e72b808cc9a8dda53a4b"
  },
  {
    "url": "assets/js/15.f390a96b.js",
    "revision": "3fbe94ab6ec25215b04599b1c23ff956"
  },
  {
    "url": "assets/js/16.d1bf7471.js",
    "revision": "9af0ff1dcdc044795233c4b59d47d3f5"
  },
  {
    "url": "assets/js/17.b981faa1.js",
    "revision": "cc2d366aa4c393f7c2c679e0b4baef2a"
  },
  {
    "url": "assets/js/18.c739eefe.js",
    "revision": "69b3caaa1eb687c0f96bfe0af176a0d3"
  },
  {
    "url": "assets/js/19.f08ec116.js",
    "revision": "84d251204708d0cc0c1b54c18f871bed"
  },
  {
    "url": "assets/js/20.1913c2f4.js",
    "revision": "903ab5368111befbbd43ed1fe8de51b9"
  },
  {
    "url": "assets/js/21.8546a630.js",
    "revision": "8f62e1debb98f7621f82fce0e8a4ad75"
  },
  {
    "url": "assets/js/22.e412fe7b.js",
    "revision": "8577704a498ec8f5863995d0d6cad34f"
  },
  {
    "url": "assets/js/23.84553718.js",
    "revision": "679f279d973c0e230d7f3a00e685487b"
  },
  {
    "url": "assets/js/24.919db8b8.js",
    "revision": "44459675b3767d82fc749dd37f674b6b"
  },
  {
    "url": "assets/js/25.cd1e29c9.js",
    "revision": "338354346a98c73a3044274ba406780b"
  },
  {
    "url": "assets/js/26.644eb6d8.js",
    "revision": "aba84627cdd086a05a18822fd83ac8e2"
  },
  {
    "url": "assets/js/27.27310504.js",
    "revision": "6df11a6be3146093c8e85962ca3afa88"
  },
  {
    "url": "assets/js/28.1aba9035.js",
    "revision": "85bc78ab856ecbc4f5a674393a7c5762"
  },
  {
    "url": "assets/js/29.444d83b7.js",
    "revision": "ea0b767b6af53765e983ceec11fd53d2"
  },
  {
    "url": "assets/js/3.ce8c3442.js",
    "revision": "c6e002a10726263927d63b8df4bed586"
  },
  {
    "url": "assets/js/30.e7f9d4c4.js",
    "revision": "ea95e35a9baae465bff718f0c7b1f9a1"
  },
  {
    "url": "assets/js/31.f7e09e2b.js",
    "revision": "e1eef4208fab5d815a6dfcb996022120"
  },
  {
    "url": "assets/js/32.27d800aa.js",
    "revision": "0cce85ff9b9bfbd364e8178088494b16"
  },
  {
    "url": "assets/js/33.29f44802.js",
    "revision": "fdf1cbb85b1865b295d184c9a86af594"
  },
  {
    "url": "assets/js/34.6064a1ed.js",
    "revision": "f6b3b12013c708714fa788d5797b9f4a"
  },
  {
    "url": "assets/js/35.7d34699d.js",
    "revision": "c3e650ee13c36381294dce56ac864dd7"
  },
  {
    "url": "assets/js/36.8d9949c7.js",
    "revision": "9d1b4f53bb864df510db8d09561fe037"
  },
  {
    "url": "assets/js/37.4d7cf374.js",
    "revision": "6a97f246a51949f2ccdc13db8e08d340"
  },
  {
    "url": "assets/js/38.d296ad83.js",
    "revision": "e10637cb36106eeefce1028002bc619b"
  },
  {
    "url": "assets/js/39.91b7f384.js",
    "revision": "9dfa5b3c1dbdbd524561b494a376478b"
  },
  {
    "url": "assets/js/4.9e723ae2.js",
    "revision": "dc748c096aff37cb4c6e4f9a575f7baa"
  },
  {
    "url": "assets/js/40.6cbe601d.js",
    "revision": "65d9e0f12ea6953d96b01067efebd9bc"
  },
  {
    "url": "assets/js/41.a0a46f60.js",
    "revision": "544783e0ea8c0dbad3b14775d937dc5e"
  },
  {
    "url": "assets/js/42.491e80f0.js",
    "revision": "9e4159a84191ffd8caeaf4ce7fd0cb33"
  },
  {
    "url": "assets/js/43.faa98317.js",
    "revision": "0784d6fac4a7357a41b53a8ccdc2b37b"
  },
  {
    "url": "assets/js/44.0ad88728.js",
    "revision": "4a970e5ec3489abff16fab587a705abc"
  },
  {
    "url": "assets/js/45.1dc2ed79.js",
    "revision": "371ead387a9f5240ce117a1f3358e8a1"
  },
  {
    "url": "assets/js/46.9c84d005.js",
    "revision": "5ade11c92f2d09c0eca6762d1bc53c85"
  },
  {
    "url": "assets/js/47.3549eea4.js",
    "revision": "8a73abcadbe11575fb5d4cb618018036"
  },
  {
    "url": "assets/js/48.33df76d5.js",
    "revision": "e03538214b7a1aaf013512985b6a101f"
  },
  {
    "url": "assets/js/49.38beb241.js",
    "revision": "21c85d956aab82dae0051e41c998e402"
  },
  {
    "url": "assets/js/5.4980778e.js",
    "revision": "12d22f0039fa0141979030705803d123"
  },
  {
    "url": "assets/js/50.51b9af9e.js",
    "revision": "7e6372ad4c9822ab95d721716c0e65ed"
  },
  {
    "url": "assets/js/51.30ce5722.js",
    "revision": "070af1868041af898b1040625adfd723"
  },
  {
    "url": "assets/js/52.bd9d8593.js",
    "revision": "68d9df0aa09d5de7eab6d5bef306827b"
  },
  {
    "url": "assets/js/53.256a592d.js",
    "revision": "9c9cbb8853833cf38626b6974e24f2b0"
  },
  {
    "url": "assets/js/54.ccb07a40.js",
    "revision": "c9b4c86306c5a97c2465f3a5ccf7e91f"
  },
  {
    "url": "assets/js/55.c1d2f3d3.js",
    "revision": "cb956818d65b45b0479e0383468a5493"
  },
  {
    "url": "assets/js/56.1400f58b.js",
    "revision": "f76c3badaaf4abba1285ca658a1f1174"
  },
  {
    "url": "assets/js/57.eaa8474a.js",
    "revision": "5ac995c3b396a7ab8a8e45939236a244"
  },
  {
    "url": "assets/js/58.e4507cfa.js",
    "revision": "4b44e86f32187d0d76faa2dfdaf6e254"
  },
  {
    "url": "assets/js/59.27eec412.js",
    "revision": "d6cc73ffa85bf5cda4af357a7cc6aa50"
  },
  {
    "url": "assets/js/6.fdf0f8c3.js",
    "revision": "fd212ac11b316a30f8a7b4020c5a86ba"
  },
  {
    "url": "assets/js/60.a731042c.js",
    "revision": "c38fc032aa149d55ff04eab4c5c901ad"
  },
  {
    "url": "assets/js/61.5ea11cdb.js",
    "revision": "32a1de0262c6f59531d5120234c46ec7"
  },
  {
    "url": "assets/js/62.48972be8.js",
    "revision": "b7df024c5c89299cf13f6cb4d57f45e6"
  },
  {
    "url": "assets/js/63.6f4aa47c.js",
    "revision": "0783dbede4934745a972af437576fe2d"
  },
  {
    "url": "assets/js/64.6770132c.js",
    "revision": "46255855aba263e6210599b7ffdc0f84"
  },
  {
    "url": "assets/js/65.af190fb6.js",
    "revision": "e196596278e836984cea9aac70bb1000"
  },
  {
    "url": "assets/js/66.7d998243.js",
    "revision": "3a76beabc646e4ecc8679a9fc80dfcf6"
  },
  {
    "url": "assets/js/67.103b9664.js",
    "revision": "dcf38b8ca67ad5a579a79b437d09558f"
  },
  {
    "url": "assets/js/68.4af6670c.js",
    "revision": "c1a61f77a3cdd456b5507a7769b2e553"
  },
  {
    "url": "assets/js/69.bdfac8a3.js",
    "revision": "255d6d0ef143147ff60d3f53c43118f9"
  },
  {
    "url": "assets/js/7.928871e5.js",
    "revision": "40a7c75f619351c326fd833e699c55cf"
  },
  {
    "url": "assets/js/70.136dcf1b.js",
    "revision": "f81aa5fc162ed17f65a143089fa1afe9"
  },
  {
    "url": "assets/js/71.af0f4644.js",
    "revision": "61ad519e8eca4809f8b170b9a9f82e3e"
  },
  {
    "url": "assets/js/72.147240d9.js",
    "revision": "d104661b3dc0722174eede6298b1172a"
  },
  {
    "url": "assets/js/73.33ab6b46.js",
    "revision": "2113bfc2ed99ad405ba4c17aa9364e8e"
  },
  {
    "url": "assets/js/74.e4f1f5e4.js",
    "revision": "49ede110573d91c5433cf63ac6442001"
  },
  {
    "url": "assets/js/75.89567772.js",
    "revision": "048efb189ea803b8d7e9de3345a5adff"
  },
  {
    "url": "assets/js/76.025f029d.js",
    "revision": "ec1e04743417cd59eed73d97693ec10a"
  },
  {
    "url": "assets/js/77.f6a14a78.js",
    "revision": "89afa96a6e57031da8deb344c475299b"
  },
  {
    "url": "assets/js/78.7b7afaad.js",
    "revision": "d01baefee771a1b67c1ef4aa851ee157"
  },
  {
    "url": "assets/js/79.e0a42769.js",
    "revision": "93abae9020849d1ba131e3dae55cc376"
  },
  {
    "url": "assets/js/8.a5da796a.js",
    "revision": "4dd228a40760c8bcd7c6a7e121fb9dda"
  },
  {
    "url": "assets/js/80.b8bdbc7a.js",
    "revision": "89bf8ad987203fca00f1c614bfd71ed6"
  },
  {
    "url": "assets/js/81.4dabc7b1.js",
    "revision": "704d574d48ec0bbe432d184c28dbb7be"
  },
  {
    "url": "assets/js/82.c563e39f.js",
    "revision": "c28bc6d274ec481e0601d6151538ad23"
  },
  {
    "url": "assets/js/83.d888852d.js",
    "revision": "a396b238c8fc877e65e00a212beaa2bf"
  },
  {
    "url": "assets/js/84.d88d151f.js",
    "revision": "0fac2ecbea93ef5df76a8cad32ec08f9"
  },
  {
    "url": "assets/js/85.71ff5cf8.js",
    "revision": "15a8d1e1078dc51eb978c07c16894b72"
  },
  {
    "url": "assets/js/9.b1d6cab4.js",
    "revision": "ab0ba18ffbfe1880dc9b3e75d0ba04ba"
  },
  {
    "url": "assets/js/app.aa7d0ded.js",
    "revision": "2ba1ab5f314c9e7fb2c1c8841e9d5f7e"
  },
  {
    "url": "assets/js/vendors~flowchart.5a4d067b.js",
    "revision": "d6f84e566072519b778a6c436be6d3d3"
  },
  {
    "url": "docs/architecture/fn.html",
    "revision": "9fe8df881f721d61ed9732085130650c"
  },
  {
    "url": "docs/architecture/index.html",
    "revision": "6a00f19579dde505c894c04b8c3bb923"
  },
  {
    "url": "docs/architecture/ioc.html",
    "revision": "59c3e614b2d78a75fb81be80fb096769"
  },
  {
    "url": "docs/component/collection.html",
    "revision": "922f16854aeda14988d86231432d422d"
  },
  {
    "url": "docs/component/debug.html",
    "revision": "199a1520789eee088874610fed36fbbf"
  },
  {
    "url": "docs/component/encryption.html",
    "revision": "23b096ea52551548e3371f101011ec82"
  },
  {
    "url": "docs/component/safe.html",
    "revision": "86075f791f64fe666af89aa12a24c61b"
  },
  {
    "url": "docs/component/support/arr.html",
    "revision": "093d7e0c773983a5c6b6a179f04f8f79"
  },
  {
    "url": "docs/component/support/str.html",
    "revision": "8590a4705864416690402079f59b3cda"
  },
  {
    "url": "docs/component/validate/assert.html",
    "revision": "0801e82a128b0b5cf1e62e72ccb729b2"
  },
  {
    "url": "docs/database/config.html",
    "revision": "a5f6de35ba54cb071244236991da0a63"
  },
  {
    "url": "docs/database/create/insert.html",
    "revision": "acc349bcc7a82d293fe74af18508ca05"
  },
  {
    "url": "docs/database/create/insertall.html",
    "revision": "6505b6ae028a97ca88d5d1f8fbf1dd72"
  },
  {
    "url": "docs/database/delete/delete.html",
    "revision": "4c4f5fb7c81164fb9444903866daa86d"
  },
  {
    "url": "docs/database/index.html",
    "revision": "78feaa6a3546aaf0ba3c79b5c8f5bbdf"
  },
  {
    "url": "docs/database/query/aggregate.html",
    "revision": "239fb83d7752f4c403262d119cf63ac4"
  },
  {
    "url": "docs/database/query/bind.html",
    "revision": "8ffa6f9cda7c2b184a5404a2985092d8"
  },
  {
    "url": "docs/database/query/columns.html",
    "revision": "8c0dcaa9a925d98465b3246eaa326af4"
  },
  {
    "url": "docs/database/query/distinct.html",
    "revision": "4ccf204f90b2585ee341e7f642e42062"
  },
  {
    "url": "docs/database/query/flow.html",
    "revision": "a110ba6634616271277a61ff1b44b7af"
  },
  {
    "url": "docs/database/query/forceindex.html",
    "revision": "69fa96866b923100e624adf4a14f5783"
  },
  {
    "url": "docs/database/query/forupdate.html",
    "revision": "ccb4dd60be0672cfa0ea6197f8d3ae67"
  },
  {
    "url": "docs/database/query/groupby.html",
    "revision": "2c4518c19d3841a6e738778989faaa6a"
  },
  {
    "url": "docs/database/query/having.html",
    "revision": "52adba2cff704c0ca8416ba2340aa390"
  },
  {
    "url": "docs/database/query/join.html",
    "revision": "dce6570c2ce4f92de37c571941d440d9"
  },
  {
    "url": "docs/database/query/limit.html",
    "revision": "c399d8233ab099503ac3f39566405f74"
  },
  {
    "url": "docs/database/query/orderby.html",
    "revision": "34235762a5f7120ca1b75adfe94874e1"
  },
  {
    "url": "docs/database/query/prefix.html",
    "revision": "a5578bc27142ddf6483cb2be90ca2feb"
  },
  {
    "url": "docs/database/query/reset.html",
    "revision": "cadd540df8a6fa0fd02b293670b52551"
  },
  {
    "url": "docs/database/query/sql.html",
    "revision": "662d60314f51f39ded68e0433eb8c3a5"
  },
  {
    "url": "docs/database/query/table.html",
    "revision": "e31dcce26f9110570d51ece6d909db65"
  },
  {
    "url": "docs/database/query/union.html",
    "revision": "1d54cf35217fe54e07517200430e97ae"
  },
  {
    "url": "docs/database/query/where.html",
    "revision": "5024d09524c995eb4f449560cf96d08b"
  },
  {
    "url": "docs/database/read/aggregate.html",
    "revision": "957e1af2aa25efcf1ebc260e545d4a03"
  },
  {
    "url": "docs/database/read/find.html",
    "revision": "b8d04d5f8643b95559cd5d755c175ea6"
  },
  {
    "url": "docs/database/read/findall.html",
    "revision": "c667ee18e2f2b8ce6c21a8f043a4905e"
  },
  {
    "url": "docs/database/read/finddynamics.html",
    "revision": "dec3109e445da1c2a341598c6026a4be"
  },
  {
    "url": "docs/database/read/findone.html",
    "revision": "b2a7f7258b28436b3f2a99fa5bbf6337"
  },
  {
    "url": "docs/database/read/lists.html",
    "revision": "dd13619c2cfbcd2b587ad40df22e0c39"
  },
  {
    "url": "docs/database/read/select.html",
    "revision": "9770bd1b728ea9413a004588da4f6bef"
  },
  {
    "url": "docs/database/read/valuepull.html",
    "revision": "39e381ae7e86853c24b98712571a7148"
  },
  {
    "url": "docs/database/truncate.html",
    "revision": "7093b2d59dae2cae15baf1924f7e0c21"
  },
  {
    "url": "docs/database/update/update.html",
    "revision": "514bd44d8c749370b884aaf71a557ec9"
  },
  {
    "url": "docs/database/update/updatecolumn.html",
    "revision": "d07846cf1924fb14f6766b816ba96701"
  },
  {
    "url": "docs/database/update/updatedecrease.html",
    "revision": "60374787fbed0cac87ec9c42bf1eab0e"
  },
  {
    "url": "docs/database/update/updateincrease.html",
    "revision": "a6e8ba391740121489ed4a08fe7b6e70"
  },
  {
    "url": "docs/developer/index.html",
    "revision": "b48ce06fd58f1423958b32aa96d57245"
  },
  {
    "url": "docs/index.html",
    "revision": "fa49af86453eab6afa246aa931b6fd6a"
  },
  {
    "url": "docs/orm/create.html",
    "revision": "cb5ef001c065264ed6cb17e4f3a2b9c5"
  },
  {
    "url": "docs/orm/index.html",
    "revision": "05ff1f58709cdc57705b38ac33fc8262"
  },
  {
    "url": "docs/orm/unitofwork.html",
    "revision": "dca50dd2bd47c95a77f10b8d3e6cecfd"
  },
  {
    "url": "docs/router/index.html",
    "revision": "52ea645b29318faa314be291165fea95"
  },
  {
    "url": "docs/started/directory.html",
    "revision": "460149e9477005a36001bb033f0ed301"
  },
  {
    "url": "docs/started/index.html",
    "revision": "0d11e6f2244ad3addcc1c731bea8dc1b"
  },
  {
    "url": "docs/started/install.html",
    "revision": "83def6f8ad20346c4104e2d056a3f06e"
  },
  {
    "url": "docs/started/specification.html",
    "revision": "a83db55a95216bcf871ba2e8ee2f987e"
  },
  {
    "url": "docs/template/assign.html",
    "revision": "1826756995ba9c1647b3cfd379124aaf"
  },
  {
    "url": "docs/template/break.html",
    "revision": "68554f540b67f4c39956e24c7b473d46"
  },
  {
    "url": "docs/template/css.html",
    "revision": "a1d42a6d512a851994e260c12c99a4a2"
  },
  {
    "url": "docs/template/for.html",
    "revision": "be38ad9e447badc29847f96e460635d1"
  },
  {
    "url": "docs/template/if.html",
    "revision": "f43b40a0e72a012ad81c2e519a27aeda"
  },
  {
    "url": "docs/template/include.html",
    "revision": "0100f1bb05a91694192b06ebd2a0134b"
  },
  {
    "url": "docs/template/index.html",
    "revision": "be872c425c9795e8909120a2ebace803"
  },
  {
    "url": "docs/template/list.html",
    "revision": "2a466af221eebc521c182d397a486f55"
  },
  {
    "url": "docs/template/lists.html",
    "revision": "d9910677c8799fa22e393756933a9062"
  },
  {
    "url": "docs/template/php.html",
    "revision": "a87857b7e88029f5d3ee2bba9cabb1f1"
  },
  {
    "url": "docs/template/quick.html",
    "revision": "badfe2e95706aa3551afb35abbcfff66"
  },
  {
    "url": "docs/template/tagself.html",
    "revision": "6e3b2d4834cfc8d8aad5c593748812e1"
  },
  {
    "url": "docs/template/var.html",
    "revision": "674c9376ff7cdf14e5c4ff59dfccb180"
  },
  {
    "url": "docs/template/while.html",
    "revision": "4e25d51950987609d4e3ce6d8179e616"
  },
  {
    "url": "ecosystem/index.html",
    "revision": "be83aaf829f5a9d89ac08803e03faceb"
  },
  {
    "url": "guide/index.html",
    "revision": "773c3195ae48d97a7cf06fd444d9da14"
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
    "revision": "266b55d120be88845f6d52bec67b7422"
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

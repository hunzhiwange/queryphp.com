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
    "revision": "8499d0dab7c46a36b95f62a547e337a5"
  },
  {
    "url": "about/index.html",
    "revision": "8b80410229164da69684f0e0cbc3b370"
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
    "url": "assets/js/12.a77a3fb2.js",
    "revision": "e006dedca195a95b206478bdb89ebf3a"
  },
  {
    "url": "assets/js/13.38e440be.js",
    "revision": "98b3c23735134058453a88c0c7812d35"
  },
  {
    "url": "assets/js/14.8c0e2ac0.js",
    "revision": "a8a2e77179295563a0112b1ab3b24bb4"
  },
  {
    "url": "assets/js/15.e91db1fe.js",
    "revision": "302f3d7228ea8a3c94d88c0827980325"
  },
  {
    "url": "assets/js/16.674cdf2e.js",
    "revision": "8e4724cc7c522bb029d19939f85b15b6"
  },
  {
    "url": "assets/js/17.6459255e.js",
    "revision": "85b2eb2bf3ec91a478e1e5e955e02f53"
  },
  {
    "url": "assets/js/18.7a29936f.js",
    "revision": "3653f54ad75889c327e9e2fe43733ea2"
  },
  {
    "url": "assets/js/19.42fae1de.js",
    "revision": "cb13bc1db663f55826314b479dc3c445"
  },
  {
    "url": "assets/js/20.9ed2ab35.js",
    "revision": "cde6c7b7d9f24106c7636245d4615a14"
  },
  {
    "url": "assets/js/21.17b7c248.js",
    "revision": "a88c1d6b5049d146bf15ca8f8c30c0de"
  },
  {
    "url": "assets/js/22.24caaaa9.js",
    "revision": "2463e720fca8009b061ea1335740270c"
  },
  {
    "url": "assets/js/23.b7f65e43.js",
    "revision": "4a6e2d556744ca555137afc66eb23b44"
  },
  {
    "url": "assets/js/24.0b0c309c.js",
    "revision": "003f8a0abc72dc6e7a1cf3446d3de639"
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
    "url": "assets/js/32.b7edc28c.js",
    "revision": "44bb8ae08965434e571df5bef9433a7f"
  },
  {
    "url": "assets/js/33.cf4ff178.js",
    "revision": "9908397ce7f3a3be33d55db20af3a857"
  },
  {
    "url": "assets/js/34.13d8a3eb.js",
    "revision": "1484aa92853c5b4dc9c1ec1fb1a323c4"
  },
  {
    "url": "assets/js/35.4b84b0ed.js",
    "revision": "8e6191c91181234206176a0b7c6d7b60"
  },
  {
    "url": "assets/js/36.2c14aa34.js",
    "revision": "76cb958441b361a7c5149e00126d0b4b"
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
    "url": "assets/js/40.7dc62402.js",
    "revision": "e10a352cb97164a75ee970ed46b984eb"
  },
  {
    "url": "assets/js/41.647053c1.js",
    "revision": "74ad3598a99075e54e41fbd904b161ac"
  },
  {
    "url": "assets/js/42.e1b57178.js",
    "revision": "d1f2318007209c70b61dd0c50df1a794"
  },
  {
    "url": "assets/js/43.b4a1d9b3.js",
    "revision": "d3a14bfc39986fd4892ac8ee8dca3e18"
  },
  {
    "url": "assets/js/44.8a49f95e.js",
    "revision": "a9278d9fb99aa345b1ac367d3ae8d338"
  },
  {
    "url": "assets/js/45.9bb8541d.js",
    "revision": "716e168e841290687f1f261b26ed245d"
  },
  {
    "url": "assets/js/46.a7b4a0da.js",
    "revision": "fb1516ae8402c6c936a2ae91af7cd6ad"
  },
  {
    "url": "assets/js/47.fb328872.js",
    "revision": "57dee01d2c1de0f41438e548a354d3c3"
  },
  {
    "url": "assets/js/48.7eee869c.js",
    "revision": "5b2114fa787cc6d602c8135a927240df"
  },
  {
    "url": "assets/js/49.428e3e1d.js",
    "revision": "b29982a99ab7641d8d68a6e3d21e7df9"
  },
  {
    "url": "assets/js/5.4980778e.js",
    "revision": "12d22f0039fa0141979030705803d123"
  },
  {
    "url": "assets/js/50.abdbeeb9.js",
    "revision": "5c9b745e4b881a632d63d680bd094ea9"
  },
  {
    "url": "assets/js/51.08f04102.js",
    "revision": "15a74a0dca2735cd2de3521cb65a9b2e"
  },
  {
    "url": "assets/js/52.433ced40.js",
    "revision": "83f6e643781c2c33a5764c9157ce1aea"
  },
  {
    "url": "assets/js/53.03591519.js",
    "revision": "2090102754c5522cd141af978c783c1d"
  },
  {
    "url": "assets/js/54.cd248350.js",
    "revision": "20a6126cc86fd709cc8eb19929c8a218"
  },
  {
    "url": "assets/js/55.9965734a.js",
    "revision": "d76520adcdb7bc92595706254a1656d1"
  },
  {
    "url": "assets/js/56.bcab1987.js",
    "revision": "952c443ffc5f6efd4410976aca49403a"
  },
  {
    "url": "assets/js/57.67838267.js",
    "revision": "e0b96f1a85cfcfbd2cec30ec25bc256d"
  },
  {
    "url": "assets/js/58.3a0aa246.js",
    "revision": "f12a869715c69348c3bb0a9cf25a216c"
  },
  {
    "url": "assets/js/59.f928d602.js",
    "revision": "3872cacfc005e993a4e221a23e077b46"
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
    "url": "assets/js/62.036490a7.js",
    "revision": "7490d542ace6357b4dca0f715396848a"
  },
  {
    "url": "assets/js/63.7a0123a4.js",
    "revision": "ae5337e92d2cbafa551b3cebe8d567a3"
  },
  {
    "url": "assets/js/64.f7c1771d.js",
    "revision": "a4e3710709f0f39031ef0ff01c46abaf"
  },
  {
    "url": "assets/js/65.cb34fa11.js",
    "revision": "cdb44bb293ba0c96dff242dd6277337c"
  },
  {
    "url": "assets/js/66.3128d2c4.js",
    "revision": "4629aa6ea2fe98c9ec289b4408aa8bb6"
  },
  {
    "url": "assets/js/67.4c3992d6.js",
    "revision": "5b3b78cd9e9807f25913af0075b59faa"
  },
  {
    "url": "assets/js/68.617ff2db.js",
    "revision": "9e6d277f82634764c2852ae4a3963a4a"
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
    "url": "assets/js/70.dd83ef97.js",
    "revision": "9f0ff99bee233d42ab667ed660d76aa4"
  },
  {
    "url": "assets/js/71.7e6f3d26.js",
    "revision": "29b88e639cb64ffb12670addadbf7122"
  },
  {
    "url": "assets/js/72.f901a38f.js",
    "revision": "86b959258c1849cf09050d90e20556b5"
  },
  {
    "url": "assets/js/73.58fc5a9d.js",
    "revision": "0ace1ac2eb733e420c06d9e04521110e"
  },
  {
    "url": "assets/js/74.0b670cc8.js",
    "revision": "9837865f2e770bd427ec8f7bcc383434"
  },
  {
    "url": "assets/js/75.20eb3769.js",
    "revision": "d504e0cd6115716f8a8cb6ba4bda2aec"
  },
  {
    "url": "assets/js/76.21213771.js",
    "revision": "a05a94949870d7e2909b49df23e17222"
  },
  {
    "url": "assets/js/77.4c16e69a.js",
    "revision": "496326be20d24d97a0ddef07a1de224f"
  },
  {
    "url": "assets/js/78.7354d507.js",
    "revision": "06d07a8427fa71645ed87eba454844d7"
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
    "url": "assets/js/80.f4471a50.js",
    "revision": "1a9772b07302b5f2af95c2ea5bcb4173"
  },
  {
    "url": "assets/js/81.75ff23aa.js",
    "revision": "95ea7cf953ade85d93932ebfbf3f8775"
  },
  {
    "url": "assets/js/82.fa239949.js",
    "revision": "1cbd534fed705ce399d3d40dbecfbdac"
  },
  {
    "url": "assets/js/83.a570cb22.js",
    "revision": "008c4092db6ff72220c512da31227838"
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
    "url": "assets/js/app.86f36b3e.js",
    "revision": "d511f89ee128f642ed9cbab0c6e39a63"
  },
  {
    "url": "assets/js/vendors~flowchart.5a4d067b.js",
    "revision": "d6f84e566072519b778a6c436be6d3d3"
  },
  {
    "url": "docs/architecture/fn.html",
    "revision": "a46e6ab96eae39f9307f51edabdac7fb"
  },
  {
    "url": "docs/architecture/index.html",
    "revision": "d6a35fbf4a0b8f7d4775a170839055a5"
  },
  {
    "url": "docs/architecture/ioc.html",
    "revision": "209e235cb4fd8481426278849e5c9f35"
  },
  {
    "url": "docs/component/debug.html",
    "revision": "be758f9ab13f7ed77889ab5057d695f4"
  },
  {
    "url": "docs/component/encryption.html",
    "revision": "5e22147aa90647376f6dd5dcd066fc75"
  },
  {
    "url": "docs/component/safe.html",
    "revision": "e3d5be713c559935b5c275017659d93d"
  },
  {
    "url": "docs/component/support/arr.html",
    "revision": "db85d5759f7a112d475bd1b2d1a61840"
  },
  {
    "url": "docs/component/support/str.html",
    "revision": "04fbc7b45d67f13c6153428357692861"
  },
  {
    "url": "docs/component/validate/assert.html",
    "revision": "dd9334724c8626d531b7b2d1eff64c28"
  },
  {
    "url": "docs/database/config.html",
    "revision": "b982375573a578f711ada8a866d09b22"
  },
  {
    "url": "docs/database/create/insert.html",
    "revision": "01ff4733b0df37e3d3998c6820d92d35"
  },
  {
    "url": "docs/database/create/insertall.html",
    "revision": "996db70255adea7a292b1505e7b1ff72"
  },
  {
    "url": "docs/database/delete/delete.html",
    "revision": "f49d182522cdc319427bc11efa6b8f26"
  },
  {
    "url": "docs/database/index.html",
    "revision": "4fab5d8ca9aaf77b16f7f688c836ba68"
  },
  {
    "url": "docs/database/query/aggregate.html",
    "revision": "2774742a8e7e66d083d42b3ecf3080e1"
  },
  {
    "url": "docs/database/query/bind.html",
    "revision": "5d3e542075ddb2745439ca83ec99a3cc"
  },
  {
    "url": "docs/database/query/columns.html",
    "revision": "3591a88ed2f511e5108c9dba8e7a7868"
  },
  {
    "url": "docs/database/query/distinct.html",
    "revision": "1f2b21dc21330f64e52be33e9e412b1a"
  },
  {
    "url": "docs/database/query/flow.html",
    "revision": "3f24fd5f715814c46040b53f70f1ed34"
  },
  {
    "url": "docs/database/query/forceindex.html",
    "revision": "f8ecaf1147aaab51465f92d6bea50651"
  },
  {
    "url": "docs/database/query/forupdate.html",
    "revision": "2b429d7f8aea11fe1bf3030bee6c2d60"
  },
  {
    "url": "docs/database/query/groupby.html",
    "revision": "78c26e2986c722eec762a1fb25750f6a"
  },
  {
    "url": "docs/database/query/having.html",
    "revision": "dee55256c0c2e4424e407ffb16f35f6f"
  },
  {
    "url": "docs/database/query/join.html",
    "revision": "27e6e23c173facebbca90a7ec34f417e"
  },
  {
    "url": "docs/database/query/limit.html",
    "revision": "fbb7f371f3611f84af1e65ea50d5d4f9"
  },
  {
    "url": "docs/database/query/orderby.html",
    "revision": "6ee6ea7b47ac435630eab13c2b88f235"
  },
  {
    "url": "docs/database/query/prefix.html",
    "revision": "580b73900d691e6a7085ce3d1e66d7a7"
  },
  {
    "url": "docs/database/query/reset.html",
    "revision": "e3126b335d692ff80f2358a27655afdb"
  },
  {
    "url": "docs/database/query/sql.html",
    "revision": "69e4e47172e2b35907ac6a532ee0c5d3"
  },
  {
    "url": "docs/database/query/table.html",
    "revision": "6f6d328baed15adcbb6291997591fe87"
  },
  {
    "url": "docs/database/query/union.html",
    "revision": "dc24db54963c4822c4ee5be23c4ecc25"
  },
  {
    "url": "docs/database/query/where.html",
    "revision": "276955c3e98e978abf84e710fdb14e3f"
  },
  {
    "url": "docs/database/read/aggregate.html",
    "revision": "e3a33fbc7702a2d852c7b5d2c4e1b933"
  },
  {
    "url": "docs/database/read/find.html",
    "revision": "12af6c54992bca0627d5824bafdf9640"
  },
  {
    "url": "docs/database/read/findall.html",
    "revision": "4aed93a068b99124e036ac7eb6d62d29"
  },
  {
    "url": "docs/database/read/finddynamics.html",
    "revision": "a356d358b00b1095e72524576c7c2692"
  },
  {
    "url": "docs/database/read/findone.html",
    "revision": "3b29f479d471d3082247ef56c5cd4633"
  },
  {
    "url": "docs/database/read/lists.html",
    "revision": "8c4ec92e67fd3438f011c8f90a9e99d9"
  },
  {
    "url": "docs/database/read/select.html",
    "revision": "9b1b4e9b7fbf1b7e9381f89d1661586f"
  },
  {
    "url": "docs/database/read/valuepull.html",
    "revision": "1b7a95e04d4c895733126255e508c975"
  },
  {
    "url": "docs/database/truncate.html",
    "revision": "c90045c69bd4faac8e68df3f0a18a96a"
  },
  {
    "url": "docs/database/update/update.html",
    "revision": "cc20c7fb85c8d815f47a47d616051102"
  },
  {
    "url": "docs/database/update/updatecolumn.html",
    "revision": "5f10d92bf92fa4972b19a50b2cb47de5"
  },
  {
    "url": "docs/database/update/updatedecrease.html",
    "revision": "b47950fc4cb81293b810eefd99c1d0f1"
  },
  {
    "url": "docs/database/update/updateincrease.html",
    "revision": "fb4146c80bddc98313bcb107a70e58cf"
  },
  {
    "url": "docs/developer/index.html",
    "revision": "d69f057446b295c85c3064543155a1f9"
  },
  {
    "url": "docs/index.html",
    "revision": "30ccbd6baafa05b5da74707adc28f25b"
  },
  {
    "url": "docs/orm/create.html",
    "revision": "084b7d9497e471b74bed117b4efe204a"
  },
  {
    "url": "docs/orm/index.html",
    "revision": "7b173cf2a685c89feed9defc964148df"
  },
  {
    "url": "docs/orm/unitofwork.html",
    "revision": "e8631adb30fba33c9b1a5125cb9c8e0e"
  },
  {
    "url": "docs/router/index.html",
    "revision": "d81c48e1a4aefbb39ab66d5762398bc2"
  },
  {
    "url": "docs/started/directory.html",
    "revision": "ef6d4afb4f8d03473558e003c4272103"
  },
  {
    "url": "docs/started/index.html",
    "revision": "4dd39f3137ec745060ec69b2e03264e0"
  },
  {
    "url": "docs/started/install.html",
    "revision": "68fff972c5a2ef6164dceb18875879ea"
  },
  {
    "url": "docs/started/specification.html",
    "revision": "25c8b1fd75285d06191d0a9dc85098cc"
  },
  {
    "url": "docs/template/assign.html",
    "revision": "1f9e05cb147427fee6405d1d878a95b5"
  },
  {
    "url": "docs/template/break.html",
    "revision": "48b133602ec4b3516382d0e995953ae1"
  },
  {
    "url": "docs/template/css.html",
    "revision": "ec9c9326fb264d0851c94b8a0fdbeb01"
  },
  {
    "url": "docs/template/for.html",
    "revision": "e0edab83edcb7ed92c09701d44e88e74"
  },
  {
    "url": "docs/template/if.html",
    "revision": "6db6b22c39c0e0f37691cd5176f507fb"
  },
  {
    "url": "docs/template/include.html",
    "revision": "e216f6f3ca8e177cf037a28df2a227b7"
  },
  {
    "url": "docs/template/index.html",
    "revision": "6cd7e3eab2247afe81dd73a7e35487d8"
  },
  {
    "url": "docs/template/list.html",
    "revision": "31ec2901ee4d5c79fe6a20c5bd3cce9e"
  },
  {
    "url": "docs/template/lists.html",
    "revision": "7093556869b193cce30271d4f931c003"
  },
  {
    "url": "docs/template/php.html",
    "revision": "b3c489a329063b965639624e4cf6b934"
  },
  {
    "url": "docs/template/quick.html",
    "revision": "47bfba0169fe10e127fc0dedeeabf764"
  },
  {
    "url": "docs/template/tagself.html",
    "revision": "21aaa052bc9d5c8a08cbc56a8b6f253f"
  },
  {
    "url": "docs/template/var.html",
    "revision": "40afda9dfc59b8da7311c52903b030c6"
  },
  {
    "url": "docs/template/while.html",
    "revision": "ecf6197388c500f19bc59c7a32f7755c"
  },
  {
    "url": "ecosystem/index.html",
    "revision": "a48fbd0bcd8589b3a4ebf13270edfab6"
  },
  {
    "url": "guide/index.html",
    "revision": "67adb959b1b85af6374ad1fe2712690a"
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
    "revision": "044cabcc53485ca9ba2754c30a20275f"
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

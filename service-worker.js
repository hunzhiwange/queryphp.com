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
    "revision": "59a30596e7b7253c5d5650cc3a58d336"
  },
  {
    "url": "about/index.html",
    "revision": "58a3a77fd1abf8b84562eca0393a9ccc"
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
    "url": "assets/js/12.8026183f.js",
    "revision": "dccc66a38a961610e9d2881a90a844ce"
  },
  {
    "url": "assets/js/13.38e440be.js",
    "revision": "98b3c23735134058453a88c0c7812d35"
  },
  {
    "url": "assets/js/14.1853126b.js",
    "revision": "3096378df5d9e72b808cc9a8dda53a4b"
  },
  {
    "url": "assets/js/15.4bdf6140.js",
    "revision": "8b088078a392930e7397186189e52c76"
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
    "url": "assets/js/22.24caaaa9.js",
    "revision": "2463e720fca8009b061ea1335740270c"
  },
  {
    "url": "assets/js/23.110911ab.js",
    "revision": "62d4f3e1063569c1af49df2bb9edc0f3"
  },
  {
    "url": "assets/js/24.8223020b.js",
    "revision": "45194852fb7f8093c7510e17ca04398e"
  },
  {
    "url": "assets/js/25.2807c5ac.js",
    "revision": "d0a924429409cf7f2faf9366cf3ed327"
  },
  {
    "url": "assets/js/26.61b3f5cf.js",
    "revision": "2491ab6f1186abbeb72851b5202ec73b"
  },
  {
    "url": "assets/js/27.9229294e.js",
    "revision": "8c252ed569e6d27b045c17fa0002bb42"
  },
  {
    "url": "assets/js/28.84c512f5.js",
    "revision": "c6c2e6d9f3be1848bc5efc773c8121c4"
  },
  {
    "url": "assets/js/29.d60ca92b.js",
    "revision": "7056a5485c946e9f8316bfcc9d4ad7cd"
  },
  {
    "url": "assets/js/3.296f809e.js",
    "revision": "c72f94c9bae315d3e33bd47bdec53601"
  },
  {
    "url": "assets/js/30.cc2b182c.js",
    "revision": "61a8d9d20589e2a12c44f49f5938fe35"
  },
  {
    "url": "assets/js/31.68c6735b.js",
    "revision": "25f49f6e05f36c40e3dec50b6fabc344"
  },
  {
    "url": "assets/js/32.3c8b17cb.js",
    "revision": "f31df40a6374988f28aee5f6d522a4ce"
  },
  {
    "url": "assets/js/33.b57e34ca.js",
    "revision": "f3bb2a1c827483d1518dc45ff8d5a653"
  },
  {
    "url": "assets/js/34.0f0378b8.js",
    "revision": "6051001d16a435508f7371cb9ce9e274"
  },
  {
    "url": "assets/js/35.af7499e2.js",
    "revision": "60aad3acec662e74408dd227296e85d8"
  },
  {
    "url": "assets/js/36.ab2c7203.js",
    "revision": "d1a91c1794bfc5a04d5c381c6e635132"
  },
  {
    "url": "assets/js/37.799d0bd2.js",
    "revision": "f047363edfdb0e26967cf7bf43319ce1"
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
    "url": "assets/js/41.f325fee5.js",
    "revision": "94fd40a8ed910d3db4fbb91e7712899d"
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
    "url": "assets/js/44.3999dc17.js",
    "revision": "7cc2f4e6adaa3db42de6b59bfbc1220c"
  },
  {
    "url": "assets/js/45.94dbc589.js",
    "revision": "5562ba80c81ec69db9586cf8f0c44db5"
  },
  {
    "url": "assets/js/46.86b75bd1.js",
    "revision": "4ff98594c75642180ce4e1c1a806b478"
  },
  {
    "url": "assets/js/47.cb423f8a.js",
    "revision": "998f2be850f1be1daf7d4e284b591356"
  },
  {
    "url": "assets/js/48.826ab6d4.js",
    "revision": "f17683594c9de1a62ffcb751ff0b8b63"
  },
  {
    "url": "assets/js/49.4f524727.js",
    "revision": "c7e5e4c22e540b9dfefcd2dce7c744ea"
  },
  {
    "url": "assets/js/5.4980778e.js",
    "revision": "12d22f0039fa0141979030705803d123"
  },
  {
    "url": "assets/js/50.bd257440.js",
    "revision": "b1eb2afaecef8526d0e7c0c6ffa0c681"
  },
  {
    "url": "assets/js/51.612ee9aa.js",
    "revision": "b1063fee5e90ce4fdb906002875fb8dc"
  },
  {
    "url": "assets/js/52.094efd4d.js",
    "revision": "691c96825a24c90fa3a2a0fbf10cd628"
  },
  {
    "url": "assets/js/53.730a7cf2.js",
    "revision": "7b444ca5871346b75dfd9f3c719348c1"
  },
  {
    "url": "assets/js/54.da2e3f2a.js",
    "revision": "0b374940365a6b7c5b8339ac12fdf5c4"
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
    "url": "assets/js/59.31a8885e.js",
    "revision": "57d1cd583730a25303ac68c5e81e3527"
  },
  {
    "url": "assets/js/6.c6cd87e7.js",
    "revision": "b250434f38d8fed51ec1667ae34263c9"
  },
  {
    "url": "assets/js/60.30d6dbfa.js",
    "revision": "82dddde674119d536eab0d66adaf7482"
  },
  {
    "url": "assets/js/61.c840bc36.js",
    "revision": "e6cd3e853acfa820dc5d8dc34bdc045d"
  },
  {
    "url": "assets/js/62.79215707.js",
    "revision": "850283ea4fe21a150cfac809e7b2bdd0"
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
    "url": "assets/js/65.ab132bd3.js",
    "revision": "dcb11fd0757434bcac32b5ad8dc49ab5"
  },
  {
    "url": "assets/js/66.1e353340.js",
    "revision": "90757c56283be0359c8eee297810ebd5"
  },
  {
    "url": "assets/js/67.4d2c163d.js",
    "revision": "51b890c447ac973a60f7a92d3490fe4f"
  },
  {
    "url": "assets/js/68.cbc8545d.js",
    "revision": "7b2eb6e2eeea03ac225ca55d932c766d"
  },
  {
    "url": "assets/js/69.f90d45ff.js",
    "revision": "48ebbfc0e669145b4173585f437480c2"
  },
  {
    "url": "assets/js/7.928871e5.js",
    "revision": "40a7c75f619351c326fd833e699c55cf"
  },
  {
    "url": "assets/js/70.5d8203dd.js",
    "revision": "9716583a7fa53ef7c82372411c4ccfc2"
  },
  {
    "url": "assets/js/71.51b17a3a.js",
    "revision": "8c4aa760428b3554c4dc1806d4d40560"
  },
  {
    "url": "assets/js/72.dc7cd5bc.js",
    "revision": "666df5830e9475beae2b0a0f3da53a4a"
  },
  {
    "url": "assets/js/73.58fc5a9d.js",
    "revision": "0ace1ac2eb733e420c06d9e04521110e"
  },
  {
    "url": "assets/js/74.cca8587e.js",
    "revision": "10e1ac35f31cf6b62f885ca636059cc5"
  },
  {
    "url": "assets/js/75.33b3fffa.js",
    "revision": "4209859665916e8a1edf9dc3572aca6f"
  },
  {
    "url": "assets/js/76.495c3327.js",
    "revision": "03468b678928124ea34ea2e7a9c091c1"
  },
  {
    "url": "assets/js/77.fac6c8b1.js",
    "revision": "6a1310b4378d76c9b4ae2d46a50c773c"
  },
  {
    "url": "assets/js/78.da776c30.js",
    "revision": "523d026b7bc2a95cd2f304b7d094fbf2"
  },
  {
    "url": "assets/js/79.07661166.js",
    "revision": "674ba41e1e825f4ade2c9285ea3c8494"
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
    "url": "assets/js/app.6ff17c09.js",
    "revision": "52c6cf598bb9c9272ccdd03551c5e9c0"
  },
  {
    "url": "assets/js/vendors~flowchart.5a4d067b.js",
    "revision": "d6f84e566072519b778a6c436be6d3d3"
  },
  {
    "url": "docs/architecture/fn.html",
    "revision": "018589b967b4edfe66ff1195ea3460bc"
  },
  {
    "url": "docs/architecture/index.html",
    "revision": "74edb553da2765163a619cf167df5f29"
  },
  {
    "url": "docs/architecture/ioc.html",
    "revision": "4fba7ea36d0d1447a90244f768f27926"
  },
  {
    "url": "docs/component/debug.html",
    "revision": "eb975e7a4a9f302dff01d4af78b752d7"
  },
  {
    "url": "docs/component/encryption.html",
    "revision": "9364ccc697c0007f9fc00481ae4504d5"
  },
  {
    "url": "docs/component/safe.html",
    "revision": "b077678360b237c4aa1811f2e599f19c"
  },
  {
    "url": "docs/component/support/arr.html",
    "revision": "a8ceb3f0b381371f1b9afb66f4ebde49"
  },
  {
    "url": "docs/component/support/str.html",
    "revision": "fa2c4286be6d251527399fe36ee0dd7a"
  },
  {
    "url": "docs/component/validate/assert.html",
    "revision": "8129e492729ac992464d4246371c2092"
  },
  {
    "url": "docs/database/config.html",
    "revision": "8d39af04ba3910d715d59d99b127a69c"
  },
  {
    "url": "docs/database/create/insert.html",
    "revision": "fbf979c937d8192ab21b560b7addc07a"
  },
  {
    "url": "docs/database/create/insertall.html",
    "revision": "7d68dcd72a39e3187f67db9f5d7403ea"
  },
  {
    "url": "docs/database/delete/delete.html",
    "revision": "7260f013c5b40164fbffdc3c4d028861"
  },
  {
    "url": "docs/database/index.html",
    "revision": "c7f7b99011083be6d01872f73372f547"
  },
  {
    "url": "docs/database/query/aggregate.html",
    "revision": "bdd71af2ba5b88007b2d55dd361bcc1e"
  },
  {
    "url": "docs/database/query/bind.html",
    "revision": "63dcf1f3a794ef87293d74a838c7cfd0"
  },
  {
    "url": "docs/database/query/columns.html",
    "revision": "79397dd0b1a24c107f9f5f4a877d9e2b"
  },
  {
    "url": "docs/database/query/distinct.html",
    "revision": "2aae24e6e5c7d48d8dcc5849799e8cef"
  },
  {
    "url": "docs/database/query/flow.html",
    "revision": "e98c944938bde775a7bbba66b60a84f1"
  },
  {
    "url": "docs/database/query/forceindex.html",
    "revision": "fe2cbdbc240fc1bbdef005da1cb77f8c"
  },
  {
    "url": "docs/database/query/forupdate.html",
    "revision": "61da791349fb8d8e047c09d82e31f66c"
  },
  {
    "url": "docs/database/query/groupby.html",
    "revision": "c0942dbe4cc0509bbb658bf82cbf5b95"
  },
  {
    "url": "docs/database/query/having.html",
    "revision": "43dace61f82ed3cb8f5393f3f912d16f"
  },
  {
    "url": "docs/database/query/join.html",
    "revision": "a70904b88983c5763fe49bd1efa38554"
  },
  {
    "url": "docs/database/query/limit.html",
    "revision": "99ebe08b25dc0ba7dffa936c06b0a46e"
  },
  {
    "url": "docs/database/query/orderby.html",
    "revision": "bd9c3df86387894971e1900eddee53a0"
  },
  {
    "url": "docs/database/query/prefix.html",
    "revision": "f07bf7f72673bb5cf27165b733a73790"
  },
  {
    "url": "docs/database/query/reset.html",
    "revision": "b4e4d4bc6df7181d015ce49b0eaf8efe"
  },
  {
    "url": "docs/database/query/sql.html",
    "revision": "df612988009bc2b5136f6b2b4263a796"
  },
  {
    "url": "docs/database/query/table.html",
    "revision": "0808581e229e75e724b28f63246b8ae5"
  },
  {
    "url": "docs/database/query/union.html",
    "revision": "58d9cedfb095e9af0df74d870e600697"
  },
  {
    "url": "docs/database/query/where.html",
    "revision": "13d2cd30be6bd7facaf340b987ed4bb6"
  },
  {
    "url": "docs/database/read/aggregate.html",
    "revision": "3f2b4acb6ecb781f82c037ebf5c3244b"
  },
  {
    "url": "docs/database/read/find.html",
    "revision": "11b9d59aa1e85da8bc894b9ce322032b"
  },
  {
    "url": "docs/database/read/findall.html",
    "revision": "6c1ea87b34364db43a48744f1ecb66ae"
  },
  {
    "url": "docs/database/read/finddynamics.html",
    "revision": "2e95cb0e2fb5cced8442e1972fab23ef"
  },
  {
    "url": "docs/database/read/findone.html",
    "revision": "cc0772f43035dbe34b00a441a885f92b"
  },
  {
    "url": "docs/database/read/lists.html",
    "revision": "f902a7901bffbda0af70e764ac7dd450"
  },
  {
    "url": "docs/database/read/select.html",
    "revision": "37486fc7a914fcd1badb312a0fc1aff9"
  },
  {
    "url": "docs/database/read/valuepull.html",
    "revision": "b8f0ddd5d3691e8c136d4ab7e5fbdd57"
  },
  {
    "url": "docs/database/truncate.html",
    "revision": "2ca3becb89856e4238625fc6c0590161"
  },
  {
    "url": "docs/database/update/update.html",
    "revision": "f35489500d35522f584d3d25aea9051b"
  },
  {
    "url": "docs/database/update/updatecolumn.html",
    "revision": "d47559ab90d6e1a3bfb5fe60476da465"
  },
  {
    "url": "docs/database/update/updatedecrease.html",
    "revision": "5ded85914ad8ff2fe41eb37f64f3ec2b"
  },
  {
    "url": "docs/database/update/updateincrease.html",
    "revision": "ceee1eb364fcf1d807b222cd286a67f6"
  },
  {
    "url": "docs/developer/index.html",
    "revision": "2971f79cbf9e10903e1cb46ee18438f2"
  },
  {
    "url": "docs/index.html",
    "revision": "6a1f4999ad6d1b5a201d5bb8f701a084"
  },
  {
    "url": "docs/orm/create.html",
    "revision": "64fc0ccafd903f59aabbb9c02e223075"
  },
  {
    "url": "docs/orm/index.html",
    "revision": "c610a3d568be6d0109de5736c38a65b7"
  },
  {
    "url": "docs/orm/unitofwork.html",
    "revision": "149162041707f8499834cb2883aeffc5"
  },
  {
    "url": "docs/router/index.html",
    "revision": "d2927a0c46a211d021f94f4f15e5cc43"
  },
  {
    "url": "docs/started/directory.html",
    "revision": "2789b4a50f7b93457fad395fc301288d"
  },
  {
    "url": "docs/started/index.html",
    "revision": "462d00ec05acb7a70a7e058581cb2ac7"
  },
  {
    "url": "docs/started/install.html",
    "revision": "b0f975517c4f4a40e9fca70548d3b069"
  },
  {
    "url": "docs/started/specification.html",
    "revision": "22c321dd06f024103f17bf4c2de50c00"
  },
  {
    "url": "docs/template/assign.html",
    "revision": "3ec250cc3aa96820b0e75241eba6f18c"
  },
  {
    "url": "docs/template/break.html",
    "revision": "5eb2743b0ed2442215a7e06e82c86681"
  },
  {
    "url": "docs/template/css.html",
    "revision": "2c12ccfddd0d9baad7ac6a719912b52f"
  },
  {
    "url": "docs/template/for.html",
    "revision": "53b2dfe7d40674025502ec7b526faf79"
  },
  {
    "url": "docs/template/if.html",
    "revision": "98515e695238f2654518894eae3eaee0"
  },
  {
    "url": "docs/template/include.html",
    "revision": "a9593aa17cdf61a433f5bd42436be5a1"
  },
  {
    "url": "docs/template/index.html",
    "revision": "7a4c2b2bf98cbbf01b7ccfe5b378e082"
  },
  {
    "url": "docs/template/list.html",
    "revision": "0634f7860146431b63b19a6a6bbf31f6"
  },
  {
    "url": "docs/template/lists.html",
    "revision": "d8ef79a32b6b5358ec18150f2b6c8eb2"
  },
  {
    "url": "docs/template/php.html",
    "revision": "c4101ca5d098ec9d8e0683855875cab9"
  },
  {
    "url": "docs/template/quick.html",
    "revision": "a2ac6e93e8da9b88ff968caf6face1ea"
  },
  {
    "url": "docs/template/tagself.html",
    "revision": "bedb67d1779765424330b7dcc2487013"
  },
  {
    "url": "docs/template/var.html",
    "revision": "53b1672432a8a80c1e217776ade00034"
  },
  {
    "url": "docs/template/while.html",
    "revision": "6b2bafdb98717006a11e48b6de6ffc10"
  },
  {
    "url": "ecosystem/index.html",
    "revision": "221cae1e6cc157eb064b5ab8501516c7"
  },
  {
    "url": "guide/index.html",
    "revision": "18944f4d11b1accbbabbc6ff8991476c"
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
    "revision": "ba4a481bbc7cd653077be03c2355ea56"
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

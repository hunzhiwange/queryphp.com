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
    "revision": "4195eca05afa68161eaa5416d030e031"
  },
  {
    "url": "about/index.html",
    "revision": "078080f90e80cb332a7da9737920660c"
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
    "url": "assets/js/12.3143a292.js",
    "revision": "2334c5099d0248fe4380b53f7d8dc987"
  },
  {
    "url": "assets/js/13.21697618.js",
    "revision": "86fbeaae98f38c97ecb439557cfbe995"
  },
  {
    "url": "assets/js/14.8c0e2ac0.js",
    "revision": "a8a2e77179295563a0112b1ab3b24bb4"
  },
  {
    "url": "assets/js/15.fdaab7b3.js",
    "revision": "b12d18543659f5300d3c6acf19f9a031"
  },
  {
    "url": "assets/js/16.67f78622.js",
    "revision": "4e0a7437337ebbbd08e14cb4027d375c"
  },
  {
    "url": "assets/js/17.b9450cf9.js",
    "revision": "48ee7fd5bcd6619c562d4b7e20ae10c0"
  },
  {
    "url": "assets/js/18.b7a41d33.js",
    "revision": "863adc4da25d6661b942f116e47a9eba"
  },
  {
    "url": "assets/js/19.f197dd24.js",
    "revision": "ea3f265f5a4515ff8cb1c690239d67a6"
  },
  {
    "url": "assets/js/20.26926196.js",
    "revision": "a18dc35e02a0e8163ed6793488fa0297"
  },
  {
    "url": "assets/js/21.b1089046.js",
    "revision": "049aa74f5ab1b5ec77fbe981d56f36cb"
  },
  {
    "url": "assets/js/22.9bc69699.js",
    "revision": "c504feb10267ccaeef289194eaf74961"
  },
  {
    "url": "assets/js/23.027901e6.js",
    "revision": "03a4c1f021a0c9900d3553b97133e45d"
  },
  {
    "url": "assets/js/24.a448c64d.js",
    "revision": "a87b0ec022aa689cfe703d77d4a95b9b"
  },
  {
    "url": "assets/js/25.2a153b05.js",
    "revision": "22401aff590a5aa2141383a841888a42"
  },
  {
    "url": "assets/js/26.aba58fed.js",
    "revision": "18cc6d25737a69060be71e3430fb44ba"
  },
  {
    "url": "assets/js/27.778caf22.js",
    "revision": "a22479c15a456e7dffbe922265f68136"
  },
  {
    "url": "assets/js/28.d0ab041f.js",
    "revision": "dd01713f3b456a7eb73674e0d7d0fb17"
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
    "url": "assets/js/34.6319b9d9.js",
    "revision": "160369dac1f146a07178e3a5d85e6ecf"
  },
  {
    "url": "assets/js/35.03599290.js",
    "revision": "8da0db625c7dd6b9c6998ec296c1a38c"
  },
  {
    "url": "assets/js/36.0f5a03fb.js",
    "revision": "b6fa929c9f28cf48a1170faa54d0a360"
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
    "url": "assets/js/39.c4515c08.js",
    "revision": "6443082d6630ac742d231dad531ae541"
  },
  {
    "url": "assets/js/4.0986f570.js",
    "revision": "9516cee531b5df8780c74c3d31b9b2b6"
  },
  {
    "url": "assets/js/40.ca23600b.js",
    "revision": "680d8c87adbc6b1e40730f2bebb2b563"
  },
  {
    "url": "assets/js/41.647053c1.js",
    "revision": "74ad3598a99075e54e41fbd904b161ac"
  },
  {
    "url": "assets/js/42.8d680c4b.js",
    "revision": "26881c3f9ce70c1ac4354ce7d5bfa9e1"
  },
  {
    "url": "assets/js/43.775433c8.js",
    "revision": "2f1578dbbd16da6f4f52e51dfb33c989"
  },
  {
    "url": "assets/js/44.5f35e227.js",
    "revision": "d352ee4771d17ec9ca4430e9fba92998"
  },
  {
    "url": "assets/js/45.00bed906.js",
    "revision": "d8754b4a45e6454591e3e404941d43c2"
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
    "url": "assets/js/48.7eee869c.js",
    "revision": "5b2114fa787cc6d602c8135a927240df"
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
    "url": "assets/js/50.608b2122.js",
    "revision": "a0e30dc4565b76c55d92ab3095a2f769"
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
    "url": "assets/js/54.fd221430.js",
    "revision": "b484de2c4bd098a1bc11c3288b1d581e"
  },
  {
    "url": "assets/js/55.92d78361.js",
    "revision": "1576b80a01553a5abdbedf47de61d98a"
  },
  {
    "url": "assets/js/56.3a029a39.js",
    "revision": "51d3265df4ce15bcfdfd27417a9986ce"
  },
  {
    "url": "assets/js/57.b4e3a799.js",
    "revision": "1dc6a3a48bf60f107a8e38b96791d70d"
  },
  {
    "url": "assets/js/58.85a877b5.js",
    "revision": "5b382232caf0088ae45e1a0057ee357f"
  },
  {
    "url": "assets/js/59.5adef203.js",
    "revision": "0028325afec0b2e2418499fed25226e6"
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
    "url": "assets/js/61.d85f593a.js",
    "revision": "5cb1280d9bf47e58934b53e2c1546511"
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
    "url": "assets/js/64.c3877bf3.js",
    "revision": "47708570c3269e6f3df18b25beefa043"
  },
  {
    "url": "assets/js/65.cb34fa11.js",
    "revision": "cdb44bb293ba0c96dff242dd6277337c"
  },
  {
    "url": "assets/js/66.cf1c67e7.js",
    "revision": "49ca95d36870f1a308c16b5f3b636697"
  },
  {
    "url": "assets/js/67.3bdb7961.js",
    "revision": "c3c7e95128438df98cd9ed894d0c1ed9"
  },
  {
    "url": "assets/js/68.ea90ddb7.js",
    "revision": "dd3d0b20cb0e6038976a2b1cb1ead28b"
  },
  {
    "url": "assets/js/69.f94bfc9c.js",
    "revision": "13a3aacb98da20a6e3648300bdc01222"
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
    "url": "assets/js/71.8cc8c276.js",
    "revision": "a5e502379a681ec5a25a2b20e643cea8"
  },
  {
    "url": "assets/js/72.f901a38f.js",
    "revision": "86b959258c1849cf09050d90e20556b5"
  },
  {
    "url": "assets/js/73.9fe12682.js",
    "revision": "674cc57241ced80bb6b5458f05048faa"
  },
  {
    "url": "assets/js/74.bcbb21bc.js",
    "revision": "7de8e890212a1e90d2029874e82b6618"
  },
  {
    "url": "assets/js/75.df69524c.js",
    "revision": "475e8082df12023c544e42e9269d5758"
  },
  {
    "url": "assets/js/76.d15f2a18.js",
    "revision": "439a565e8d09a915da27731d3948fb5f"
  },
  {
    "url": "assets/js/77.71d96656.js",
    "revision": "aebb2bc51ed8c7299094e1fc0e1b7758"
  },
  {
    "url": "assets/js/78.e9a2f5f7.js",
    "revision": "f0f425e6d2a48b9667db3e7d527649c5"
  },
  {
    "url": "assets/js/79.521d58bb.js",
    "revision": "2a3eba45db2584daa946c2c053e6f062"
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
    "url": "assets/js/81.4934e248.js",
    "revision": "b25c17a8f9f1dd843fc1d52bd1efd4d6"
  },
  {
    "url": "assets/js/82.573cfd91.js",
    "revision": "a521c669bf80be4a59cac65c48cedbfa"
  },
  {
    "url": "assets/js/83.b21284bf.js",
    "revision": "604333b39aa68f8744848c79faf77487"
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
    "url": "assets/js/app.5d97fef6.js",
    "revision": "31690fc51ce0190c6f6dd385ff3cd801"
  },
  {
    "url": "assets/js/vendors~flowchart.5a4d067b.js",
    "revision": "d6f84e566072519b778a6c436be6d3d3"
  },
  {
    "url": "docs/architecture/fn.html",
    "revision": "eb268baa7151d5d907b58b1269ceb2f6"
  },
  {
    "url": "docs/architecture/index.html",
    "revision": "0d226d7769134d93b29640802b97b70b"
  },
  {
    "url": "docs/architecture/ioc.html",
    "revision": "74784a4617df27fb678aed6c37752148"
  },
  {
    "url": "docs/component/debug.html",
    "revision": "332b4a2f2e7c9b959ddaccfb020f4bb9"
  },
  {
    "url": "docs/component/encryption.html",
    "revision": "94aae491288ccac751f8f1061a0dafa6"
  },
  {
    "url": "docs/component/safe.html",
    "revision": "49fabf7392f76d5b3eceec6dae9fdf6f"
  },
  {
    "url": "docs/component/support/arr.html",
    "revision": "cad3d8397ed66306e5b7d0d56251e71a"
  },
  {
    "url": "docs/component/support/str.html",
    "revision": "b54a1b8029900b8468d7d6b72afb03e6"
  },
  {
    "url": "docs/component/validate/assert.html",
    "revision": "e39e28153a6ed0c7662ad457637b86ff"
  },
  {
    "url": "docs/database/config.html",
    "revision": "f12e345a95ebd64b75612aa1e3744ede"
  },
  {
    "url": "docs/database/create/insert.html",
    "revision": "fb6ce5b07fa77c6ec9f64d800648a313"
  },
  {
    "url": "docs/database/create/insertall.html",
    "revision": "5ad69f7dc70cd91f46dbd7129058c432"
  },
  {
    "url": "docs/database/delete/delete.html",
    "revision": "819049e91bc984330a0bc369824f365b"
  },
  {
    "url": "docs/database/index.html",
    "revision": "421c55bf6d22227221d58114a222b67b"
  },
  {
    "url": "docs/database/query/aggregate.html",
    "revision": "77685971e79ad55ad289219b49a9b431"
  },
  {
    "url": "docs/database/query/bind.html",
    "revision": "ec7f863508227995e69b9c016fc64bfc"
  },
  {
    "url": "docs/database/query/columns.html",
    "revision": "e469aed8cb7bb93d4e42e8d820ea8e08"
  },
  {
    "url": "docs/database/query/distinct.html",
    "revision": "9abb6ce662c95a0eea4077c1bcf27e33"
  },
  {
    "url": "docs/database/query/flow.html",
    "revision": "8a80ef5caa2705c00a0515352d3d10d0"
  },
  {
    "url": "docs/database/query/forceindex.html",
    "revision": "1204c0bbddf0aa2e8895f98bbe605f77"
  },
  {
    "url": "docs/database/query/forupdate.html",
    "revision": "51b629cb86b736fbcd12218ea476ae76"
  },
  {
    "url": "docs/database/query/groupby.html",
    "revision": "f4712be8b09f05d80b8f29d49a159de2"
  },
  {
    "url": "docs/database/query/having.html",
    "revision": "8ac21d6b89a9727a07c40db3f34442d2"
  },
  {
    "url": "docs/database/query/join.html",
    "revision": "da05f1c39a954c71b5d911c6cb865e7a"
  },
  {
    "url": "docs/database/query/limit.html",
    "revision": "8d6d5341d142271676b9c4eacb929aee"
  },
  {
    "url": "docs/database/query/orderby.html",
    "revision": "9bb2cc0971310c006d7dfb57f3c31597"
  },
  {
    "url": "docs/database/query/prefix.html",
    "revision": "69ea77d3b99d6d741c7ecb60143da0e4"
  },
  {
    "url": "docs/database/query/reset.html",
    "revision": "871105353e326fc238aea3f8f51920df"
  },
  {
    "url": "docs/database/query/sql.html",
    "revision": "77870b7895f2aa93bd1d6f4f5876ae86"
  },
  {
    "url": "docs/database/query/table.html",
    "revision": "0a74f79ea2a4ede6e6287ac4e9801f41"
  },
  {
    "url": "docs/database/query/union.html",
    "revision": "c71e132961e495991877e277c3bb7dd8"
  },
  {
    "url": "docs/database/query/where.html",
    "revision": "39b5d7df9774db9353c5469ee806a85e"
  },
  {
    "url": "docs/database/read/aggregate.html",
    "revision": "de808f89bc3515f1486c6e6e41773089"
  },
  {
    "url": "docs/database/read/find.html",
    "revision": "149b3c7871e6cde68bc7ce7501f7e06e"
  },
  {
    "url": "docs/database/read/findall.html",
    "revision": "efeb0643155745d520299678b5bebc09"
  },
  {
    "url": "docs/database/read/finddynamics.html",
    "revision": "c37348568ee96e4d9dc20e93cc5f1d4d"
  },
  {
    "url": "docs/database/read/findone.html",
    "revision": "15da9d4b8a0207d3ccf839533ce320ce"
  },
  {
    "url": "docs/database/read/lists.html",
    "revision": "075cac39c7fddb4c24f41bb8f08e86e5"
  },
  {
    "url": "docs/database/read/select.html",
    "revision": "74f9fd49d8ff9fa440b350f05753d360"
  },
  {
    "url": "docs/database/read/valuepull.html",
    "revision": "9eee2ec934774cb6578a7461a2a9e5d3"
  },
  {
    "url": "docs/database/truncate.html",
    "revision": "96ef8826e8402ac1730811396ade1036"
  },
  {
    "url": "docs/database/update/update.html",
    "revision": "4069ca8f794c1d6a4e9c50f459dd51fa"
  },
  {
    "url": "docs/database/update/updatecolumn.html",
    "revision": "e2e29ea6042c81578daf50ae7457d12e"
  },
  {
    "url": "docs/database/update/updatedecrease.html",
    "revision": "29bdd85353f4438f505635f9a2882a37"
  },
  {
    "url": "docs/database/update/updateincrease.html",
    "revision": "4e24cc3172b1b56708b8a44078706dff"
  },
  {
    "url": "docs/developer/index.html",
    "revision": "48c92f84fe5e4bf9ad609e14cd8c728f"
  },
  {
    "url": "docs/index.html",
    "revision": "617fe73408a50a9e7a6e4cc234940c47"
  },
  {
    "url": "docs/orm/create.html",
    "revision": "7c2b8ed7ed4116a9b15e83ebfc5ec60a"
  },
  {
    "url": "docs/orm/index.html",
    "revision": "d61b85e7fe35fd3a1eec730c72642dda"
  },
  {
    "url": "docs/orm/unitofwork.html",
    "revision": "09ea817483036141e9f9e28ef4930cad"
  },
  {
    "url": "docs/router/index.html",
    "revision": "ccf869605c999c7a1ebdad5d09de15be"
  },
  {
    "url": "docs/started/directory.html",
    "revision": "053726eb7294fde8a45fb0c4dcaf39ff"
  },
  {
    "url": "docs/started/index.html",
    "revision": "04b4db36e7b2a2e326488cefefebd90a"
  },
  {
    "url": "docs/started/install.html",
    "revision": "880b2f9d4dabc7ed6d38e1c021b60d78"
  },
  {
    "url": "docs/started/specification.html",
    "revision": "a694c8880ec2cb22b2ec483f7552cba2"
  },
  {
    "url": "docs/template/assign.html",
    "revision": "48fbe659496fa5cf6ee606f673977747"
  },
  {
    "url": "docs/template/break.html",
    "revision": "2643713a2d0bfd200ee270b5d9a62782"
  },
  {
    "url": "docs/template/css.html",
    "revision": "4419ff4518c803f386c662283e487f88"
  },
  {
    "url": "docs/template/for.html",
    "revision": "046d5ad4481c9f5efe539dc860944378"
  },
  {
    "url": "docs/template/if.html",
    "revision": "b0f1f51e5ea3bce6f375286240591634"
  },
  {
    "url": "docs/template/include.html",
    "revision": "6dfadea532562198ccd5df768af2c596"
  },
  {
    "url": "docs/template/index.html",
    "revision": "a610a18a8736207a4ca466aba7625d18"
  },
  {
    "url": "docs/template/list.html",
    "revision": "d0d543f9742d9be0c1330e72bdfedc1e"
  },
  {
    "url": "docs/template/lists.html",
    "revision": "49c96884b96452079021f30ef90a550b"
  },
  {
    "url": "docs/template/php.html",
    "revision": "98adb1914078ff78d42628942bf87415"
  },
  {
    "url": "docs/template/quick.html",
    "revision": "448407a47124f23ad1e3df126ed3f48f"
  },
  {
    "url": "docs/template/tagself.html",
    "revision": "dc50ed3d2ae0cbba75ca61f4afd85d83"
  },
  {
    "url": "docs/template/var.html",
    "revision": "4b752e34616b996ca2f3903f25172146"
  },
  {
    "url": "docs/template/while.html",
    "revision": "80504fd52966bf1f764a31ad6874e86e"
  },
  {
    "url": "ecosystem/index.html",
    "revision": "f36dd5c1bc47760b6707e7b4fba0fd3b"
  },
  {
    "url": "guide/index.html",
    "revision": "db29d5c9167385ecec9215eb03c4dcad"
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
    "revision": "f298d6b0af906af300edb922e811ce0d"
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

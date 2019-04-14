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
    "revision": "5c89c661f7b3654626b26830b62c7e71"
  },
  {
    "url": "about/index.html",
    "revision": "ff6befa07a2d456ea2328ef7a3e22e3d"
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
    "url": "assets/js/12.a77a3fb2.js",
    "revision": "e006dedca195a95b206478bdb89ebf3a"
  },
  {
    "url": "assets/js/13.805b3261.js",
    "revision": "343a9960772bc0439e7ba490165e44d3"
  },
  {
    "url": "assets/js/14.1acd3087.js",
    "revision": "91e01b532b12fd792ded00164f96e8d7"
  },
  {
    "url": "assets/js/15.8f625c51.js",
    "revision": "ff9a0e0a0b530381b361aed8d30263c4"
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
    "url": "assets/js/25.7af1ff22.js",
    "revision": "98269cb3853785a1160c799182d6bc44"
  },
  {
    "url": "assets/js/26.2b74be91.js",
    "revision": "6cffc42b227710e64aba65d6800fefae"
  },
  {
    "url": "assets/js/27.0f558286.js",
    "revision": "31a29b82109752ae87d6441f64e56649"
  },
  {
    "url": "assets/js/28.1ee84284.js",
    "revision": "713942be35fce4e9d9f11a9dea04b7c1"
  },
  {
    "url": "assets/js/29.76c399a2.js",
    "revision": "6e212b1fe315f5a27cfd279922b08839"
  },
  {
    "url": "assets/js/3.ce8c3442.js",
    "revision": "c6e002a10726263927d63b8df4bed586"
  },
  {
    "url": "assets/js/30.54cd1958.js",
    "revision": "3994d2f541fa52d2d76cdb10993a0968"
  },
  {
    "url": "assets/js/31.e5e684da.js",
    "revision": "c5a97f31d6030b92dfa867144a4dfb90"
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
    "url": "assets/js/40.12cfd3b8.js",
    "revision": "1605024bf0589f49487ae12c74365f5f"
  },
  {
    "url": "assets/js/41.510921c4.js",
    "revision": "65456a67ce6d1ce1e34387750059b9a5"
  },
  {
    "url": "assets/js/42.5f455744.js",
    "revision": "453c2a78747673957dba096247bfd1df"
  },
  {
    "url": "assets/js/43.8c690ba1.js",
    "revision": "56f7bdfbf4403a19abc25cf8aca8635c"
  },
  {
    "url": "assets/js/44.5a551ea2.js",
    "revision": "aca0a895eac99f78fa2c739c807cdb56"
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
    "url": "assets/js/47.d6d99a36.js",
    "revision": "61ae14848d2f125e10d6a92fc7a29961"
  },
  {
    "url": "assets/js/48.cba12ba3.js",
    "revision": "d222de3d6d6d0b372badcf0f901fd820"
  },
  {
    "url": "assets/js/49.d23dbcb4.js",
    "revision": "a28726a780934ab3c7201527bed0959e"
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
    "url": "assets/js/51.3e43183c.js",
    "revision": "1bb0a5c4ae898e1c94fcf61ebbe0dad2"
  },
  {
    "url": "assets/js/52.92cd9891.js",
    "revision": "b194e17c8088fc82c9cb71044971fbe8"
  },
  {
    "url": "assets/js/53.b590effa.js",
    "revision": "84cc99d766e629869a2e9373001b71ca"
  },
  {
    "url": "assets/js/54.57743a66.js",
    "revision": "39f75eb8dfd9ec6a0b4660109e94626d"
  },
  {
    "url": "assets/js/55.4852c44b.js",
    "revision": "c218ff872214af1449f712db7ba3fc57"
  },
  {
    "url": "assets/js/56.b2df7e65.js",
    "revision": "07ed7aabc567f6685f5e289d4e2a6d8f"
  },
  {
    "url": "assets/js/57.83be8862.js",
    "revision": "351f6a1a6bc2124c69dae9f2b087acb7"
  },
  {
    "url": "assets/js/58.54bfa5c9.js",
    "revision": "075538a594c43b2a9ca2911b1dd1d63c"
  },
  {
    "url": "assets/js/59.400df5eb.js",
    "revision": "1fa668a6866251196f12c27c570f2979"
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
    "url": "assets/js/62.f77510bd.js",
    "revision": "99e1b553161afd5930a1dce24219db55"
  },
  {
    "url": "assets/js/63.900e58f9.js",
    "revision": "31f069ae8571f66c190e5d5b4e10cd51"
  },
  {
    "url": "assets/js/64.5569e9e1.js",
    "revision": "2b92efd106d65b2e75bf0d936b302947"
  },
  {
    "url": "assets/js/65.2eee9731.js",
    "revision": "784905e26c44576f90df571c07d3e6fb"
  },
  {
    "url": "assets/js/66.02bb1516.js",
    "revision": "77bd66206d4daa5d13ad1290123e4954"
  },
  {
    "url": "assets/js/67.a3036aa8.js",
    "revision": "8dfeceef6eef1dde9eda49af2316d355"
  },
  {
    "url": "assets/js/68.3ac5fcb3.js",
    "revision": "106571262d8c47b52ffb80e845f8758d"
  },
  {
    "url": "assets/js/69.545501fd.js",
    "revision": "8a6039a7c0abb8f98e2c9a0d84580f1d"
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
    "url": "assets/js/72.b97e9cdd.js",
    "revision": "b8f451c989b3e10e558b2de6f2da4726"
  },
  {
    "url": "assets/js/73.2ac8862f.js",
    "revision": "933fb9b26c58fb3e0ed2c5ea6205d0d2"
  },
  {
    "url": "assets/js/74.ed8e74af.js",
    "revision": "7e0871e01c77b6b19fb559d43ddedbad"
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
    "url": "assets/js/app.5f56ab55.js",
    "revision": "bc38be3829dc349bb3ea28d664a957e2"
  },
  {
    "url": "assets/js/vendors~flowchart.5a4d067b.js",
    "revision": "d6f84e566072519b778a6c436be6d3d3"
  },
  {
    "url": "docs/architecture/fn.html",
    "revision": "76e13873d295a3d7ede8abbebcc5cf0a"
  },
  {
    "url": "docs/architecture/index.html",
    "revision": "aa82824737e69f5eebd0b4493560c8dd"
  },
  {
    "url": "docs/architecture/ioc.html",
    "revision": "4642d79680d8c8537562755cea934387"
  },
  {
    "url": "docs/component/debug.html",
    "revision": "78c02ad559534b9806143b3b4d4a4643"
  },
  {
    "url": "docs/component/encryption.html",
    "revision": "450c38fa157461e21b945b70afea70c6"
  },
  {
    "url": "docs/component/safe.html",
    "revision": "6c6ab4c01a1402231bb8901bb13d3dd3"
  },
  {
    "url": "docs/component/support/arr.html",
    "revision": "cc43454a995a6da9bf674194a2aceaee"
  },
  {
    "url": "docs/component/support/str.html",
    "revision": "94a319c8d2791d1c30cbe5b34af462c2"
  },
  {
    "url": "docs/database/config.html",
    "revision": "cf3da65acefe06febeabd755fa467123"
  },
  {
    "url": "docs/database/create/insert.html",
    "revision": "d7915804e3a4fd1c58e644b3234a8297"
  },
  {
    "url": "docs/database/create/insertall.html",
    "revision": "036764b2bc52a74f397f48eb68f3602a"
  },
  {
    "url": "docs/database/delete/delete.html",
    "revision": "79a2164a0e1709790fbaf8725369ad74"
  },
  {
    "url": "docs/database/index.html",
    "revision": "0d51d09ea24a5f7c00aadc0affc57057"
  },
  {
    "url": "docs/database/query/aggregate.html",
    "revision": "7e8cc43298a370590be38b4aa20ff325"
  },
  {
    "url": "docs/database/query/bind.html",
    "revision": "deb4569c216c0acfdaf9b3ef148570a6"
  },
  {
    "url": "docs/database/query/columns.html",
    "revision": "56f014f65fc6137f0f19d2d05f9c4ca4"
  },
  {
    "url": "docs/database/query/distinct.html",
    "revision": "a76d40915cfa84e7bdffd66100612dd2"
  },
  {
    "url": "docs/database/query/flow.html",
    "revision": "de87b0398576932b4b0780982067123e"
  },
  {
    "url": "docs/database/query/forceindex.html",
    "revision": "19f061c5d70dd4fde7bf945bf094349d"
  },
  {
    "url": "docs/database/query/forupdate.html",
    "revision": "ac5ce9317df496128da3afb7c06224a5"
  },
  {
    "url": "docs/database/query/groupby.html",
    "revision": "ef211f573f6149bec952622e9871dabf"
  },
  {
    "url": "docs/database/query/having.html",
    "revision": "29228bdbf6e7902ed520e3a2ec5135e3"
  },
  {
    "url": "docs/database/query/join.html",
    "revision": "17140d4500a04c3a2652cb897a47ebee"
  },
  {
    "url": "docs/database/query/limit.html",
    "revision": "08294a1166a2cce411e95ea56032b8db"
  },
  {
    "url": "docs/database/query/orderby.html",
    "revision": "a93b00522e650c63762def2327e9c2d1"
  },
  {
    "url": "docs/database/query/prefix.html",
    "revision": "409b4c218c4aeb4bcbdf02d972abf70b"
  },
  {
    "url": "docs/database/query/reset.html",
    "revision": "8fc11c9405151f47035905f2cfbfddde"
  },
  {
    "url": "docs/database/query/sql.html",
    "revision": "f1b94aee58d1c0709bffa2bb1067a20c"
  },
  {
    "url": "docs/database/query/table.html",
    "revision": "f70ebe1ecc4c62cc65edd690a689cef3"
  },
  {
    "url": "docs/database/query/union.html",
    "revision": "bae70ff4c14bbe33a376de985ba3a487"
  },
  {
    "url": "docs/database/query/where.html",
    "revision": "83b3b21a66650b61404aa2cf03af532e"
  },
  {
    "url": "docs/database/read/aggregate.html",
    "revision": "0115bd7bd0dcaa274ee82047b78f4e31"
  },
  {
    "url": "docs/database/read/find.html",
    "revision": "3704e8c815bca2a8e2ad4614dddcad98"
  },
  {
    "url": "docs/database/read/findall.html",
    "revision": "8f62f1c57cd0750a53ecc3215d5955e0"
  },
  {
    "url": "docs/database/read/finddynamics.html",
    "revision": "340285a22ceac926c9899ccc0b74194c"
  },
  {
    "url": "docs/database/read/findone.html",
    "revision": "ca3fd9c7737ec3500f3ede14b90901ec"
  },
  {
    "url": "docs/database/read/lists.html",
    "revision": "65c7b5df00005da6ca1ad34d30482ce0"
  },
  {
    "url": "docs/database/read/select.html",
    "revision": "cee2e5555d4c5c8a957af1f3aae5368f"
  },
  {
    "url": "docs/database/read/valuepull.html",
    "revision": "62df16601e90c9e903d2a4ab83937dcb"
  },
  {
    "url": "docs/database/truncate.html",
    "revision": "87da8f771d81789ffe60ace6535dbe80"
  },
  {
    "url": "docs/database/update/update.html",
    "revision": "f496f9769061e70534f7046502737cdd"
  },
  {
    "url": "docs/database/update/updatecolumn.html",
    "revision": "9a06b30295bd75f0b2777eb2f66bb29c"
  },
  {
    "url": "docs/database/update/updatedecrease.html",
    "revision": "6039e5cd8d2fc6d33f6f85f995478d66"
  },
  {
    "url": "docs/database/update/updateincrease.html",
    "revision": "7b6f1377c9f67efccfdd84791c2d08f9"
  },
  {
    "url": "docs/index.html",
    "revision": "9b1c5ed3f17f52d3abb4add75506cb3c"
  },
  {
    "url": "docs/orm/create.html",
    "revision": "3b271896c2f3b11ae20567aca2704f5c"
  },
  {
    "url": "docs/orm/index.html",
    "revision": "db077a5c49ef5effd189f9f8183475fc"
  },
  {
    "url": "docs/orm/unitofwork.html",
    "revision": "eed9cf62ae76793665c967a9aff9c6f5"
  },
  {
    "url": "docs/router/index.html",
    "revision": "be35fcc9e96f585bde690e3efef9d8f3"
  },
  {
    "url": "docs/started/directory.html",
    "revision": "ad4649caffc5cbd9658cf752d46388a5"
  },
  {
    "url": "docs/started/index.html",
    "revision": "48fdc7985e892567f61142a7009233d1"
  },
  {
    "url": "docs/started/install.html",
    "revision": "b7c1e79022edaaa1b672db0d77cb6ec4"
  },
  {
    "url": "docs/started/specification.html",
    "revision": "aefd547055105097d37a45dbe59a9541"
  },
  {
    "url": "docs/template/assign.html",
    "revision": "382fbf38f03959f760a1079aebe63acf"
  },
  {
    "url": "docs/template/break.html",
    "revision": "d7763ffd237fb4d511ac50b25ea75554"
  },
  {
    "url": "docs/template/css.html",
    "revision": "32169330dfd4c831995c7c9b485293c2"
  },
  {
    "url": "docs/template/for.html",
    "revision": "f05717c50c3f57304bf10d555d7c1237"
  },
  {
    "url": "docs/template/if.html",
    "revision": "2fa99f1e573793eab1f8dc1d7df2761f"
  },
  {
    "url": "docs/template/include.html",
    "revision": "26551fb3156d3a8bac15aa2d2b5e7a4b"
  },
  {
    "url": "docs/template/index.html",
    "revision": "c78278d57747e43d26d3deb00f37b208"
  },
  {
    "url": "docs/template/list.html",
    "revision": "7755db5fbe181eaf155f009b50c42502"
  },
  {
    "url": "docs/template/lists.html",
    "revision": "ca8cad06e28f812ee966d63a8482e1ea"
  },
  {
    "url": "docs/template/php.html",
    "revision": "195e915f88a22f242d38bc29ba34260d"
  },
  {
    "url": "docs/template/quick.html",
    "revision": "6b42a54cc719caa47b9c2e1fd566db58"
  },
  {
    "url": "docs/template/tagself.html",
    "revision": "f5eb43a503123d908de04054546e00a0"
  },
  {
    "url": "docs/template/var.html",
    "revision": "e897fb37fb4ab9e156af04aee382feab"
  },
  {
    "url": "docs/template/while.html",
    "revision": "36c8d68da6f4e69b19641b5379484313"
  },
  {
    "url": "ecosystem/index.html",
    "revision": "567208c9ea1c4033a439812c2740c312"
  },
  {
    "url": "guide/index.html",
    "revision": "112e95d550e004f71da129e7e5af8c3b"
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
    "revision": "00cdea2e7bd00c5e00a417d4b1a91f5f"
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

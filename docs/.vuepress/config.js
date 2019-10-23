const path = require('path')

module.exports = {
  dest: 'vuepress',
  port: 8088,
  locales: {
    '/': {
      lang: 'en-Us',
      title: 'QueryPHP',
      description: 'High Performance PHP Progressive Coroutine Framework Engine.'
    },
    '/zh-CN/': {
      lang: 'zh-CN',
      title: 'QueryPHP',
      description: '高性能 PHP 渐进式协程框架引擎.'
    },
    '/zh-TW/': {
      lang: 'zh-TW',
      title: 'QueryPHP',
      description: '高性能 PHP 漸進式協程框架引擎.'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    repo: 'hunzhiwange/queryphp.com',
    editLinks: true,
    docsDir: 'docs',
    // #697 Provided by the official algolia team.
    // algolia: {
    //   apiKey: '',
    //   indexName: ''
    // },
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'View this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en-US'),
        sidebar: {
          '/guide/': genSidebarConfig(),
          '/docs/': genSidebarConfigDoc(),
        }
      },
      '/zh-CN/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上查看此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh-CN'),
        sidebar: {
          '/zh-CN/guide/': genSidebarConfig(),
          '/zh-CN/docs/': genSidebarConfigDoc(),
        }
      },
      '/zh-TW/': {
        label: '繁体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上查看此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh-TW'),
        sidebar: {
          '/zh-TW/guide/': genSidebarConfig(),
          '/zh-TW/docs/': genSidebarConfigDoc(),
        }
      }
    }
  },
  plugins: {
    '@vuepress/i18n-ui': false,
    '@vuepress/back-to-top': true,
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true
    },
    '@vuepress/plugin-medium-zoom': true,
    //'@vuepress/notification': true,
    'flowchart': true
  },
  clientRootMixin: path.resolve(__dirname, 'mixin.js')
}

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}

function genSidebarConfig () {
  return [
    {
      title: '指南',
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}

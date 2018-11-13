const path = require('path')

module.exports = {
  dest: 'vuepress',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'QueryPHP',
      description: '渐进式 PHP 常驻框架引擎'
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
          label: '简体中文',
          selectText: '选择语言',
          editLinkText: '在 GitHub 上编辑此页',
          lastUpdated: '上次更新',
          nav: require('./nav/zh'),
          sidebar: {
            '/guide/': genSidebarConfig('指南')
          }
      }
    }
  },
  plugins: {
    '@vuepress/i18n-ui': true,
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
        /*'getting-started',
        'directory-structure',
        'permalinks',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'i18n',
        'deploy'*/
      ]
    }
  ]
}

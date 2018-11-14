const path = require('path')

module.exports = {
  dest: 'vuepress',
  port: 8088,
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
            '/guide/': genSidebarConfig('指南', '深入'),
            '/docs/': genSidebarConfigDoc(),
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
      ]
    }
  ]
}

function genSidebarConfig (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        ''
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'deploy'
      ]
    }
  ]
}

function genSidebarConfigDoc () {
  return [
    {
      title: '序言',
      collapsable: false,
      children: [
        ''
      ]
    },
    {
      title: '模板引擎',
      collapsable: false,
      children: [
        'template/',
        'template/var',
        'template/assign',
        'template/quick',
        'template/if',
        'template/for',
        'template/list',
        'template/while',
        'template/break',
        'template/php',
        'template/include',
        'template/css',
        'template/tagself',
      ]
    },
    {
      title: '数据库',
      collapsable: false,
      children: [
        'database/',
        'database/create/insert',
        'database/create/insertall',
        'database/delete/delete',
        'database/update/update',
        'database/update/updatecolumn',
        'database/update/updateincrease',
        'database/update/updatedecrease',
        'database/read/aggregate',
        'database/read/find',
        'database/read/findall',
        'database/read/findone',
        'database/read/finddynamics',
        'database/read/select',
        'database/read/lists',
        'database/read/valuepull',
        'database/query/flow',
        'database/query/sql',
        'database/query/table',
        'database/query/columns',
        'database/query/where',
        'database/query/prefix',
        'database/query/forceindex',
        'database/query/bind',
        'database/query/join',
        'database/query/union',
        'database/query/orderby',
        'database/query/groupby',
        'database/query/having',
        'database/query/distinct',
        'database/query/aggregate',
        'database/query/limit',
        'database/query/forupdate',
        'database/query/reset',
        'database/truncate',
      ]
    }
  ]
}

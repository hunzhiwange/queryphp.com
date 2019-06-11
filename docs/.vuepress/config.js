const path = require('path')

module.exports = {
  dest: 'vuepress',
  port: 8088,
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'QueryPHP',
      description: '渐进式 PHP 7 不仅仅是常驻框架引擎.'
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
          editLinkText: '在 GitHub 上查看此页',
          lastUpdated: '上次更新',
          nav: require('./nav/zh'),
          sidebar: {
            '/guide/': genSidebarConfig(),
            '/docs/': genSidebarConfigDoc(),
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
      title: '入门',
      collapsable: true,
      children: [
        'started/',
        'started/install',
        'started/specification',
        'started/directory',
      ]
    },
    {
      title: '架构',
      collapsable: true,
      children: [
        'architecture/',
        'architecture/ioc',
        'architecture/fn',
      ]
    },
    {
      title: '路由',
      collapsable: true,
      children: [
        'router/',
      ]
    },
    {
      title: '模板',
      collapsable: true,
      children: [
        'template/',
        'template/var',
        'template/assign',
        'template/quick',
        'template/if',
        'template/for',
        'template/list',
        'template/lists',
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
      collapsable: true,
      children: [
        'database/',
        'database/config',
        {
          title: '新增 Create',
          collapsable: true,
          'children': [
            'database/create/insert',
            'database/create/insertall',
          ],
        },
        {
          title: '删除 Delete',
          collapsable: true,
          'children': [
            'database/delete/delete',
            'database/truncate',
          ],
        },
        {
          title: '更新 Update',
          collapsable: true,
          'children': [
            'database/update/update',
            'database/update/updatecolumn',
            'database/update/updateincrease',
            'database/update/updatedecrease',
          ],
        },
        {
          title: '查询 Read',
          collapsable: true,
          'children': [
            'database/read/aggregate',
            'database/read/find',
            'database/read/findall',
            'database/read/findone',
            'database/read/finddynamics',
            'database/read/select',
            'database/read/lists',
            'database/read/valuepull',
          ],
        },
        {
          title: '查询语言',
          collapsable: true,
          'children': [
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
          ],
        },
      ]
    },
    {
      title: 'ORM',
      collapsable: true,
      children: [
        'orm/',
        'orm/create',
        'orm/unitofwork',
      ]
    },
    {
      title: '组件',
      collapsable: true,
      children: [
        'component/support/str',
        'component/support/arr',
        'component/debug',
        'component/encryption',
        'component/safe',
        'component/collection',
      ]
    },
    {
      title: '开发者',
      collapsable: true,
      children: [
        'developer/',
      ]
    }
  ]
}

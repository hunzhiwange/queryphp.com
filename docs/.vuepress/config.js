const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Vuepress Docs Boilerplate',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

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

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'hunzhiwange/queryphp.com',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Config',
        link: '/config/'
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      }
    ],
    //sidebar: {
      // '/guide/': [
      //   {
      //     title: 'Guide',
      //     collapsable: false,
      //     children: [
      //       '',
      //       'using-vue',
      //     ]
      //   }
      // ],
    //},

    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'View this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {},
        nav: require('./nav/en-US'),
        sidebar: {
          '/': [/* ... */],
          '/nested/': [/* ... */]
        }
      },
      '/zh-CN/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上查看此页',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        nav: require('./nav/zh-CN'),
        sidebar: {
          '/zh/': [/* ... */],
          '/zh/nested/': [/* ... */]
        }
      },
      '/zh-TW/': {
        // 多语言下拉菜单的标题
        selectText: '選擇語言',
        // 该语言在下拉菜单中的标签
        label: '繁體中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上查看此頁',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: "發現新內容可用.",
            buttonText: "重繪"
          }
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        nav: require('./nav/zh-TW'),
        sidebar: {
          '/zh/': [/* ... */],
          '/zh/nested/': [/* ... */]
        }
      },
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}

function genSidebarConfig (title) {
  return [
    {
      title: title.title1,
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}

function genSidebarConfigDoc (title) {
  return [
    {
      title: title.title1,
      collapsable: false,
      children: [
        ''
      ]
    },
    {
      title: title.title2,
      collapsable: true,
      children: [
        'started/',
        'started/install',
        'started/specification',
        'started/directory',
        'started/namespace',
      ]
    },
    {
      title: title.title24,
      collapsable: true,
      children: [
        'guide/',
      ]
    },
    {
      title: title.title3,
      collapsable: true,
      children: [
        'architecture/',
        'architecture/ioc',
        'architecture/provider',
        'architecture/fn',
        'architecture/event',
        'architecture/manager',
        {
          title: title.title23,
          collapsable: true,
          'children': [
            'architecture/kernel',
            'architecture/kernel/kernelconsole',
            'architecture/kernel/app',
            'architecture/kernel/functions',
            'architecture/kernel/bootstrap/loadoption',
            'architecture/kernel/bootstrap/loadi18n',
            'architecture/kernel/bootstrap/registerexceptionruntime',
            'architecture/kernel/bootstrap/traverseprovider',
          ],
        },
      ]
    },
    {
      title: title.title4,
      collapsable: true,
      children: [
        'router/',
        'router/router',
        'router/url',
        'router/response',
        'router/annotation',
        'router/provider',
      ]
    },
    {
      title: title.title5,
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
      title: title.title6,
      collapsable: true,
      children: [
        'database/',
        'database/config',
        'database/database',
        'database/select',
        {
          title: title.title7 + ' Create',
          collapsable: true,
          'children': [
            'database/create/insert',
            'database/create/insertall',
          ],
        },
        {
          title: title.title8 + ' Delete',
          collapsable: true,
          'children': [
            'database/delete/delete',
            'database/delete/truncate',
          ],
        },
        {
          title: title.title9 + ' Update',
          collapsable: true,
          'children': [
            'database/update/update',
            'database/update/updatecolumn',
            'database/update/updateincrease',
            'database/update/updatedecrease',
          ],
        },
        {
          title: title.title10 + ' Read',
          collapsable: true,
          'children': [
            'database/read/aggregate',
            'database/read/find',
            'database/read/findall',
            'database/read/findone',
            'database/read/finddynamics',
            'database/read/select',
            'database/read/list',
            'database/read/value',
          ],
        },
        {
          title: title.title11,
          collapsable: true,
          'children': [
            'database/query/flow',
            'database/query/sql',
            'database/query/table',
            'database/query/columns',
            'database/query/where',
            'database/query/wheredate',
            'database/query/comment',
            'database/query/prefix',
            'database/query/forceindex',
            'database/query/bind',
            'database/query/join',
            'database/query/union',
            'database/query/orderby',
            'database/query/groupby',
            'database/query/having',
            'database/query/havingdate',
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
      title: title.title12,
      collapsable: true,
      children: [
        'orm/',
        'orm/entity',
        'orm/define',
        'orm/toarray',
        'orm/conversion',
        'orm/create',
        'orm/update',
        'orm/replace',
        'orm/delete', 
        'orm/event',
        'orm/relation',
        'orm/belongsto',
        'orm/hasmany',
        'orm/hasone',
        'orm/manymany',
        'orm/nested',
        'orm/select',
        'orm/unitofwork',
        'orm/repository',
      ]
    },
    {
      title: title.title18,
      collapsable: true,
      children: [
        'protocol/coroutine',
        'protocol/timer', 
        'protocol/task',
        'protocol/process/hotoverload',
        {
          title: 'HTTP Server',
          collapsable: true,
          'children': [
            'protocol/leevel2swoole',
            'protocol/swoole2Leevel',
          ],
        },
      ]
    },
    {
      title: title.title13,
      collapsable: true,
      children: [
        'component/support/str',
        'component/support/arr',
        'component/support/type',
        'component/collection',
        'component/tree',
        'component/pipeline',
        'component/flow',
        'component/linkedlist',
        'component/queue',
        'component/stack',
        {
          title: title.title20,
          collapsable: true,
          'children': [
            'component/encryption',
            'component/encryption/helper',
          ],
        },
        {
          title: title.title15,
          collapsable: true,
          'children': [
            'component/validate/',
            'component/validate/assert',
            'component/validate/helper',
            'component/validate/validator/accepted',
            'component/validate/validator/after',
            'component/validate/validator/allowedip',
            'component/validate/validator/alpha',
            'component/validate/validator/alphadash',
            'component/validate/validator/alphalower',
            'component/validate/validator/alphanum',
            'component/validate/validator/alphaupper',
            'component/validate/validator/isarray',
            'component/validate/validator/before',
            'component/validate/validator/between',
            'component/validate/validator/betweenequal',
            'component/validate/validator/boolean',
            'component/validate/validator/chinese',
            'component/validate/validator/chinesealphadash',
            'component/validate/validator/chinesealphanum',
            'component/validate/validator/date',
            'component/validate/validator/dateformat',
            'component/validate/validator/denyip',
            'component/validate/validator/different',
            'component/validate/validator/digit',
            'component/validate/validator/double',
            'component/validate/validator/email',
            'component/validate/validator/isempty',
            'component/validate/validator/equal',
            'component/validate/validator/equalgreaterthan',
            'component/validate/validator/equallessthan',
            'component/validate/validator/equalto',
            'component/validate/validator/isfloat',
            'component/validate/validator/greaterthan',
            'component/validate/validator/idcard',
            'component/validate/validator/in',
            'component/validate/validator/integer',
            'component/validate/validator/ip',
            'component/validate/validator/ipv4',
            'component/validate/validator/ipv6',
            'component/validate/validator/json',
            'component/validate/validator/lessthan',
            'component/validate/validator/lower',
            'component/validate/validator/luhn',
            'component/validate/validator/max',
            'component/validate/validator/maxlength',
            'component/validate/validator/min',
            'component/validate/validator/minlength',
            'component/validate/validator/mobile',
            'component/validate/validator/notbetween',
            'component/validate/validator/notbetweenequal',
            'component/validate/validator/notempty',
            'component/validate/validator/notequal',
            'component/validate/validator/notin',
            'component/validate/validator/notnull',
            'component/validate/validator/notsame',
            'component/validate/validator/isnull',
            'component/validate/validator/number',
            'component/validate/validator/phone',
            'component/validate/validator/qq',
            'component/validate/validator/regex',
            'component/validate/validator/required',
            'component/validate/validator/same',
            'component/validate/validator/strlen',
            'component/validate/validator/telephone',
            'component/validate/validator/timezone',
            'component/validate/validator/type',
            'component/validate/validator/unique',
            'component/validate/validator/upper',
            'component/validate/validator/url',
            'component/validate/validator/zipcode',
          ]
        },
        {
          title: title.title16,
          collapsable: true,
          'children': [
            'component/option',
            'component/option/composer',
          ],
        },
        {
          title: title.title17,
          collapsable: true,
          'children': [
            'component/cache',
            'component/cache/load',
          ],
        },
        'component/session',
        'component/page',
        'component/debug',
        'component/log',
        'component/seccode',
        {
          title: 'HTTP',
          collapsable: true,
          'children': [
            'component/http/',
            'component/http/request',
            'component/http/response',
            'component/http/jsonresponse',
            'component/http/redirectresponse',
          ],
        },
        'component/mail',
        {
          title: title.title19,
          collapsable: true,
          'children': [
            'component/auth',
            'component/auth/hash',
          ],
        },
        {
          title: title.title21,
          collapsable: true,
          'children': [
            'component/filesystem',
            'component/filesystem/helper',
          ],
        },
        {
          title: title.title22,
          collapsable: true,
          'children': [
            'component/console',
            'component/console/makecommand',
            'component/console/runcommand',
          ],
        },
        'component/view',
      ]
    },
    {
      title: title.title25,
      collapsable: true,
      children: [
        'test/',
      ]
    },
    {
      title: title.title14,
      collapsable: true,
      children: [
        'developer/',
      ]
    },
  ]
}
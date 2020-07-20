module.exports = {
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
          '/guide/': genSidebarConfig({title1:'Guide'}),
          '/docs/started/': genSidebarConfigStartedDoc('Started'),
          '/docs/guide/': genSidebarConfigGuideDoc('Guide'),
          '/docs/architecture/': genSidebarConfigArchitectureDoc('Architecture', 'Kernel'),
          '/docs/router/': genSidebarConfigRouterDoc('Routing'),
          '/docs/template/': genSidebarConfigTemplateDoc('Template'),
          '/docs/database/': genSidebarConfigDatabaseDoc('Database', 'Add', 'Delete', 'Update', 'Query', 'Query lang'),
          '/docs/orm/': genSidebarConfigOrmDoc('ORM'),
          '/docs/validate/': genSidebarConfigValidateDoc('Validate'),
          '/docs/protocol/': genSidebarConfigProtocolDoc('Swoole'),
          '/docs/component/': genSidebarConfigComponentDoc('Component', 'Encryption', 'Option', 'Cache', 'Auth', 'Filesystem', 'Console'),
          '/docs/test/': genSidebarConfigTestDoc('Test'),
          '/docs/developer/': genSidebarConfigDeveloperDoc('Developer'),
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
          '/zh-CN/guide/': genSidebarConfig({title1:'指南'}),
          // '/zh-CN/docs/': genSidebarConfigDoc({
          //   title1: '序言',
          //   title2: '入门',
          //   title3:'架构', 
          //   title4:'路由',
          //   title5:'模板',
          //   title6:'数据库',
          //   title7:'新增',
          //   title8:'删除',
          //   title9:'更新',
          //   title10:'查询',
          //   title11:'查询语言',
          //   title12:'ORM',
          //   title13:'组件',
          //   title14:'开发者',
          //   title15:'验证器',
          //   title16:'配置',
          //   title17:'缓存',
          //   title18:'Swoole',
          //   title19:'认证',
          //   title20:'加密',
          //   title21:'文件系统',
          //   title22:'命令行',
          //   title23:'内核',
          //   title24:'指南',
          //   title25:'测试',
          // }),
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
          '/zh-TW/guide/': genSidebarConfig({title1:'指南'}),
          // '/zh-TW/docs/': genSidebarConfigDoc({
          //   title1: '序言',
          //   title2: '入門',
          //   title3:'架構', 
          //   title4:'路由',
          //   title5:'模板',
          //   title6:'資料庫',
          //   title7:'新增',
          //   title8:'删除',
          //   title9:'更新',
          //   title10:'査詢',
          //   title11:'査詢語言',
          //   title12:'ORM',
          //   title13:'組件',
          //   title14:'開發者',
          //   title15:'驗證器',
          //   title16:'配寘',
          //   title17:'緩存',
          //   title18:'Swoole',
          //   title19:'認證',
          //   title20:'加密',
          //   title21:'文件系統',
          //   title22:'命令行',
          //   title23:'內核',
          //   title24:'指南',
          //   title25:'測試',
          // }),
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

function genSidebarConfigStartedDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'install',
        'specification',
        'directory',
        'namespace',
      ]
    }
  ]
}

function genSidebarConfigArchitectureDoc (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'ioc',
        'provider',
        'fn',
        'event',
        'manager',
        {
          title: groupB,
          collapsable: true,
          'children': [
            'kernel',
            'kernel/kernelconsole',
            'kernel/app',
            'kernel/functions',
            'kernel/bootstrap/loadoption',
            'kernel/bootstrap/loadi18n',
            'kernel/bootstrap/registerexceptionruntime',
            'kernel/bootstrap/traverseprovider',
          ],
        },
      ]
    }
  ]
}

function genSidebarConfigGuideDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}

function genSidebarConfigRouterDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'router',
        'url',
        'response',
        'annotation',
        'provider',
      ]
    }
  ]
}

function genSidebarConfigTemplateDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'var',
        'assign',
        'quick',
        'if',
        'for',
        'list',
        'lists',
        'while',
        'break',
        'php',
        'include',
        'css',
        'tagself',
      ]
    }
  ]
}

function genSidebarConfigDatabaseDoc (groupA, groupB, groupC, groupD, groupE, groupF) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'config',
        'database',
        'select',
        {
          title: groupB + ' Create',
          collapsable: false,
          'children': [
            'create/insert',
            'create/insertall',
          ],
        },
        {
          title: groupC + ' Delete',
          collapsable: false,
          'children': [
            'delete/delete',
            'delete/truncate',
          ],
        },
        {
          title: groupD + ' Update',
          collapsable: false,
          'children': [
            'update/update',
            'update/updatecolumn',
            'update/updateincrease',
            'update/updatedecrease',
          ],
        },
        {
          title: groupE + ' Read',
          collapsable: false,
          'children': [
            'read/aggregate',
            'read/find',
            'read/findall',
            'read/findone',
            'read/finddynamics',
            'read/select',
            'read/list',
            'read/value',
          ],
        },
        {
          title: groupF,
          collapsable: false,
          'children': [
            'query/flow',
            'query/sql',
            'query/table',
            'query/columns',
            'query/where',
            'query/wheredate',
            'query/comment',
            'query/prefix',
            'query/forceindex',
            'query/bind',
            'query/join',
            'query/union',
            'query/orderby',
            'query/groupby',
            'query/having',
            'query/havingdate',
            'query/distinct',
            'query/aggregate',
            'query/limit',
            'query/forupdate',
            'query/reset',
          ],
        },
      ]
    }
  ]
}

function genSidebarConfigOrmDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'entity',
        'define',
        'toarray',
        'conversion',
        'create',
        'update',
        'replace',
        'delete', 
        'event',
        'relation',
        'belongsto',
        'hasmany',
        'hasone',
        'manymany',
        'nested',
        'select',
        'unitofwork',
        'repository',
      ]
    }
  ]
}

function genSidebarConfigValidateDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      'children': [
        '',
        'assert',
        'helper',
        'validator/accepted',
        'validator/after',
        'validator/allowedip',
        'validator/alpha',
        'validator/alphadash',
        'validator/alphalower',
        'validator/alphanum',
        'validator/alphaupper',
        'validator/isarray',
        'validator/before',
        'validator/between',
        'validator/betweenequal',
        'validator/boolean',
        'validator/chinese',
        'validator/chinesealphadash',
        'validator/chinesealphanum',
        'validator/date',
        'validator/dateformat',
        'validator/denyip',
        'validator/different',
        'validator/digit',
        'validator/double',
        'validator/email',
        'validator/isempty',
        'validator/equal',
        'validator/equalgreaterthan',
        'validator/equallessthan',
        'validator/equalto',
        'validator/isfloat',
        'validator/greaterthan',
        'validator/idcard',
        'validator/in',
        'validator/integer',
        'validator/ip',
        'validator/ipv4',
        'validator/ipv6',
        'validator/json',
        'validator/lessthan',
        'validator/lower',
        'validator/luhn',
        'validator/max',
        'validator/maxlength',
        'validator/min',
        'validator/minlength',
        'validator/mobile',
        'validator/notbetween',
        'validator/notbetweenequal',
        'validator/notempty',
        'validator/notequal',
        'validator/notin',
        'validator/notnull',
        'validator/notsame',
        'validator/isnull',
        'validator/number',
        'validator/phone',
        'validator/qq',
        'validator/regex',
        'validator/required',
        'validator/same',
        'validator/strlen',
        'validator/telephone',
        'validator/timezone',
        'validator/type',
        'validator/unique',
        'validator/upper',
        'validator/url',
        'validator/zipcode',
      ]
    }
  ]
}

function genSidebarConfigProtocolDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        'coroutine',
        'timer', 
        'task',
        'process/hotoverload',
        {
          title: 'HTTP Server',
          collapsable: false,
          'children': [
            'leevel2swoole',
            'swoole2Leevel',
          ],
        },
      ]
    }
  ]
}

function genSidebarConfigComponentDoc (groupA, groupB, groupC, groupD, groupE, groupF, groupG) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        'support/str',
        'support/arr',
        'support/type',
        'collection',
        'tree',
        'pipeline',
        'flow',
        'linkedlist',
        'queue',
        'stack',
        {
          title: groupB,
          collapsable: false,
          'children': [
            'encryption',
            'encryption/helper',
          ],
        },
        {
          title: groupC,
          collapsable: false,
          'children': [
            'option',
            'option/composer',
          ],
        },
        {
          title: groupD,
          collapsable: false,
          'children': [
            'cache',
            'cache/load',
          ],
        },
        'session',
        'page',
        'debug',
        'log',
        'seccode',
        {
          title: 'HTTP',
          collapsable: false,
          'children': [
            'http/',
            'http/request',
            'http/response',
            'http/jsonresponse',
            'http/redirectresponse',
          ],
        },
        'mail',
        {
          title: groupE,
          collapsable: false,
          'children': [
            'auth',
            'auth/hash',
          ],
        },
        {
          title: groupF,
          collapsable: false,
          'children': [
            'filesystem',
            'filesystem/helper',
          ],
        },
        {
          title: groupG,
          collapsable: false,
          'children': [
            'console',
            'console/makecommand',
            'console/runcommand',
          ],
        },
        'view',
      ]
    }
  ]
}

function genSidebarConfigTestDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}

function genSidebarConfigDeveloperDoc (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}

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
          '/guide/': genSidebarConfig({title1:'Guide'}),
          '/docs/': genSidebarConfigDoc({
            title1: 'Preface',
            title2: 'Started',
            title3:'Architecture', 
            title4:'Routing',
            title5:'Template',
            title6:'Database',
            title7:'Add',
            title8:'Delete',
            title9:'Update',
            title10:'Query',
            title11:'Query lang',
            title12:'ORM',
            title13:'Component',
            title14:'Developer',
            title15:'Validate',
            title16:'Option',
            title17:'Cache',
            title18:'Swoole',
            title19:'Auth',
            title20:'Encryption',
            title21:'Filesystem',
            title22:'Console',
            title23:'Kernel',
          }),
        }
      },
      '/zh-CN/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上查看此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh-CN'),
        sidebar: {
          '/zh-CN/guide/': genSidebarConfig({title1:'指南'}),
          '/zh-CN/docs/': genSidebarConfigDoc({
            title1: '序言',
            title2: '入门',
            title3:'架构', 
            title4:'路由',
            title5:'模板',
            title6:'数据库',
            title7:'新增',
            title8:'删除',
            title9:'更新',
            title10:'查询',
            title11:'查询语言',
            title12:'ORM',
            title13:'组件',
            title14:'开发者',
            title15:'验证器',
            title16:'配置',
            title17:'缓存',
            title18:'Swoole',
            title19:'认证',
            title20:'加密',
            title21:'文件系统',
            title22:'命令行',
            title23:'内核',
          }),
        }
      },
      '/zh-TW/': {
        label: '繁体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上查看此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh-TW'),
        sidebar: {
          '/zh-TW/guide/': genSidebarConfig({title1:'指南'}),
          '/zh-TW/docs/': genSidebarConfigDoc({
            title1: '序言',
            title2: '入門',
            title3:'架構', 
            title4:'路由',
            title5:'模板',
            title6:'資料庫',
            title7:'新增',
            title8:'删除',
            title9:'更新',
            title10:'査詢',
            title11:'査詢語言',
            title12:'ORM',
            title13:'組件',
            title14:'開發者',
            title15:'驗證器',
            title16:'配寘',
            title17:'緩存',
            title18:'Swoole',
            title19:'認證',
            title20:'加密',
            title21:'文件系統',
            title22:'命令行',
            title23:'內核',
          }),
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
      title: title.title14,
      collapsable: true,
      children: [
        'developer/',
      ]
    },
  ]
}

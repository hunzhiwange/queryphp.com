---
title: COOKIE.配置参数
type: v4
order: 242
---

# cookie 相关配置
cookie 的默认配置参数如下，多个域名下的综合性系统可以设置 cookie 域名保证多个子域名能够记住状态。
~~~
'cookie_prefix' => 'q_', // cookie 前缀
'cookie_langtheme_app' => TRUE, // 语言包和模板 cookie 是否包含应用名
'cookie_domain' => '', // cookie 域名
'cookie_path' => '/', // cookie 路径
'cookie_expire' => 86400, // cookie 默认过期时间一天
~~~
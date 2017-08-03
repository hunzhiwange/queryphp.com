---
title: 日志路径
type: v4
order: 203
---

# 日志路径
日志路径默认位于 <project>/~@~/log 中，并且每一种日志类型都有文件夹，例如 sql,log 等等。
可以在入口文件中配置 logcache_path 来指定日志缓存路径，例如：
~~~
\Q\mvc\project::run ( [ 
        'project_path' => PROJECT_PATH ,
        'logcache_path' => PROJECT_PATH.'/~@~/log_custom'
] );
~~~
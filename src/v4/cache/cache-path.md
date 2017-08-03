---
title: 缓存路径
type: v4
order: 223
---

文件缓存路径默认位于 `<project>/~@~/cache` 中，每一个缓存对应一个文件。
可以在入口文件中配置 `cache_path` 来指定日志缓存路径，例如：
``` php
\Q\mvc\project::run ( [ 
        'project_path' => PROJECT_PATH ,
        'cache_path' => PROJECT_PATH.'/~@~/cache_custom'
] );
```
---
title: 环境要求
type: v4
order: 3
---

# PHP 版本要求
QueryPHP V4.0 采用命名空间开发，至少需要 `PHP 5.3` 版本才能够正常运行。
``` php
if (version_compare ( PHP_VERSION, '5.3.0', '<' ))
    die ( 'PHP5.3 OR Higher' );
```
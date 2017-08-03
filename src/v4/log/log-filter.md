---
title: 日志过滤器
type: v4
order: 204
---

为了方便大家更好地调试项目，我们可以通过过滤器缩小日志查找范围，QueryPHP 允许为日志自定义一个过滤器，你可以在项目功能入口文件 <project>/com/bootstrap.php 中定义。
~~~
\Q\log\log::registerFilter ( function ($strMessage, $strLevel) {
    if ($strLevel == 'sql' && $_SESSION ['company'] ['company_id'] != 1000) {
        return false;
    }
} );
~~~

比如某个公司相关的业务日志，我们可以在这里通过过滤器排除掉其它公司的日志，方便准确定位错误。
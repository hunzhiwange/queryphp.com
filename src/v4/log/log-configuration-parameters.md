---
title: 日志配置参数
type: v4
order: 202
---

# 日志相关配置
日志默认处于关闭状态，开发者可以通过配置修改日志相关的配置以满足产品业务的需求。
~~~
'log_enabled' => FALSE, // 默认不记录日志
'log_level' => 'error,sql,debug,info', // 允许记录的日志级别，随意自定义 error 和 sql 为系统内部使用
'log_error_enabled' => FALSE, // 是否记录系统中的错误日志
'log_sql_enabled' => FALSE, // 是否记录系统中的 sql 日志
'log_file_size' => 2097152, // 日志文件大小限制
'log_file_name' => 'Y-m-d H', // 日志文件名时间格式化
'log_time_format' => '【Y-m-d H:i】', // 日志时间格式化
~~~
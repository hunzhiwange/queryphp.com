---
title: 缓存配置参数
type: v4
order: 222
---

我们可以在配置中使用不同的缓存来满足你的业务需求。
```
'runtime_cache_backend' => 'file', // 程序运行指定缓存
'runtime_cache_force_name' => '~@update_cache', // 缓存调试 GET 参数，强制不启用缓存
'runtime_cache_time' => 86400, // 程序缓存时间
'runtime_cache_prefix' => '~@', // 缓存键值前缀
'runtime_cache_times' => [ ], // 缓存时间预植,键值=缓存值，键值不带前缀 ['option' => 60]
'runtime_file_path' => '', // 文件缓存路径
'runtime_memcache_servers' => [ ], // memcache 多台服务器
'runtime_memcache_host' => '127.0.0.1', // memcache 默认缓存服务器
'runtime_memcache_port' => 11211, // memcache 默认缓存服务器端口
'runtime_memcache_compressed' => false, // memcache 是否压缩缓存数据
'runtime_memcache_persistent' => true // memcache 是否使用持久连接
```
---
title: 缓存
type: v4
order: 221
---

QueryPHP 在数据缓存方面包括`文件方式`和`共享内存方式`在内的多种方式进行缓存。目前已经支持的缓存方式包括：file 和 memcache，后续将会增加其它类型的缓存。

一般来说，小网站使用 `file` 文件缓存就行了，大网站可以使用 `memcache` 来减低系统开销。

## 函数原型
``` php
\Q::cache($sId, $mixData = '', $arrOption = null, $sBackendClass = null);
```

> 说明：设置、获取和删除缓存都在同一个方法里面，缓存将统一通过这个入口进行操作。
缓存有自己的默认配置，特别注意的是第三个参数，可以 `临时` 更改默认参数。

## 设置缓存
缓存简单使用如下，缓存名字加上缓存值即可。
``` php
# 缓存一段文本
\Q::cache ( 'test1', '这是一个段缓存数据' );

## 缓存一个数组
\Q::cache ( 'test2', [ 
    'name' => '你的名字',
    'age' => 15 
] );
```

## 读取缓存
读取缓存更加简单，直接写入名字即可。
``` php
var_dump ( \Q::cache ( 'test1' ) );
var_dump ( \Q::cache ( 'test2' ) );
if (\Q::cache ( 'test3' ) === false) {
    \Q::cache ( 'test3', '新的缓存数据' );
}
var_dump ( \Q::cache ( 'test3' ) );
```
<p class="tip">注意：获取缓存返回 `false` 表示缓存不存在或者已经过期，可以重新生产缓存。</p>

## 删除缓存
第二个参数为 `null` 即可删除对应的缓存数据。
``` php
\Q::cache ( 'test1', null );
\Q::cache ( 'test2', null );
```
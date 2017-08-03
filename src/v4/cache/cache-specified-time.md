---
title: 缓存指定时间
type: v4
order: 224
---

在一个系统中，有部分缓存需要经常性更新，那么它的缓存需要设置单独设置。
``` php
'runtime_cache_times' => [ 
    'test1' => 86400,
    'test2' => 3600,
    'goods*city' => 3600,
    'city_*_*_cache' => 3600 
] 
```

<p class="tip">注意：其中 * 为通配符，可以匹配一类缓存，用起来还是非常方便的。</p>
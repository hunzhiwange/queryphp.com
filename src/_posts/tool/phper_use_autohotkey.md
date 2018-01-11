title: PHP 程序员使用 autohotkey 几行脚本提高效率，手不离主键盘区域
date: 2018-01-11 23:10:06
---

![](IMG_20180111_220656.jpg)

脚本如下，包含编程常用的方向键，美元符号以及 home 等常用键。

```
;方向键
CapsLock & i::up
CapsLock & k::down
CapsLock & j::left
CapsLock & l::right

;php 美元符号 下划线 等于
CapsLock & n::=
CapsLock & u::+-
CapsLock & h::+4

;home end pgup pgdown
CapsLock & s::Home
CapsLock & d::PgDn
CapsLock & f::End
CapsLock & e::PgUp
```

然后，在 开始/所有程序/启动，然后系统开机后就会自动加载脚本，我自己感觉还可以，准备试用一段时间再来反馈一下。




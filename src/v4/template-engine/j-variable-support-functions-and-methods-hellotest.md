---
title: J变量支持函数和方法.hello.test
type: v4
order: 108
---

仅仅是输出变量并不能满足模板输出的需要，内置模板引擎支持对模板变量使用调节器和格式化功能，其实也就是提供函数支持，并支持多个函数同时使用。用于模板标签的函数可以是Javascript 内置函数或者是用户自定义函数。

# 函数调用格式
~~~
{{hello_world|function1|function2=arg1,arg2,**|function3=arg1,arg2}}
~~~

**说明：**
*  ** 表示模板变量本身的参数位置
*  支持多个函数，函数之间支持空格
*  支持函数屏蔽功能，在配置文件中可以配置禁止使用的函数列表

模板编译后的结果：
~~~
' + (function3 ( function2 ( arg1,arg2,function1 ( hello_world ) ),arg1,arg2 )) + '
~~~

模板中如果不加**的格式为：
~~~
{{hello|function1|function2=arg1,arg2}}
~~~

模板编译后的结果：
~~~
' + (function2 ( function1 ( hello ),arg1,arg2 )) + '
~~~




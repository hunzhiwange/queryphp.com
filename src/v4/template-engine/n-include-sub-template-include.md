---
title: N包含子模板.include
type: v4
order: 103
---

可以使用 include 标签来包含外部的模板文件，使用方法如下：
# 1、 使用完整文件名包含
~~~
<include file="完整模板文件名" />  
~~~

> 说明：这种情况下，模板文件名必须包含后缀。

下面我们测试一下子，首先我们在主模板文件中写入如下的代码：
~~~
<include file="app/home/theme/default/header.html"> 
~~~

模板编译后的结果：
~~~
<?php $this->display( 'app/home/theme/default/header.html' ); ?>
~~~

我们需要定义一个 header.html ，如果没有定义就会在页面上收到一个异常提示：
> 模板文件 app/home/theme/default/header.html 不存在


# 2、 使用变量定义完整的文件
~~~
{~$sHeadTpl = $APP->apptheme_path.'/'.$APP->apptheme_name.'/header.html' }   
<include file="$sHeadTpl">
~~~

说明：**$APP** 为系统提供的当前 APP 实例，这里可以读取当前模板路径地址，比如我开发的环境下，**$sHeadTpl** 的路径为：
~~~
{项目地址}/app/home/theme/default/header.html
~~~

模板编译后的结果：
~~~
<?php $sHeadTpl = $APP->apptheme_path.'/'.$APP->apptheme_name.'/header.html'; ?>
<?php $this->display( $sHeadTpl ); ?>  
~~~   

> 说明：效果和上面一样，同样需要定义 header.html。

# 3、包含当前主题下的模板文件
~~~
<include file="文件名" />  
~~~

例如 导入当前主题下面的 test.html：
~~~
<include file="test" />
~~~

模板编译后的结果：
~~~
<?php $this->display( $APP->apptheme_path.'/'.$APP->apptheme_name.'/test.html' ); ?>
~~~ 

# 4、 包含其他模块的操作模板
~~~
<include file="模块名+操作名" />
<include file="模块名:操作名" />  
~~~

模块和操作名之间的分隔符可以自定义，系统默认为 '_'，你可以通过应用配置文件修改 ：
~~~
'theme_moduleaction_depr' => '/'  
~~~

如果你在配置文件修改的话，那么模块和操作之间通过文件夹的方式分割，模块是文件夹，操作是每一个文件。同时，为了降低目录深度，系统默认使用‘_’，这样子也比较直观。

例如，包含public模块的header操作方法，我们可以在模板文件中使用如下的代码：
~~~
<include file="public+header" />  
~~~

模板编译后的结果：
~~~
<?php $this->display( $APP->apptheme_path.'/'.$APP->apptheme_name.'/public_header.html' ); ?>
~~~

# 5、包含其他模板主题的模块操作模板：
~~~
<include file="主题名@模块名+操作名" />  
<include file="主题名@模块名:操作名" />
~~~

例如，包含 blue 主题的 blog 模块 的 view 操作模版：
~~~
<include file="blue@blog+view" />   
~~~

模板编译后的结果：
~~~
<?php $this->display( $APP->apptheme_path.'/'.$APP->apptheme_name.'/blog_view.html' ); ?>
~~~

注意：如果外部模板有所更改，模板引擎会像主模板一样重新编译模板，所以你不用担心子模板是否更新。

# 6、函数表达式支持：
~~~
<include file="($strPath.'/'.$strName)" />
<include file="template+tpl('header')" />
<include file="tpl('header')" />
<include file="$oHello:world('header')" />
~~~

模板编译后的结果：
~~~
<?php $this->display( ($strPath.'/'.$strName) ); ?>
<?php $this->display( template::tpl('header') ); ?>
<?php $this->display( tpl('header') ); ?>
<?php $this->display( $oHello->world('header') ); ?>
~~~

# 7、默认文件文件查找：
如果当前主题文件不存在，系统会自动去寻找默认的主题，还支持自定义的扩展主题，例如：
~~~
<include file="blue@blog+view" />   
~~~
> 说明：如果 blue 主题下面没有blog_view.html，那么系统会自动去寻找 default 目录下面的主题。

自定义扩展主题例子，入口文件定义：
~~~
\Q\base\app::run ( [ 
        'project_path' => PROJECT_PATH,
        'appthemebackup_path' => PROJECT_PATH.'/mytheme',
] );
~~~

# 8、子模板合并到主模板：
默认情况下，子模板有自己的编译文件，主模板和子模板分别缓存到对应的文件。系统在加载的时候，会载入多个缓存文件，从而会增加 io 开销。这个时候我们可以配置将子模板的缓存写入到住模板中去合并成为一个文件，加载的时候就一个文件。
~~~
'theme_cache_children' => true
~~~
> 注意：合并到一个文件好处就是降低 io 开销，但同时也会存在子模板更新了，主模板不会更新的情况。大家根据项目来决定是否开启这个功能。
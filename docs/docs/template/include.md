# Include 标签

可以使用 include 标签来包含外部的模板文件，使用方法如下：

## 使用完整文件名包含

``` html
<include file="完整模板文件名" />  
```

<p class="tip">这种情况下，模板文件名必须包含后缀。</p>

下面我们测试一下子，首先我们在主模板文件中写入如下的代码：

``` html
<include file="application/app/ui/theme/default/header.html">
```

模板编译后的结果：

``` php
<?php $this->display('application/app/ui/theme/default/header', [], '.html', true); ?>
```

## 使用变量定义完整的文件

``` html
{~$headTpl = app()->pathApplicationTheme() . '/' . '/header.html'}
<include file="$headTpl">
```

模板编译后的结果：

``` php
<?php $headTpl = app()->pathApplicationTheme() . '/' . '/header.html'; ?>
<?php $this->display($headTpl, [], '', true); ?>
```

## 包含当前主题下的模板文件

``` html
<include file="文件名" />  
```

例如 导入当前主题下面的 test.html：

``` html
<include file="test" />
```

模板编译后的结果：

``` php
<?php $this->display('test', [], '', true); ?>
```

## 包含其他模块的操作模板

``` html
<include file="模块名+操作名" />
<include file="模块名:操作名" />  
```

模块和操作名之间的分隔符可以自定义, 系统默认为 _ , 你可以通过应用配置文件修改

``` html
view.controlleraction_depr = '/'  
```

例如，包含 public 模块的 header 操作方法，我们可以在模板文件中使用如下的代码：

``` html
<include file="public+header" />  
```

模板编译后的结果：

``` php
<<?php $this->display('public+header', [], '', true); ?>
```

## 包含其他模板主题的模块操作模板

``` html
<include file="主题名@模块名+操作名" />  
<include file="主题名@模块名:操作名" />
```

例如，包含 blue 主题的 blog 模块 的 view 操作模版：

``` html
<include file="blue@blog+view" />   
```

模板编译后的结果：

``` php
<?php $this->display('blue@blog+view', [], '', true); ?>
```

<p class="tip">如果外部模板有所更改，模板引擎会像主模板一样重新编译模板，所以你不用担心子模板是否更新。</p>

## 函数表达式支持

为了防止 `.` 被解析为 `->`，需要由 `()` 包裹起来，file 内容区的解析规则遵循 if 标签的 condition 特性。


``` html
<include file="($path . '/' . $name)" />
<include file="Template::tpl('header')" />
<include file="tpl('header')" />
<include file="$hello.world('header')" />
```

模板编译后的结果：

``` php
<?php $this->display(($path . '/' . $name), [], '', true); ?>
<?php $this->display(Template::tpl('header'), [], '', true); ?>
<?php $this->display(tpl('header'), [], '', true); ?>
<?php $this->display($hello->world('header'), [], '', true); ?>
```

## 默认文件文件查找

如果当前主题文件不存在，系统会自动去寻找默认的主题，还支持自定义的扩展主题，例如：

``` html
<include file="blue@blog+view" />   
```

<p class="tip">如果 blue 主题下面没有 blog_view.html，那么系统会自动去寻找 default 目录下面的主题。如果还是没有找到会尝试从扩展主题中查找文件。</p>

自定义扩展主题例子，修改配置文件：

``` php
view.theme_path_default = ''
```
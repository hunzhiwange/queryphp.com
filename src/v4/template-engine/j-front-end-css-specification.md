---
title: J前端.CSS.规范
type: v4
order: 111
---

QueryPHP 推荐大家前端 CSS 规范，主要来自于 Discuz，还是非常不错。
 
#   1. 页面编码
统一使用 UTF-8 编码,用 @charset "utf-8" 指定页面编码。
~~~
@charset "utf-8"
~~~

#   2. 属性规范
属性是 CSS 中最重要的，所以这里的规范非常重要。
### 1：属性写在多行，去掉最后一个“;”
~~~
a:hover, a:focus {
	color: #141719;
	text-decoration: none
}
~~~
  
### 2：书写顺序
按照元素模型由外及内，由整体到细节书写，大致分为五组：

|  组名  |  属性  |
| --- | --- |
|  位置  |  position,left,right,float  |
|  盒模型属性  |  display,margin,padding,width,height  |
|  边框与背景  |  border,background  |
|  段落与文本  |  line-height,text-indent,font,color,text-decoration  |
|  其它属性  |  overflow,cursor,visibility  |

### 3：特殊浏览器的属性
~~~
-webkit-box-shadow:;-moz-box-shadow:;box-shaow:;
~~~

### 4：L-V-H-A 顺序
> link :visited :hover :active书写顺序 L-V-H-A，速记：LoVe（喜欢）HAte（讨厌）

#   3. CSS Hack
避免使用各种 CSS Hack，在这里统一进行书写。

|  浏览器   |  书写方式  |
| --- | --- |
|  IE浏览器 | .ie-all   |
| Chorme   |   @media screen and (-webkit-min-device-pixel-ratio:0) {  } |
|  Firefox  |   @-moz-document url-prefix() {  }   |
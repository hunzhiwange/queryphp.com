# Tagself 保护标签

可以使用 tagself 标签来防止模板标签被解析，在特殊场景非常有用。



## 基本使用

我们在模板中写下如下的代码和模板编译后的结果。

``` php
public function testBaseUse()
{
    $parser = $this->createParser();

    $source = <<<'eot'
<tagself>
   <if condition="$name eq 1 "> value1
      <elseif condition="$name eq 2" />value2
      <else /> value3
   </if>
</tagself>

{tagself}
     {{i + 1}}
     {$value}
{/tagself}
eot;

    $compiled = <<<'eot'
<if condition="$name eq 1 "> value1
      <elseif condition="$name eq 2" />value2
      <else /> value3
   </if>

{{i + 1}}
     {$value}
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```

::: tip
上面的 **if 标签** 被 **tagself** 标签包含，因此 **if 标签** 里面的内容并不会被模板引擎解析，而是保持原样输出。
:::

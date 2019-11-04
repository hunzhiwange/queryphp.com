# CSS 标签

::: tip Testing Is Documentation
[tests/View/Compiler/CompilerCssTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerCssTest.php)
:::
    
QueryPHP 支持提供两个简单标签来简化 javascript 和 css 标签输入。

## 基本使用

``` php
public function testBaseUse(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        {script}
        var hello = 'world';
        {/script}

        {style}
        .red {
            color: red;
        }
        {/style}
        eot;

    $compiled = <<<'eot'
        <script type="text/javascript">
        var hello = 'world';
        </script>

        <style type="text/css">
        .red {
            color: red;
        }
        </style>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
# CSS 标签

QueryPHP 支持提供两个简单标签来简化 javascript 和 css 标签输入。

## 基本使用



``` php
public function testBaseUse()
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
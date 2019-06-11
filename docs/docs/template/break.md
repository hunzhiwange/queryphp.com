# 跳出循环

::: tip 单元测试即文档
[基于原始文档 tests/View/Compiler/CompilerBreakTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/View/Compiler/CompilerBreakTest.php)
:::
    
break 和 continue 是各种循环中非常重要的两个流程标记语言，框架当然也会支持它们。

## break 标签


``` php
public function testBaseUse(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        <list for=list>
           <if condition="$value eq 'H'">
               <break/>
           </if>
           {$value}
        </list>
        eot;

    $compiled = <<<'eot'
        <?php $index = 1; ?>
        <?php if (is_array($list)): foreach ($list as $key => $value): ?>
           <?php if ($value == 'H'): ?>
               <?php break; ?>
           <?php endif; ?>
           <?php echo $value; ?>
        <?php $index++; ?>
        <?php endforeach; endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## ontinue 标签


``` php
public function testContinue(): void
{
    $parser = $this->createParser();

    $source = <<<'eot'
        <list for=list>
           <if condition="$value eq 'H'">
               <continue/>
           </if>
           {$value}
        </list>
        eot;

    $compiled = <<<'eot'
        <?php $index = 1; ?>
        <?php if (is_array($list)): foreach ($list as $key => $value): ?>
           <?php if ($value == 'H'): ?>
               <?php continue; ?>
           <?php endif; ?>
           <?php echo $value; ?>
        <?php $index++; ?>
        <?php endforeach; endif; ?>
        eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
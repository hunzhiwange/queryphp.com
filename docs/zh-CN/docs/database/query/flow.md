# 查询语言.flow

::: tip 单元测试即文档
[基于原始文档 tests/Database/Query/FlowTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/FlowTest.php)
:::
    
QueryPHP 数据构造器支持条件运算符，可以根据不同条件做不同的事情，支持所有的构造器函数，即返回 `$this`。

**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## limit 限制条数

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` WHERE `test`.`id` = 2 ORDER BY `test`.`name` DESC LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $id = 2;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->elif(4 === $id)
                ->where('id', 4)
                ->fi()
                ->findOne(true)
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` WHERE `test`.`id` = 1 LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $id = 1;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->elif(4 === $id)
                ->where('id', 4)
                ->fi()
                ->findOne(true),
            1
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` WHERE `test`.`id` = 3 AND `test`.`id` = 1111 LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $id = 3;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->elif(4 === $id)
                ->where('id', 4)
                ->fi()
                ->findOne(true),
            2
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` WHERE `test`.`id` = 4 LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $id = 4;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->elif(4 === $id)
                ->where('id', 4)
                ->fi()
                ->findOne(true),
            3
        )
    );
}
```
    
## else 浅记忆

else 仅仅能记忆上一次 if,elif 的结果，上一次的反向结果就是 else 的条件值，我们建议不要在 SQL 链式中使用过度的条件判断。

``` php
public function testElse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` WHERE `test`.`id` = 2 AND `test`.`id` = 4 ORDER BY `test`.`name` DESC LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $id = 2;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->else() // else 仅仅能记忆上一次 if,elif 的结果，上一次的反向结果就是 else 的条件值,其等价于 elif($id != 3)
                ->where('id', 4)
                ->fi()
                ->findOne(true)
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` WHERE `test`.`id` = 3 AND `test`.`id` = 1111 LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $id = 3;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->else() // else 仅仅能记忆上一次 if,elif 的结果，上一次的反向结果就是 else 的条件值,其等价于 elif($id != 3)
                ->where('id', 4)
                ->fi()
                ->findOne(true),
            1
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` WHERE `test`.`id` = 4 LIMIT 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $id = 5;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->else() // else 仅仅能记忆上一次 if,elif 的结果，上一次的反向结果就是 else 的条件值,其等价于 elif($id != 3)
                ->where('id', 4)
                ->fi()
                ->findOne(true),
            2
        )
    );
}
```
    
::: tip
命令遵循 shell 命令风格，即 if,elif,else,fi。
:::
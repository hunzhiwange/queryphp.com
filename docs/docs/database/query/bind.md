# Query lang.bind

::: tip Testing Is Documentation
[tests/Database/Query/BindTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/BindTest.php)
:::
    
**Uses**

 * use PDO;
 * use Tests\Database\DatabaseTestCase as TestCase;

## 命名参数绑定

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :id",
            {
                "id": [
                    1,
                    2
                ]
            },
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->bind('id', 1)
                ->where('id', '=', '[:id]')
                ->findAll(true)
        )
    );
}
```
    
## 命名参数绑定，支持绑定类型

``` php
public function testBindWithType(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :id",
            {
                "id": [
                    1,
                    1
                ]
            },
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->bind('id', 1, PDO::PARAM_INT)
                ->where('id', '=', '[:id]')
                ->findAll(true),
            1
        )
    );
}
```
    
## 命名参数绑定，绑定值支持类型定义

``` php
public function testWithTypeAndValueCanBeArray(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :id",
            {
                "id": [
                    1,
                    1
                ]
            },
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->bind('id', [1, PDO::PARAM_INT])
                ->where('id', '=', '[:id]')
                ->findAll(true),
            2
        )
    );
}
```
    
## 命名参数绑定，支持多个字段绑定

``` php
public function testNameBind(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :id AND `test_query`.`hello` LIKE :name",
            {
                "id": [
                    1,
                    1
                ],
                "name": [
                    "小鸭子",
                    2
                ]
            },
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->bind(['id' => [1, PDO::PARAM_INT], 'name'=>'小鸭子'])
                ->where('id', '=', '[:id]')
                ->where('hello', 'like', '[:name]')
                ->findAll(true),
            3
        )
    );
}
```
    
## 问号 `?` 参数绑定，支持多个字段绑定

``` php
public function testQuestionMarkBind(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = ? AND `test_query`.`hello` LIKE ?",
            [
                [
                    5,
                    1
                ],
                [
                    "小鸭子",
                    2
                ]
            ],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->bind([[5, PDO::PARAM_INT], '小鸭子'])
                ->where('id', '=', '[?]')
                ->where('hello', 'like', '[?]')
                ->findAll(true),
            4
        )
    );
}
```
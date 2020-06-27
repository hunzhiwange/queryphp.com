# 替换实体

::: tip Testing Is Documentation
[tests/Database/Ddd/Replace/ReplaceTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Replace/ReplaceTest.php)
:::
    
尝试更新（没有则新增）实体，将实体变更持久化到数据库。

**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\CompositeId;
use Tests\Database\Ddd\Entity\DemoEntity;
```

## replace 尝试更新（没有则新增）实体

**完整例子**

``` php
$entity = new DemoEntity(['id' => 1]);
$entity->name = 'foo';
$entity->replace()->flush();
```

调用 `replace` 方法并没有立刻真正持久化到数据库，这一个步骤计算好了待保存的数据。

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;

class DemoEntity extends Entity
{
    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            self::READONLY => true,
        ],
        'name' => [],
    ];

    private array $data = [];

    private static ?string $connect = null;

    public function setter(string $prop, $value): self
    {
        $this->data[$this->realProp($prop)] = $value;

        return $this;
    }

    public function getter(string $prop)
    {
        return $this->data[$this->realProp($prop)] ?? null;
    }

    public static function withConnect(?string $connect = null): void
    {
        static::$connect = $connect;
    }

    public static function connect(): ?string
    {
        return static::$connect;
    }
}
```


``` php
public function testBaseUse(): void
{
    $entity = new DemoEntity(['id' => 1]);
    $entity->name = 'foo';

    $this->assertInstanceof(Entity::class, $entity);
    $this->assertSame(1, $entity->id);
    $this->assertSame('foo', $entity->name);
    $this->assertSame(['id', 'name'], $entity->changed());
    $this->assertNull($entity->flushData());
    $entity->replace();

    $data = <<<'eot'
        [
            {
                "id": 1,
                "name": "foo"
            }
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );
}
```
    
::: tip
通过 replace 方法尝试更新（没有则新增）一个实体，并通过 flush 将实体持久化到数据库。
:::
    
## replace 尝试更新（没有则新增）实体新增例子

``` php
public function testReplaceBaseUseCreate(): void
{
    $entity = new DemoEntity(['id' => 1]);
    $entity->name = 'foo';

    $this->assertInstanceof(Entity::class, $entity);
    $this->assertSame(1, $entity->id);
    $this->assertSame('foo', $entity->name);
    $this->assertSame(['id', 'name'], $entity->changed());
    $this->assertNull($entity->flushData());
    $entity->replace();

    $data = <<<'eot'
        [
            {
                "id": 1,
                "name": "foo"
            }
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );

    $this->assertSame(1, $entity->flush());
    $entity->refresh();
    $this->assertSame(1, $entity->id);
    $this->assertSame('foo', $entity->name);
}
```
    
## replace 尝试更新（没有则新增）实体更新例子

``` php
public function testReplaceBaseUseUpdate(): void
{
    $connect = $this->createDatabaseConnect();
    $this->assertSame(
        1,
        $connect
            ->table('test')
            ->insert([
                'id'       => 1,
                'name'     => 'old',
            ]));

    $entity = new DemoEntity(['id' => 1]);
    $entity->name = 'foo';

    $this->assertInstanceof(Entity::class, $entity);
    $this->assertSame(1, $entity->id);
    $this->assertSame('foo', $entity->name);
    $this->assertSame(['id', 'name'], $entity->changed());
    $this->assertNull($entity->flushData());
    $entity->replace();

    $data = <<<'eot'
        [
            {
                "id": 1,
                "name": "foo"
            }
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );

    $this->assertSame(1, $entity->flush());
    $entity->refresh();
    $this->assertSame(1, $entity->id);
    $this->assertSame('foo', $entity->name);
}
```
    
## replace 尝试更新（没有则新增）快捷方式，记录存在但是不存在更新数据不作任何处理

这里和单纯的更新不一样，单纯的更新不存在更新数据，则会抛出异常。


``` php
public function testReplaceWithCompositeIdButNoDataToBeUpdate(): void
{
    $connect = $this->createDatabaseConnect();
    $this->assertSame(
        1,
        $connect
            ->table('composite_id')
            ->insert([
                'id1'     => 2,
                'id2'     => 3,
            ]));

    $entity = new CompositeId();
    $entity->replace(['id1' => 2, 'id2' => 3]);

    $data = <<<'eot'
        [
            {
                "id1": 2,
                "id2": 3
            }
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );

    $entity->flush();

    $sql = '[FAILED] SQL: [125] INSERT INTO `composite_id` (`composite_id`.`id1`,`composite_id`.`id2`) VALUES (:pdonamedparameter_id1,:pdonamedparameter_id2) | Params:  2 | Key: Name: [22] :pdonamedparameter_id1 | paramno=0 | name=[22] ":pdonamedparameter_id1" | is_param=1 | param_type=1 | Key: Name: [22] :pdonamedparameter_id2 | paramno=1 | name=[22] ":pdonamedparameter_id2" | is_param=1 | param_type=1 (INSERT INTO `composite_id` (`composite_id`.`id1`,`composite_id`.`id2`) VALUES (2,3))';
    $this->assertSame($sql, $entity->select()->getLastSql());
}
```
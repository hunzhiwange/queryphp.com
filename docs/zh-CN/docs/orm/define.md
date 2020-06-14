# 实体常量

::: tip Testing Is Documentation
[tests/Database/Ddd/EntityDefineTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/EntityDefineTest.php)
:::
    
实体初始化会校验一些必须定义的常量 `const`，这是实体对应的数据库表的一些映射，这简化了 ORM 底层后续处理逻辑。


**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\DemoEntity;
```

## 基本常量

**基础常量**

常量 `TABLE`,`ID`,`AUTO` 和 `STRUCT` 是每一个实体必须要定义的，否则会抛出异常。

 * TABLE 数据库表名，例如 `test`
 * ID 主键字段，例如 `null`,`id` 和 `['id1', 'id2']`
 * AUTO 自增字段，例如 `null` 和 `id`
 * STRUCT 数据库字段 `['id' => [self::READONLY => true], 'name' => []]`

**测试模型**

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
``


``` php
public function testBaseUse(): void
{
    $entity = new DemoEntity();

    $this->assertInstanceof(Entity::class, $entity);

    $this->assertSame(DemoEntity::STRUCT, $entity->fields());
    $this->assertSame(DemoEntity::TABLE, $entity->table());
    $this->assertSame((array) DemoEntity::ID, $entity->primaryKeys());
    $this->assertSame(DemoEntity::AUTO, $entity->autoIncrement());
}
```
    
## 基本常量未定义将会抛出异常

**测试模型**

``` php
namespace Tests\Database\Ddd;

class Test1Entity extends Entity
{
    private static $leevelConnect;

    public function setter(string $prop, $value): self
    {
        $this->{$this->realProp($prop)} = $value;

        return $this;
    }

    public function getter(string $prop)
    {
        return $this->{$this->realProp($prop)};
    }

    public static function withConnect(?string $connect = null): void
    {
        static::$leevelConnect = $connect;
    }

    public static function connect(): ?string
    {
        return static::$leevelConnect;
    }
}
``


``` php
public function testConstDefined(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('The entity const TABLE was not defined.');

    $entity = new Test1Entity();
}
```
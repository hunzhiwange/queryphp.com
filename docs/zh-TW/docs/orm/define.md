# 实体常量

::: tip Testing Is Documentation
[tests/Database/Ddd/EntityDefineTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/EntityDefineTest.php)
:::
    
实体初始化会校验一些必须定义的常量 `const`，这是实体对应的数据库表的一些映射，这简化了 ORM 底层后续处理逻辑。


**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;
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
use Leevel\Database\Ddd\GetterSetter;

class DemoEntity extends Entity
{
    use GetterSetter;

    public const TABLE = 'test';

    public const ID = 'id';

    public const AUTO = 'id';

    public const STRUCT = [
        'id' => [
            self::READONLY => true,
        ],
        'name' => [],
    ];
}
```


``` php
public function testBaseUse(): void
{
    $entity = new DemoEntity();

    $this->assertInstanceof(Entity::class, $entity);

    $this->assertSame(DemoEntity::STRUCT, $entity->fields());
    $this->assertSame(DemoEntity::TABLE, $entity->table());
    $this->assertSame([DemoEntity::ID], $entity->primaryKey());
    $this->assertSame(DemoEntity::AUTO, $entity->autoIncrement());
}
```
    
## 基本常量未定义将会抛出异常

**测试模型**

``` php
namespace Tests\Database\Ddd;

class Test1Entity extends Entity
{
    use GetterSetter;
}
```


``` php
public function testConstDefined(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('The entity const TABLE was not defined.');

    $entity = new Test1Entity();
}
```
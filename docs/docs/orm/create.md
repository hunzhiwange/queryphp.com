# 保存实体

::: tip Testing Is Documentation
[tests/Database/Ddd/Create/CreateTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Create/CreateTest.php)
:::
    
将实体持久化到数据库。

**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\CompositeId;
use Tests\Database\Ddd\Entity\DemoConstructPropBlackEntity;
use Tests\Database\Ddd\Entity\DemoConstructPropWhiteEntity;
use Tests\Database\Ddd\Entity\DemoCreateAutoFillEntity;
use Tests\Database\Ddd\Entity\DemoCreatePropWhiteEntity;
use Tests\Database\Ddd\Entity\DemoDatabaseEntity;
use Tests\Database\Ddd\Entity\DemoEntity;
```

## save 创建一个实体

没有主键数据，则可以通过 `save` 方法创建一个实体。

**完整例子**

``` php
$entity = new DemoEntity();
$entity->name = 'foo';
$entity->save()->flush();
```

调用 `save` 方法并没有立刻真正持久化到数据库，这一个步骤计算好了待保存的数据。

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class DemoEntity extends Entity
{
    use GetterSetter;

    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
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
    $entity->name = 'foo';

    $this->assertInstanceof(Entity::class, $entity);
    $this->assertSame('foo', $entity->name);
    $this->assertSame(['name'], $entity->changed());
    $this->assertNull($entity->flushData());

    $entity->save();

    $data = <<<'eot'
        [
            {
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
通过 save 方法保存一个实体，并通过 flush 将实体持久化到数据库。
:::
    
## create 创建一个实体

``` php
public function testCreateBaseUse(): void
{
    $entity = new DemoEntity();
    $entity->name = 'foo';

    $this->assertInstanceof(Entity::class, $entity);
    $this->assertSame('foo', $entity->name);
    $this->assertSame(['name'], $entity->changed());

    $this->assertNull($entity->flushData());

    $entity->create();

    $data = <<<'eot'
        [
            {
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
通过 create 方法保存一个实体，并通过 flush 将实体持久化到数据库。
:::
    
## 创建一个实体支持构造器白名单

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class DemoConstructPropWhiteEntity extends Entity
{
    use GetterSetter;

    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            self::READONLY             => true,
            self::CONSTRUCT_PROP_WHITE => true,
        ],
        'name' => [],
    ];
}
```

调用 `\Leevel\Database\Ddd\Entity::CONSTRUCT_PROP_WHITE => true` 来设置字段白名单，一旦设置了构造器白名单只有通过了白名单的字段才能够更新模型属性。


``` php
public function testConsturctPropWhite(): void
{
    $entity = new DemoConstructPropWhiteEntity([
        'id'   => 5,
        'name' => 'foo',
    ]);

    $this->assertSame(5, $entity->getId());
    $this->assertNull($entity->getName());
}
```
    
## 创建一个实体支持构造器黑名单

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class DemoConstructPropBlackEntity extends Entity
{
    use GetterSetter;

    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            self::READONLY             => true,
            self::CONSTRUCT_PROP_BLACK => true,
        ],
        'name' => [],
    ];
}
```

调用 `\Leevel\Database\Ddd\Entity::CONSTRUCT_PROP_BLACK => true` 来设置字段黑名单，一旦设置了构造器黑名单处于黑名单的字段无法更新模型属性。


``` php
public function testConsturctPropBlack(): void
{
    $entity = new DemoConstructPropBlackEntity([
        'id'   => 5,
        'name' => 'foo',
    ]);

    $this->assertNull($entity->getId());
    $this->assertSame('foo', $entity->getName());
}
```
    
## 创建一个实体支持创建属性白名单

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class DemoCreatePropWhiteEntity extends Entity
{
    use GetterSetter;

    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            self::READONLY => true,
        ],
        'name' => [
            self::CREATE_PROP_WHITE => true,
        ],
        'description' => [],
    ];
}
```

调用 `\Leevel\Database\Ddd\Entity::CREATE_PROP_WHITE => true` 来设置字段白名单，一旦设置了创建属性白名单只有通过了白名单的字段才能够更新模型属性。


``` php
public function testSavePropBlackAndWhite(): void
{
    $entity = new DemoCreatePropWhiteEntity([
        'name'        => 'foo',
        'description' => 'hello description',
    ]);
    $entity->save();

    $data = <<<'eot'
        [
            {
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
    
## fill 设置允许自动填充字段

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class DemoCreateAutoFillEntity extends Entity
{
    use GetterSetter;

    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            self::READONLY => true,
        ],
        'name' => [
            self::CREATE_FILL       => 'name for '.self::CREATE_FILL,
        ],
        'description' => [
            self::CREATE_FILL   => null,
        ],
        'address' => [
            self::CREATE_FILL    => null,
        ],
        'foo_bar' => [
            self::CREATE_FILL    => null,
        ],
        'hello' => [
            self::CREATE_FILL      => null,
        ],
    ];

    protected function fillDescription($old): string
    {
        return 'set description.';
    }

    protected function fillAddress($old): string
    {
        return 'address is set now.';
    }

    protected function fillFooBar($old): string
    {
        return 'foo bar.';
    }

    protected function fillHello($old): string
    {
        return 'hello field.';
    }
}
```


``` php
public function testCreateAutoFill(): void
{
    $entity = new DemoCreateAutoFillEntity();
    $entity
        ->fill()
        ->create();

    $data = <<<'eot'
        [
            []
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
默认情况下，不会自动填充，除非指定允许填充字段。
:::
    
## fillAll 设置允许自动填充字段为所有字段

``` php
public function testAutoFillWithAll(): void
{
    $entity = new DemoCreateAutoFillEntity();
    $entity
        ->fillAll()
        ->save();

    $data = <<<'eot'
        [
            {
                "name": "name for create_fill",
                "description": "set description.",
                "address": "address is set now.",
                "foo_bar": "foo bar.",
                "hello": "hello field."
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
    
## fill 设置允许自动填充字段指定字段例子

``` php
public function testAutoFillWithCustomField(): void
{
    $entity = new DemoCreateAutoFillEntity();
    $entity
        ->fill(['address'])
        ->save();

    $data = <<<'eot'
        [
            {
                "address": "address is set now."
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
    
## save 自动判断操作快捷方式支持添加数据

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class DemoDatabaseEntity extends Entity
{
    use GetterSetter;

    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            self::READONLY => true,
        ],
        'name'      => [],
        'create_at' => [],
    ];
}
```


``` php
public function testSaveWithProp(): void
{
    $entity = new DemoDatabaseEntity();
    $entity->save(['name' => 'hello']);

    $data = <<<'eot'
        [
            {
                "name": "hello"
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
    
## create 新增快捷方式支持添加数据

``` php
public function testCreateWithProp(): void
{
    $entity = new DemoDatabaseEntity();
    $entity->create(['name' => 'hello']);

    $data = <<<'eot'
        [
            {
                "name": "hello"
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
# 保存实体

将实体持久化到数据库。

**引入相关类**

 * use Leevel\Database\Ddd\Entity;
 * use Tests\Database\DatabaseTestCase as TestCase;
 * use Tests\Database\Ddd\Entity\TestConstructPropBlackEntity;
 * use Tests\Database\Ddd\Entity\TestConstructPropWhiteEntity;
 * use Tests\Database\Ddd\Entity\TestCreateAutoFillEntity;
 * use Tests\Database\Ddd\Entity\TestCreatePropWhiteEntity;
 * use Tests\Database\Ddd\Entity\TestEntity;
## 创建一个实体

_**完整例子**_


``` php
$entity = new TestEntity();
$entity->name = 'foo';
$entity->save()->flush();
```


调用 `save` 方法并没有立刻真正持久化到数据库，这一个步骤计算好了待保存的数据。


``` php
public function testBaseUse()
{
    $entity = new TestEntity();

    $this->assertInstanceof(Entity::class, $entity);

    $entity->name = 'foo';

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
    
## 创建一个实体支持构造器白名单

_**完整模型**_


``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\IEntity;

class TestConstructPropWhiteEntity extends Entity
{
    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            'readonly'             => true,
            'construct_prop_white' => true,
        ],
        'name' => [],
    ];

    private $id;

    private $name;

    public function setter(string $prop, $value): IEntity
    {
        $this->{$this->prop($prop)} = $value;

        return $this;
    }

    public function getter(string $prop)
    {
        return $this->{$this->prop($prop)};
    }
}
```


调用 `construct_prop_white => true` 来设置字段白名单，一旦设置了白名单只有通过了白名单的数据才能够通过构造器更新模型属性。


``` php
public function testConsturctPropWhite()
{
    $entity = new TestConstructPropWhiteEntity([
        'id'   => 5,
        'name' => 'foo',
    ]);

    $this->assertSame(5, $entity->getterId());
    $this->assertNull($entity->getterName());
}
```
    

## 创建一个实体支持构造器黑名单

_**完整模型**_


``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\IEntity;

class TestConstructPropBlackEntity extends Entity
{
    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            'readonly'             => true,
            'construct_prop_black' => true,
        ],
        'name' => [],
    ];

    private $id;

    private $name;

    public function setter(string $prop, $value): IEntity
    {
        $this->{$this->prop($prop)} = $value;

        return $this;
    }

    public function getter(string $prop)
    {
        return $this->{$this->prop($prop)};
    }
}
```


调用 `construct_prop_black => true` 来设置字段黑名单，一旦设置了黑名单处于黑名单的数据无法通过构造器更新模型属性。


``` php
public function testConsturctPropBlack()
{
    $entity = new TestConstructPropBlackEntity([
        'id'   => 5,
        'name' => 'foo',
    ]);

    $this->assertNull($entity->getterId());
    $this->assertSame('foo', $entity->getterName());
}
```
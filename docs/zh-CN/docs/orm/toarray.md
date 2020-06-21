# 实体导出数组

::: tip Testing Is Documentation
[tests/Database/Ddd/EntityToArrayTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/EntityToArrayTest.php)
:::
    
我们可以将实体导出为数组来方便处理数据。


**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\DemoToArrayBlackEntity;
use Tests\Database\Ddd\Entity\DemoToArrayEntity;
use Tests\Database\Ddd\Entity\DemoToArrayShowPropNullEntity;
use Tests\Database\Ddd\Entity\DemoToArrayShowPropNullRelationEntity;
use Tests\Database\Ddd\Entity\DemoToArrayShowPropNullRelationTargetEntity;
use Tests\Database\Ddd\Entity\DemoToArrayWhiteEntity;
use Tests\Database\Ddd\Entity\Relation\Post;
use Tests\Database\Ddd\Entity\Relation\User;
```

## toArray 基本使用方法

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeEntity
protected function makeEntity(): DemoToArrayEntity
{
    $entity = new DemoToArrayEntity();
    $this->assertInstanceof(Entity::class, $entity);
    $entity->name = '实体名字';
    $entity->description = 'goods name';
    $entity->address = '四川成都';
    $entity->foo_bar = 'foo';
    $entity->hello = 'hello world';

    return $entity;
}
```

**Tests\Database\Ddd\Entity\DemoToArrayEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;

class DemoToArrayEntity extends Entity
{
    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'          => [],
        'name'        => [],
        'description' => [],
        'address'     => [],
        'foo_bar'     => [],
        'hello'       => [],
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
    $entity = $this->makeEntity();

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name",
            "address": "四川成都",
            "foo_bar": "foo",
            "hello": "hello world"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```
    
## toArray 实体对象转数组支持白名单

`toArray` 第一个参数为白名单，设置了白名单，只有白名单的字段才能够转换为数组数据。


``` php
public function testWithWhite(): void
{
    $entity = $this->makeEntity();

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name",
            "address": "四川成都",
            "foo_bar": "foo",
            "hello": "hello world"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );

    $data = <<<'eot'
        {
            "name": "实体名字"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray(['name']),
            1
        )
    );

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray(['name', 'description']),
            2
        )
    );

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name",
            "hello": "hello world"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray(['name', 'description', 'hello']),
            3
        )
    );
}
```
    
## toArray 实体对象转数组支持黑名单

`toArray` 第二个参数为白名单，设置了黑名单但是没有设置白名单，只有不属于黑名单的字段才能够转换为数组数据。


``` php
public function testWithBlack(): void
{
    $entity = $this->makeEntity();

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name",
            "address": "四川成都",
            "foo_bar": "foo",
            "hello": "hello world"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );

    $data = <<<'eot'
        {
            "description": "goods name",
            "address": "四川成都",
            "foo_bar": "foo",
            "hello": "hello world"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray([], ['name']),
            1
        )
    );

    $data = <<<'eot'
        {
            "address": "四川成都",
            "foo_bar": "foo",
            "hello": "hello world"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray([], ['name', 'description']),
            2
        )
    );

    $data = <<<'eot'
        {
            "description": "goods name",
            "hello": "hello world"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray([], ['foo_bar', 'name', 'address']),
            3
        )
    );
}
```
    
## toArray 实体对象转数组支持字段设置为白名单

可以通过 `STRUCT` 中的定义 `\Leevel\Database\Ddd\Entity::SHOW_PROP_WHITE` 来设置字段白名单。

值得注意的是， `toArray` 的第一个参数白名单优先级更高。

如果设置了白名单，只有白名单的字段才能够转换为数组数据。

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeWhiteEntity
protected function makeWhiteEntity(): DemoToArrayWhiteEntity
{
    $entity = new DemoToArrayWhiteEntity();
    $this->assertInstanceof(Entity::class, $entity);
    $entity->name = '实体名字';
    $entity->description = 'goods name';
    $entity->address = '四川成都';
    $entity->foo_bar = 'foo';
    $entity->hello = 'hello world';

    return $entity;
}
```

**Tests\Database\Ddd\Entity\DemoToArrayWhiteEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;

class DemoToArrayWhiteEntity extends Entity
{
    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'          => [],
        'name'        => [],
        'description' => [
            self::SHOW_PROP_WHITE => true,
        ],
        'address'     => [],
        'foo_bar'     => [
            self::SHOW_PROP_WHITE => true,
        ],
        'hello'       => [],
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
public function testWithWhiteEntity(): void
{
    $entity = $this->makeWhiteEntity();

    $data = <<<'eot'
        {
            "description": "goods name",
            "foo_bar": "foo"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```
    
## toArray 实体对象转数组支持字段设置为黑名单

可以通过 `STRUCT` 中的定义 `\Leevel\Database\Ddd\Entity::SHOW_PROP_BLACK` 来设置字段黑名单。

值得注意的是， `toArray` 的第二个参数黑名单优先级更高。

如果设置了黑名单，设置了黑名单但是没有设置白名单，只有不属于黑名单的字段才能够转换为数组数据。

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeBlackEntity
protected function makeBlackEntity(): DemoToArrayBlackEntity
{
    $entity = new DemoToArrayBlackEntity();
    $this->assertInstanceof(Entity::class, $entity);
    $entity->name = '实体名字';
    $entity->description = 'goods name';
    $entity->address = '四川成都';
    $entity->foo_bar = 'foo';
    $entity->hello = 'hello world';

    return $entity;
}
```

**Tests\Database\Ddd\Entity\DemoToArrayBlackEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;

class DemoToArrayBlackEntity extends Entity
{
    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'          => [],
        'name'        => [],
        'description' => [
            self::SHOW_PROP_BLACK => true,
        ],
        'address'     => [],
        'foo_bar'     => [
            self::SHOW_PROP_BLACK => true,
        ],
        'hello'       => [],
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
public function testWithBlackEntity(): void
{
    $entity = $this->makeBlackEntity();

    $data = <<<'eot'
        {
            "name": "实体名字",
            "address": "四川成都",
            "hello": "hello world"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```
    
## toArray 实体对象转数组支持转换关联实体数据

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeRelationEntity
protected function makeRelationEntity(): Post
{
    $user = new User(['id' => 7]);
    $user->name = 'xiaoniuge';

    $entity = new Post(['id' => 5]);
    $this->assertInstanceof(Post::class, $entity);
    $entity->title = 'I am title';
    $entity->summary = 'I am summary';
    $entity->userId = 7;
    $entity->withRelationProp('user', $user);

    return $entity;
}
```

**Tests\Database\Ddd\Entity\Relation\User**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Relation\ManyMany;

class User extends Entity
{
    const TABLE = 'user';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'        => [],
        'name'      => [],
        'create_at' => [],
        'role'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_soft_deleted'      => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_middle_with_soft_deleted'      => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'withSoftDeleted',
        ],
        'role_middle_only_soft_deleted'      => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'onlySoftDeleted',
        ],
        'role_relation_scope_not_found'      => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'notFound',
        ],
        'role_relation_scope_found_but_private'      => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'foundButPrivate',
        ],
        'role_not_defined_middle_entity'      => [
            self::MANY_MANY         => Role::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_not_defined_source_key'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_not_defined_target_key'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::SOURCE_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_not_defined_middle_source_key'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_TARGET_KEY => 'role_id',
        ],
        'role_not_defined_middle_target_key'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
        ],
        'role_middle_field'      => [
            self::MANY_MANY         => Role::class,
            self::MIDDLE_ENTITY     => UserRole::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'middleField',
        ],
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

    protected function relationScopeWithSoftDeleted(ManyMany $relation): void
    {
        $relation->middleWithSoftDeleted();
    }

    protected function relationScopeOnlySoftDeleted(ManyMany $relation): void
    {
        $relation->middleOnlySoftDeleted();
    }

    protected function relationScopeMiddleField(ManyMany $relation): void
    {
        $relation->middleField(['create_at', 'middle_id' => 'id']);
    }

    private function relationScopeFoundButPrivate(ManyMany $relation): void
    {
    }
}
```

**Tests\Database\Ddd\Entity\Relation\Post**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Relation\Relation;

class Post extends Entity
{
    const TABLE = 'post';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            self::READONLY           => true,
        ],
        'title'     => [],
        'user_id'   => [],
        'summary'   => [],
        'create_at' => [],
        'delete_at' => [
            self::CREATE_FILL => 0,
        ],
        'user'      => [
            self::BELONGS_TO     => User::class,
            self::SOURCE_KEY     => 'user_id',
            self::TARGET_KEY     => 'id',
        ],
        'comment' => [
            self::HAS_MANY          => Comment::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'post_id',
            self::RELATION_SCOPE    => 'comment',
        ],
        'post_content' => [
            self::HAS_ONE     => PostContent::class,
            self::SOURCE_KEY  => 'id',
            self::TARGET_KEY  => 'post_id',
        ],
        'user_not_defined_source_key'      => [
            self::BELONGS_TO     => User::class,
            self::TARGET_KEY     => 'id',
        ],
        'user_not_defined_target_key'      => [
            self::BELONGS_TO     => User::class,
            self::SOURCE_KEY     => 'id',
        ],
        'comment_not_defined_source_key' => [
            self::HAS_MANY          => Comment::class,
            self::TARGET_KEY        => 'post_id',
            self::RELATION_SCOPE    => 'comment',
        ],
        'comment_not_defined_target_key' => [
            self::HAS_MANY          => Comment::class,
            self::SOURCE_KEY        => 'id',
            self::RELATION_SCOPE    => 'comment',
        ],
        'post_content_not_defined_source_key' => [
            self::HAS_ONE     => PostContent::class,
            self::TARGET_KEY  => 'post_id',
        ],
        'post_content_not_defined_target_key' => [
            self::HAS_ONE     => PostContent::class,
            self::SOURCE_KEY  => 'id',
        ],
    ];

    const DELETE_AT = 'delete_at';

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

    protected function relationScopeComment(Relation $relation): void
    {
        $relation->where('id', '>', 4);
    }
}
```


``` php
public function testWithRelation(): void
{
    $entity = $this->makeRelationEntity();

    $data = <<<'eot'
        {
            "id": 5,
            "title": "I am title",
            "user_id": 7,
            "summary": "I am summary",
            "user": {
                "id": 7,
                "name": "xiaoniuge"
            }
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```
    
## toArray 实体对象转数组支持转换关联实体数据（黑白名单）

`toArray` 第三个参数为关联实体的黑白名单。


``` php
public function testWithRelationWhiteAndBlack(): void
{
    $entity = $this->makeRelationEntity();

    $data = <<<'eot'
        {
            "id": 5,
            "title": "I am title",
            "user_id": 7,
            "summary": "I am summary",
            "user": {
                "name": "xiaoniuge"
            }
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray([], [], ['user' => [['name']]])
        )
    );
}
```
    
## toArray 实体对象转数组支持 NULL 值字段默认指定数据

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeShowPropNullEntity
protected function makeShowPropNullEntity(): DemoToArrayShowPropNullEntity
{
    $entity = new DemoToArrayShowPropNullEntity();
    $this->assertInstanceof(Entity::class, $entity);
    $entity->name = '实体名字';
    $entity->description = 'goods name';

    return $entity;
}
```

**Tests\Database\Ddd\Entity\DemoToArrayShowPropNullEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;

class DemoToArrayShowPropNullEntity extends Entity
{
    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'          => [],
        'name'        => [],
        'description' => [],
        'address'     => [
            self::SHOW_PROP_NULL => '',
        ],
        'foo_bar'     => [
            self::SHOW_PROP_NULL => null,
        ],
        'hello'       => [
            self::SHOW_PROP_NULL => 'default_value',
        ],
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
public function testWithShowPropNull(): void
{
    $entity = $this->makeShowPropNullEntity();

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name",
            "address": "",
            "foo_bar": null,
            "hello": "default_value"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```
    
## toArray 实体对象转数组支持 NULL 值字段默认指定数据（关联模型）

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeRelationShowPropNullEntity
protected function makeRelationShowPropNullEntity(): DemoToArrayShowPropNullRelationEntity
{
    $target = new DemoToArrayShowPropNullRelationTargetEntity(['id' => 5]);
    $target->name = 'xiaoniuge';

    $entity = new DemoToArrayShowPropNullRelationEntity(['id' => 5]);
    $this->assertInstanceof(DemoToArrayShowPropNullRelationEntity::class, $entity);
    $entity->name = 'I am name';
    $entity->description = 'I am description';
    $entity->withRelationProp('target', $target);

    return $entity;
}
```

**Tests\Database\Ddd\Entity\DemoToArrayShowPropNullRelationTargetEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;

class DemoToArrayShowPropNullRelationTargetEntity extends Entity
{
    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'          => [],
        'name'        => [],
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

**Tests\Database\Ddd\Entity\DemoToArrayShowPropNullRelationEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;

class DemoToArrayShowPropNullRelationEntity extends Entity
{
    const TABLE = 'test';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'          => [],
        'name'        => [],
        'description' => [],
        'address'     => [
            self::SHOW_PROP_NULL => '',
        ],
        'foo_bar'     => [
            self::SHOW_PROP_NULL => null,
        ],
        'hello'       => [
            self::SHOW_PROP_NULL => 'default_value',
        ],
        'target' => [
            self::HAS_ONE     => DemoToArrayShowPropNullRelationTargetEntity::class,
            self::SOURCE_KEY  => 'id',
            self::TARGET_KEY  => 'id',
        ],
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
public function testWithShowPropNullForRelation(): void
{
    $entity = $this->makeRelationShowPropNullEntity();

    $data = <<<'eot'
        {
            "id": 5,
            "name": "I am name",
            "description": "I am description",
            "address": "",
            "foo_bar": null,
            "hello": "default_value",
            "target": {
                "id": 5,
                "name": "xiaoniuge"
            }
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```
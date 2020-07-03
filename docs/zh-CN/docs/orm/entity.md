# 实体

::: tip Testing Is Documentation
[tests/Database/Ddd/EntityTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/EntityTest.php)
:::
    
实体是整个系统最为核心的基本单位，实体封装了一些常用的功能。


**Uses**

``` php
<?php

use I18nMock;
use Leevel\Di\Container;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\CompositeId;
use Tests\Database\Ddd\Entity\DemoPropErrorEntity;
use Tests\Database\Ddd\Entity\DemoVersion;
use Tests\Database\Ddd\Entity\EntityWithEnum;
use Tests\Database\Ddd\Entity\EntityWithEnum2;
use Tests\Database\Ddd\Entity\EntityWithInvalidEnum;
use Tests\Database\Ddd\Entity\EntityWithoutPrimaryKey;
use Tests\Database\Ddd\Entity\Relation\Post;
use Tests\Database\Ddd\Entity\Relation\PostForReplace;
```

## withProps 批量设置属性数据

``` php
public function testWithProps(): void
{
    $entity = new Post();
    $entity->withProps([
        'title'   => 'foo',
        'summary' => 'bar',
    ]);

    $this->assertSame('foo', $entity->title);
    $this->assertSame('bar', $entity->summary);
    $this->assertSame(['title', 'summary'], $entity->changed());
}
```
    
## enum 获取枚举

**fixture 定义**

**Tests\Database\Ddd\Entity\EntityWithEnum**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class EntityWithEnum extends Entity
{
    use GetterSetter;

    const TABLE = 'entity_with_enum';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            self::READONLY           => true,
        ],
        'title'       => [],
        'status'      => [],
    ];

    const STATUS_ENUM = [
        'disable' => [0, '禁用'],
        'enable'  => [1, '启用'],
    ];
}
```


``` php
public function testEntityWithEnum(): void
{
    $this->initI18n();

    $entity = new EntityWithEnum([
        'title'   => 'foo',
        'status'  => '1',
    ]);

    $this->assertSame('foo', $entity->title);
    $this->assertSame('1', $entity->status);

    $data = <<<'eot'
        {
            "title": "foo"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray(['title'])
        )
    );

    $data = <<<'eot'
        {
            "title": "foo",
            "status": "1",
            "status_enum": "启用"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->toArray(),
            2
        )
    );

    $this->assertSame('启用', $entity->enum('status', '1'));
    $this->assertSame('禁用', $entity->enum('status', '0'));
    $this->assertFalse($entity->enum('not', '0'));
    $this->assertFalse($entity->enum('not'));

    $data = <<<'eot'
        [
            [
                0,
                "禁用"
            ],
            [
                1,
                "启用"
            ]
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->enum('status'),
            3
        )
    );
}
```
    
## enum 获取枚举字符例子

**fixture 定义**

**Tests\Database\Ddd\Entity\EntityWithEnum2**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class EntityWithEnum2 extends Entity
{
    use GetterSetter;

    const TABLE = 'entity_with_enum';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            self::READONLY           => true,
        ],
        'title'       => [],
        'status'      => [],
    ];

    const STATUS_ENUM = [
        'disable' => ['f', '禁用'],
        'enable'  => ['t', '启用'],
    ];
}
```


``` php
public function testEntityWithEnum2(): void
{
    $this->initI18n();

    $entity = new EntityWithEnum2([
        'title'   => 'foo',
        'status'  => 't',
    ]);

    $data = <<<'eot'
        [
            [
                "f",
                "禁用"
            ],
            [
                "t",
                "启用"
            ]
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->enum('status')
        )
    );
}
```
    
## hasChanged 检测属性是否已经改变

``` php
public function testHasChanged(): void
{
    $entity = new Post();
    $this->assertFalse($entity->hasChanged('title'));
    $entity->title = 'change';
    $this->assertTrue($entity->hasChanged('title'));
}
```
    
## addChanged 添加指定属性为已改变

``` php
public function testAddChanged(): void
{
    $entity = new Post();
    $data = <<<'eot'
        []
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->changed()
        )
    );

    $entity->addChanged(['user_id', 'title']);

    $data = <<<'eot'
        [
            "user_id",
            "title"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->changed(),
            1
        )
    );
}
```
    
## deleteChanged 删除已改变属性

``` php
public function testDeleteChanged(): void
{
    $entity = new Post();
    $data = <<<'eot'
        []
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->changed()
        )
    );

    $entity->addChanged(['user_id', 'title']);

    $data = <<<'eot'
        [
            "user_id",
            "title"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->changed(),
            1,
        )
    );

    $entity->deleteChanged(['user_id']);

    $data = <<<'eot'
        [
            "title"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->changed(),
            2,
        )
    );
}
```
    
## clearChanged 清空已改变属性

``` php
public function testClearChanged(): void
{
    $entity = new Post();
    $data = <<<'eot'
        []
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->changed()
        )
    );

    $entity->addChanged(['user_id', 'title']);

    $data = <<<'eot'
        [
            "user_id",
            "title"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->changed(),
            1,
        )
    );

    $entity->clearChanged(['user_id']);

    $data = <<<'eot'
        []
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $entity->changed(),
            2,
        )
    );
}
```
    
## singleId 返回供查询的主键字段值

``` php
public function testSingleId(): void
{
    $entity = new Post();
    $this->assertNull($entity->singleId());

    $entity = new Post(['id' => 5]);
    $this->assertSame(5, $entity->singleId());
}
```
    
## idCondition 获取查询主键条件

``` php
public function testIdCondition(): void
{
    $entity = new Post(['id' => 5]);
    $this->assertSame(['id' => 5], $entity->idCondition());
}
```
    
## 实体属性数组访问 ArrayAccess.offsetExists 支持

``` php
public function testArrayAccessOffsetExists(): void
{
    $entity = new Post(['id' => 5, 'title' => 'hello']);
    $this->assertTrue(isset($entity['title']));
    $this->assertFalse(isset($entity['user_id']));
}
```
    
## 实体属性数组访问 ArrayAccess.offsetSet 支持

``` php
public function testArrayAccessOffsetSet(): void
{
    $entity = new Post(['id' => 5]);
    $this->assertFalse(isset($entity['title']));
    $this->assertNull($entity->title);
    $entity['title'] = 'world';
    $this->assertTrue(isset($entity['title']));
    $this->assertSame('world', $entity->title);
}
```
    
## 实体属性数组访问 ArrayAccess.offsetGet 支持

``` php
public function testArrayAccessOffsetGet(): void
{
    $entity = new Post(['id' => 5]);
    $this->assertNull($entity['title']);
    $entity['title'] = 'world';
    $this->assertSame('world', $entity['title']);
}
```
    
## 实体属性数组访问 ArrayAccess.offsetUnset 支持

``` php
public function testArrayAccessOffsetUnset(): void
{
    $entity = new Post(['id' => 5]);
    $this->assertNull($entity['title']);
    $entity['title'] = 'world';
    $this->assertSame('world', $entity['title']);
    unset($entity['title']);
    $this->assertNull($entity['title']);
}
```
    
## 实体属性访问魔术方法 __isset 支持

``` php
public function testMagicIsset(): void
{
    $entity = new Post(['id' => 5, 'title' => 'hello']);
    $this->assertTrue(isset($entity->title));
    $this->assertFalse(isset($entity->userId));
}
```
    
## 实体属性访问魔术方法 __set 支持

``` php
public function testMagicSet(): void
{
    $entity = new Post(['id' => 5]);
    $this->assertFalse(isset($entity->title));
    $this->assertNull($entity->title);
    $entity->title = 'world';
    $this->assertTrue(isset($entity->title));
    $this->assertSame('world', $entity->title);
}
```
    
## 实体属性访问魔术方法 __get 支持

``` php
public function testMagicGet(): void
{
    $entity = new Post(['id' => 5]);
    $this->assertNull($entity->title);
    $entity->title = 'world';
    $this->assertSame('world', $entity->title);
}
```
    
## 实体属性访问魔术方法 __unset 支持

``` php
public function testMagicUnset(): void
{
    $entity = new Post(['id' => 5]);
    $this->assertNull($entity->title);
    $entity->title = 'world';
    $this->assertSame('world', $entity->title);
    unset($entity->title);
    $this->assertNull($entity->title);
}
```
    
## setter 设置属性值

``` php
public function testCallSetter(): void
{
    $entity = new Post(['id' => 5]);
    $this->assertNull($entity->title);
    $this->assertNull($entity->userId);
    $entity->setTitle('hello');
    $entity->setUserId(5);
    $this->assertSame('hello', $entity->title);
    $this->assertSame(5, $entity->userId);
}
```
    
## getter 获取属性值

``` php
public function testCallGetter(): void
{
    $entity = new Post(['id' => 5]);
    $this->assertNull($entity->getTitle());
    $this->assertNull($entity->getUserId());
    $entity->setTitle('hello');
    $entity->setUserId(5);
    $this->assertSame('hello', $entity->getTitle());
    $this->assertSame(5, $entity->getUserId());
}
```
    
## find 获取实体查询对象

``` php
public function testStaticFind(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $post = Post::find()->where('id', 1)->findOne();
    $this->assertSame('hello world', $post->title);
    $this->assertSame(1, $post->userId);
    $this->assertSame('post summary', $post->summary);
}
```
    
## connectSandbox 数据库连接沙盒

``` php
public function testConnectSandbox(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title'     => 'hello world',
                'user_id'   => 1,
                'summary'   => 'post summary',
                'delete_at' => 0,
            ]));

    $post = Post::connectSandbox('password_right', function () {
        return Post::find()->where('id', 1)->findOne();
    });

    $this->assertSame('hello world', $post->title);
    $this->assertSame(1, $post->userId);
    $this->assertSame('post summary', $post->summary);
}
```
    
## newed 确定对象是否对应数据库中的一条记录

``` php
public function testNewed(): void
{
    $entity = new Post();
    $this->assertTrue($entity->newed());

    $entity = new Post(['id' => 5]);
    $this->assertTrue($entity->newed());

    $entity = new Post(['id' => 5], true);
    $this->assertFalse($entity->newed());
}
```
    
## id 获取主键值

``` php
public function testId(): void
{
    $entity = new Post();
    $this->assertNull($entity->id());

    $entity = new Post(['id' => 5]);
    $this->assertSame(5, $entity->id());
}
```
    
## id 获取复合主键值

**fixture 定义**

**Tests\Database\Ddd\Entity\CompositeId**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class CompositeId extends Entity
{
    use GetterSetter;

    const TABLE = 'composite_id';

    const ID = ['id1', 'id2'];

    const AUTO = null;

    const STRUCT = [
        'id1'      => [],
        'id2'      => [],
        'name'     => [],
    ];
}
```


``` php
public function testCompositeId(): void
{
    $entity = new CompositeId();
    $this->assertNull($entity->id());

    $entity = new CompositeId(['id1' => 5]);
    $this->assertNull($entity->id());

    $entity = new CompositeId(['id1' => 5, 'id2' => 8]);
    $this->assertSame(['id1' => 5, 'id2' => 8], $entity->id());
}
```
    
## refresh 从数据库重新读取当前对象的属性

``` php
public function testRefresh(): void
{
    $post1 = new Post();
    $post1->create()->flush();
    $this->assertInstanceof(Post::class, $post1);
    $this->assertSame(1, $post1->id);
    $this->assertNull($post1->userId);
    $this->assertNull($post1->title);
    $this->assertNull($post1->summary);
    $this->assertNull($post1->delete_at);

    $post1->refresh();
    $this->assertSame(1, $post1->id);
    $this->assertSame(0, $post1->userId);
    $this->assertSame('', $post1->title);
    $this->assertSame('', $post1->summary);
    $this->assertSame(0, $post1->delete_at);
}
```
    
## refresh 从数据库重新读取当前对象的属性支持复合主键

``` php
public function testRefreshWithCompositeId(): void
{
    $entity = new CompositeId(['id1' => 1, 'id2' => 3]);
    $entity->create()->flush();
    $this->assertInstanceof(CompositeId::class, $entity);
    $this->assertSame(1, $entity->id1);
    $this->assertSame(3, $entity->id2);
    $this->assertNull($entity->name);

    $entity->refresh();
    $this->assertSame(1, $entity->id1);
    $this->assertSame(3, $entity->id2);
    $this->assertSame('', $entity->name);
}
```
    
## 构造器支持忽略未定义属性

`$ignoreUndefinedProp` 用于数据库添加了字段，但是我们的实体并没有更新字段，查询得到的实体对象将会忽略掉新增的字段而不报错。


``` php
public function testIgnoreUndefinedProp(): void
{
    $entity = new Post(['undefined_prop' => 5], true, true);
    $this->assertSame([], $entity->toArray());
}
```
    
## update 更新数据带上版本号

可以用于并发控制，例如商品库存，客户余额等。

**fixture 定义**

**Tests\Database\Ddd\Entity\DemoVersion**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class DemoVersion extends Entity
{
    use GetterSetter;

    const TABLE = 'test_version';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id' => [
            self::READONLY             => true,
        ],
        'name'       => [],
        'version'    => [],
    ];

    const VERSION = 'version';
}
```


``` php
public function testUpdateWithVersion(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('test_version')
            ->insert([
                'name'     => 'xiaoniuge',
            ]));

    $testVersion = DemoVersion::select()->findEntity(1);

    $this->assertInstanceof(DemoVersion::class, $testVersion);
    $this->assertSame(1, $testVersion->id);
    $this->assertSame('xiaoniuge', $testVersion->name);

    $testVersion->name = 'aniu';
    $this->assertSame(1, $testVersion->update()->flush());
    $this->assertSame('SQL: [225] UPDATE `test_version` SET `test_version`.`name` = :pdonamedparameter_name,`test_version`.`version` = `test_version`.`version`+1 WHERE `test_version`.`id` = :test_version_id AND `test_version`.`version` = :test_version_version | Params:  3 | Key: Name: [23] :pdonamedparameter_name | paramno=0 | name=[23] ":pdonamedparameter_name" | is_param=1 | param_type=2 | Key: Name: [16] :test_version_id | paramno=1 | name=[16] ":test_version_id" | is_param=1 | param_type=1 | Key: Name: [21] :test_version_version | paramno=2 | name=[21] ":test_version_version" | is_param=1 | param_type=1 (UPDATE `test_version` SET `test_version`.`name` = \'aniu\',`test_version`.`version` = `test_version`.`version`+1 WHERE `test_version`.`id` = 1 AND `test_version`.`version` = 0)', $testVersion->select()->getLastSql());

    $testVersion->name = 'hello';
    $this->assertSame(1, $testVersion->update()->flush());
    $this->assertSame('SQL: [225] UPDATE `test_version` SET `test_version`.`name` = :pdonamedparameter_name,`test_version`.`version` = `test_version`.`version`+1 WHERE `test_version`.`id` = :test_version_id AND `test_version`.`version` = :test_version_version | Params:  3 | Key: Name: [23] :pdonamedparameter_name | paramno=0 | name=[23] ":pdonamedparameter_name" | is_param=1 | param_type=2 | Key: Name: [16] :test_version_id | paramno=1 | name=[16] ":test_version_id" | is_param=1 | param_type=1 | Key: Name: [21] :test_version_version | paramno=2 | name=[21] ":test_version_version" | is_param=1 | param_type=1 (UPDATE `test_version` SET `test_version`.`name` = \'hello\',`test_version`.`version` = `test_version`.`version`+1 WHERE `test_version`.`id` = 1 AND `test_version`.`version` = 1)', $testVersion->select()->getLastSql());
}
```
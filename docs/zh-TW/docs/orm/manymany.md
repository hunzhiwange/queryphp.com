# manyMany 多对多关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/ManyManyTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/ManyManyTest.php)
:::
    
多对多的关联是一种常用的关联，比如用户与角色属于多对多的关系。

**多对多关联支持类型关联项**

|  关联项   | 说明  |    例子   |
|  ----  | ----  | ----  |
| \Leevel\Database\Ddd\Entity::MANY_MANY  | 多对多关联实体 |  \Tests\Database\Ddd\Entity\Relation\Role::class  |
| \Leevel\Database\Ddd\Entity::MIDDLE_ENTITY  | 关联查询中间实体 |  \Tests\Database\Ddd\Entity\Relation\UserRole::class  |
| \Leevel\Database\Ddd\Entity::SOURCE_KEY  | 关联查询源键字段 | user_id |
| \Leevel\Database\Ddd\Entity::TARGET_KEY  | 关联目标键字段 | id |
| \Leevel\Database\Ddd\Entity::MIDDLE_SOURCE_KEY  | 关联查询中间实体源键字段 | id |
| \Leevel\Database\Ddd\Entity::MIDDLE_TARGET_KEY  | 关联查询中间实体目标键字段 | id |
| \Leevel\Database\Ddd\Entity::RELATION_SCOPE  | 关联查询作用域 | middleField |


**Uses**

``` php
<?php

use Leevel\Collection\Collection;
use Leevel\Database\Ddd\Relation\ManyMany;
use Leevel\Database\Ddd\Relation\Relation;
use Leevel\Database\Ddd\Select;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\Relation\Role;
use Tests\Database\Ddd\Entity\Relation\RoleSoftDeleted;
use Tests\Database\Ddd\Entity\Relation\User;
use Tests\Database\Ddd\Entity\Relation\UserRole;
use Tests\Database\Ddd\Entity\Relation\UserRoleSoftDeleted;
```

## 基本使用方法

**fixture 定义**

**Tests\Database\Ddd\Entity\Relation\User**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;
use Leevel\Database\Ddd\Relation\ManyMany;

class User extends Entity
{
    use GetterSetter;

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
        'role_middle_only_soft_deleted_and_middle_field_and_other_table_condition' => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'middleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition',
        ],
    ];

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

    protected function relationScopeMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition(ManyMany $relation): void
    {
        $relation
            ->middleOnlySoftDeleted()
            ->middleField(['create_at', 'middle_id' => 'id'])
            ->setColumns('id,name')
            ->where('id', '>', 3);
    }

    private function relationScopeFoundButPrivate(ManyMany $relation): void
    {
    }
}
```

**Tests\Database\Ddd\Entity\Relation\UserRole**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class UserRole extends Entity
{
    use GetterSetter;

    const TABLE = 'user_role';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'        => [],
        'user_id'   => [],
        'role_id'   => [],
        'create_at' => [],
    ];
}
```

**Tests\Database\Ddd\Entity\Relation\Role**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class Role extends Entity
{
    use GetterSetter;

    const TABLE = 'role';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'        => [],
        'name'      => [],
        'create_at' => [],
    ];
}
```


``` php
public function testBaseUse(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    $this->assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    $this->assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $this->assertSame(1, $user->id);
    $this->assertSame(1, $user['id']);
    $this->assertSame(1, $user->getId());
    $this->assertSame('niu', $user->name);
    $this->assertSame('niu', $user['name']);
    $this->assertSame('niu', $user->getName());

    $role = $user->role;

    $this->assertInstanceof(Collection::class, $role);

    $role1 = $role[0];

    $this->assertInstanceof(Role::class, $role1);
    $this->assertSame(1, $role1->id);
    $this->assertSame(1, $role1['id']);
    $this->assertSame(1, $role1->getId());
    $this->assertSame('管理员', $role1->name);
    $this->assertSame('管理员', $role1['name']);
    $this->assertSame('管理员', $role1->getName());

    $role2 = $role[1];

    $this->assertSame(3, $role2->id);
    $this->assertSame(3, $role2['id']);
    $this->assertSame(3, $role2->getId());
    $this->assertSame('会员', $role2->name);
    $this->assertSame('会员', $role2['name']);
    $this->assertSame('会员', $role2->getName());

    $this->assertCount(2, $role);
    $this->assertSame(1, $role[0]['id']);
    $this->assertSame('管理员', $role[0]['name']);
    $this->assertSame(3, $role[1]['id']);
    $this->assertSame('会员', $role[1]['name']);

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRole::class, $middle);
    $this->assertSame(1, $middle->userId);
    $this->assertSame(1, $middle->roleId);

    $middle = $role[1]->middle();
    $this->assertInstanceof(UserRole::class, $middle);
    $this->assertSame(1, $middle->userId);
    $this->assertSame(3, $middle->roleId);
}
```
    
## eager 预加载关联

``` php
public function testEager(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    $this->assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    $this->assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ])
    );

    $user = User::eager(['role'])
        ->where('id', 1)
        ->findOne();

    $this->assertSame(1, $user->id);
    $this->assertSame(1, $user['id']);
    $this->assertSame(1, $user->getId());
    $this->assertSame('niu', $user->name);
    $this->assertSame('niu', $user['name']);
    $this->assertSame('niu', $user->getName());

    $role = $user->role;

    $this->assertInstanceof(Collection::class, $role);

    $role1 = $role[0];

    $this->assertInstanceof(Role::class, $role1);
    $this->assertSame(1, $role1->id);
    $this->assertSame(1, $role1['id']);
    $this->assertSame(1, $role1->getId());
    $this->assertSame('管理员', $role1->name);
    $this->assertSame('管理员', $role1['name']);
    $this->assertSame('管理员', $role1->getName());

    $role2 = $role[1];

    $this->assertInstanceof(Role::class, $role2);
    $this->assertSame(3, $role2->id);
    $this->assertSame(3, $role2['id']);
    $this->assertSame(3, $role2->getId());
    $this->assertSame('会员', $role2->name);
    $this->assertSame('会员', $role2['name']);
    $this->assertSame('会员', $role2->getName());

    $this->assertCount(2, $role);
    $this->assertSame(1, $role[0]['id']);
    $this->assertSame('管理员', $role[0]['name']);
    $this->assertSame(3, $role[1]['id']);
    $this->assertSame('会员', $role[1]['name']);

    $middle = $role[0]->middle();
    $this->assertSame(1, $middle->userId);
    $this->assertSame(1, $middle->roleId);

    $middle = $role[1]->middle();
    $this->assertSame(1, $middle->userId);
    $this->assertSame(3, $middle->roleId);
}
```
    
## eager 预加载关联支持查询条件过滤

``` php
public function testEagerWithCondition(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    $this->assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    $this->assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ])
    );

    $user = User::eager(['role' => function (Relation $select) {
        $select->where('id', '>', 99999);
    }])
        ->where('id', 1)
        ->findOne();

    $this->assertSame(1, $user->id);
    $this->assertSame(1, $user['id']);
    $this->assertSame(1, $user->getId());
    $this->assertSame('niu', $user->name);
    $this->assertSame('niu', $user['name']);
    $this->assertSame('niu', $user->getName());

    $role = $user->role;

    $this->assertInstanceof(Collection::class, $role);
    $this->assertCount(0, $role);
}
```
    
## relation 读取关联

``` php
public function testRelationAsMethod(): void
{
    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    $this->assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ])
    );

    $roleRelation = User::make()->relation('role');

    $this->assertInstanceof(ManyMany::class, $roleRelation);
    $this->assertSame('id', $roleRelation->getSourceKey());
    $this->assertSame('id', $roleRelation->getTargetKey());
    $this->assertSame('user_id', $roleRelation->getMiddleSourceKey());
    $this->assertSame('role_id', $roleRelation->getMiddleTargetKey());
    $this->assertInstanceof(User::class, $roleRelation->getSourceEntity());
    $this->assertInstanceof(Role::class, $roleRelation->getTargetEntity());
    $this->assertInstanceof(UserRole::class, $roleRelation->getMiddleEntity());
    $this->assertInstanceof(Select::class, $roleRelation->getSelect());
}
```
    
## relation 关联模型数据不存在返回空集合

``` php
public function testRelationDataWasNotFound(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    $this->assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    $this->assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $this->assertSame(1, $user->id);
    $this->assertSame(1, $user['id']);
    $this->assertSame(1, $user->getId());
    $this->assertSame('niu', $user->name);
    $this->assertSame('niu', $user['name']);
    $this->assertSame('niu', $user->getName());

    $role = $user->role;

    $this->assertInstanceof(Collection::class, $role);
    $this->assertCount(0, $role);
}
```
    
## 关联软删除

**fixture 定义**

**Tests\Database\Ddd\Entity\Relation\User**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;
use Leevel\Database\Ddd\Relation\ManyMany;

class User extends Entity
{
    use GetterSetter;

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
        'role_middle_only_soft_deleted_and_middle_field_and_other_table_condition' => [
            self::MANY_MANY         => RoleSoftDeleted::class,
            self::MIDDLE_ENTITY     => UserRoleSoftDeleted::class,
            self::SOURCE_KEY        => 'id',
            self::TARGET_KEY        => 'id',
            self::MIDDLE_SOURCE_KEY => 'user_id',
            self::MIDDLE_TARGET_KEY => 'role_id',
            self::RELATION_SCOPE    => 'middleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition',
        ],
    ];

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

    protected function relationScopeMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition(ManyMany $relation): void
    {
        $relation
            ->middleOnlySoftDeleted()
            ->middleField(['create_at', 'middle_id' => 'id'])
            ->setColumns('id,name')
            ->where('id', '>', 3);
    }

    private function relationScopeFoundButPrivate(ManyMany $relation): void
    {
    }
}
```

**Tests\Database\Ddd\Entity\Relation\UserRoleSoftDeleted**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class UserRoleSoftDeleted extends Entity
{
    use GetterSetter;

    const TABLE = 'user_role_soft_deleted';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'        => [],
        'user_id'   => [],
        'role_id'   => [],
        'create_at' => [],
        'delete_at' => [
            self::CREATE_FILL => 0,
        ],
    ];

    const DELETE_AT = 'delete_at';
}
```

**Tests\Database\Ddd\Entity\Relation\RoleSoftDeleted**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\GetterSetter;

class RoleSoftDeleted extends Entity
{
    use GetterSetter;

    const TABLE = 'role_soft_deleted';

    const ID = 'id';

    const AUTO = 'id';

    const STRUCT = [
        'id'        => [],
        'name'      => [],
        'create_at' => [],
        'delete_at' => [
            self::CREATE_FILL => 0,
        ],
    ];

    const DELETE_AT = 'delete_at';
}
```


``` php
public function testSoftDeleted(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    $this->assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '管理员',
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '版主',
            ])
    );

    $this->assertSame(
        3,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '会员',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $sql = <<<'eot'
        SQL: [64] SELECT `user`.* FROM `user` WHERE `user`.`id` = :user_id LIMIT 1 | Params:  1 | Key: Name: [8] :user_id | paramno=0 | name=[8] ":user_id" | is_param=1 | param_type=1 (SELECT `user`.* FROM `user` WHERE `user`.`id` = 1 LIMIT 1)
        eot;
    $this->assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertSame(1, $user->id);
    $this->assertSame(1, $user['id']);
    $this->assertSame(1, $user->getId());
    $this->assertSame('niu', $user->name);
    $this->assertSame('niu', $user['name']);
    $this->assertSame('niu', $user->getName());

    $role = $user->roleSoftDeleted;

    $sql = <<<'eot'
        SQL: [490] SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` = :user_role_soft_deleted_delete_at WHERE `role_soft_deleted`.`delete_at` = :role_soft_deleted_delete_at AND `user_role_soft_deleted`.`user_id` IN (:user_role_soft_deleted_user_id_in0) | Params:  3 | Key: Name: [33] :user_role_soft_deleted_delete_at | paramno=0 | name=[33] ":user_role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [28] :role_soft_deleted_delete_at | paramno=1 | name=[28] ":role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [35] :user_role_soft_deleted_user_id_in0 | paramno=2 | name=[35] ":user_role_soft_deleted_user_id_in0" | is_param=1 | param_type=1 (SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` = 0 WHERE `role_soft_deleted`.`delete_at` = 0 AND `user_role_soft_deleted`.`user_id` IN (1))
        eot;
    $this->assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertInstanceof(Collection::class, $role);

    $role1 = $role[0];

    $this->assertInstanceof(RoleSoftDeleted::class, $role1);
    $this->assertSame(1, $role1->id);
    $this->assertSame(1, $role1['id']);
    $this->assertSame(1, $role1->getId());
    $this->assertSame('管理员', $role1->name);
    $this->assertSame('管理员', $role1['name']);
    $this->assertSame('管理员', $role1->getName());

    $role2 = $role[1];

    $this->assertInstanceof(RoleSoftDeleted::class, $role2);
    $this->assertSame(3, $role2->id);
    $this->assertSame(3, $role2['id']);
    $this->assertSame(3, $role2->getId());
    $this->assertSame('会员', $role2->name);
    $this->assertSame('会员', $role2['name']);
    $this->assertSame('会员', $role2->getName());

    $this->assertCount(2, $role);
    $this->assertSame(1, $role[0]['id']);
    $this->assertSame('管理员', $role[0]['name']);
    $this->assertSame(3, $role[1]['id']);
    $this->assertSame('会员', $role[1]['name']);

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRoleSoftDeleted::class, $middle);
    $this->assertSame(1, $middle->userId);
    $this->assertSame(1, $middle->roleId);

    $middle = $role[1]->middle();
    $this->assertInstanceof(UserRoleSoftDeleted::class, $middle);
    $this->assertSame(1, $middle->userId);
    $this->assertSame(3, $middle->roleId);
}
```
    
## middleWithSoftDeleted 中间实体包含软删除数据的数据库查询集合对象

通过关联作用域来设置中间实体包含软删除数据的数据库查询集合对象。

**fixture 定义**

``` php
# Tests\Database\Ddd\Entity\Relation\User::relationScopeWithSoftDeleted
protected function relationScopeWithSoftDeleted(ManyMany $relation): void
{
    $relation->middleWithSoftDeleted();
}
```


``` php
public function testWithMiddleSoftDeletedAndMiddleEntityHasSoftDeleted(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    $this->assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '管理员',
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '版主',
            ])
    );

    $this->assertSame(
        3,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '会员',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id'   => 1,
                'role_id'   => 3,
                'delete_at' => time(),
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $sql = <<<'eot'
        SQL: [64] SELECT `user`.* FROM `user` WHERE `user`.`id` = :user_id LIMIT 1 | Params:  1 | Key: Name: [8] :user_id | paramno=0 | name=[8] ":user_id" | is_param=1 | param_type=1 (SELECT `user`.* FROM `user` WHERE `user`.`id` = 1 LIMIT 1)
        eot;
    $this->assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertSame(1, $user->id);
    $this->assertSame(1, $user['id']);
    $this->assertSame(1, $user->getId());
    $this->assertSame('niu', $user->name);
    $this->assertSame('niu', $user['name']);
    $this->assertSame('niu', $user->getName());

    $role = $user->roleMiddleWithSoftDeleted;

    $sql = <<<'eot'
        SQL: [413] SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` WHERE `role_soft_deleted`.`delete_at` = :role_soft_deleted_delete_at AND `user_role_soft_deleted`.`user_id` IN (:user_role_soft_deleted_user_id_in0) | Params:  2 | Key: Name: [28] :role_soft_deleted_delete_at | paramno=0 | name=[28] ":role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [35] :user_role_soft_deleted_user_id_in0 | paramno=1 | name=[35] ":user_role_soft_deleted_user_id_in0" | is_param=1 | param_type=1 (SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` WHERE `role_soft_deleted`.`delete_at` = 0 AND `user_role_soft_deleted`.`user_id` IN (1))
        eot;
    $this->assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertInstanceof(Collection::class, $role);

    $role1 = $role[0];

    $this->assertInstanceof(RoleSoftDeleted::class, $role1);
    $this->assertSame(1, $role1->id);
    $this->assertSame(1, $role1['id']);
    $this->assertSame(1, $role1->getId());
    $this->assertSame('管理员', $role1->name);
    $this->assertSame('管理员', $role1['name']);
    $this->assertSame('管理员', $role1->getName());

    $role2 = $role[1];

    $this->assertInstanceof(RoleSoftDeleted::class, $role2);
    $this->assertSame(3, $role2->id);
    $this->assertSame(3, $role2['id']);
    $this->assertSame(3, $role2->getId());
    $this->assertSame('会员', $role2->name);
    $this->assertSame('会员', $role2['name']);
    $this->assertSame('会员', $role2->getName());

    $this->assertCount(2, $role);
    $this->assertSame(1, $role[0]['id']);
    $this->assertSame('管理员', $role[0]['name']);
    $this->assertSame(3, $role[1]['id']);
    $this->assertSame('会员', $role[1]['name']);

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRoleSoftDeleted::class, $middle);
    $this->assertSame(1, $middle->userId);
    $this->assertSame(1, $middle->roleId);

    $middle = $role[1]->middle();
    $this->assertInstanceof(UserRoleSoftDeleted::class, $middle);
    $this->assertSame(1, $middle->userId);
    $this->assertSame(3, $middle->roleId);
}
```
    
## middleOnlySoftDeleted 中间实体仅仅包含软删除数据的数据库查询集合对象

通过关联作用域来设置中间实体仅仅包含软删除数据的数据库查询集合对象。

**fixture 定义**

``` php
# Tests\Database\Ddd\Entity\Relation\User::relationScopeOnlySoftDeleted
protected function relationScopeOnlySoftDeleted(ManyMany $relation): void
{
    $relation->middleOnlySoftDeleted();
}
```


``` php
public function testOnlyMiddleSoftDeletedAndMiddleEntityHasSoftDeleted(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    $this->assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '管理员',
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '版主',
            ])
    );

    $this->assertSame(
        3,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '会员',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id'   => 1,
                'role_id'   => 3,
                'delete_at' => time(),
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $sql = <<<'eot'
        SQL: [64] SELECT `user`.* FROM `user` WHERE `user`.`id` = :user_id LIMIT 1 | Params:  1 | Key: Name: [8] :user_id | paramno=0 | name=[8] ":user_id" | is_param=1 | param_type=1 (SELECT `user`.* FROM `user` WHERE `user`.`id` = 1 LIMIT 1)
        eot;
    $this->assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertSame(1, $user->id);
    $this->assertSame(1, $user['id']);
    $this->assertSame(1, $user->getId());
    $this->assertSame('niu', $user->name);
    $this->assertSame('niu', $user['name']);
    $this->assertSame('niu', $user->getName());

    $role = $user->roleMiddleOnlySoftDeleted;

    $sql = <<<'eot'
        SQL: [490] SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` > :user_role_soft_deleted_delete_at WHERE `role_soft_deleted`.`delete_at` = :role_soft_deleted_delete_at AND `user_role_soft_deleted`.`user_id` IN (:user_role_soft_deleted_user_id_in0) | Params:  3 | Key: Name: [33] :user_role_soft_deleted_delete_at | paramno=0 | name=[33] ":user_role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [28] :role_soft_deleted_delete_at | paramno=1 | name=[28] ":role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [35] :user_role_soft_deleted_user_id_in0 | paramno=2 | name=[35] ":user_role_soft_deleted_user_id_in0" | is_param=1 | param_type=1 (SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` > 0 WHERE `role_soft_deleted`.`delete_at` = 0 AND `user_role_soft_deleted`.`user_id` IN (1))
        eot;
    $this->assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertInstanceof(Collection::class, $role);

    $role1 = $role[0];

    $this->assertInstanceof(RoleSoftDeleted::class, $role1);
    $this->assertSame(3, $role1->id);
    $this->assertSame(3, $role1['id']);
    $this->assertSame(3, $role1->getId());
    $this->assertSame('会员', $role1->name);
    $this->assertSame('会员', $role1['name']);
    $this->assertSame('会员', $role1->getName());

    $role2 = $role[1];

    $this->assertNull($role2);

    $this->assertCount(1, $role);
    $this->assertSame(3, $role[0]['id']);
    $this->assertSame('会员', $role[0]['name']);
    $this->assertNull($role[1]['id'] ?? null);
    $this->assertNull($role[1]['name'] ?? null);

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRoleSoftDeleted::class, $middle);
    $this->assertSame(1, $middle->userId);
    $this->assertSame(3, $middle->roleId);
}
```
    
## middleOnlySoftDeleted.middleField.where 组合条件查询例子

通过关联作用域来设置组合查询条件。

**fixture 定义**

``` php
# Tests\Database\Ddd\Entity\Relation\User::relationScopeMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition
protected function relationScopeMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition(ManyMany $relation): void
{
    $relation
        ->middleOnlySoftDeleted()
        ->middleField(['create_at', 'middle_id' => 'id'])
        ->setColumns('id,name')
        ->where('id', '>', 3);
}
```


``` php
public function testMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    $this->assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '管理员',
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '版主',
            ])
    );

    $this->assertSame(
        3,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '会员',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id'   => 1,
                'role_id'   => 3,
                'delete_at' => time(),
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $sql = <<<'eot'
        SQL: [64] SELECT `user`.* FROM `user` WHERE `user`.`id` = :user_id LIMIT 1 | Params:  1 | Key: Name: [8] :user_id | paramno=0 | name=[8] ":user_id" | is_param=1 | param_type=1 (SELECT `user`.* FROM `user` WHERE `user`.`id` = 1 LIMIT 1)
        eot;
    $this->assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertSame(1, $user->id);
    $this->assertSame(1, $user['id']);
    $this->assertSame(1, $user->getId());
    $this->assertSame('niu', $user->name);
    $this->assertSame('niu', $user['name']);
    $this->assertSame('niu', $user->getName());

    $role = $user->roleMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition;

    $sql = <<<'eot'
        SQL: [655] SELECT `role_soft_deleted`.`id`,`role_soft_deleted`.`name`,`user_role_soft_deleted`.`create_at`,`user_role_soft_deleted`.`id` AS `middle_id`,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` > :user_role_soft_deleted_delete_at WHERE `role_soft_deleted`.`delete_at` = :role_soft_deleted_delete_at AND `role_soft_deleted`.`id` > :role_soft_deleted_id AND `user_role_soft_deleted`.`user_id` IN (:user_role_soft_deleted_user_id_in0) | Params:  4 | Key: Name: [33] :user_role_soft_deleted_delete_at | paramno=0 | name=[33] ":user_role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [28] :role_soft_deleted_delete_at | paramno=1 | name=[28] ":role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [21] :role_soft_deleted_id | paramno=2 | name=[21] ":role_soft_deleted_id" | is_param=1 | param_type=1 | Key: Name: [35] :user_role_soft_deleted_user_id_in0 | paramno=3 | name=[35] ":user_role_soft_deleted_user_id_in0" | is_param=1 | param_type=1 (SELECT `role_soft_deleted`.`id`,`role_soft_deleted`.`name`,`user_role_soft_deleted`.`create_at`,`user_role_soft_deleted`.`id` AS `middle_id`,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` > 0 WHERE `role_soft_deleted`.`delete_at` = 0 AND `role_soft_deleted`.`id` > 3 AND `user_role_soft_deleted`.`user_id` IN (1))
        eot;
    $this->assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertInstanceof(Collection::class, $role);
    $this->assertFalse(isset($role[0]));
}
```
    
## middleField 中间实体查询字段

通过关联作用域来设置中间实体查询字段。

**fixture 定义**

``` php
# Tests\Database\Ddd\Entity\Relation\User::relationScopeMiddleField
protected function relationScopeMiddleField(ManyMany $relation): void
{
    $relation->middleField(['create_at', 'middle_id' => 'id']);
}
```


``` php
public function testMiddleField(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    $this->assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    $this->assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    $this->assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 2,
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $sql = <<<'eot'
        SQL: [64] SELECT `user`.* FROM `user` WHERE `user`.`id` = :user_id LIMIT 1 | Params:  1 | Key: Name: [8] :user_id | paramno=0 | name=[8] ":user_id" | is_param=1 | param_type=1 (SELECT `user`.* FROM `user` WHERE `user`.`id` = 1 LIMIT 1)
        eot;
    $this->assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertSame(1, $user->id);
    $this->assertSame(1, $user['id']);
    $this->assertSame(1, $user->getId());
    $this->assertSame('niu', $user->name);
    $this->assertSame('niu', $user['name']);
    $this->assertSame('niu', $user->getName());

    $role = $user->roleMiddleField;

    $sql = <<<'eot'
        SQL: [285] SELECT `role`.*,`user_role`.`create_at`,`user_role`.`id` AS `middle_id`,`user_role`.`role_id` AS `middle_role_id`,`user_role`.`user_id` AS `middle_user_id` FROM `role` INNER JOIN `user_role` ON `user_role`.`role_id` = `role`.`id` WHERE `user_role`.`user_id` IN (:user_role_user_id_in0) | Params:  1 | Key: Name: [22] :user_role_user_id_in0 | paramno=0 | name=[22] ":user_role_user_id_in0" | is_param=1 | param_type=1 (SELECT `role`.*,`user_role`.`create_at`,`user_role`.`id` AS `middle_id`,`user_role`.`role_id` AS `middle_role_id`,`user_role`.`user_id` AS `middle_user_id` FROM `role` INNER JOIN `user_role` ON `user_role`.`role_id` = `role`.`id` WHERE `user_role`.`user_id` IN (1))
        eot;
    $this->assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertInstanceof(Collection::class, $role);
    $this->assertCount(1, $role);

    $role1 = $role[0];

    $this->assertInstanceof(Role::class, $role1);
    $this->assertSame(2, $role1->id);
    $this->assertSame(2, $role1['id']);
    $this->assertSame(2, $role1->getId());
    $this->assertSame('版主', $role1->name);
    $this->assertSame('版主', $role1['name']);
    $this->assertSame('版主', $role1->getName());

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRole::class, $middle);
    $this->assertSame(1, $middle->userId);
    $this->assertSame(2, $middle->roleId);
}
```
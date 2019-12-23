# 验证器.是否可接受的

::: tip Testing Is Documentation
[tests/Validate/Validator/UniqueTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/UniqueTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Validate\IValidator;
use Leevel\Validate\UniqueRule;
use Leevel\Validate\Validator;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\CompositeId;
use Tests\Database\Ddd\Entity\Guestbook;
```

## 唯一值基本使用方法

框架提供了一个唯一值创建生成规则方法

``` php
\Leevel\Validate\UniqueRule::rule(string $entity, ?string $field = null, $exceptId = null, ?string $primaryKey = null, ...$additional): string;
```

  * entity 实体
  * field 指定数据库字段，未指定默认为待验证的字段作为数据库字段
  * exceptId 排除主键，一般用于编辑数据项校验
  * primaryKey 指定主键
  * additional 附加查询条件，成对出现

唯一值是一个非常常用的功能，框架强化了这一功能。


``` php
public function testBaseUse(): void
{
    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => $rule = UniqueRule::rule(Guestbook::class, null, 1),
        ]
    );

    $this->assertSame('unique:Tests\\Database\\Ddd\\Entity\\Guestbook,_,__int@1,_', $rule);
    $this->assertTrue($validate->success());

    $sql = $this->getLastSql('guest_book');
    $this->assertSame($sql, "SQL: [115] SELECT COUNT(*) AS row_count FROM `guest_book` WHERE `guest_book`.`name` = 'foo' AND `guest_book`.`id` <> 1 LIMIT 1 | Params:  0");
}
```
    
## 排除主键

``` php
public function testValidateWithExceptId(): void
{
    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => $rule = UniqueRule::rule(Guestbook::class, null, 1),
        ]
    );

    $this->assertSame('unique:Tests\\Database\\Ddd\\Entity\\Guestbook,_,__int@1,_', $rule);
    $this->assertTrue($validate->success());
    $sql = $this->getLastSql('guest_book');
    $this->assertSame($sql, "SQL: [115] SELECT COUNT(*) AS row_count FROM `guest_book` WHERE `guest_book`.`name` = 'foo' AND `guest_book`.`id` <> 1 LIMIT 1 | Params:  0");

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('guest_book')
            ->insert([
                'name'    => 'foo',
                'content' => '',
            ]),
    );

    $this->assertTrue($validate->success());
}
```
    
## 排除主键，并且指定主键

``` php
public function testValidateWithExceptIdAndPrimaryKey(): void
{
    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => $rule = UniqueRule::rule(Guestbook::class, null, 1, 'id'),
        ]
    );

    $this->assertSame('unique:Tests\\Database\\Ddd\\Entity\\Guestbook,_,__int@1,id', $rule);
    $this->assertTrue($validate->success());
    $sql = $this->getLastSql('guest_book');
    $this->assertSame($sql, "SQL: [115] SELECT COUNT(*) AS row_count FROM `guest_book` WHERE `guest_book`.`name` = 'foo' AND `guest_book`.`id` <> 1 LIMIT 1 | Params:  0");

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('guest_book')
            ->insert([
                'name'    => 'foo',
                'content' => '',
            ]),
    );

    $this->assertTrue($validate->success());
}
```
    
## 排除主键，复合主键将会被忽略

``` php
public function testValidateWithExceptIdAndCompositeIdAndIgnore(): void
{
    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => $rule = UniqueRule::rule(CompositeId::class, null, 1),
        ]
    );

    $this->assertSame('unique:Tests\\Database\\Ddd\\Entity\\CompositeId,_,__int@1,_', $rule);
    $this->assertTrue($validate->success());
    $sql = $this->getLastSql('composite_id');
    $this->assertSame($sql, "SQL: [92] SELECT COUNT(*) AS row_count FROM `composite_id` WHERE `composite_id`.`name` = 'foo' LIMIT 1 | Params:  0");

    $connect = $this->createDatabaseConnect();

    $connect
        ->table('composite_id')
        ->insert([
            'id1'   => 1,
            'id2'   => 2,
            'name'  => '',
        ]);

    $this->assertTrue($validate->success());
}
```
    
## 不排除主键

``` php
public function testValidateWithoutExceptId(): void
{
    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => $rule = UniqueRule::rule(Guestbook::class, null),
        ]
    );

    $this->assertSame('unique:Tests\\Database\\Ddd\\Entity\\Guestbook,_,_,_', $rule);
    $this->assertTrue($validate->success());
    $sql = $this->getLastSql('guest_book');
    $this->assertSame($sql, "SQL: [88] SELECT COUNT(*) AS row_count FROM `guest_book` WHERE `guest_book`.`name` = 'foo' LIMIT 1 | Params:  0");

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
         1,
        $connect
            ->table('guest_book')
            ->insert([
                'name'    => 'foo',
                'content' => '',
            ]),
    );

    $this->assertFalse($validate->success());
}
```
    
## unique 参数缺失

``` php
public function testCheckParamLengthException(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Missing the first element of param.'
    );

    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => 'unique',
        ]
    );

    $validate->success();
}
```
    
## 指定验证数据库字段

``` php
public function testValidateWithValidateField(): void
{
    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => $rule = UniqueRule::rule(Guestbook::class, 'name', 1),
        ]
    );

    $this->assertSame('unique:Tests\\Database\\Ddd\\Entity\\Guestbook,name,__int@1,_', $rule);
    $this->assertTrue($validate->success());
    $sql = $this->getLastSql('guest_book');
    $this->assertSame($sql, "SQL: [115] SELECT COUNT(*) AS row_count FROM `guest_book` WHERE `guest_book`.`name` = 'foo' AND `guest_book`.`id` <> 1 LIMIT 1 | Params:  0");

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('guest_book')
            ->insert([
                'name'    => 'foo',
                'content' => '',
            ]),
    );

    $this->assertTrue($validate->success());
}
```
    
## 指定验证数据库字段，支持多个字段

``` php
public function testValidateWithValidateMultiField(): void
{
    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => $rule = UniqueRule::rule(Guestbook::class, 'name:content', 1),
        ]
    );

    $this->assertSame('unique:Tests\\Database\\Ddd\\Entity\\Guestbook,name:content,__int@1,_', $rule);
    $this->assertTrue($validate->success());
    $sql = $this->getLastSql('guest_book');
    $this->assertSame($sql, "SQL: [150] SELECT COUNT(*) AS row_count FROM `guest_book` WHERE `guest_book`.`name` = 'foo' AND `guest_book`.`content` = 'foo' AND `guest_book`.`id` <> 1 LIMIT 1 | Params:  0");

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('guest_book')
            ->insert([
                'name'    => 'foo',
                'content' => '',
            ]),
    );

    $this->assertTrue($validate->success());
}
```
    
## 带附加条件

``` php
public function testValidateWithParseAdditional(): void
{
    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => $rule = UniqueRule::rule(Guestbook::class, null, null, null, 'id', '1'),
        ]
    );

    $this->assertSame('unique:Tests\\Database\\Ddd\\Entity\\Guestbook,_,_,_,id,__string@1', $rule);
    $this->assertTrue($validate->success());
    $sql = $this->getLastSql('guest_book');
    $this->assertSame($sql, "SQL: [116] SELECT COUNT(*) AS row_count FROM `guest_book` WHERE `guest_book`.`name` = 'foo' AND `guest_book`.`id` = '1' LIMIT 1 | Params:  0");

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('guest_book')
            ->insert([
                'name'    => 'foo',
                'content' => '',
            ]),
    );

    $this->assertFalse($validate->success());
}
```
    
## 带附加条件，附加条件支持表达式

``` php
public function testValidateWithParseAdditionalCustomOperate(): void
{
    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => $rule = UniqueRule::rule(Guestbook::class, null, null, null, 'id:>', '1'),
        ]
    );

    $this->assertSame('unique:Tests\\Database\\Ddd\\Entity\\Guestbook,_,_,_,id:>,__string@1', $rule);
    $this->assertTrue($validate->success());
    $sql = $this->getLastSql('guest_book');
    $this->assertSame($sql, "SQL: [116] SELECT COUNT(*) AS row_count FROM `guest_book` WHERE `guest_book`.`name` = 'foo' AND `guest_book`.`id` > '1' LIMIT 1 | Params:  0");

    $connect = $this->createDatabaseConnect();

    $this->assertSame(
        1,
        $connect
            ->table('guest_book')
            ->insert([
                'name'    => 'foo',
                'content' => '',
            ]),
    );

    $this->assertTrue($validate->success());
}
```
    
## 带附加条件，附加条件区分整数和浮点数的字符串

``` php
public function testValidateWithStringFloatAndStringInt(): void
{
    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => $rule = UniqueRule::rule(Guestbook::class, 'name', '1', null, 'content', '1.5'),
        ]
    );

    $this->assertSame('unique:Tests\\Database\\Ddd\\Entity\\Guestbook,name,__string@1,_,content,__string@1.5', $rule);
    $this->assertTrue($validate->success());

    $sql = $this->getLastSql('guest_book');
    $this->assertSame($sql, "SQL: [152] SELECT COUNT(*) AS row_count FROM `guest_book` WHERE `guest_book`.`name` = 'foo' AND `guest_book`.`id` <> '1' AND `guest_book`.`content` = '1.5' LIMIT 1 | Params:  0");
}
```
    
## 带附加条件，附加条件为整数和浮点数

``` php
public function testValidateWithFloatAndInt(): void
{
    $validate = new Validator(
        [
            'name' => 'foo',
        ],
        [
            'name'     => $rule = UniqueRule::rule(Guestbook::class, 'name', 1, null, 'content', 1.5),
        ]
    );

    $this->assertSame('unique:Tests\\Database\\Ddd\\Entity\\Guestbook,name,__int@1,_,content,__float@1.5', $rule);
    $this->assertTrue($validate->success());

    $sql = $this->getLastSql('guest_book');
    $this->assertSame($sql, "SQL: [148] SELECT COUNT(*) AS row_count FROM `guest_book` WHERE `guest_book`.`name` = 'foo' AND `guest_book`.`id` <> 1 AND `guest_book`.`content` = 1.5 LIMIT 1 | Params:  0");
}
```
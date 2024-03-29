# 数据传输对象

::: tip Testing Is Documentation
[tests/Support/DtoTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/DtoTest.php)
:::
    
QueryPHP 提供了一个简单的数据传输对象组件。

## all 获取全部属性数据（下划线属性命名风格）

``` php
public function testAllUnCamelizeStyle(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => $dtoProp1 = new DtoProp1(),
        'demoObject2Prop'  => $dtoProp2 = new DtoProp2(),
        'demoObject3Prop'  => $dto2 = new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $data = $dto1->all();
    $this->assertSame('foo', $data['demo_string_prop']);
    $this->assertSame(1, $data['demo_int_prop']);
    $this->assertSame(1.5, $data['demo_float_prop']);
    $this->assertSame(true, $data['demo_true_prop']);
    $this->assertSame(false, $data['demo_false_prop']);
    $this->assertSame($dtoProp1, $data['demo_object_prop']);
    $this->assertSame($dtoProp2, $data['demo_object2_prop']);
    $this->assertSame($dto2, $data['demo_object3_prop']);
    $this->assertSame(true, $data['demo_mixed_prop']);
}
```
    
## all 获取全部属性数据（驼峰属性命名风格）

``` php
public function testAllCamelizeStyle(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => $dtoProp1 = new DtoProp1(),
        'demoObject2Prop'  => $dtoProp2 = new DtoProp2(),
        'demoObject3Prop'  => $dto2 = new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $data = $dto1->all(false);
    $this->assertSame('foo', $data['demoStringProp']);
    $this->assertSame(1, $data['demoIntProp']);
    $this->assertSame(1.5, $data['demoFloatProp']);
    $this->assertSame(true, $data['demoTrueProp']);
    $this->assertSame(false, $data['demoFalseProp']);
    $this->assertSame($dtoProp1, $data['demoObjectProp']);
    $this->assertSame($dtoProp2, $data['demoObject2Prop']);
    $this->assertSame($dto2, $data['demoObject3Prop']);
    $this->assertSame(true, $data['demoMixedProp']);
}
```
    
## 默认忽略丢失的值

``` php
public function testDefaultIgnoreMissingValues(): void
{
    $dto1 = new Dto1([
        'demo_not_found'   => 1,
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $this->assertSame('foo', $dto1->demo_string_prop);
}
```
    
## strict 从数组或者数据传输对象创建不可变数据传输对象

``` php
public function testStrict(): void
{
    $this->expectException(\UnexpectedValueException::class);
    $this->expectExceptionMessage(
        'Public properties `demo_not_found` of data transfer object `Tests\\Support\\Fixtures\\Dto1` was not defined.'
    );

    Dto1::strict([
        'demo_not_found'   => 1,
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);
}
```
    
## only 设置白名单属性

``` php
public function testOnly(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $data = $dto1
        ->only(['demoIntProp', 'demoObject3Prop'])
        ->toArray();
    $this->assertSame([
        'demo_int_prop'     => 1,
        'demo_object3_prop' => [
            'demo_string_prop' => 'hello world',
        ],
    ], $data);
}
```
    
## only 设置白名单属性，合并默认白名单属性

``` php
public function testOnlyWithOnlyPropertys(): void
{
    $dto1 = new DtoToArray([
        'demoStringProp'      => 'hello',
        'demoIntProp'         => 123456,
        'demoIntOrStringProp' => 45,
    ]);

    $data = $dto1->toArray();
    $this->assertSame([
        'demo_int_prop'           => 123456,
        'demo_int_or_string_prop' => 45,
    ], $data);

    $data = $dto1->only(['demoStringProp'])->toArray();
    $this->assertSame([
        'demo_string_prop'        => 'hello',
        'demo_int_prop'           => 123456,
        'demo_int_or_string_prop' => 45,
    ], $data);
}
```
    
## only 设置白名单属性，覆盖默认白名单属性

``` php
public function testOnlyWithOnlyPropertysOverrideProperty(): void
{
    $dto1 = new DtoToArray([
        'demoStringProp'      => 'hello',
        'demoIntProp'         => 123456,
        'demoIntOrStringProp' => 45,
    ]);

    $data = $dto1->toArray();
    $this->assertSame([
        'demo_int_prop'           => 123456,
        'demo_int_or_string_prop' => 45,
    ], $data);

    $data = $dto1->only(['demoStringProp'], true)->toArray();
    $this->assertSame([
        'demo_string_prop' => 'hello',
    ], $data);
}
```
    
## except 设置黑名单属性

``` php
public function testExcept(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $data = $dto1
        ->except(
            ['demoIntProp', 'demoObject3Prop', 'demoObjectProp',
                'demoObject3Prop', 'demo_false_prop', 'demo_object2_prop', ]
        )
        ->toArray();
    $this->assertSame([
        'demo_string_prop' => 'foo',
        'demo_float_prop'  => 1.5,
        'demo_true_prop'   => true,
        'demo_mixed_prop'  => true,
    ], $data);
}
```
    
## except 设置黑名单属性，合并默认黑名单属性

``` php
public function testExceptWithExceptPropertys(): void
{
    $dto1 = new DtoToArray2([
        'demoStringProp'      => 'hello',
        'demoIntProp'         => 123456,
        'demoIntOrStringProp' => 45,
    ]);

    $data = $dto1->toArray();
    $this->assertSame([
        'demo_string_prop' => 'hello',
    ], $data);

    $data = $dto1->except(['demoStringProp'])->toArray();
    $this->assertSame([], $data);
}
```
    
## except 设置黑名单属性，覆盖默认黑名单属性

``` php
public function testExceptWithExceptPropertysOverrideProperty(): void
{
    $dto1 = new DtoToArray2([
        'demoStringProp'      => 'hello',
        'demoIntProp'         => 123456,
        'demoIntOrStringProp' => 45,
    ]);

    $data = $dto1->toArray();
    $this->assertSame([
        'demo_string_prop' => 'hello',
    ], $data);

    $data = $dto1->except(['demo_int_prop'], true)->toArray();
    $this->assertSame([
        'demo_string_prop'        => 'hello',
        'demo_int_or_string_prop' => 45,
    ], $data);
}
```
    
## withoutNull 设置转换数组时忽略 NULL 值

``` php
public function testWithoutNull(): void
{
    $dto1 = new DtoToArray3([
        'demoStringProp' => 'hello',
        'demoIntProp'    => 123456,
    ]);
    $data = $dto1->toArray();
    $this->assertSame([
        'demo_string_prop'       => 'hello',
        'demo_int_prop'          => 123456,
        'demo_optional_int_prop' => null,
    ], $data);

    $data = $dto1->withoutNull()->toArray();
    $this->assertSame([
        'demo_string_prop' => 'hello',
        'demo_int_prop'    => 123456,
    ], $data);
}
```
    
## toArray 对象转数组（下划线属性命名风格）

``` php
public function testToArrayUnCamelizeStyle(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => $dtoProp2 = new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $data = $dto1->toArray();
    $this->assertSame('foo', $data['demo_string_prop']);
    $this->assertSame(1, $data['demo_int_prop']);
    $this->assertSame(1.5, $data['demo_float_prop']);
    $this->assertSame(true, $data['demo_true_prop']);
    $this->assertSame(false, $data['demo_false_prop']);
    $this->assertSame(['demo1' => 'hello', 'demo2' => 'world'], $data['demo_object_prop']);
    $this->assertSame($dtoProp2, $data['demo_object2_prop']);
    $this->assertSame(['demo_string_prop' => 'hello world'], $data['demo_object3_prop']);
    $this->assertSame(true, $data['demo_mixed_prop']);
}
```
    
## toArray.camelizeNamingStyle 对象转数组（驼峰属性命名风格）

``` php
public function testToArrayCamelizeStyle(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => $dtoProp2 = new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $data = $dto1->camelizeNamingStyle()->toArray();
    $this->assertSame('foo', $data['demoStringProp']);
    $this->assertSame(1, $data['demoIntProp']);
    $this->assertSame(1.5, $data['demoFloatProp']);
    $this->assertSame(true, $data['demoTrueProp']);
    $this->assertSame(false, $data['demoFalseProp']);
    $this->assertSame(['demo1' => 'hello', 'demo2' => 'world'], $data['demoObjectProp']);
    $this->assertSame($dtoProp2, $data['demoObject2Prop']);
    $this->assertSame(['demoStringProp' => 'hello world'], $data['demoObject3Prop']);
    $this->assertSame(true, $data['demoMixedProp']);
}
```
    
## toArray 对象转数组带有白名单属性设置

``` php
public function testToArrayWithOnlyPropertys(): void
{
    $dto1 = new DtoToArray([
        'demoStringProp'      => 'hello',
        'demoIntProp'         => 123456,
        'demoIntOrStringProp' => 45,
    ]);

    $data = $dto1->toArray();
    $this->assertSame([
        'demo_int_prop'           => 123456,
        'demo_int_or_string_prop' => 45,
    ], $data);
}
```
    
## 数据传输对象属性数组访问 ArrayAccess.offsetExists 支持

``` php
public function testOffsetExists(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $this->assertTrue(isset($dto1['demo_string_prop']));
    $this->assertTrue(isset($dto1['demoStringProp']));
}
```
    
## 数据传输对象属性数组访问 ArrayAccess.offsetSet 支持

``` php
public function testOffsetSet(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $dto1['demo_string_prop'] = 'hello_world';
    $this->assertSame('hello_world', $dto1['demo_string_prop']);
    $this->assertSame('hello_world', $dto1['demoStringProp']);

    $dto1['demo_string_prop'] = 'hello_world2';
    $this->assertSame('hello_world2', $dto1['demo_string_prop']);
    $this->assertSame('hello_world2', $dto1['demoStringProp']);
}
```
    
## 数据传输对象属性数组访问 ArrayAccess.offsetGet 支持

``` php
public function testOffsetGet(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $this->assertSame('foo', $dto1['demo_string_prop']);
    $this->assertSame('foo', $dto1['demoStringProp']);
}
```
    
## 数据传输对象属性数组访问 ArrayAccess.offsetUnset 支持

``` php
public function testOffsetUnset(): void
{
    $this->expectException(\TypeError::class);
    $this->expectExceptionMessage(
        'Cannot assign null to property Tests\Support\Fixtures\Dto1::$demoStringProp of type string'
    );

    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $this->assertSame('foo', $dto1['demo_string_prop']);
    $this->assertSame('foo', $dto1['demoStringProp']);

    unset($dto1['demo_string_prop']);
}
```
    
## 数据传输对象属性访问魔术方法 __isset 支持

``` php
public function testMagicIsset(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);
    $this->assertTrue(isset($dto1->demo_string_prop));
    $this->assertTrue(isset($dto1->demo_int_prop));
}
```
    
## 数据传输对象属性访问魔术方法 __set 支持

``` php
public function testMagicSet(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);

    $this->assertSame('foo', $dto1->demo_string_prop);
    $dto1->demo_string_prop = 'hello';
    $this->assertSame('hello', $dto1->demo_string_prop);
}
```
    
## 数据传输对象属性访问魔术方法 __get 支持

``` php
public function testMagicGet(): void
{
    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);
    $this->assertSame('foo', $dto1->demo_string_prop);
}
```
    
## 实体属性访问魔术方法 __unset 支持

``` php
public function testMagicUnset(): void
{
    $this->expectException(\TypeError::class);
    $this->expectExceptionMessage(
        'Cannot assign null to property Tests\Support\Fixtures\Dto1::$demoStringProp of type string'
    );

    $dto1 = new Dto1([
        'demo_string_prop' => 'foo',
        'demoIntProp'      => 1,
        'demoFloatProp'    => 1.5,
        'demoObjectProp'   => new DtoProp1(),
        'demoObject2Prop'  => new DtoProp2(),
        'demoObject3Prop'  => new Dto2(['demoStringProp' => 'hello world']),
    ]);
    unset($dto1->demo_string_prop);
}
```
# 驗證器

::: tip Testing Is Documentation
[tests/Validate/ValidatorTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/ValidatorTest.php)
:::
    
**构造器函数原型**

``` php
public function __construct(array $data = [], array $rules = [], array $names = [], array $messages = []);
```

  * $data 验证的数据
  * $rules 验证规则
  * $names 校验名字隐射
  * $messages 校验失败消息

可以通过构造器传递参数，也可以通过 `name`,`message` 等方法传入。


**Uses**

 * use I18nMock;
 * use Leevel\Di\Container;
 * use Leevel\Validate\IValidator;
 * use Leevel\Validate\Validate;
 * use Leevel\Validate\Validator;

## 验证器基本使用方法

可以通过 `success` 判断是否通过验证，`error` 返回错误消息。


``` php
public function testBaseUse(): void
{
    $validate = new Validator(
        [
            'name' => '小牛哥',
        ],
        [
            'name'     => 'required|max_length:10',
        ],
        [
            'name'     => '用户名',
        ]
    );

    $this->assertInstanceof(IValidator::class, $validate);

    $rule = <<<'eot'
        {
            "name": [
                "required",
                "max_length:10"
            ]
        }
        eot;

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());
    $this->assertSame([], $validate->error());
    $this->assertSame([], $validate->getMessage());
    $this->assertSame(['name' => '小牛哥'], $validate->getData());

    $this->assertSame(
        $rule,
        $this->varJson(
            $validate->getRule()
        )
    );
}
```
    
## make 创建验证器

``` php
public function testMake(): void
{
    $validate = Validator::make(
        [
            'name' => '小牛哥',
        ],
        [
            'name'     => 'required|max_length:10',
        ],
        [
            'name'     => '用户名',
        ]
    );

    $rule = <<<'eot'
        {
            "name": [
                "required",
                "max_length:10"
            ]
        }
        eot;

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());
    $this->assertSame([], $validate->error());
    $this->assertSame([], $validate->getMessage());
    $this->assertSame(['name' => '小牛哥'], $validate->getData());

    $this->assertSame(
        $rule,
        $this->varJson(
            $validate->getRule()
        )
    );
}
```
    
## 验证器校验错误

``` php
public function testError(): void
{
    $validate = new Validator(
        [
            'name' => '小牛哥',
        ],
        [
            'name'     => 'required|min_length:20',
        ],
        [
            'name'     => '用户名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "用户名 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 设置校验数据

``` php
public function testData(): void
{
    $validate = new Validator(
        [
            'name' => '中国',
        ],
        [
            'name'     => 'required|min_length:20',
        ],
        [
            'name'     => '用户名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "用户名 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->data(['name' => '12345678901234567890']);

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());
}
```
    
## 添加校验数据

``` php
public function testAddData(): void
{
    $validate = new Validator(
        [
        ],
        [
            'name'     => 'required|min_length:20|'.IValidator::OPTIONAL,
        ],
        [
            'name'     => '用户名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "用户名 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());

    $validate->addData(['name' => '中国']);

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 设置校验规则

``` php
public function testRule(): void
{
    $validate = new Validator(
        [
            'name' => '中国',
        ],
        [
        ],
        [
            'name'     => '用户名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "用户名 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());

    $validate->rule(['name' => 'required|min_length:20']);

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->rule(['name' => 'required|max_length:20']);

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());
}
```
    
## 设置校验规则支持条件

第一个闭包条件参数不为空，如果闭包返回 `true` 则添加改验证规则，否则忽略。

``` php
public function testRuleIf(): void
{
    $validate = new Validator(
        [
            'name' => '中国',
        ],
        [
        ],
        [
            'name'     => '用户名',
        ]
    );

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());

    $validate->rule(['name' => 'required|min_length:20'], function (array $data) {
        $this->assertSame(['name' => '中国'], $data);

        return false;
    });

    $rule = <<<'eot'
        []
        eot;

    $this->assertSame(
        $rule,
        $this->varJson(
            $validate->getRule()
        )
    );

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());
}
```
    
## 添加校验规则

``` php
public function testAddRule(): void
{
    $validate = new Validator(
        [
            'name' => '中国',
        ],
        [
        ],
        [
            'name'     => '用户名',
        ]
    );

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());

    $validate->addRule(['name' => 'required|min_length:20']);

    $rule = <<<'eot'
        {
            "name": [
                "required",
                "min_length:20"
            ]
        }
        eot;

    $this->assertSame(
        $rule,
        $this->varJson(
            $validate->getRule()
        )
    );

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $error = <<<'eot'
        {
            "name": [
                "用户名 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 添加校验规则支持条件

第一个闭包条件参数不为空，如果闭包返回 `true` 则添加改验证规则，否则忽略。

``` php
public function testAddRuleIf(): void
{
    $validate = new Validator(
        [
            'name' => '中国',
        ],
        [
        ],
        [
            'name'     => '用户名',
        ]
    );

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());

    $validate->addRule(['name' => 'required|min_length:20'], function (array $data) {
        $this->assertSame(['name' => '中国'], $data);

        return false;
    });

    $rule = <<<'eot'
        []
        eot;

    $this->assertSame(
        $rule,
        $this->varJson(
            $validate->getRule()
        )
    );

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());
}
```
    
## 设置验证消息

``` php
public function testMessage(): void
{
    $validate = new Validator(
        [
            'name' => '中国',
        ],
        [
            'name'     => 'required|min_length:20',
        ],
        [
            'name'     => '用户名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "用户名 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->message(['min_length' => '{field} not min {rule}']);

    $error = <<<'eot'
        {
            "name": [
                "用户名 not min 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 添加验证消息

设置规则所有字段的验证消息。

``` php
public function testAddMessage(): void
{
    $validate = new Validator(
        [
            'name' => '中国',
        ],
        [
            'name'     => 'required|min_length:20',
        ],
        [
            'name'     => '用户名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "用户名 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->addMessage(['min_length' => '{field} foo bar {rule}']);

    $error = <<<'eot'
        {
            "name": [
                "用户名 foo bar 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 添加指定字段验证规则消息

可以单独为某个字段指定验证消息规则，其它字段验证消息保持不变。

``` php
public function testAddMessageForOneField(): void
{
    $validate = new Validator(
        [
            'name' => '中国',
        ],
        [
            'name'     => 'required|min_length:20',
        ],
        [
            'name'     => '用户名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "用户名 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->addMessage(['name' => ['min_length' => '{field} hello world {rule}']]);

    $error = <<<'eot'
        {
            "name": [
                "用户名 hello world 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 添加指定字段验证规则消息(圆点分隔)

通过圆点 `.` 分隔开来。

``` php
public function testAddMessageForOneFieldSeparateByDot(): void
{
    $validate = new Validator(
        [
            'name' => '中国',
        ],
        [
            'name'     => 'required|min_length:20',
        ],
        [
            'name'     => '用户名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "用户名 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->addMessage(['name.min_length' => '{field} hehe {rule}']);

    $error = <<<'eot'
        {
            "name": [
                "用户名 hehe 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 添加指定多层子字段验证规则消息(圆点分隔)

通过圆点 `.` 分隔开来。

``` php
public function testSubDataWithSubMessage(): void
{
    $validate = new Validator(
        [
            'name' => ['sub' => ['sub' => '']],
        ],
        [
            'name.sub.sub' => 'required|'.Validator::MUST,
        ],
        [
            'name'     => '歌曲',
        ]
    );

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $error = <<<'eot'
        {
            "name.sub.sub": [
                "name.sub.sub 不能为空"
            ]
        }
        eot;

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->addMessage(['name.sub.sub' => ['required' => '字段 {field} 不能为空']]);

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $error = <<<'eot'
        {
            "name.sub.sub": [
                "字段 name.sub.sub 不能为空"
            ]
        }
        eot;

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 添加通配符字段验证规则消息

通过 `*` 来代表通配符。

``` php
public function testWildcardSubDataWithSubMessage(): void
{
    $validate = new Validator(
        [
            'name' => ['sub' => ['sub' => '']],
        ],
        [
            'name.sub.sub' => 'required|'.Validator::MUST,
        ],
        [
            'name'     => '歌曲',
        ]
    );

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $error = <<<'eot'
        {
            "name.sub.sub": [
                "name.sub.sub 不能为空"
            ]
        }
        eot;

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->addMessage(['name*' => ['required' => 'sub {field} must have value']]);

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $error = <<<'eot'
        {
            "name.sub.sub": [
                "sub name.sub.sub must have value"
            ]
        }
        eot;

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 设置验证字段隐射

``` php
public function testName(): void
{
    $validate = new Validator(
        [
            'name' => '中国',
        ],
        [
            'name'     => 'required|min_length:20',
        ],
        [
            'name'     => '用户名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "用户名 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());
    $this->assertSame(['name' => '用户名'], $validate->getName());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->name(['name' => 'username']);

    $error = <<<'eot'
        {
            "name": [
                "username 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 添加验证字段隐射

``` php
public function testAddName(): void
{
    $validate = new Validator(
        [
            'name' => '中国',
        ],
        [
            'name'     => 'required|min_length:20',
        ],
        [
            'name'     => '用户名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "用户名 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());
    $this->assertSame(['name' => '用户名'], $validate->getName());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->addName(['name' => 'hello world']);

    $error = <<<'eot'
        {
            "name": [
                "hello world 不满足最小长度 20"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 设置验证规则别名

``` php
public function testAlias(): void
{
    $validate = new Validator(
        [
            'name' => '成都',
        ],
        [
            'name'     => 'required|min_length:5',
        ],
        [
            'name'     => '地名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "地名 不满足最小长度 5"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());
    $this->assertSame(['name' => '地名'], $validate->getName());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->alias('min_length', 'minl');
    $validate->rule(['name' => 'required|minl:9']);

    $error = <<<'eot'
        {
            "name": [
                "地名 不满足最小长度 9"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 批量设置验证规则别名

``` php
public function testAliasMany(): void
{
    $validate = new Validator(
        [
            'name' => '成都',
        ],
        [
            'name'     => 'required|min_length:5',
        ],
        [
            'name'     => '地名',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "地名 不满足最小长度 5"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());
    $this->assertSame(['name' => '地名'], $validate->getName());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->aliasMany(['min_length' => 'min2']);
    $validate->rule(['name' => 'required|min2:11']);

    $error = <<<'eot'
        {
            "name": [
                "地名 不满足最小长度 11"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 验证后回调

无论成功或者失败都会执行回调。

``` php
public function testAfter(): void
{
    $validate = new Validator(
        [
            'name' => '成都',
        ],
        [
            'name'     => 'required|max_length:10',
        ],
        [
            'name'     => '地名',
        ]
    );

    $validate->after(function ($v) {
        $this->assertSame(['name' => '地名'], $v->getName());
    });

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());
}
```
    
## 自定义扩展验证规则

``` php
public function testExtend(): void
{
    $validate = new Validator(
        [
            'name' => 1,
        ],
        [
            'name'     => 'required|custom_rule:10',
        ],
        [
            'name'     => '地名',
        ]
    );

    $validate->extend('custom_rule', function ($value, array $param, IValidator $validator, string $field): bool {
        if (1 === $value) {
            return true;
        }

        return false;
    });

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());

    $validate->data(['name' => 0]);

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());
}
```
    
## 直接调用验证规则

``` php
public function testCall(): void
{
    $validate = new Validator();

    $this->assertTrue($validate->minLength('成都', 1));
    $this->assertTrue($validate->minLength('成都', 2));
    $this->assertFalse($validate->minLength('成都', 3));
    $this->assertFalse($validate->alpha('成都'));
    $this->assertTrue($validate->alpha('cd'));
}
```
    
## 直接调用自定义验证规则

``` php
public function testCallCustom(): void
{
    $validate = new Validator();

    $validate->extend('custom_foo_bar', function (string $field, $value, array $param): bool {
        if ('成都' === $value) {
            return true;
        }

        return false;
    });

    $this->assertTrue($validate->customFooBar('成都'));
    $this->assertFalse($validate->customFooBar('魂之挽歌'));
}
```
    
## 自定义扩展验证规则(类)

自定义扩展规则可以为一个独立的类，例如下面的例子。

``` php
namespace Tests\Validate;

class ExtendClassTest1
{
    public function handle($value, array $param, IValidator $validator, string $field): bool
    {
        if (1 === $value) {
            return true;
        }

        return false;
    }

    public function handle2($value, array $param, IValidator $validator, string $field): bool
    {
        if (2 === $value) {
            return true;
        }

        return false;
    }
}
```

默认情况下，此时自定义类的 `handle` 方法将作为验证入口。


``` php
public function testCallExtendClass(): void
{
    $validate = new Validator(
        [
            'name' => 1,
        ],
        [
            'name'     => 'custom_foobar',
        ],
        [
            'name'     => '地名',
        ]
    );

    $container = new Container();
    $validate->setContainer($container);
    $validate->extend('custom_foobar', ExtendClassTest1::class);
    $this->assertTrue($validate->success());
    $validate->data(['name' => 'foo']);
    $this->assertFalse($validate->success());
}
```
    
## 自定义扩展验证规则(类)，指定验证方法

自定义扩展规则可以为一个独立的类，例如下面的例子。

``` php
namespace Tests\Validate;

class ExtendClassTest1
{
    public function handle($value, array $param, IValidator $validator, string $field): bool
    {
        if (1 === $value) {
            return true;
        }

        return false;
    }

    public function handle2($value, array $param, IValidator $validator, string $field): bool
    {
        if (2 === $value) {
            return true;
        }

        return false;
    }
}
```

指定方法情况下,通过 `@` 分隔开来，此时自定义类的 `handle2` 方法将作为验证入口。


``` php
public function testCallExtendClassWithCustomMethod(): void
{
    $validate = new Validator(
        [
            'name' => 2,
        ],
        [
            'name'     => 'custom_foobar',
        ],
        [
            'name'     => '地名',
        ]
    );

    $container = new Container();
    $validate->setContainer($container);
    $validate->extend('custom_foobar', ExtendClassTest1::class.'@handle2');
    $this->assertTrue($validate->success());
    $validate->data(['name' => 'foo']);
    $this->assertFalse($validate->success());
}
```
    
## 验证失败则跳过其它验证规则

只需要在校验规则中加入 `SKIP_OTHER` 即可。


``` php
public function testShouldSkipOther(): void
{
    $validate = new Validator(
        [
            'name'  => '',
            'value' => '',
        ],
        [
            'name'     => 'required|alpha',
            'value'    => 'required',
        ],
        [
            'name'      => '地名',
            'value'     => '值',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "地名 不能为空",
                "地名 只能是字母"
            ],
            "value": [
                "值 不能为空"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());
    $this->assertSame(['name' => '地名', 'value' => '值'], $validate->getName());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->addRule(['name' => 'required|alpha|'.Validator::SKIP_OTHER]);

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $error = <<<'eot'
        {
            "name": [
                "地名 不能为空"
            ]
        }
        eot;

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 验证失败则跳过自身其它验证规则

只需要在校验规则中加入 `SKIP_SELF` 即可，只会跳过当前字段的其他验证规则，而其它字段的验证规则不受影响。


``` php
public function testShouldSkipSelf(): void
{
    $validate = new Validator(
        [
            'name'  => '',
            'value' => '',
        ],
        [
            'name'     => 'required|alpha',
            'value'    => 'required',
        ],
        [
            'name'      => '地名',
            'value'     => '值',
        ]
    );

    $error = <<<'eot'
        {
            "name": [
                "地名 不能为空",
                "地名 只能是字母"
            ],
            "value": [
                "值 不能为空"
            ]
        }
        eot;

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());
    $this->assertSame(['name' => '地名', 'value' => '值'], $validate->getName());

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->addRule(['name' => 'required|alpha|'.Validator::SKIP_SELF]);

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $error = <<<'eot'
        {
            "name": [
                "地名 不能为空"
            ],
            "value": [
                "值 不能为空"
            ]
        }
        eot;

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 值为 null 会跳过可选验证规则

如果校验规则中有 `OPTIONAL` ，那么字段值为 `null` 则不会执行验证规则。


``` php
public function testOptional(): void
{
    $validate = new Validator(
        [
            'name' => null,
        ],
        [
            'name'     => 'required|'.Validator::OPTIONAL,
        ],
        [
            'name'     => '地名',
        ]
    );

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());
    $this->assertSame(['name' => '地名'], $validate->getName());
}
```
    
## 值为 null 默认必须验证

我们加入 `MUST` 或者默认不指定，那么 `null` 也会执行验证。


``` php
public function testMustRequired(): void
{
    $validate = new Validator(
        [
            'name' => null,
        ],
        [
            'name'     => 'required|'.Validator::OPTIONAL,
        ],
        [
            'name'     => '地名',
        ]
    );

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());
    $this->assertSame(['name' => '地名'], $validate->getName());

    $validate->rule(['name' => 'required']);
    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $error = <<<'eot'
        {
            "name": [
                "地名 不能为空"
            ]
        }
        eot;

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );

    $validate->data(['name' => null]);
    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());

    $error = <<<'eot'
        {
            "name": [
                "地名 不能为空"
            ]
        }
        eot;

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error()
        )
    );
}
```
    
## 通配符验证规则支持

可以通过 `*` 来表示通配符验证规则。


``` php
public function testWildcardRule(): void
{
    $validate = new Validator(
        [
            'name'  => '',
            'nafoo' => '',
            'nabar' => '',
        ],
        [
        ],
        [
            'name'      => '地名',
            'nafoo'     => 'foo',
            'nabar'     => 'bar',
        ]
    );

    $this->assertTrue($validate->success());
    $this->assertFalse($validate->fail());

    $validate->rule(['na*' => 'required']);

    $this->assertFalse($validate->success());
    $this->assertTrue($validate->fail());
    $this->assertSame(['name' => '地名', 'nafoo' => 'foo', 'nabar' => 'bar'], $validate->getName());

    $data = <<<'eot'
        {
            "name": "",
            "nafoo": "",
            "nabar": ""
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $validate->getData()
        )
    );

    $rule = <<<'eot'
        {
            "name": [
                "required"
            ],
            "nafoo": [
                "required"
            ],
            "nabar": [
                "required"
            ]
        }
        eot;

    $this->assertSame(
        $rule,
        $this->varJson(
            $validate->getRule(),
            1
        )
    );

    $error = <<<'eot'
        {
            "name": [
                "地名 不能为空"
            ],
            "nafoo": [
                "foo 不能为空"
            ],
            "nabar": [
                "bar 不能为空"
            ]
        }
        eot;

    $this->assertSame(
        $error,
        $this->varJson(
            $validate->error(),
            2
        )
    );
}
```
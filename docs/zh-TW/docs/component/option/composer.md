# Composer 扩展配置

::: tip Testing Is Documentation
[tests/Option/ComposerOptionTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Option/ComposerOptionTest.php)
:::
    
QueryPHP 系统服务提供者、应用命令、扩展配置和扩展语言包等都在 `composer` 中进行定义。

**Uses**

 * use Leevel\Option\ComposerOption;

## composer.json 

示例配置

``` json
{
    "name": "hunzhiwange/queryphp",
    "extra": {
        "leevel": {
            "providers": [
                "Common\\Infra\\Provider\\Event",
                "Common\\Infra\\Provider\\Router"
            ],
            "ignores": [
                "Leevel\\Notexits\\Provider\\Register"
            ],
            "commands": [
                "Common\\App\\Console"
            ],
            "options": {
                "demo": "option/extend/test.php"
            },
            "i18ns": "i18n/extend",
            "metas": {
                "foo": "bar"
            }
        }
    }
}
```

相关配置约定在 `leevel` 字段中，可以非常方便地扩展系统。


``` php
public function testBaseUse(): void
{
    $options = ($composerOption = new ComposerOption(__DIR__.'/app1'))->loadData();

    $data = <<<'eot'
        {
            "providers": [
                "Tests\\Option\\Providers\\Foo",
                "Tests\\Option\\Providers\\Bar",
                "Demo\\Provider\\Register",
                "Common\\Infra\\Provider\\Event",
                "Common\\Infra\\Provider\\Router"
            ],
            "ignores": [
                "Leevel\\Notexits\\Provider\\Register"
            ],
            "commands": [
                "Tests\\Option\\Commands\\Test",
                "Tests\\Option\\Commands\\Console",
                "Demo\\Demo\\Console",
                "Common\\App\\Console"
            ],
            "options": {
                "demo": "option\/extend\/test.php"
            },
            "i18ns": [
                "i18n\/extend"
            ],
            "metas": {
                "foo": "bar"
            }
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $options
        )
    );

    $this->assertSame(
        $data,
        $this->varJson(
            $composerOption->loadData()
        )
    );
}
```
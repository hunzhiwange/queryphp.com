# 系统配置

::: tip Testing Is Documentation
[tests/Option/OptionTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Option/OptionTest.php)
:::
    
QueryPHP 为系统提供了灵活的配置，通常来说通过服务提供者将配置打包到服务容器中，可以很方便地使用。

### 使用方式

使用助手函数

``` php
\Leevel\Option\Helper::option_get(string $key, $default = null);
\Leevel\Option\Helper::option_set($name, $value = null): void;
\Leevel\Option\Helper::function option(): \Leevel\Option\IOption;
```

使用容器 option 服务

``` php
\App::make('option')->set($name, $value = null): void;
\App::make('option')->get(string $name = 'app\\', $defaults = null);
```

依赖注入

``` php
class Demo
{
    private $option;

    public function __construct(\Leevel\Option\IOption $option)
    {
        $this->option = $option;
    }
}
```

### 配置目录

系统配置文件为 option 目录，每个配置文件对应不同的组件，当然你也可以增加自定义的配置文件。

 * 配置位于 `option`，可以定义配置文件。
 * 主要配置文件包含应用、数据库、缓存、日志、Session 等等。
 * 扩展配置 `common/ui/option/test.php` 目录，在 `composer.json` 中定义。

composer.json 可以扩展目录

``` json
{
    "extra": {
        "leevel": {
            "@options": "The extend options",
            "options": {
                "test": "common/ui/option/test.php"
            }
        }
    }
}

注意，其它软件包也可以采用这种方式自动注入扩展默认配置。

系统默认常见配置：

|支持字符|替换字符|
|:-|:-|
|app|应用配置|
|auth|登陆验证|
|cache|缓存配置|
|console|控制台配置|
|cookie|Cookie 配置|
|database|数据库配置|
|debug|调试配置|
|filesystem|文件系统配置|
|i18n|国际化配置|
|log|日志配置|
|mail|邮件配置|
|protocol|Swoole 配置|
|session|Session 配置|
|throttler|限流配置|
|view|视图配置|
```

### 配置缓存

配置支持生成缓存，通过内置的命令即可实现。

``` sh
php leevel option:cache
```

返回结果

```
Start to cache option.
Option cache file /data/codes/queryphp/bootstrap/option.php cache successed.
```

``` sh
php leevel option:clear
```

返回结果

```
Start to clear cache option.
Option cache file /data/codes/queryphp/bootstrap/option.php cache clear successed.
```


**Uses**

 * use Leevel\Option\Option;
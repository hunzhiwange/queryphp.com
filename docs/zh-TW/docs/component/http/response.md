# HTTP Response

::: tip Testing Is Documentation
[tests/Http/ResponseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/ResponseTest.php)
:::
    
QueryPHP 请求对象基于 Symfony 二次开发，功能非常强大，做了一些精简和优化。 

::: warning 注意
为了一致性或者更好与 Swoole 对接，请统一使用响应对象返回，框架会自动处理返回结果，请避免直接使用 `echo`、`die` 等中断后续处理。
:::


**Uses**

 * use DateTime;
 * use DateTimeZone;
 * use InvalidArgumentException;
 * use JsonSerializable;
 * use Leevel\Http\Response;
 * use Leevel\Support\IArray;
 * use Leevel\Support\IJson;
 * use ReflectionProperty;
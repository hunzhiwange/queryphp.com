# Mail

::: tip Testing Is Documentation
[tests/Mail/MailTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Mail/MailTest.php)
:::
    
邮件发送统一由邮件组件完成，通常我们使用代理 `\Leevel\Mail\Proxy\Mail` 类进行静态调用。

QueryPHP 的邮件底层为 `swiftmailer/swiftmailer`，系统进行了简单的一层封装。

内置支持的邮件驱动类型包括 smtp、sendmail、test，未来可能增加其他驱动。

## 使用方式

使用容器 mails 服务

``` php
\App::make('mails')->html(string $content): \Leevel\Mail\IMail;
```

依赖注入

``` php
class Demo
{
    private \Leevel\Mail\Manager $mail;

    public function __construct(\Leevel\Mail\Manager $mail)
    {
        $this->mail = $mail;
    }
}
```

使用静态代理

``` php
\Leevel\Log\Proxy\Log::html(string $content): \Leevel\Mail\IMail;
```

## mail 配置

系统的 mail 配置位于应用下面的 `option/mail.php` 文件。

可以定义多个邮件连接，并且支持切换，每一个连接支持驱动设置。

``` php
<?php

declare(strict_types=1);

/*
 * This file is part of the your app package.
 *
 * The PHP Application For Code Poem For You.
 * (c) 2018-2099 http://yourdomian.com All rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

return [
    /*
     * ---------------------------------------------------------------
     * 邮件驱动
     * ---------------------------------------------------------------
     *
     * 采用什么方式发送邮件数据
     */
    'default' => Leevel::env('MAIL_DRIVER', 'smtp'),

    /*
     * ---------------------------------------------------------------
     * 邮件发送地址
     * ---------------------------------------------------------------
     *
     * 必须设置邮件发送的邮箱
     */
    'global_from' => [
        'address' => Leevel::env('MAIL_GLOBAL_FROM_ADDRESS'),
        'name'    => Leevel::env('MAIL_GLOBAL_FROM_NAME'),
    ],

    /*
     * ---------------------------------------------------------------
     * 邮件全局接收地址
     * ---------------------------------------------------------------
     *
     * 这个可以不用设置，如果设置所有邮件都会发送一份到这个邮箱
     */
    'global_to' => [
        'address' => null,
        'name'    => null,
    ],

    /*
     * ---------------------------------------------------------------
     * 邮件驱动连接参数
     * ---------------------------------------------------------------
     *
     * 这里为所有的邮件驱动的连接参数，每一种不同的驱动拥有不同的配置
     * 虽然有不同的驱动，但是在使用上却有着一致性
     */
    'connect' => [
        'smtp' => [
            // driver
            'driver' => 'smtp',

            // smtp 主机
            'host' => Leevel::env('MAIL_HOST', 'smtp.qq.com'),

            // 端口
            'port' => (int) Leevel::env('MAIL_PORT', 587),

            // 用户名
            'username' => Leevel::env('MAIL_USERNAME'),

            // 登录密码
            'password' => Leevel::env('MAIL_PASSWORD'),

            // 加密方式
            'encryption' => Leevel::env('MAIL_ENCRYPTION', 'ssl'),
        ],

        'sendmail' => [
            // driver
            'driver' => 'sendmail',

            // 命令路径
            'path' => '/usr/sbin/sendmail -bs',
        ],

        'test' => [
            // driver
            'driver' => 'test',
        ],
    ],
];

```

mail 参数根据不同的连接会有所区别，通用的 mail 参数如下：

|配置项|配置描述|
|:-|:-|
|global_from|邮件发送地址|
|global_to|邮件全局接收地址|


**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Kernel\App;
use Leevel\Mail\Mail;
use Leevel\Mail\Smtp;
use Leevel\Option\Option;
use Leevel\View\Manager;
use Swift_Attachment;
use Swift_Message;
use Swift_Mime_SimpleMessage;
```

## plain 纯文本邮件内容

``` php
public function testBaseUse(): void
{
    $mail = $this->makeMail();
    $mail->plain('hello');
    $result = $mail->flush();

    $this->assertSame(1, $result);
    $this->assertSame([], $mail->failedRecipients());
}
```
    
## html HTML 邮件内容

``` php
public function testHtml(): void
{
    $mail = $this->makeMail();
    $mail->html('<b style="color:red;">hello</b>');
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## html HTML 邮件内容支持多次添加

``` php
public function testHtmlMulti(): void
{
    $mail = $this->makeMail();
    $mail->html('<b style="color:red;">hello</b>');
    $mail->html('<b style="color:blue;">world</b>');
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## view 视图 HTML 邮件内容

**fixture 定义**

**mail1.php**

``` php
<h1>mail1 template</h1>

<div style="background:blue;color:#fff;padding:10px;width:100px;">
foo <?php echo $foo; ?>
</div>

```


``` php
public function testView(): void
{
    $mail = $this->makeMail();
    $mail->view(__DIR__.'/assert/mail1.php', ['foo' => 'bar']);
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## view 视图 HTML 邮件内容支持多次添加

``` php
public function testViewMulti(): void
{
    $mail = $this->makeMail();
    $mail->view(__DIR__.'/assert/mail1.php', ['foo' => 'bar']);
    $mail->view(__DIR__.'/assert/mail1.php', ['foo' => 'hello']);
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## viewPlain 视图纯文本邮件内容

``` php
public function testViewPlain(): void
{
    $mail = $this->makeMail();
    $mail->viewPlain(__DIR__.'/assert/mail1.php', ['foo' => 'bar']);
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## viewPlain 视图纯文本邮件内容支持多次添加

``` php
public function testViewPlainMulti(): void
{
    $mail = $this->makeMail();
    $mail->viewPlain(__DIR__.'/assert/mail1.php', ['foo' => 'bar']);
    $mail->viewPlain(__DIR__.'/assert/mail1.php', ['foo' => 'hello']);
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## attachMail 添加附件

``` php
public function testAttach(): void
{
    $mail = $this->makeMail();
    $mail->html('hello attach');
    $mail->attachMail(__DIR__.'/assert/logo.png');
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## attachMail 添加附件支持设置附件名字

``` php
public function testAttachSupportSetFilename(): void
{
    $mail = $this->makeMail();
    $mail->html('hello attach');
    $mail->attachMail(__DIR__.'/assert/logo.png', function (Swift_Attachment $attachment) {
        $attachment->setFilename('logo2.jpg');
    });
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## attachData 添加内存内容附件

``` php
public function testAttachData(): void
{
    $mail = $this->makeMail();
    $mail->html('hello attach');
    $mail->attachData(file_get_contents(__DIR__.'/assert/logo.png'), 'hello.png');
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## view 视图 HTML 邮件内容支持附件

**fixture 定义**

**mail2.php**

``` php
<h1>mail2 template</h1>

<div style="background:blue;color:#fff;padding:10px;width:100px;">
<img src="<?php echo $mail->attachView($path); ?>" />
</div>

```


``` php
public function testAttachView(): void
{
    $mail = $this->makeMail();
    $mail->view(__DIR__.'/assert/mail2.php', ['path' => __DIR__.'/assert/logo.png']);
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## plain 纯文本邮件内容

``` php
public function testAttachDataView(): void
{
    $mail = $this->makeMail();
    $mail->view(__DIR__.'/assert/mail3.php', ['data' => file_get_contents(__DIR__.'/assert/logo.png')]);
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## attachData 添加内存内容附件支持附件中文名字

``` php
public function testAttachChinese(): void
{
    $mail = $this->makeMail();
    $mail->html('hello attach');
    $mail->attachData(
        file_get_contents(__DIR__.'/assert/logo.png'),
        $mail->attachChinese('魂之挽歌.png')
    );
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## HTML 邮件优先级默认高于纯文本邮件

HTML 邮件内容与纯文本邮件内容同时存在，系统优先采用前者。

**flush 函数原型**

``` php
# Leevel\Mail\Mail::flush
/**
 * {@inheritDoc}
 */
public function flush(?Closure $callbacks = null, bool $htmlPriority = true): int;
```


``` php
public function testSendHtmlAndPlain(): void
{
    $mail = $this->makeMail();
    $mail->plain('hello');
    $mail->html('<b style="color:red;">hello</b>');
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## 可以设置纯文本邮件优先级高于 HTML 邮件

``` php
public function testSendHtmlAndPlainAndPlainIsFirst(): void
{
    $mail = $this->makeMail();
    $mail->plain('hello');
    $mail->html('<b style="color:red;">hello</b>');
    $result = $mail->flush(null, false);

    $this->assertSame(1, $result);
}
```
    
## message 消息回调处理

``` php
public function testMessage(): void
{
    $mail = $this->makeMail();
    $mail->plain('hello');
    $mail->message(function (Swift_Message $message) {
        $message->setSubject('the subject');
    });
    $result = $mail->flush();

    $this->assertSame(1, $result);
}
```
    
## flush 消息回调处理

``` php
public function testFlushWithMessage(): void
{
    $mail = $this->makeMail();
    $mail->plain('hello');
    $result = $mail->flush(function (Swift_Message $message) {
        $message->setSubject('the subject');
    });

    $this->assertSame(1, $result);
}
```
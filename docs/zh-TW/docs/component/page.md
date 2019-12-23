# 分頁

::: tip Testing Is Documentation
[tests/Page/PageTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Page/PageTest.php)
:::
    
QueryPHP 提供的分页组件，可以轻松地对数据进行分页处理，这里仅仅是分页组件本身，数据库查询分页见 @todo。


**Uses**

``` php
<?php

use I18nMock;
use Leevel\Di\Container;
use Leevel\Page\Bootstrap;
use Leevel\Page\IPage;
use Leevel\Page\Page;
use Leevel\Page\Render;
```

## render 分页基本使用

``` php
public function testBaseUse(): void
{
    $page = new Page(1, 10, 52);

    $this->assertInstanceof(IPage::class, $page);

    $data = <<<'eot'
        <div class="pagination"> <span class="pagination-total">共 52 条</span> <button class="btn-prev disabled">&#8249;</button> <ul class="pager">  <li class="number active"><a>1</a></li><li class="number"><a href="?page=2">2</a></li><li class="number"><a href="?page=3">3</a></li><li class="number"><a href="?page=4">4</a></li><li class="number"><a href="?page=5">5</a></li><li class="number"><a href="?page=6">6</a></li>  </ul> <button class="btn-next" onclick="window.location.href='?page=2';">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="?page={jump}" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );

    $this->assertSame(
        $data,
        $page->toHtml()
    );

    $this->assertSame(
        $data,
        $page->__toString()
    );

    $this->assertSame(
        $data,
        (string) ($page)
    );

    $data = <<<'eot'
        {
            "per_page": 10,
            "current_page": 1,
            "total_page": 6,
            "total_record": 52,
            "total_macro": false,
            "from": 0,
            "to": 10
        }
        eot;

    $this->assertSame(
        $data,
            $this->varJson(
                $page->toArray()
            )
    );

    $this->assertSame(
        $data,
            $this->varJson(
                $page->jsonSerialize()
            )
    );

    $data = <<<'eot'
        {"per_page":10,"current_page":1,"total_page":6,"total_record":52,"total_macro":false,"from":0,"to":10}
        eot;

    $this->assertSame(
        $data,
        $page->toJson()
    );
}
```
    
## 分页页码必须大于 0

``` php
public function testCurrentPageIsZero(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Current page must great than 0.'
    );

    $page = new Page(0, 10, 12);
    $page->render();
}
```
    
## fragment.getFragment 分页 URL 描点

``` php
public function testFragment(): void
{
    $page = new Page(1, 10, 52);

    $page->fragment('hello');

    $this->assertSame('hello', $page->getFragment());

    $data = <<<'eot'
        <div class="pagination"> <span class="pagination-total">共 52 条</span> <button class="btn-prev disabled">&#8249;</button> <ul class="pager">  <li class="number active"><a>1</a></li><li class="number"><a href="?page=2#hello">2</a></li><li class="number"><a href="?page=3#hello">3</a></li><li class="number"><a href="?page=4#hello">4</a></li><li class="number"><a href="?page=5#hello">5</a></li><li class="number"><a href="?page=6#hello">6</a></li>  </ul> <button class="btn-next" onclick="window.location.href='?page=2#hello';">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="?page={jump}#hello" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );

    $data = <<<'eot'
        <nav aria-label="navigation"> <ul class="pagination"> <li class="disabled"><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>  <li class=" active"><a>1</a></li><li class=""><a href="?page=2#hello">2</a></li><li class=""><a href="?page=3#hello">3</a></li><li class=""><a href="?page=4#hello">4</a></li><li class=""><a href="?page=5#hello">5</a></li><li class=""><a href="?page=6#hello">6</a></li>  <li><a aria-label="Next" href="?page=2#hello"><span aria-hidden="true">&raquo;</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrap')
    );

    $data = <<<'eot'
        <nav aria-label="..."> <ul class="pager"> <li class="disabled"><a aria-label="Previous"><span aria-hidden="true">上一页</span></a></li> <li class=""><a aria-label="Next" href="?page=2#hello"><span aria-hidden="true">下一页</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrapSimple')
    );
}
```
    
## perPage.getPerPage 每页分页数量

``` php
public function testPerPage(): void
{
    $page = new Page(1, 10, 52);

    $this->assertSame(10, $page->getPerPage());

    $page->perPage(20);

    $this->assertSame(20, $page->getPerPage());

    $data = <<<'eot'
        <div class="pagination"> <span class="pagination-total">共 52 条</span> <button class="btn-prev disabled">&#8249;</button> <ul class="pager">  <li class="number active"><a>1</a></li><li class="number"><a href="?page=2">2</a></li><li class="number"><a href="?page=3">3</a></li>  </ul> <button class="btn-next" onclick="window.location.href='?page=2';">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="?page={jump}" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );

    $data = <<<'eot'
        <nav aria-label="navigation"> <ul class="pagination"> <li class="disabled"><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>  <li class=" active"><a>1</a></li><li class=""><a href="?page=2">2</a></li><li class=""><a href="?page=3">3</a></li>  <li><a aria-label="Next" href="?page=2"><span aria-hidden="true">&raquo;</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrap')
    );

    $data = <<<'eot'
        <nav aria-label="..."> <ul class="pager"> <li class="disabled"><a aria-label="Previous"><span aria-hidden="true">上一页</span></a></li> <li class=""><a aria-label="Next" href="?page=2"><span aria-hidden="true">下一页</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrapSimple')
    );
}
```
    
## 分页渲染配置

``` php
public function testSetSmallTemplate(): void
{
    $page = new Page(1, 10, 52, [
        'render_option' => ['small_template' => true],
    ]);

    $data = <<<'eot'
        <div class="pagination"> <button class="btn-prev disabled">&#8249;</button> <ul class="pager">  <li class="number active"><a>1</a></li><li class="number"><a href="?page=2">2</a></li><li class="number"><a href="?page=3">3</a></li><li class="number"><a href="?page=4">4</a></li><li class="number"><a href="?page=5">5</a></li><li class="number"><a href="?page=6">6</a></li>  </ul> <button class="btn-next" onclick="window.location.href='?page=2';">&#8250;</button> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );

    $data = <<<'eot'
        <nav aria-label="navigation"> <ul class="pagination"> <li class="disabled"><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>  <li class=" active"><a>1</a></li><li class=""><a href="?page=2">2</a></li><li class=""><a href="?page=3">3</a></li><li class=""><a href="?page=4">4</a></li><li class=""><a href="?page=5">5</a></li><li class=""><a href="?page=6">6</a></li>  <li><a aria-label="Next" href="?page=2"><span aria-hidden="true">&raquo;</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrap')
    );

    $data = <<<'eot'
        <nav aria-label="..."> <ul class="pager"> <li class="disabled"><a aria-label="Previous"><span aria-hidden="true">上一页</span></a></li> <li class=""><a aria-label="Next" href="?page=2"><span aria-hidden="true">下一页</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrapSimple')
    );
}
```
    
## append.addParam.appends 追加分页条件

``` php
public function testAppend(): void
{
    $page = new Page(1, 5, 3);

    $page->append('foo', 'bar');

    $page->addParam('foo1', 'bar1');

    $page->appends(['hello' => 'world']);

    $data = <<<'eot'
        <div class="pagination"> <span class="pagination-total">共 3 条</span> <button class="btn-prev disabled">&#8249;</button> <ul class="pager">    </ul> <button class="btn-next disabled">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="?foo=bar&foo1=bar1&hello=world&page={jump}" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );

    $page->param(['hello' => 'world']);

    $data = <<<'eot'
        <div class="pagination"> <span class="pagination-total">共 3 条</span> <button class="btn-prev disabled">&#8249;</button> <ul class="pager">    </ul> <button class="btn-next disabled">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="?hello=world&page={jump}" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );

    $data = <<<'eot'
        <nav aria-label="navigation"> <ul class="pagination"> <li class="disabled"><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>    <li class="disabled"><a aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrap')
    );

    $data = <<<'eot'
        <nav aria-label="..."> <ul class="pager"> <li class="disabled"><a aria-label="Previous"><span aria-hidden="true">上一页</span></a></li> <li class="disabled"><a aria-label="Next"><span aria-hidden="true">下一页</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrapSimple')
    );
}
```
    
## renderOption 设置渲染参数

``` php
public function testRenderOption(): void
{
    $page = new Page(1, 5, 3);

    $data = <<<'eot'
        <div class="pagination"> <span class="pagination-total">共 3 条</span> <button class="btn-prev disabled">&#8249;</button> <ul class="pager">    </ul> <button class="btn-next disabled">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="?page={jump}" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );

    $page->renderOption('small', true);

    $data = <<<'eot'
        <div class="pagination pagination-small"> <span class="pagination-total">共 3 条</span> <button class="btn-prev disabled">&#8249;</button> <ul class="pager">    </ul> <button class="btn-next disabled">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="?page={jump}" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );

    $page->renderOptions(
        ['small' => true, 'template' => '{prev} {ul} {first} {main} {last} {endul} {next}']
    );

    $data = <<<'eot'
        <button class="btn-prev disabled">&#8249;</button> <ul class="pager">    </ul> <button class="btn-next disabled">&#8250;</button>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );

    $data = <<<'eot'
        <li class="disabled"><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li> <ul class="pagination">    </ul> <li class="disabled"><a aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrap')
    );

    $data = <<<'eot'
        <li class="disabled"><a aria-label="Previous"><span aria-hidden="true">上一页</span></a></li> <ul class="pager">    </ul> <li class="disabled"><a aria-label="Next"><span aria-hidden="true">下一页</span></a></li>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrapSimple')
    );
}
```
    
## url 设置 URL

``` php
public function testUrl(): void
{
    $page = new Page(1, 3, 5);

    $page->url('/hello');

    $data = <<<'eot'
        <div class="pagination"> <span class="pagination-total">共 5 条</span> <button class="btn-prev disabled">&#8249;</button> <ul class="pager">  <li class="number active"><a>1</a></li><li class="number"><a href="/hello?page=2">2</a></li>  </ul> <button class="btn-next" onclick="window.location.href='/hello?page=2';">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="/hello?page={jump}" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );
}
```
    
## setRender 设置渲染组件

``` php
public function testSetRender(): void
{
    $page = new Page(1, 3, 5);

    $page->setRender('bootstrap');

    $data = <<<'eot'
        <nav aria-label="navigation"> <ul class="pagination"> <li class="disabled"><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>  <li class=" active"><a>1</a></li><li class=""><a href="?page=2">2</a></li>  <li><a aria-label="Next" href="?page=2"><span aria-hidden="true">&raquo;</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );
}
```
    
## 默认每页分页数量

``` php
public function testDefaultPerPage(): void
{
    $page = new Page(1, null, 25);

    $data = <<<'eot'
        <div class="pagination"> <span class="pagination-total">共 25 条</span> <button class="btn-prev disabled">&#8249;</button> <ul class="pager">  <li class="number active"><a>1</a></li><li class="number"><a href="?page=2">2</a></li>  </ul> <button class="btn-next" onclick="window.location.href='?page=2';">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="?page={jump}" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );
}
```
    
## pageName.getPageName 分页名字

``` php
public function testPageName(): void
{
    $page = new Page(1, 10, 25);

    $this->assertSame('page', $page->getPageName());

    $page->pageName('page2');

    $this->assertSame('page2', $page->getPageName());

    $data = <<<'eot'
        <div class="pagination"> <span class="pagination-total">共 25 条</span> <button class="btn-prev disabled">&#8249;</button> <ul class="pager">  <li class="number active"><a>1</a></li><li class="number"><a href="?page2=2">2</a></li><li class="number"><a href="?page2=3">3</a></li>  </ul> <button class="btn-next" onclick="window.location.href='?page2=2';">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="?page2={jump}" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );
}
```
    
## range 分页范围

``` php
public function testRange(): void
{
    $page = new Page(1, 3, 40);

    $page->currentPage(7);

    $page->range(4);

    $data = <<<'eot'
        <div class="pagination"> <span class="pagination-total">共 40 条</span> <button class="btn-prev" onclick="window.location.href='?page=6';">&#8249;</button> <ul class="pager">  <li class="number"><a href="?page=1">1</a></li><li class="number"><a href="?page=2">2</a></li><li class="number"><a href="?page=3">3</a></li><li class="number"><a href="?page=4">4</a></li><li class="number"><a href="?page=5">5</a></li><li class="number"><a href="?page=6">6</a></li><li class="number active"><a>7</a></li><li class="number"><a href="?page=8">8</a></li><li class="number"><a href="?page=9">9</a></li><li class="number"><a href="?page=10">10</a></li> <li class="btn-quicknext" onclick="window.location.href='?page=14';" onmouseenter="this.innerHTML='&raquo;';" onmouseleave="this.innerHTML='...';">...</li><li><a href="?page=14">14</a></li> </ul> <button class="btn-next" onclick="window.location.href='?page=8';">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="?page={jump}" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );

    $data = <<<'eot'
        <nav aria-label="navigation"> <ul class="pagination"> <li><a aria-label="Previous" href="?page=6"><span aria-hidden="true">&laquo;</span></a></li>  <li class=""><a href="?page=1">1</a></li><li class=""><a href="?page=2">2</a></li><li class=""><a href="?page=3">3</a></li><li class=""><a href="?page=4">4</a></li><li class=""><a href="?page=5">5</a></li><li class=""><a href="?page=6">6</a></li><li class=" active"><a>7</a></li><li class=""><a href="?page=8">8</a></li><li class=""><a href="?page=9">9</a></li><li class=""><a href="?page=10">10</a></li> <li><a href="?page=14">...</a></li><li><a href="?page=14">14</a></li> <li><a aria-label="Next" href="?page=8"><span aria-hidden="true">&raquo;</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrap')
    );

    $data = <<<'eot'
        <nav aria-label="..."> <ul class="pager"> <li class=""><a aria-label="Previous" href="?page=6"><span aria-hidden="true">上一页</span></a></li> <li class=""><a aria-label="Next" href="?page=8"><span aria-hidden="true">下一页</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrapSimple')
    );
}
```
    
## MACRO 无限数据分页

``` php
public function testMacro(): void
{
    $page = new Page(1, 3, Page::MACRO);

    $page->currentPage(44);

    $data = <<<'eot'
        <div class="pagination">  <button class="btn-prev" onclick="window.location.href='?page=43';">&#8249;</button> <ul class="pager"> <li class=""><a href="?page=1" >1</a></li><li onclick="window.location.href='?page=39';" class="btn-quickprev" onmouseenter="this.innerHTML='&laquo;';" onmouseleave="this.innerHTML='...';">...</li> <li class="number"><a href="?page=42">42</a></li><li class="number"><a href="?page=43">43</a></li><li class="number active"><a>44</a></li><li class="number"><a href="?page=45">45</a></li><li class="number"><a href="?page=46">46</a></li> <li class="btn-quicknext" onclick="window.location.href='?page=49';" onmouseenter="this.innerHTML='&raquo;';" onmouseleave="this.innerHTML='...';">...</li> </ul> <button class="btn-next" onclick="window.location.href='?page=45';">&#8250;</button> <span class="pagination-jump">前往<input type="number" link="?page={jump}" onkeydown="var event = event || window.event; if (event.keyCode == 13) { window.location.href = this.getAttribute('link').replace( '{jump}', this.value); }" onfocus="this.select();" min="1" value="1" number="true" class="pagination-editor">页</span> </div>
        eot;

    $this->assertSame(
        $data,
        $page->render()
    );

    $data = <<<'eot'
        <nav aria-label="navigation"> <ul class="pagination"> <li><a aria-label="Previous" href="?page=43"><span aria-hidden="true">&laquo;</span></a></li> <li class=""><a href="?page=1" >1</a></li><li><a href="?page=39">...</a></li> <li class=""><a href="?page=42">42</a></li><li class=""><a href="?page=43">43</a></li><li class=" active"><a>44</a></li><li class=""><a href="?page=45">45</a></li><li class=""><a href="?page=46">46</a></li> <li><a href="?page=49">...</a></li> <li><a aria-label="Next" href="?page=45"><span aria-hidden="true">&raquo;</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrap')
    );

    $data = <<<'eot'
        <nav aria-label="..."> <ul class="pager"> <li class=""><a aria-label="Previous" href="?page=43"><span aria-hidden="true">上一页</span></a></li> <li class=""><a aria-label="Next" href="?page=45"><span aria-hidden="true">下一页</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrapSimple')
    );
}
```
    
## bootstrap 分页尺寸设置

``` php
public function testPageBootstrapSize(): void
{
    $page = new Page(1, 3, 40);

    $page->currentPage(8);

    $data = <<<'eot'
        <nav aria-label="navigation"> <ul class="pagination pagination-lg"> <li><a aria-label="Previous" href="?page=7"><span aria-hidden="true">&laquo;</span></a></li> <li class=""><a href="?page=1" >1</a></li><li><a href="?page=3">...</a></li> <li class=""><a href="?page=6">6</a></li><li class=""><a href="?page=7">7</a></li><li class=" active"><a>8</a></li><li class=""><a href="?page=9">9</a></li><li class=""><a href="?page=10">10</a></li> <li><a href="?page=13">...</a></li><li><a href="?page=14">14</a></li> <li><a aria-label="Next" href="?page=9"><span aria-hidden="true">&raquo;</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrap', ['large_size' => true])
    );

    $data = <<<'eot'
        <nav aria-label="navigation"> <ul class="pagination pagination-sm"> <li><a aria-label="Previous" href="?page=7"><span aria-hidden="true">&laquo;</span></a></li> <li class=""><a href="?page=1" >1</a></li><li><a href="?page=3">...</a></li> <li class=""><a href="?page=6">6</a></li><li class=""><a href="?page=7">7</a></li><li class=" active"><a>8</a></li><li class=""><a href="?page=9">9</a></li><li class=""><a href="?page=10">10</a></li> <li><a href="?page=13">...</a></li><li><a href="?page=14">14</a></li> <li><a aria-label="Next" href="?page=9"><span aria-hidden="true">&raquo;</span></a></li> </ul> </nav>
        eot;

    $this->assertSame(
        $data,
        $page->render('bootstrap', ['small_size' => true])
    );
}
```
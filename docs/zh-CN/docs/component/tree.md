# 树 tree

::: tip Testing Is Documentation
[tests/Tree/TreeTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Tree/TreeTest.php)
:::
    
树组件 `tree` 提供了一些实用方法，用于整理数据为一棵树，并提供一些方法来获取树相关节点的信息。

**Uses**

``` php
<?php

use Leevel\Tree\Tree;
```

## Tree 基本使用

将子父节点整理为树结构。

``` php
public function testBaseUse(): void
{
    $tree = new Tree([
        [1, 0, 'hello'],
        [2, 1, 'world'],
    ]);

    $nodes = <<<'eot'
        [
            {
                "value": 1,
                "data": "hello",
                "children": [
                    {
                        "value": 2,
                        "data": "world"
                    }
                ]
            }
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->toArray()
        )
    );
}
```
    
## Tree.toJson 树结构输出为 JSON 格式字符串

``` php
public function testToJson(): void
{
    $tree = new Tree([
        [1, 0, 'hello'],
        [2, 1, 'world'],
    ]);

    $nodes = <<<'eot'
        [{"value":1,"data":"hello","children":[{"value":2,"data":"world"}]}]
        eot;

    $this->assertSame(
        $nodes,
        $tree->toJson(),
    );
}
```
    
## Tree.setNode 设置节点

``` php
public function testSetNode(): void
{
    $tree = new Tree([
        [1, 0, 'hello'],
        [2, 1, 'world'],
    ]);

    // 尾部插入节点
    $tree->setNode(5, 1, 'foo');

    $nodes = <<<'eot'
        [
            {
                "value": 1,
                "data": "hello",
                "children": [
                    {
                        "value": 2,
                        "data": "world"
                    },
                    {
                        "value": 5,
                        "data": "foo"
                    }
                ]
            }
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->toArray()
        )
    );
}
```
    
## Tree.setNode 在头部设置节点

``` php
public function testSetNodeAtHeader(): void
{
    $tree = new Tree([
        [1, 0, 'hello'],
        [2, 1, 'world'],
    ]);

    // 头部插入节点
    $tree->setNode(6, 1, 'bar', true);

    $nodes = <<<'eot'
        [
            {
                "value": 1,
                "data": "hello",
                "children": [
                    {
                        "value": 6,
                        "data": "bar"
                    },
                    {
                        "value": 2,
                        "data": "world"
                    }
                ]
            }
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->toArray()
        )
    );
}
```
    
## Tree.setNode 设置子节点

``` php
public function testSetNodeAsChildren(): void
{
    $tree = new Tree([
        [1, 0, 'hello'],
        [2, 1, 'world'],
    ]);

    // 子节点测试
    $tree->setNode(8, 2, 'subbar');

    $nodes = <<<'eot'
        [
            {
                "value": 1,
                "data": "hello",
                "children": [
                    {
                        "value": 2,
                        "data": "world",
                        "children": [
                            {
                                "value": 8,
                                "data": "subbar"
                            }
                        ]
                    }
                ]
            }
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->toArray()
        )
    );

    $json = <<<'eot'
        [{"value":1,"data":"hello","children":[{"value":2,"data":"world","children":[{"value":8,"data":"subbar"}]}]}]
        eot;

    $this->assertSame(
        $json,
        $tree->toJson()
    );
}
```
    
## Tree.getChildrenTree 获取节点子树


`测试树数据`

``` php
# Tests\Tree\TreeTest::providerTree
protected function providerTree(): Tree
{
    return new Tree([
        [1, 0, 'hello'],
        [2, 1, 'world'],
        [3, 1, 'foo'],
        [4, 1, 'bar'],
        [5, 3, 'subfoo'],
        [6, 5, 'subsubfoo'],
    ]);
}
```

::: warning
后面的测试，也会用到这个测试树数据。
:::


``` php
public function testGetChildrenTree(): void
{
    $tree = $this->providerTree();

    $nodes = <<<'eot'
        [
            {
                "value": 1,
                "data": "hello",
                "children": [
                    {
                        "value": 2,
                        "data": "world"
                    },
                    {
                        "value": 3,
                        "data": "foo",
                        "children": [
                            {
                                "value": 5,
                                "data": "subfoo",
                                "children": [
                                    {
                                        "value": 6,
                                        "data": "subsubfoo"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "value": 4,
                        "data": "bar"
                    }
                ]
            }
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->toArray()
        )
    );

    $nodes = <<<'eot'
        [
            {
                "value": 5,
                "data": "subfoo",
                "children": [
                    {
                        "value": 6,
                        "data": "subsubfoo"
                    }
                ]
            }
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->getChildrenTree(3)
        )
    );
}
```
    
## Tree.getChild 获取一级子节点 ID

``` php
public function testGetChild(): void
{
    $tree = $this->providerTree();

    $nodes = <<<'eot'
        {
            "1": 1
        }
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->getChild(0)
        )
    );
}
```
    
## Tree.getChildren 获取所有子节点 ID

``` php
public function testGetChildren(): void
{
    $tree = $this->providerTree();

    $nodes = <<<'eot'
        [
            5,
            6
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->getChildren(3)
        )
    );
}
```
    
## Tree.hasChild 是否存在一级子节点 ID

``` php
public function testHasChild(): void
{
    $tree = $this->providerTree();

    $this->assertTrue(
        $tree->hasChild(3)
    );

    $this->assertFalse(
        $tree->hasChild(6)
    );
}
```
    
## Tree.hasChildren 是否存在子节点 ID

``` php
public function testHasChildren(): void
{
    $tree = $this->providerTree();

    // hasChildren 存在严格和不严格校验
    $this->assertFalse(
        $tree->hasChildren(3, [5, 100000])
    );

    $this->assertTrue(
        $tree->hasChildren(3, [5, 100000], false)
    );

    // 第二个元素为空
    $this->assertFalse(
        $tree->hasChildren(3, [], false)
    );

    $this->assertFalse(
        $tree->hasChildren(1, [], true)
    );

    // 非严格模式不存在
    $this->assertFalse(
        $tree->hasChildren(100000, [2, 3], false)
    );
}
```
    
## Tree.getParent 获取一级父节点 ID

``` php
public function testGetParent(): void
{
    $tree = $this->providerTree();

    $nodes = <<<'eot'
        [
            1
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->getParent(3)
        )
    );

    $nodes = <<<'eot'
        [
            3
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->getParent(5)
        )
    );

    $nodes = <<<'eot'
        [
            3,
            5
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->getParent(5, true)
        )
    );
}
```
    
## Tree.getParent 不存在的节点父级 ID 为空数组

``` php
public function testGetParentButNodeNotFound(): void
{
    $tree = $this->providerTree();

    // 不存对应的节点查询父节点
    $this->assertSame(
        [],
        $tree->getParent(400000000)
    );
}
```
    
## Tree.getParents 获取所有父节点 ID

``` php
public function testGetParents(): void
{
    $tree = $this->providerTree();

    $nodes = <<<'eot'
        [
            1,
            3
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->getParents(5)
        )
    );

    $nodes = <<<'eot'
        [
            1,
            3,
            5
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->getParents(5, true)
        )
    );
}
```
    
## Tree.getLevel 获取节点所在的层级

``` php
public function testGetLevel(): void
{
    $tree = $this->providerTree();

    $this->assertSame(
        1,
        $tree->getLevel(3)
    );

    $this->assertSame(
        3,
        $tree->getLevel(6)
    );

    $this->assertSame(
        0,
        $tree->getLevel(0)
    );

    $this->assertSame(
        0,
        $tree->getLevel(1)
    );

    $this->assertSame(
        0,
        $tree->getLevel(100000)
    );
}
```
    
## Tree.getData.setData 设置和获取节点数据

``` php
public function testGetSetData(): void
{
    $tree = new Tree([
        [1, 0, 'hello'],
        [2, 1, 'world'],
    ]);

    $nodes = <<<'eot'
        [
            {
                "value": 1,
                "data": "hello",
                "children": [
                    {
                        "value": 2,
                        "data": "world"
                    }
                ]
            }
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->toArray()
        )
    );

    $this->assertSame(
        'world',
        $tree->getData(2)
    );

    $nodes = <<<'eot'
        [
            {
                "value": 1,
                "data": "hello",
                "children": [
                    {
                        "value": 2,
                        "data": "world => foo"
                    }
                ]
            }
        ]
        eot;

    $tree->setData(2, 'world => foo');

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->toArray()
        )
    );

    $this->assertSame(
        'world => foo',
        $tree->getData(2)
    );
}
```
    
## Tree.normalize 返回整理树节点数据结构

``` php
public function testNormalize(): void
{
    $tree = new Tree([
        [1, 0, 'hello'],
        [2, 1, 'world'],
    ]);

    $nodes = <<<'eot'
        [
            {
                "value": 1,
                "data": "hello",
                "children": [
                    {
                        "value": 2,
                        "data": "world"
                    }
                ]
            }
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->toArray()
        )
    );

    $nodes = <<<'eot'
        [
            {
                "value1": 1,
                "data1": "hello",
                "children": [
                    {
                        "value1": 2,
                        "data1": "world"
                    }
                ]
            }
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->normalize(null, [
                'value' => 'value1',
                'data'  => 'data1',
            ])
        )
    );

    $nodes = <<<'eot'
        [
            {
                "value": 1,
                "data": "hello",
                "label": "hello",
                "children": [
                    {
                        "value": 2,
                        "data": "world",
                        "label": "world"
                    }
                ]
            }
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->normalize(function ($item) {
                $item['label'] = $item['data'];

                return $item;
            })
        )
    );
}
```
    
## Tree.normalize 返回整理树某个节点及下级的数据结构

``` php
public function testNormalizeNode(): void
{
    // 可以返回子树
    $tree = $this->providerTree();

    $nodes = <<<'eot'
        [
            {
                "value": 5,
                "data": "subfoo",
                "children": [
                    {
                        "value": 6,
                        "data": "subsubfoo"
                    }
                ]
            }
        ]
        eot;

    $this->assertSame(
        $nodes,
        $this->varJson(
            $tree->normalize(null, [], 3)
        )
    );
}
```
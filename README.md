### React 16新特性
#### 1. 16.0.0 (2017.9.26)

组件现在可以从render返回数组和字符串,这一特性已经可以减少不必要节点嵌套 
```
render(){
    return [<div>1</div>, <span>2</span>]
    // or return '123'
}
```

在React 16里面，我们可以给DOM  添加自定义属性：
```
    // your code
    <div mycustomattribute="something">
    
    //React 15 output:
    <div />
    
    //React 16 output:
    <div mycustomattribute="something">
```

setState回调(第二个参数)现在在componentDidMount / componentDidUpdate之后立即触发，而不是在所有组件呈现之后。

#### 16.2.0 (2017.11.28)
添加Fragment,React 中一个常见模式是为一个组件返回多个元素。Fragment 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点。
```
render() {
    return (
        //  如果不加 Fragment 会报这样的错误：JSX elements must be wrapped in an enclosing tag. 
        <Fragment>
            <ChildA />
            <ChildB />
            <ChildC />
        <Fragment/>
    );
}
```
Fragment可以简写成<></>,<></> 语法不能接受键值或属性。

#### 16.3.0 (2018.3.29)
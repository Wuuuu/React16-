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

新增`React.createRef()`修改了refs的使用方法,`React.forwardRef()` API


###### React.createRef()的使用：
```
class App extends Component {
  constructor(props) {
    super(props);
    //  React16.3中创建Ref的方法
    this.myRef = React.createRef();
  }
  componentDidMount() {
    setTimeout(() => {
    // 提供了current属性，用于引用render后的节点
    // render之后就可以输出该ref指向的那个节点
      this.myRef.current.value = "userName";
    }, 1500);
  }
  render() {
    return [
      <div className="App" key='a'>
        <input ref={this.myRef}/>
      </div>
    ];
  }
}

```
> 1、此外，同样的Ref所指向的节点可以是dom节点，也可以是类组件。  
> 2、Ref属性指向的节点不能是函数组件：因为通过ref获得的组件，包含了声明周期和state，因此ref所指向的组件不可以是函数组件。

###### React.forwardRef()的使用：
refs在子组件的引用上，增加属性ref，那么这个ref仅仅指向的是子组件，而不能知道子组件中的dom节点  
通过React16.3中的Forwarding refs可以使得在父组件中可以得到子组件中的dom节点。

```

const TargetCom = React.forwardRef((props, ref) => (
  <input type="text" ref={ref} />
));
class App extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    setTimeout(() => {
      this.myRef.current.value = "123";
      console.log(this.myRef.current); // input
    }, 1500);
  }
  render() 
    return [
      <div className="App" key='a'>
        <TargetCom ref={this.myRef} />
      </div>
    ];
  }
}

```

以`React.unstable_AsyncMode` 取代 `React.unstable_AsyncComponent`

#### 16.4.0（2018.5.23）

1、Pointer Events  
Pointer Events api
>Pointer Events API 是Hmtl5的事件规范之一，它主要目的是用来将鼠标（Mouse）、触摸（touch)和触控笔（pen）三种事件整合为统一的API

在web页面复用在多种设备下的情况下， Pointer Events整合了mouse, touch, pen的触摸事件， 使其能在多种设备上触发，我们无需对各种类型的事件区分对待，更高的提高了开发效率， 但是目前浏览器的支持条件不容乐观

#### 16.6.0（2018.10.23）

* React.memo()
* React.lazy()
* static contextType()
* static getDerivedStateFromError()
* 
#### React.memo()
React.memo() 是能作用在简单的函数组件，类似于React.PureComponent对于class组件的作用。它本质上是一个高阶函数，达到的效果就是，自动帮组件执行shouldComponentUpdate() , 但是只是执行浅比较

使用方式就像高阶函数一样，包装了一层，如下：
```
const MemoizedComponent = React.memo(function MyComponent(props) {
  //_ only rerenders if props change_
});
 
// for arrow functions
const OtherMemoized = React.memo(props => {
    return <div> Memoized Component </div>
}
```
也能包装已经存在的函数，如下：
```
const MyComponent = props => <div> This is memorable!! </div>
 
const Memoized = React.memo(MyComponent)
```

>这个高阶函数存在是作为一种性能优化的方式。不要使用它去纯粹地阻止渲染，否则可能会导致出现bug


#### React.lazy() and Suspense

通过这个API，我们就可以达到代码分割的效果。代码分割是允许我们去延迟加载我们的import，意味着我们在渲染当前页面的时候去提升当前页面的性能，提高渲染速度。

#### React.lazy()

React.lazy()允许我们去动态的加载组件。

以前：
```
import AComponent from './AComponent';
import BComponent from './BComponent';
 
function MyComponent(bool) {
  return (
    <div>
      {bool?<AComponent />:<BComponent />}
    </div>
  );
}
```

现在:
```
function MyComponent(bool) {
    let Component;
    if(bool){
       Component = React.lazy(() => import('./AComponent'));
    }else{
       Component = React.lazy(() => import('./BComponent'));
    }
  return (
    <div>
      <Component />
    </div>
  );
}
```

#### Suspense
如果OtherComponent没有被加载成功，我可以通过使用Suspense这个组件的参数fallback参数来显示一些类似于加载中的提示内容。
```
const OtherComponent = React.lazy(() => import('./OtherComponent'));
 
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

>Suspense组件中可以包裹多个动态加载的组件，这样统一管理，非常的方便。
```
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
 
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```
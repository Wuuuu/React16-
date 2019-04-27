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

#### 16.8.0（2019.2.6）
>有了Hooks，再也不用纠结写Class组件还是Function组件了，也不用担心生命周期钩子函数了。也可以不再使用this了。

我们都知道react的核心思想就是将一个页面拆成一堆独立的，可复用的组件，并且用自上而下的单向数据流的形式将这些组件串联起来。但如果你在大型的工作项目中用react，你会发现你的项目中实际上很多react组件冗长切难以服用。尤其是那些写成class的组件，它们本身包含了状态（state），所以服用这类组件变得很麻烦。

```
import { userState } from 'react';

const [ count, setCount ] = userState(0)
```
##### 假如一个组件有多个状态值怎么办？
首先，useState是可以多次调用的，所以我们可以这样写：
```
const [ count, setCount ] = useState(0);
const [ userInfo, ChangeUserInfo ] = useState({ name: 'hooks', version: '16.8.0'})
```

##### 什么是Effect Hooks?

类似于componentDidMount 和 componentDidUpdate;
我们写的有状态组件，通常会产生很多的副作用（side effect），比如发起ajax请求获取数据，添加一些监听的注册和取消注册，手动修改dom等等。我们之前都把这些副作用的函数写在生命周期函数钩子里，比如componentDidMount，componentDidUpdate和componentWillUnmount。而现在的useEffect就相当与这些声明周期函数钩子的集合体。它以一抵三。

我们再看下面代码的逻辑：
```
function Example() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        doucument.title="you click ${count} times"
    })
}
```
首先，我们声明了一个状态变量 count，将它的初始值设为0。然后我们告诉react，我们的这个组件有一个副作用。我们给 useEffecthook传了一个匿名函数，这个匿名函数就是我们的副作用。在这个例子里，我们的副作用是调用browser API来修改文档标题。当react要渲染我们的组件时，它会先记住我们用到的副作用。等react更新了DOM之后，它再依次执行我们定义的副作用函数。
>这里要注意几点：
>
>第一，react首次渲染和之后的每次渲染都会调用一遍传给useEffect的函数。而之前我>们要用两个声明周期函数来分别表示首次渲染（componentDidMount），和之后的更新>导致的重新渲染（componentDidUpdate）。
>
>第二，useEffect中定义的副作用函数的执行不会阻碍浏览器更新视图，也就是说这些>函数是异步执行的，而之前的componentDidMount或componentDidUpdate中的代码则是同步执行的。这种安排对大多数副作用说都是合理的，但有的情况除外，比如我们有时候需要先根据DOM计算出某个元素的尺寸再重新渲染，这时候我们希望这次重新渲染是同步发生的，也就是说它会在浏览器真的去绘制这个页面前发生。

怎么跳过一些不必要的副作用函数

按照上一节的思路，每次重新渲染都要执行一遍这些副作用函数，显然是不经济的。怎么跳过一些不必要的计算呢？我们只需要给useEffect传第二个参数即可。用第二个参数来告诉react只有当这个参数的值发生改变时，才执行我们传的副作用函数（第一个参数）。
```
useEffect(() => {
    document.title = `you clicked${count} times`
}, [count])
```
##### 还有哪些自带的Effect Hooks?
* useContext
* useReducer
* useCallback
* useMemo
* useRef
* useImperativeMethods
* useMutationEffect
* useLayoutEffect
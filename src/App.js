import React, { Suspense, Component } from "react";
import logo from "./logo.svg";
import TestJsxCom from "./test.js";
import OtherComponent from "./FnCom";
import Memoized from "./Memo";

import "./App.css";

const SusComponent = React.lazy(() => import("./Memo"));

const TargetCom = React.forwardRef((props, ref) => (
  <input type="text" ref={ref} />
));
class App extends Component {
  constructor(props) {
    console.log("App constuctor");
    super(props);
    this.myRef = React.createRef();
    this.state = {
      childContext: "123",
      newContext: "456"
    };
  }
  componentDidMount() {
    console.log("App");
    setTimeout(() => {
      this.myRef.current.value = "wuyaoke";
      console.log(this.comA.target);
    }, 1500);
  }
  overHandler = e => {
    console.log("overHandler--->", e);
  };
  enter = e => {
    console.log("enter--->", e);
  };
  render() {
    console.log("React--->", React);

    return [
      <div className="App" key="a">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <OtherComponent />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <SusComponent />
            </Suspense>
          </div>
          <a
            ref={e => (this.comA = e)}
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <TargetCom ref={this.myRef} />
          {[1, 2, 3, 4, 5].map(item => (
            <React.Fragment key={item}>
              <span>{item}</span>
            </React.Fragment>
          ))}
          <TestJsxCom />
          <Memoized
            name="test"
            handleClick={() => {
              console.log("click!");
            }}
          />
          <div
            onPointerOver={this.overHandler}
            onPointerEnter={this.enter}
            altKey={111}
          >
            Pointer Api
          </div>
        </header>
      </div>
    ];
  }
}

export default App;

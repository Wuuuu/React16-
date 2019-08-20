// import React, { Suspense, Component, Fragment } from "react";
import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from "./logo.svg";
// import TestJsxCom from "./test.js";
// import OtherComponent from "./FnCom";
// import Memoized from "./Memo";
// import Child from "./Child";
import HooksDemo from "./Hooks";
// import ErrorBoundary from "./Error";

import "./App.css";

// const ChildA = React.lazy(() => import("./Memo"));
// const ChildB = React.lazy(() => import("./Hooks"));
// const ChildC = React.createContext();
// const TargetCom = React.forwardRef((props, ref) => (
//   <input type="text" ref={ref} value="abc" />
// ));




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState({
  //       date: new Date()
  //     });
  //   }, 1000);
  // }

  render() {
    return (
      <div>
        <HooksDemo />
        {/* <div>{this.state.date.toString()}</div> */}
      </div>
    );
  }
}

export default App;













// <Router>
//   {/* <Link to="/about/">About</Link> */}
//   <Route path="/" component={OtherComponent} />
//   <Route path="/about/" component={TestJsxCom} />
// </Router>
// <div className="App" key="a">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <OtherComponent />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <SusComponent />
//         <HooksDemo />
//       </Suspense>
//     </div>
//     <a
//       ref={e => (this.comA = e)}
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//     <TargetCom ref={this.myRef} />
//     {[1, 2, 3, 4, 5].map(item => (
//       <React.Fragment key={item}>
//         <span>{item}</span>
//       </React.Fragment>
//     ))}
//     <TestJsxCom />
//     <ErrorBoundary>
//       <div>11111111111111</div>
//       <span>1222 </span>
//     </ErrorBoundary>
//     <Memoized
//       name="test"
//       handleClick={() => {
//         console.log("click!");
//       }}
//     />
//     <div
//       onPointerOver={this.overHandler}
//       onPointerEnter={this.enter}
//       altKey={111}
//     >
//       Pointer Api
//     </div>
//   </header>
// </div>

import React, { PureComponent } from "react";
import ChildB from "./Child";

export default class TestJsx extends PureComponent {
  constructor(props) {
    console.log("TestJsx constuctor");
    super(props);
  }
  componentDidMount() {
    console.log("child-A");
  }
  handleOk = (text) => {
    console.log(text);
  };
  render() {
    return (
      <div onClick={() => this.handleOk("1231")}>
        <ChildB />
      </div>
    );
  }
}

import React, { PureComponent } from "react";

export default class ChildB extends PureComponent {
  constructor(props) {
    console.log("ChildB constuctor");
    super(props);
  }
  componentDidMount() {
    console.log("child-B");
  }
  render() {
    return <div>childB</div>;
  }
}

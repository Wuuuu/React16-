import React, { Component } from "react";

// export default class ChildB extends PureComponent {
//   constructor(props) {
//     console.log("ChildB constuctor");
//     super(props);
//   }
//   componentDidMount() {
//     console.log("child-B");
//   }
//   render() {
//     console.log(111)
//     return <div name={123}>childB{this.props.seconds}</div>;
//   }
// }


function ChildB({ seconds }) {
  console.log(111);
  return (
    <div>
      <div name={123}>childB{seconds}</div>;
    </div>
  );
}
// export default React.memo(ChildB);
export default ChildB;

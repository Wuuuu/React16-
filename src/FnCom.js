import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p> You click {count} time</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

import React from "react";

const Memoized = React.memo(props => {
  const { handleClick, name } = props;
  return <div onClick={handleClick}> Memoized Component---{name}</div>;
});

export default Memoized;

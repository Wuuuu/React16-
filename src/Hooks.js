import React, { useState, useEffect } from "react";

export default function HooksExample() {
  const [count, setCount] = useState(0);
  const [userInfo, ChangeUserInfo] = useState({
    name: "hooks",
    version: "16.8.0"
  });
  const ref1 = React.useRef(null);
  useEffect(() => {
    document.title = `you click ${count} times`;
  }, [userInfo]);

  return (
    <div>
      <p>你点击了{count}次</p>
      <div>
        <input ref={ref1} type="text" />
        <button
          onClick={() => {
            ref1.current.focus();
          }}
        >
          1111
        </button>
      </div>
      <p>
        名字为：{userInfo.name}
        版本号：{userInfo.version}
      </p>
      <button onClick={() => setCount(count + 1)}>点击</button>
      <button
        onClick={() => ChangeUserInfo({ name: "React", version: "10086" })}
      >
        改变信息
      </button>
    </div>
  );
}

// const withUser = WrapperComponent => {
//   const user = "wuuu";
//   console.log("WrapperComponent--->", WrapperComponent);
//   return props => <WrapperComponent user={user} {...props} />;
// };

// const UserPage = props => {
//   return (
//     <div>
//       <p>My name is {props.user}!</p>
//     </div>
//   );
// };

// export default withUser(UserPage);

import { useState } from "react";

export default function Dice(props) {
  const [cl, setCl] = useState(props.class)

  function handleDice() {
    setCl(() => !cl)
    { props.fun() }

  }
  return <div onClick={handleDice} className={`dice ${cl}`} >{props.value}</div>;
}

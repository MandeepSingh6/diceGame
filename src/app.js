import React from "react";
import { useEffect, useState } from "react";
import Dice from "./dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function Main() {
  const [diceArr, setDiceArr] = useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  useEffect(() => {
    const isheld = diceArr.every((x) => x.isHeld);
    const firstDiceValue = diceArr[0].value;
    const allSame = diceArr.every((x) => x.value === firstDiceValue);
    if (isheld && allSame) {
      setTenzies(true);
    }
  });

  const diceNumbers = diceArr.map((obj) => (
    <Dice
      fun={() => holdDice(obj.id)}
      key={obj.id}
      value={obj.value}
      class={obj.isHeld}
    />
  ));

  function generateNewDice() {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    return { value: randomNumber, isHeld: false, id: nanoid() };
  }

  function rollDice() {
    if (tenzies) {
      setDiceArr(allNewDice());
      setTenzies(false);
    } else {
      setDiceArr((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    }
  }

  function holdDice(id) {
    setDiceArr((oldDice) =>
      oldDice.map((x) => {
        if (x.id === id) {
          return { ...x, isHeld: !x.isHeld };
        }
        return x;
      })
    );
  }

  function allNewDice() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateNewDice());
    }
    return arr;
  }

  return (
    <div className="container">
      <h1>Tenzies</h1>
      <p>Roll untill all dice are same. Click each die to freeze it and its value between rolls.</p>
      {tenzies && <Confetti />}
      <div className="diceContainer">{diceNumbers}</div>
      <button className="rollButton" onClick={rollDice}>
        {tenzies ? "New Game" : "ROLL"}
      </button>
    </div>
  );
}

export default function App() {
  return <Main />;
}

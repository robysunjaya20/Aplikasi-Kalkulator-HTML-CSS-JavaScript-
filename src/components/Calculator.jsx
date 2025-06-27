import React, { useState, useEffect, useRef } from "react";
import Display from "./Display";
import Button from "./Button";
import History from "./History";
import { evaluateExpression, factorial } from "../utils/mathUtils";

const buttons = [
  "C", "DEL", "(", ")",
  "sin", "cos", "tan", "log",
  "√", "^", "/", "*",
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "%",
  "0", ".", "!", "=",
];

export default function Calculator() {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });
  const displayRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // Keyboard support
  useEffect(() => {
    function handleKey(e) {
      if (
        (e.key >= "0" && e.key <= "9") ||
        ["+", "-", "*", "/", "(", ")", ".", "%"].includes(e.key)
      ) {
        setDisplay((d) => d + e.key);
      } else if (e.key === "Enter") {
        calculate();
      } else if (e.key === "Backspace") {
        setDisplay((d) => d.slice(0, -1));
      } else if (e.key.toLowerCase() === "c") {
        clearDisplay();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [display]);

  function appendValue(val) {
    setDisplay((d) => d + val);
    displayRef.current?.focus();
  }

  function clearDisplay() {
    setDisplay("");
  }

  function deleteLast() {
    setDisplay((d) => d.slice(0, -1));
  }

  function calculate() {
    try {
      const res = evaluateExpression(display);
      setHistory([{ expression: display, result: res }, ...history]);
      setDisplay(String(res));
    } catch {
      alert("Input tidak valid");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(display);
    alert("Hasil disalin ke clipboard!");
  }

  return (
    <div className="calculator">
      <Display display={display} displayRef={displayRef} />
      <div className="buttons">
        {buttons.map((btn) => (
          <Button
            key={btn}
            value={btn}
            onClick={() => {
              if (btn === "C") clearDisplay();
              else if (btn === "DEL") deleteLast();
              else if (btn === "=") calculate();
              else if (btn === "!") appendValue("!");
              else if (btn === "√") appendValue("sqrt(");
              else if (btn === "^") appendValue("^");
              else if (btn === "%") appendValue("%");
              else appendValue(btn);
            }}
          />
        ))}
      </div>
      <div className="extra-actions">
        <button onClick={copyResult} disabled={!display}>
          Copy Result
        </button>
      </div>
      <History history={history} />
    </div>
  );
}
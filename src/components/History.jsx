import React from "react";

export default function History({ history }) {
  return (
    <div className="history">
      <h3>Riwayat</h3>
      <ul>
        {history.map((item, i) => (
          <li key={i}>
            <code>{item.expression} = {item.result}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}
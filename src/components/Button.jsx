import React from "react";

export default function Button({ value, onClick }) {
  return (
    <button className="btn" onClick={() => onClick(value)}>
      {value}
    </button>
  );
}
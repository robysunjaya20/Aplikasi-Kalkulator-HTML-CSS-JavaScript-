import React from "react";

export default function Display({ display, displayRef }) {
  return (
    <input
      ref={displayRef}
      type="text"
      className="display"
      value={display}
      readOnly
      placeholder="Masukkan ekspresi"
    />
  );
}
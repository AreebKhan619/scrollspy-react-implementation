import { useEffect, useState } from "react";
import "./App.css";
import useScrollSpy from "./hooks/useScrollSpy";

const elementIds: string[] = [
  "element-a",
  "element-b",
  "element-c",
  "element-d",
];

function App() {
  useScrollSpy({
    ids: elementIds,
    offset: 48,
  });

  return (
    <div className="main">
      <div className="navbar">
        <ul>
          {elementIds.map((el) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      </div>
      {elementIds.map((el) => (
        <section className="element" id={el} key={el}>
          {el}
        </section>
      ))}
    </div>
  );
}

export default App;

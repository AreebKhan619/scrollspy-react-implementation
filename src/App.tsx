import "./App.css";
import ScrollSpyContainer from "./components/ScrollSpyContainer";

const elementIds: string[] = [
  "element-a",
  "element-b",
  "element-c",
  "element-d",
];

function App() {
  return (
    <div className="main">
      <div className="navbar">
        <ul>
          <ScrollSpyContainer elementIds={elementIds}>
            {elementIds.map((el) => (
              <li aria-label={el} className="list-item" key={el}>
                {el}
              </li>
            ))}
          </ScrollSpyContainer>
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

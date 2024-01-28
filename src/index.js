import ReactDOM from "./react-dom";
import React from "./react";
const useRef = React.useRef;

function App() {
  const inputRef = useRef(null);
  return (
    <div>
      <h1>simple react</h1>
      <input type="text" ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>click me focus Input</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

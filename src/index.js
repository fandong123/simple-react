import ReactDOM from "./react-dom";
import React from "./react";
const useRef = React.useRef;
const forwardRef = React.forwardRef;
const useImperativeHandle = React.useImperativeHandle;

const ImperativeHandle = forwardRef(function (props, ref) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current.focus()
      },
    };
  });
  return <input type="text" ref={inputRef} />;
});

function App() {
  const inputRef = useRef(null);
  return (
    <div>
      <h1>simple react</h1>
      <ImperativeHandle ref={inputRef} />
      {/* <input type="text" ref={inputRef} /> */}
      <button onClick={() => inputRef.current.focus()}>
        click me focus Input
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

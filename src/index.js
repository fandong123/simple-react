import ReactDOM from "./react-dom";
import React from "./react";
// React.createElement("div", null, "Simple React");
const jsx = (
  <div style={{ color: "lightblue" }} id="firstChild">
    <div>111</div>
    <div>2222</div>
    Simple React
  </div>
);
console.log(jsx);
console.log(<div>2222</div>);
console.log(
  <div>
    <span>111</span>
  </div>
);
ReactDOM.render(jsx, document.getElementById("root"));
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<div>Simple React</div>);
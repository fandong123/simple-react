import ReactDOM from "./react-dom";
import React from "./react";

function reducer(state, action) {
  if (action.type === "increment") {
    return {
      ...state,
      age: state.age + 1,
    };
  }
  throw new Error("unknown action .");
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { age: 20 }); 
  return (
    <div>
      <button onClick={() => dispatch({ type: "increment" })}>click me</button>
      <p>Hello, You are {state.age}!</p>
    </div>
  );
}

// function Greeting({ name }) {
//   console.log("Greeting", "render!!!!!", name);
//   return <div>Hello, {name}</div>;
// }

// console.log('Greeting function', Greeting, <Greeting />);
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       adress: "",
//     };
//   }

//   setName(val) {
//     this.setState({
//       name: val,
//     });
//   }

//   setAdress(val) {
//     this.setState({
//       adress: val,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <label>
//           Name:
//           <input onInput={(e) => this.setName(e.target.value)} />
//         </label>
//         <label>
//           Adress:
//           <input onInput={(e) => this.setAdress(e.target.value)} />
//         </label>
//         <Greeting name={this.state.name} />
//       </div>
//     );
//   }
// }

ReactDOM.render(<App />, document.getElementById("root"));

import ReactDOM from "./react-dom";
import React from "./react";

const Greeting = React.memo(function ({ name }) {
  console.log("Greeting", "render!!!!!", name);
  return <div>Hello, {name}</div>;
});

// function Greeting({ name }) {
//   console.log("Greeting", "render!!!!!", name);
//   return <div>Hello, {name}</div>;
// }

console.log('Greeting function', Greeting, <Greeting />);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      adress: "",
    };
  }

  setName(val) {
    this.setState({
      name: val,
    });
  }

  setAdress(val) {
    this.setState({
      adress: val,
    });
  }

  render() {
    return (
      <div>
        <label>
          Name:
          <input onInput={(e) => this.setName(e.target.value)} />
        </label>
        <label>
          Adress:
          <input onInput={(e) => this.setAdress(e.target.value)} />
        </label>
        <Greeting name={this.state.name} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

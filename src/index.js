import ReactDOM from "./react-dom";
import React from "./react";

class Greeting extends React.PureComponent {
  render() {
    console.log('Greeting', 'render!!!!!', this.props);
    return <div>Hello, {this.props.name}</div>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      adress: ''
    }
  }

  setName(val) {
    this.setState({
      name: val
    })
  }
  
  setAdress(val) {
    this.setState({
      adress: val
    })
  }

  render() {
    return (
      <div>
        <label>
          Name:
          <input onInput={e => this.setName(e.target.value)} />
        </label>
        <label>
        Adress:
          <input onInput={e => this.setAdress(e.target.value)} />
        </label>
        <Greeting name={this.state.name} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

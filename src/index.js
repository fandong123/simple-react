import ReactDOM from "./react-dom";
import React from "./react";

class ParentClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render() {
    return (
      <div>
        <h1>getDerivedStateFromProps</h1>
        <button onClick={() => {this.setState({count: 2})}}>change Count</button>
        <Child count={this.state.count} />
      </div>
    )
  }
}

class Child extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      name:'zs'
    }
  }
  static getDerivedStateFromProps(props, state) {
    console.log('this.constructor.getDerivedStateFromProps', props, state);
    if (props.count !== state.count) {
      return {
        count: '通过 getDerivedStateFromProps生命周期，当前组件依赖的state依赖父组件传入的props'
      }
    }
    return state;
  }
  render() {
    console.log('render', this.state);
    return (
      <div>
        <h2>{this.state.count}</h2>
      </div>
    )
  }
}

ReactDOM.render(<ParentClass />, document.getElementById("root"));
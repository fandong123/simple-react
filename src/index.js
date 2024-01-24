import ReactDOM from "./react-dom";
import React from "./react";
// const B = React.forwardRef((props, ref) => {
//   return (
//     <div>
//       <p ref={ref}>forwardRef</p>
//       2222
//       {/* { props.count } */}
//     </div>
//   )
// })
class App extends React.Component {
  // inputRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      arr: ["A", "B", "C", "D", "E"],
    };
  }
  updateCount = (count) => {
    this.setState({
      count,
    });
  };
  getFocus = () => {
    this.inputRef.current.focus();
  };

  changeArr = () => {
    this.setState({
      arr: ["C", "B", "E", "F", "A"],
    });
  };
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       arr: ["R", "B", "H", "D", "F"],
  //     });
  //     this.setState({
  //       arr: ["C", "B", "E", "F", "A"],
  //     });
  //   }, 3000);
  // }
  render() {
    console.log('render~~~~~~~~!!!!!!!!!!');
    return (
      <div style={{ color: "red" }} id="firstChild">
        {/* <p>{this.state.count}</p>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.getFocus}>App组件 input获取焦点</button> */}
        <input type="button" onClick={this.changeArr} value="change" />
        <div>
        {this.state.arr.map((item) => {
          return <p key={item}>{item}</p>;
        })}
        </div>
      </div>
    );
  }
}
// class B extends React.Component {
//   instanceClassRef = React.createRef();
//   updateChildCount = () => {
//     console.log(this.instanceClassRef);
//     this.instanceClassRef.current.updateCount(100);
//   };
//   render() {
//     return (
//       <div id="B">
//         <p>Simple React</p>
//         <App ref={this.instanceClassRef} />
//         <br />
//         <button onClick={this.updateChildCount}>B组件 更新子组件count</button>
//       </div>
//     );
//   }
// }
// console.log(B);
// console.log(<B />);
ReactDOM.render(<App />, document.getElementById("root"));
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<div>Simple React</div>);

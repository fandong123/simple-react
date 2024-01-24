import ReactDOM from "./react-dom";
import React from "./react";

class App extends React.Component {
  constructor (props) {
    super(props)
    this.Id = null;
    this.state = {
      date: new Date()
    }
  }
  // 1.组件挂载到页面上之后调用
  // 2.需要依赖真实DOM节点的相关初始化动作需要放在这里
  // 3.适合加载数据
  // 4.适合事件订阅
  // 5.不适合在这里调用setState
  componentDidMount() {
    this.Id = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000);
  }

  // 1.组件从DOM树上卸载完成前调用
  // 2.执行一些清理操作，比如清除定时器，取消事件订阅，取消网络请求等
  // 3.不能在该函数中执行this.setstate，不会产生新的渲染
  componentWillUnmount() {
    clearInterval(thi.Id)
  }

  // 1.更新完成后调用，初始化渲染不会调用
  // 2.当组件完成更新，需要对DOM进行某种操作的时候，适合在这个函数中进行
  // 3.当前的props和之前的props有所不同的时候，可以在这里进行有必要的网络请求
  // 4.这里虽然可以调用setState，但是要记住是有条件的调用，否则会陷入死循环
  // 5.如果shouldComponentUpdate返回false，componentDidUpdate不会执行
  // 6.如果实现了getSnapshotBeforeUpdate，那么componentDidUpdate会接收到第三个参数
  // 7.如果将props中的内容拷贝到state，可以考虑直接使用props，原因见官方文档提供的文章
  componentDidUpdate(prevProps, preState, snapshot) {
    // console.log('componentDidUpdate', prevProps, preState, snapshot);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate', nextProps, nextState);
    return true;
  }

  render() {
    // console.log('render!!!!!!!');
    return (
      <div>
        <p>simple react</p>
        <p>{this.state.date.toLocaleTimeString()}</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
import ReactDOM from "./react-dom";
import React from "./react";

class ScrollingList extends React.Component {
  isAppend = true;
  count = 0;
  intervalId = 0;
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = { list: [] };
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?// Capture the scroll position so we can adjust scroll later.
    if (prevState.list.length < this.state.list.length) {
      const list = this.listRef.current;
      console.log('getSnapshotBeforeUpdate', 'scrollHeight', list.scrollHeight, 'scrollTop',list.scrollTop);
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out o// (snapshot here is the value returned from getSnapshotBeforeUpd'
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  appendData = () => {
    if (this.isAppend) {
      this.intervalId = setInterval(() => {
        this.setState({
          list: [...this.state.list, this.count++],
        });
      }, 1000);
    } else {
      clearInterval(this.intervalId);
    }
    this.isAppend = !this.isAppend;
  };
  render() {
    return (
      <div>
        <input
          type="button"
          onClick={() => this.appendData()}
          value="追击/暂停追加"
        />
        <div
          ref={this.listRef}
          style={{
            overflow: "auto",
            height: '400px',
            background: "#efefef",
          }}
        >
          {this.state.list.map((item) => {
            return (
              <div
                key={item}
                style={{
                  height: "60px",
                  padding: "10px",
                  marginTop: "10px",
                  border: "1px solid blue",
                  borderRadius: "6px",
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ScrollingList />, document.getElementById("root"));

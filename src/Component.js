import { findDOMByVNode, updateDOMTree } from "./react-dom";
export let updateQueue = {
  isBatch: false,
  updaters: new Set(),
};
export function flushUpdateQueue() {
  updateQueue.isBatch = false;
  for (const updater of updateQueue.updaters) {
    updater.launchUpdate();
  }
  updateQueue.updaters.clear();
}
class Updater {
  constructor(ClassComponentInstance) {
    this.ClassComponentInstance = ClassComponentInstance;
    this.pendingStates = [];
  }
  addState(partialState) {
    this.pendingStates.push(partialState);
    this.preHandleForUpdate();
  }
  preHandleForUpdate() {
    if (updateQueue.isBatch) {
      updateQueue.updaters.add(this);
    } else {
      this.launchUpdate();
    }
  }
  launchUpdate(nextProps) {
    const { ClassComponentInstance, pendingStates } = this;
    if (pendingStates.length === 0 && !nextProps) {
      return;
    }
    let isShouldUpdate = true;
    const nextState = this.pendingStates.reduce(
      (preState, newState) => {
        return { ...preState, ...newState };
      },
      ClassComponentInstance.state
    );
    ClassComponentInstance.state = nextState
    this.pendingStates.length = 0;
    if (ClassComponentInstance.shouldComponentUpdate && !ClassComponentInstance.shouldComponentUpdate(nextProps, nextState)) {
      isShouldUpdate = false;
    }
    if (nextProps) {
      ClassComponentInstance.props = nextProps; 
    }
    if (isShouldUpdate) {
      ClassComponentInstance.update();
    }
  }
}
export class Component {
  static IS_CLASS_COMPONENT = true;
  constructor(props) {
    this.updater = new Updater(this);
    this.state = {};
    this.props = props;
  }
  setState(partialState) {
    // 合并属性
    // this.state = {...this.state, ...partialState};
    // 重新渲染更新
    // this.update()
    this.updater.addState(partialState);
  }
  update() {
    // 获取重新执行render函数后的虚拟DOM，新虚拟DOM
    // 根据新的虚拟DOM生成新的真实DOM
    // 将真实DOM挂载到页面
    let oldVNode = this.oldVNode; // to do 让类组件拥有一个oldVNode属性保存类组件实例对应的虚拟dom
    let oldDOM = findDOMByVNode(oldVNode); // to do  将真实Dom保存在对应的虚拟dom上
    if (this.constructor.getDerivedStateFromProps) {
      const newState = this.constructor.getDerivedStateFromProps(this.props, this.state);
      this.state = { ...this.state, ...newState }
    }
    let newVNode = this.render();
    updateDOMTree(oldVNode, newVNode, oldDOM);
    this.oldVNode = newVNode;
    if (this.componentDidUpdate) {
      this.componentDidUpdate(this.props, this.state);
    }
  }
}

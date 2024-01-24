import { REACT_ELEMENT, REACT_FORWORD_REF, REACT_TEXT, MOVE, CREATE } from "./utils";
import { addEvent } from "./event";
function render(VNode, container) {
  // 挂载节点
  mount(VNode, container);
}
function mount(VNode, container) {
  const newDOM = createDOM(VNode);
  newDOM && container.appendChild(newDOM);
}

function createDOM(VNode) {
  const { type, props, $$typeof, ref } = VNode;
  let dom;

  if (type && type.$$typeof === REACT_FORWORD_REF) {
    return getDOMByForwordRef(VNode);
  }
  if (
    typeof type === "function" &&
    $$typeof === REACT_ELEMENT &&
    type.IS_CLASS_COMPONENT
  ) {
    return getDOMByClassComponent(VNode);
  }
  if (typeof type === "function" && $$typeof === REACT_ELEMENT) {
    return getDOMByFunctionComponent(VNode);
  } else if (type === REACT_TEXT) {
    dom = document.createTextNode(props.text)
  } 
  if ($$typeof === REACT_ELEMENT && type) {
    dom = document.createElement(type);
  }
  if (props) {
    const { children } = props;
    if (Array.isArray(children)) {
      mountArray(children, dom);
    } else if (typeof children === "object" && type) {
      mount(children, dom);
    }
  }
  setPropertyFormDOM(props, dom);
  VNode.dom = dom;
  if (ref) {
    ref.current = dom;
  }
  return dom;
}

function getDOMByFunctionComponent(VNode) {
  const { type, props } = VNode;
  const renderVNode = type(props);
  VNode.oldRenderVNode = renderVNode 
  if (!renderVNode) {
    return null;
  }
  return createDOM(renderVNode);
}

function getDOMByClassComponent(VNode) {
  const { type, props, ref } = VNode;
  const instance = new type(props);
  const renderVNode = instance.render();
  instance.oldVNode = renderVNode;
  VNode.classInstance = instance;
  if (ref) {
    ref.current = instance;
  }
  // setTimeout(() => {
  //   instance.setState({
  //     count: 22222222,
  //   });
  // }, 3000);
  if (!renderVNode) {
    return null;
  }
  const dom = createDOM(renderVNode);
  if (instance.componentDidMount) {
    instance.componentDidMount.call(instance);
  }
  return dom;
}

function getDOMByForwordRef(VNode) {
  const { ref, type, props } = VNode;
  const renderVNode = type.render(props, ref);
  if (!renderVNode) {
    return null;
  }
  return createDOM(renderVNode);
}

function setPropertyFormDOM(props, dom) {
  if (!dom) {
    return;
  }
  for (const key in props) {
    if (Object.hasOwnProperty.call(props, key)) {
      // const val = props[key];
      if (key === "children") {
        continue;
      }
      if (/^on[A-Z].*/.test(key)) {
        // to do 事件处理
        addEvent(dom, key.toLowerCase(), props[key]);
      } else if (key === "style") {
        Object.entries(props.style).forEach(([key, value]) => {
          dom.style[key] = value;
        });
      } else {
        dom[key] = props[key];
      }
    }
  }
}

function mountArray(children, parentDom) {
  children.forEach((ele, idx) => {
    // if (typeof ele === "string" || typeof children === "number") {
    //   parentDom.appendChild(document.createTextNode(e le));
    // } else {
    children[idx].index = idx;
    mount(children[idx], parentDom);
    // }
  });
}

export function findDOMByVNode(VNode) {
  if (!VNode) {
    return;
  }
  if (VNode.dom) {
    return VNode.dom;
  }
}

export function updateDOMTree(oldVNode, newVNode, oldDOM) {
  const parentNode = oldDOM.parentNode;
  // console.dir(parentDOM);
  // // oldDOM.replaceChild(createDOM(newVNode))
  // // parentDOM.replaceChild(oldDOM, createDOM(newVNode));
  // parentDOM.removeChild(oldDOM);
  // parentDOM.appendChild(createDOM(newVNode));
  // 新节点，旧节点都不存在
  // 新节点存在，旧节点不存在
  // 新节点不存在，旧节点存在
  // 新节点存在，旧节点也存在，但是类型不一样
  // 新节点存在，旧节点也存在，类型也一样 ---> 值得我们进行深入的比较，探索复用相关节点的方案
  const typeMap = {
    NO_OPERATE: !oldVNode && !newVNode,
    ADD: !oldVNode && newVNode,
    DELETE: oldVNode && !newVNode,
    REPLACE: oldVNode && newVNode && oldVNode.type !== newVNode.type
  }
  let UPDATE_TYPE = Object.keys(typeMap).filter(key => typeMap[key])[0];
  switch (UPDATE_TYPE) {
    case 'NO_OPERATE':
      break;
    case 'ADD':
      parentNode.appendChild(createDOM(newVNode))
      break;
    case 'DELETE':
      removeNode(oldVNode)
      break;
    case 'REPLACE':
      removeNode(oldVNode);
      parentNode.appendChild(createDOM(newVNode))
      break;
    default:
      // 深度的dom diff，新老虚拟DOM同时都存在且类型相同
      deepDOMDiff(oldVNode, newVNode)
      break;
  }
}

function removeNode(vNode) {
  const currentDOM = findDOMByVNode(vNode);
  if(currentDOM) {
    currentDOM.remove();
  }
  if (vNode.classInstance && vNode.classInstance.componentWillUnmount) {
    vNode.classInstance.componentWillUnmount();
  }
}

function deepDOMDiff(oldVNode, newVNode) {

  const diffTypeMap = {
    ORIGIN_NODE: typeof oldVNode.type === 'string',
    CLASS_COMPONENT: typeof oldVNode.type === 'function' && oldVNode.type.IS_CLASS_COMPONENT,
    FUNCTION_COMPONENT: typeof oldVNode.type === 'function',
    TEXT: oldVNode.type === REACT_TEXT
  }
  const DIFF_TYPE = Object.keys(diffTypeMap).filter(key => diffTypeMap[key])[0];
  switch (DIFF_TYPE) {
    case 'ORIGIN_NODE':
      const currentDOM = newVNode.dom = findDOMByVNode(oldVNode);
      setPropertyFormDOM(newVNode.props, currentDOM)
      updateChildren(currentDOM, oldVNode.props.children, newVNode.props.children)
      break;
    case 'CLASS_COMPONENT':
      updateClassComponent(oldVNode, newVNode)
      break;
    case 'FUNCTION_COMPONENT':
      updateFunctionComponent(oldVNode, newVNode)
      break;
    case 'TEXT':
      newVNode.dom = findDOMByVNode(oldVNode)
      newVNode.dom.textContent = newVNode.props.text
      break;
    default:
      break;
  }
}

function updateClassComponent(oldVNode, newVNode) {
  const classInstance = newVNode.classInstance = oldVNode.classInstance;
  classInstance.updater.launchUpdate(newVNode.props);
}

function updateFunctionComponent(oldVNode, newVNode) {
  const oldDOM = findDOMByVNode(oldVNode);
  if (!oldDOM) {
    return
  }
  const { props, type } = newVNode; // 组件级别的虚拟DOM
  const newRenderVNode = type(props); // 函数执行返回值的虚拟DOM
  updateDOMTree(oldVNode.oldRenderVNode, newRenderVNode, oldDOM);
  newVNode.oldRenderVNode = newRenderVNode;
}

// DOM DIFF算法的核心
function updateChildren(parentDOM, oldVNodeChildren, newVNodeChildren) {
  oldVNodeChildren = (Array.isArray(oldVNodeChildren) ? oldVNodeChildren : [oldVNodeChildren]).filter(Boolean);
  newVNodeChildren = (Array.isArray(newVNodeChildren) ? newVNodeChildren : [newVNodeChildren]).filter(Boolean);
  let lastNotChangedIndex = -1;
  const oldKeyChildMap = {};
  oldVNodeChildren.forEach((oldVNode, index) => {
    let oldKey = oldVNode && oldVNode.key ? oldVNode.key : index;
    oldKeyChildMap[oldKey] = oldVNode
  })
  // 遍历新的子虚拟DOM数组，找到可以复用但需要移动的节点，需要重新创建的节点，需要删除的节点，剩下的就是可以复用但不移动的节点
  const actions = [];
  newVNodeChildren.forEach((newVNode, index) => {
    newVNode.index = index

    const newKey = newVNode.key ? newVNode.key : index;
    const oldVNode = oldKeyChildMap[newKey];
    if (oldVNode) {
      deepDOMDiff(oldVNode, newVNode);
      if (oldVNode.index < lastNotChangedIndex) {
        actions.push({
          type: MOVE,
          oldVNode,
          newVNode,
          index
        })
      }
      delete oldKeyChildMap[newKey];
      lastNotChangedIndex = Math.max(lastNotChangedIndex, oldVNode.index);
    } else {
      actions.push({ 
        type: CREATE,
        newVNode,
        index
      })
    }
  })
  const VNodeToMove = actions.filter(action => action.type === MOVE).map(action => action.oldVNode);
  const VNodeToDelete = Object.values(oldKeyChildMap);
  VNodeToMove.concat(VNodeToDelete).forEach(oldVNode => {
    const currentDOM = findDOMByVNode(oldVNode);
    currentDOM.remove();
  })

  actions.forEach(action => {
    const { type, oldVNode, newVNode, index } = action;
    const childrenNodes = parentDOM.childNodes;
    const childNode = childrenNodes[index];
    const getDomForInsert = () => {
      if (type === CREATE) {
        return createDOM(newVNode)
      }
      if (type === MOVE) {
        return findDOMByVNode(oldVNode)
      }
    }
    if (childNode) {
      parentDOM.insertBefore(getDomForInsert(), childNode)
    } else {
      parentDOM.appendChild(getDomForInsert())
    }
  })
  
}

const ReactDOM = {
  render,
};

export default ReactDOM;

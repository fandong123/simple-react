import { REACT_ELEMENT } from "./utils";

function render(VNode, container) {
  // 挂载节点
  mount(VNode, container);
}
function mount(VNode, container) {
  const newDOM = createDOM(VNode);
  newDOM && container.appendChild(newDOM);
}

function createDOM(VNode) {
  const { type, props, $$typeof } = VNode;
  let dom;
  if ($$typeof === REACT_ELEMENT && type) {
    dom = document.createElement(type);
  }
  if (props) {
    const { children } = props;
    if (Array.isArray(children)) {
      /**
       * {
          type: "div",
          key: null,
          ref: null,
          props: {
            children: [
              {
                type: "div",
                key: null,
                ref: null,
                props: {
                  children: "111",
                },
              },
              {
                type: "div",
                key: null,
                ref: null,
                props: {
                  children: "2222",
                },
              },
              "Simple React",
            ],
          },
        }
      */
      mountArray(children, dom);
    } else if (typeof children === "object" && type) {
      /**
       * {
            type: "div",
            key: null,
            ref: null,
            props: {
              children: {
                type: "span",
                key: null,
                ref: null,
                props: {
                  children: "111",
                },
              },
            },
          }
      */
      mount(children, dom);
    } else if (typeof children === "string") {
      /**
       * {
            type: "div",
            key: null,
            ref: null,
            props: {
              children: "2222",
            },
          }
      */
      dom.appendChild(document.createTextNode(children));
    }
  }
  setPropertyFormDOM(props, dom);
  return dom;
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
      if(/^on[A-Z].*/.test(key)){
        // to do 事件处理
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
  children.forEach((ele) => {
    if (typeof ele === "string") {
      parentDom.appendChild(document.createTextNode(ele));
    } else {
      mount(ele, parentDom);
    }
  });
}

const ReactDOM = {
  render,
};

export default ReactDOM;

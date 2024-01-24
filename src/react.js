import { REACT_ELEMENT, REACT_FORWORD_REF, toVNode } from "./utils";
import { Component } from "./Component";
function createElement(type, properties, children) {
  let ref;
  let key;
  if (properties) {
    ref = properties.ref || null;
    key = properties.key || null;

    ["ref", "key", "__self", "__source"].forEach((key) => {
      delete properties[key];
    });
  }

  let props = { ...properties };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(toVNode);
  } else {
    props.children = toVNode(children);
  }
  return {
    $$typeof: REACT_ELEMENT,
    type,
    key,
    ref,
    props,
  };
}

function createRef() {
  return {
    current: null
  }
}

function forwardRef(render) {
  return {
    $$typeof: REACT_FORWORD_REF,
    render
  }
}
const React = {
  createElement,
  Component,
  createRef,
  forwardRef
};

export default React;

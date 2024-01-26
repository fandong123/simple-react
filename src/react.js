import { REACT_ELEMENT, REACT_FORWORD_REF, REACT_MEMO, toVNode, shallowCompare } from "./utils";
import { Component } from "./Component";
import { useState, useReducer } from "./hooks";
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

function memo(type, compare = null) {
  return {
    $$typeof: REACT_MEMO,
    type,
    compare
  }
}


class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowCompare(this.props, nextProps) || !shallowCompare(this.state, nextState)
  }
}
const React = {
  createElement,
  Component,
  PureComponent,
  memo,
  createRef,
  forwardRef,
  useState,
  useReducer
};

export default React;

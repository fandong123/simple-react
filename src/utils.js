export const REACT_ELEMENT = Symbol("REACT_ELEMENT");
export const REACT_FORWORD_REF = Symbol("react.forward_ref");
export const REACT_TEXT = Symbol("REACT_TEXT");
export const CREATE = Symbol("CREATE");
export const MOVE = Symbol("MOVE");

export const toVNode = (node) => {
  return typeof node === "string" || typeof node === "number"
    ? {
        type: REACT_TEXT,
        props: { text: node },
      }
    : node;
};

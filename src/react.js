import { REACT_ELEMENT } from "./utils";
function createElement(type, properties, children) {
  let ref;
  let key;
  if (properties) {
    ref = properties.ref || null;
    key = properties.ref || null;

    ["ref", "key", "_self", "_source"].forEach((key) => {
      delete properties[key];
    });
  }

  let props = { ...properties };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2);
  } else {
    props.children = children;
  }
  return {
    $$typeof: REACT_ELEMENT,
    type,
    key,
    ref,
    props,
  };
}
const React = {
  createElement,
};

export default React;

//{
//   "type": "div",
//   "key": null,
//   "ref": null,
//   "props": {
//       "children": "Simple React"
//   },
//   "_owner": null,
//   "_store": {}
// }

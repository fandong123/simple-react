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

export const deepClone = (data) => {
  const type = getType(data);
  let resultValue;
  if (type !== 'array' && type !== 'object') {
    return data;
  }
  if (type === 'array') {
    resultValue = [];
    data.forEach(item => {
      resultValue.push(deepClone(item));
    })
  }
  if (type === 'object') {
    resultValue = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        resultValue[key] = deepClone(data[key])
      }
    }
  }
  return resultValue;
}

export function getType(obj) {
  const typeMap = {
    '[Object Boolean]' : 'boolean',
    '[Object Number]': 'number',
    '[Object String]': 'string',
    '[Object Function]': 'function',
    '[Object Array]': 'array',
    '[Object Date]': 'date',
    '[Object RegExp]': 'regExp',
    '[Object Undefined]': 'undefined',
    '[Object Null]': 'null',
    '[Object Object]': 'object',
  }
  return Object.prototype.toString.call(obj)
}
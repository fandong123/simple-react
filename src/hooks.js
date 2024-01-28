import { emitUpdateForHooks } from "./react-dom";

const states = [];
let hookIndex = 0;
export function restHookIndex() {
  hookIndex = 0;
}
export function useState(initialState) {
  states[hookIndex] = states[hookIndex] || initialState;
  const currentIndex = hookIndex;
  function setState(newState) {
    states[currentIndex] = newState;
    emitUpdateForHooks();
  }
  return [states[hookIndex++], setState];
}

export function useReducer(reducer, initialState) {
  states[hookIndex] = states[hookIndex] || initialState;
  const currentIndex = hookIndex;
  function dispatch(action) {
    states[currentIndex] = reducer(states[currentIndex], action);
    emitUpdateForHooks();
  }
  return [states[hookIndex++], dispatch];
}

export function useEffect(effectFunction, deps = []) {
  const currentIndex = hookIndex;
  const [destroyFunction, prDeps] = states[hookIndex] || [null, null];
  if (!states[hookIndex] || deps.some((item, index) => item !== prDeps[index])) {
    setTimeout(() => {
      destroyFunction && destroyFunction();
      states[currentIndex] = [effectFunction(), deps];
    });
  }
  hookIndex++;
}

export function useLayoutEffect(effectFunction, deps = []) {
  const currentIndex = hookIndex;
  const [destroyFunction, prDeps] = states[hookIndex] || [null, null];
  if (!states[hookIndex] || deps.some((item, index) => item !== prDeps[index])) {
    queueMicrotask(() => {
      destroyFunction && destroyFunction();
      states[currentIndex] = [effectFunction(), deps];
    });
  }
  hookIndex++;
}

export function useRef(initialState) {
  states[hookIndex] = states[hookIndex] || { current: initialState };
  return states[hookIndex++]
}
import { updateQueue, flushUpdateQueue } from "./Component";
export function addEvent(dom, eventName, bindFunction) {
  dom.attach = dom.attach || {};
  dom.attach[eventName] = bindFunction;
  // 事件合成机制的核心点一：事件绑定到document上
  if (document[eventName]) {
    return;
  }
  document[eventName] = dispatchEvent;
}

function dispatchEvent(nativeEvent) {
  updateQueue.isBatch = true;
  // 事件合成机制的核心点二：屏蔽浏览器之间的差异
  const syntheticEvent = createSynthericEvent(nativeEvent);
  let target = nativeEvent.target;
  while (target) {
    syntheticEvent.currentTarget = target;
    const eventName = `on${nativeEvent.type}`;
    const bindFunction = target.attach && target.attach[eventName];
    bindFunction && bindFunction(syntheticEvent);
    if (syntheticEvent.isPropagationStopped) {
      break;
    }
    target = target.parentNode;
  }
  flushUpdateQueue();
}

function createSynthericEvent(nativeEvent) {
  let nativeEventKeyValues = {};
  for (const key in nativeEvent) {
    nativeEventKeyValues[key] = typeof nativeEvent[key] === 'function' ? nativeEvent[key].bind(nativeEvent) : nativeEvent[key];
  }
  let syntheticEvent = Object.assign(nativeEventKeyValues, {
    nativeEvent,
    isDefaultPrevented: false,
    isPropagationStopped:false,
    defaultPrevented: function () {
      this.isDefaultPrevented = true;
      if (this.nativeEvent.defaultPrevented) {
        this.nativeEvent.defaultPrevented();
      } else {
        this.nativeEvent.returnValue = false;
      }
    },
    stopPropagation: function() {
      this.isPropagationStopped = true;
      if (this.nativeEvent.stopPropagation) {
        this.nativeEvent.stopPropagation();
      } else {
        this.nativeEvent.cancelBubble = false;
      }
    }
  })
  return syntheticEvent;
}
import { createRenderer } from "../runtime-core";

// 针对 dom 平台渲染，可根据渲染平台相应的API去自定义平台，例如 canvas 等

function createElement(type) {
  return document.createElement(type);
}

function patchProp(el, key, val) {
  // 抽离通用事件
  // on + Click  on + 首字母大写的事件
  const isOn = (key) => /^on[A-Z]/.test(key);
  if (isOn(key)) {
    // 截取事件并且转换成小写
    const event = key.slice(2).toLocaleLowerCase();
    el.addEventListener(event, val);
  } else {
    el.setAttribute(key, val);
  }
}

function insert(el, container) {
  container.append(el);
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
});

export function createApp(...args) {
  return renderer.createApp(...args);
}

export * from "../runtime-core";

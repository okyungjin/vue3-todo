import { h, render } from 'vue';

const removeElement = (el) => {
  if (typeof el.remove !== 'undefined') {
    el.remove();
  } else {
    // eslint-disable-next-line no-unused-expressions
    el.parentNode?.removeChild(el);
  }
};

const createComponent = (component, props, parentContainer, slots = {}) => {
  const vNode = h(component, props, slots);
  const container = document.createElement('div');
  container.classList.add('toast');
  parentContainer.appendChild(container);
  render(vNode, container);
  return vNode.component;
};

export {
  removeElement,
  createComponent,
};

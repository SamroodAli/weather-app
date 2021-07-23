function element(element, innerHtml, className, attributes, styles) {
  const newElement = document.createElement(element);

  if (Array.isArray(innerHtml)) {
    newElement.append(...innerHtml);
  } else if (typeof innerHtml === 'object') {
    newElement.appendChild(innerHtml);
  } else if (innerHtml) {
    newElement.innerText = innerHtml.toString();
  }

  if (className) {
    newElement.className = className;
  }

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => newElement.setAttribute(key, value));
  }

  if (styles) {
    Object.assign(newElement.style, styles);
  }

  return newElement;
}

export default element;

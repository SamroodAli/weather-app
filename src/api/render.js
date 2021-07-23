export const render = (parent, child) => {
  parent.innerHTML = '';
  parent.append(child);
  return parent;
};

export const renderOn = (parent) => (child) => render(parent, child);

export const renderOnId = (id) => {
  const parent = document.getElementById(id);
  return renderOn(parent);
};

export const eleId = (id) => document.getElementById(id);

export const deleteId = (id) => {
  eleId(id).remove();
};

const content = renderOnId('content');

export const changePage = (markup) => {
  content(markup);
};

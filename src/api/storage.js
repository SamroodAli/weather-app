export const store = (key, value) => {
  if (typeof value === "object") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export const get = (key) => JSON.parse(localStorage.getItem(key));

export const clear = () => localStorage.clear();

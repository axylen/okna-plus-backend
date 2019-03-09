function deepCopy(obj) {
  const newEl = Array.isArray(obj) ? [] : {};

  let el;
  for (let key in obj) {
    el = obj[key];
    if (el && typeof el === 'object') el = deepCopy(el);
    newEl[key] = el;
  }
  return newEl;
}

module.exports = deepCopy;

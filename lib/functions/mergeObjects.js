const deepCopy = require('./deepCopy');

function merge(obj, obj2) {
  let merged = deepCopy(obj);
  let el;

  for (let key in obj2) {
    el = obj2[key];

    if (typeof el === 'object') {
      if (Array.isArray(el)) {
        merged[key] = [...merged[key], ...el];
      } else {
        merged[key] = merge(merged[key], el);
      }
    } else {
      merged[key] = el;
    }
  }

  return merged;
}

module.exports = merge;

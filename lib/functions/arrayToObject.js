function arrayToObject(arr, getObjectKey, modifyObject = el => el) {
  const obj = {};
  let key;

  arr.forEach((el, id) => {
    key = getObjectKey(el, id);
    obj[key] = modifyObject(el, id);
  });

  return obj;
}

module.exports = arrayToObject;

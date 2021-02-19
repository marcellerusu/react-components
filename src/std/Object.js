// Object.map({a: 2}, x => x * x) -> {a: 4}
Object.map = function (object, mapFunc) {
  const newObject = {};
  for (const [key, value] of Object.entries(object)) {
    newObject[key] = mapFunc(value);
  }
  return newObject;
};
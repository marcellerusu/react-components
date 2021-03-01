// Object.mapValues({a: 2}, x => x * x) -> {a: 4}
Object.mapValues = function (object, mapFunc) {
  const newObject = {};
  for (const [key, value] of Object.entries(object)) {
    newObject[key] = mapFunc(value);
  }
  return newObject;
};
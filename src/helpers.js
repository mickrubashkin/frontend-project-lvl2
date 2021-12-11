export const getTypeof = (data) => (
  Object.prototype.toString
    .call(data)
    .slice(8, -1)
    .toLowerCase()
);

export const hasKey = (obj, key) => (
  Object.prototype.hasOwnProperty
    .call(obj, key)
);

import _ from 'lodash';

const calcDiff = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.map((key) => {
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return ({
        key,
        type: 'added',
        value: obj2[key],
      });
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return ({
        key,
        type: 'removed',
        value: obj1[key],
      });
    }

    if (obj1[key] === obj2[key]) {
      return ({
        key,
        type: 'unchanged',
        value: obj1[key],
      });
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const children = calcDiff(obj1[key], obj2[key]);

      return ({
        key,
        type: 'nested',
        children,
      });
    }

    return ({
      key,
      type: 'updated',
      from: obj1[key],
      to: obj2[key],
    });
  });

  return diff;
};

export default calcDiff;

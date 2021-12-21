import _ from 'lodash';

const toString = (values) => (values.map((value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (_.isObject(value)) return '[complex value]';

  return value;
}));

export default (diff) => {
  const iter = (data, path) => {
    const lines = Array.isArray(data)
      ? data
      : Object.entries(data).map(([key, value]) => ({ key, value }));

    const plainLines = lines
      .filter(({ type }) => type !== 'unchanged')
      .map(({
        key, type, value, from, to, children,
      }) => {
        if (type === 'nested') return iter(children, [...path, key]);

        const [val, fromVal, toVal] = toString([value, from, to]);
        const fullPath = [...path, key].join('.');
        const str1 = `Property '${fullPath}' was ${type}`;

        const str2 = (type === 'updated')
          ? `${str1}. From ${fromVal} to ${toVal}`
          : `${str1} with value: ${val}`;

        const result = type === 'removed' ? str1 : str2;

        return result;
      });

    return plainLines.join('\n');
  };

  return iter(diff, []);
};

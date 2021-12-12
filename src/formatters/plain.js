import { getTypeof } from '../helpers.js';

const toString = (values) => (values
  .map((value) => {
    if (getTypeof(value) === 'string') return `'${value}'`;
    if (getTypeof(value) === 'object') return '[complex value]';

    return value;
  })
);

export default (diff) => {
  const iter = (data, path) => {
    const lines = Object
      .entries(data)
      .filter(([, { type }]) => type !== 'unchanged')
      .map(([key, props]) => {
        const {
          type, value, from, to, children,
        } = props;

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

    return lines.join('\n');
  };

  return iter(diff, []);
};

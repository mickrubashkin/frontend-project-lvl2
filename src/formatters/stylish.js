import { getTypeof } from '../helpers.js';

export default (diff, replacer = ' ', spacesCount = 4) => {
  const iter = (data, depth) => {
    if (getTypeof(data) !== 'object') return `${data}`;

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const addedIndent = `${currentIndent.slice(0, -2)}+ `;
    const removedIndent = `${currentIndent.slice(0, -2)}- `;
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = Object
      .entries(data)
      .map(([key, val]) => {
        const {
          type, value, from, to, children,
        } = val;

        if (type === 'added') {
          return `${addedIndent}${key}: ${iter(value, depth + 1)}`;
        } if (type === 'removed') {
          return `${removedIndent}${key}: ${iter(value, depth + 1)}`;
        } if (type === 'updated') {
          const line1 = `${removedIndent}${key}: ${iter(from, depth + 1)}`;
          const line2 = `${addedIndent}${key}: ${iter(to, depth + 1)}`;
          return `${line1}\n${line2}`;
        } if (type === 'unchanged') {
          return `${currentIndent}${key}: ${iter(value, depth + 1)}`;
        } if (!type) {
          return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
        }

        return `${currentIndent}${key}: ${iter(children, depth + 1)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};

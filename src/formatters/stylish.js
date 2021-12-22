import _ from 'lodash';

export default (diff, replacer = ' ', spacesCount = 4) => {
  const iter = (data, depth) => {
    // if (!_.isObject(data)) return `${data}`;
    if (!_.isObject(data)) return data;

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const addedIndent = `${currentIndent.slice(0, -2)}+ `;
    const removedIndent = `${currentIndent.slice(0, -2)}- `;
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = Array.isArray(data)
      ? data
      : Object.entries(data).map(([key, value]) => ({ key, value }));

    const stylishLines = lines.map((item) => {
      const {
        key, type, value, from, to, children,
      } = item;

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
        return `${currentIndent}${key}: ${iter(value, depth + 1)}`;
      }

      return `${currentIndent}${key}: ${iter(children, depth + 1)}`;
    });

    return [
      '{',
      ...stylishLines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};

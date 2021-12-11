const getTypeof = (data) => Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

const stringify = (diff, replacer = ' ', spacesCount = 4) => {
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
        const type = val.type ?? 'property';
        const value = val.value ?? val;
        if (type === 'added') {
          return `${addedIndent}${key}: ${iter(value, depth + 1)}`;
        } if (type === 'removed') {
          return `${removedIndent}${key}: ${iter(value, depth + 1)}`;
        } if (type === 'updated') {
          const val1 = value.from;
          const val2 = value.to;
          const line1 = `${removedIndent}${key}: ${iter(val1, depth + 1)}`;
          const line2 = `${addedIndent}${key}: ${iter(val2, depth + 1)}`;
          return `${line1}\n${line2}`;
        } if (type === 'unchanged') {
          return `${currentIndent}${key}: ${iter(value, depth + 1)}`;
        } if (type === 'property') {
          return `${currentIndent}${key}: ${iter(value, depth + 1)}`;
        }

        return `${currentIndent}${key}: ${iter(value, depth + 1)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};

const textify = (diff) => stringify(diff);

export default (diff, formatter) => {
  const formatted = formatter === 'stylish' ? stringify(diff) : textify(diff);
  return formatted;
};

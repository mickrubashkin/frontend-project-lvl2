import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, formatName) => {
  const formatted = (formatName === 'stylish')
    ? stylish(diff)
    : plain(diff);

  return formatted;
};

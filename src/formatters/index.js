import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formaters = {
  stylish,
  plain,
  json,
};

export default (diff, formatName) => formaters[formatName](diff);

import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formaters = {
  stylish,
  plain,
  json,
};

export default (diff, formatName) => {
  if (!_.has(formaters, formatName)) {
    throw new Error(`Unsupported format "${formatName}".\nPlease use stylish, plain, or json`);
  }

  return formaters[formatName](diff);
};

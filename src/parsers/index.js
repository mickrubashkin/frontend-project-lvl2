import _ from 'lodash';
import jsonparser from './jsonparser.js';
import yamlparser from './yamlparser.js';

const parsers = {
  json: jsonparser,
  yaml: yamlparser,
  yml: yamlparser,
};

export default (data, ext) => {
  if (!_.has(parsers, ext)) {
    throw new Error(`Unsupported file type: ${ext}\nSupported formats: json, yaml, yml`);
  }

  return parsers[ext](data);
};

import jsonparser from './jsonparser.js';
import yamlparser from './yamlparser.js';

const parsers = {
  json: jsonparser,
  yaml: yamlparser,
  yml: yamlparser,
};

export default (data, ext) => parsers[ext](data);

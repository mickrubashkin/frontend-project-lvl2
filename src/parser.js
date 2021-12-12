import yaml from 'js-yaml';

const jsonParser = JSON.parse;
const yamlParser = yaml.load;

const parsers = {
  json: jsonParser,
  yaml: yamlParser,
  yml: yamlParser,
};

export default (data, ext) => parsers[ext](data);

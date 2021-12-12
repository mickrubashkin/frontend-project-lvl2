import yaml from 'js-yaml';

const jsonParser = JSON.parse;
const yamlParser = yaml.load;

const parsers = {
  json: jsonParser,
  yaml: yamlParser,
  yml: yamlParser,
};

export default (data, ext) => parsers[ext](data);
// export default (data, ext) => {
//   let res;

//   if (ext === 'json') {
//     res = JSON.parse(data);
//   } else if (ext === 'yaml' || ext === 'yml') {
//     res = yaml.load(data);
//   }

//   return res;
// };

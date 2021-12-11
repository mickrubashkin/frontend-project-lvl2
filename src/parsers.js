import yaml from 'js-yaml';

export default (data, ext) => {
  let res;

  if (ext === 'json') {
    res = JSON.parse(data);
  } else if (ext === 'yaml' || ext === 'yml') {
    res = yaml.load(data);
  }

  return res;
};

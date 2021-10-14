import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

export default (filepath1, filepath2 /* , options */) => {
  // Resolve file paths
  const wd = process.cwd();

  const path1 = path.resolve(wd, filepath1);
  const path2 = path.resolve(wd, filepath2);

  // Get files data
  const data1 = readFileSync(path1, 'utf-8');
  const data2 = readFileSync(path2, 'utf-8');

  // Parse text data to JSON object
  const json1 = JSON.parse(data1);
  const json2 = JSON.parse(data2);

  // Get sorted uniq json1 and json2 keys
  const keys1 = Object.keys(json1);
  const keys2 = Object.keys(json2);
  const keys = _.concat(keys1, keys2).sort();
  const uniqKeys = _.uniq(keys);

  // filter, map, reduce?

  const diff = [];
  const diffObj = {};

  uniqKeys.forEach((key) => {
    if (_.has(json1, key) && _.has(json2, key) && json1[key] === json2[key]) {
      const diffKey = `  ${key}`;
      const value = json1[key];
      diff.push(`${diffKey}: ${value}`);
      diffObj[diffKey] = value;
    } else {
      if (_.has(json1, key)) {
        const diffKey = `- ${key}`;
        const value = json1[key];
        diff.push(`${diffKey}: ${value}`);
        diffObj[diffKey] = value;
      }

      if (_.has(json2, key)) {
        const diffKey = `+ ${key}`;
        const value = json2[key];
        diff.push(`${diffKey}: ${value}`);
        diffObj[diffKey] = value;
      }
    }
  });

  // const paddedDiff = diff.map((item) => `  ${item}`);
  // const result = `{\n${paddedDiff.join('\n')}\n}`;

  // return result;
  return diffObj;
};

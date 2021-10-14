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
  const uniqKeys = _.union(keys1, keys2);

  const diff = {};

  uniqKeys.forEach((key) => {
    if (_.has(json1, key) && _.has(json2, key) && json1[key] === json2[key]) {
      const diffKey = `  ${key}`;
      const value = json1[key];
      diff[diffKey] = value;
    } else {
      if (_.has(json1, key)) {
        const diffKey = `- ${key}`;
        const value = json1[key];
        diff[diffKey] = value;
      }

      if (_.has(json2, key)) {
        const diffKey = `+ ${key}`;
        const value = json2[key];
        diff[diffKey] = value;
      }
    }
  });

  return JSON.stringify(diff);
};

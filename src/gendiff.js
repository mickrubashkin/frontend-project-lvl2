import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import parse from './parser.js';

export default (filepath1, filepath2 /* , options */) => {
  // Resolve path => Read file => Parse data => Compare => Format => Print result

  // Resolve file paths
  const wd = process.cwd();

  const path1 = path.resolve(wd, filepath1);
  const path2 = path.resolve(wd, filepath2);

  // Get files data
  const data1 = readFileSync(path1, 'utf-8');
  const data2 = readFileSync(path2, 'utf-8');

  // Get file type
  const ext1 = path.parse(path1).ext;
  const ext2 = path.parse(path2).ext;

  // Parse files data
  const obj1 = parse(data1, ext1);
  const obj2 = parse(data2, ext2);

  // Compare files
  const diff = {};

  // Get sorted uniq obj1 and obj2 keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = _.union(keys1, keys2);

  uniqKeys.forEach((key) => {
    if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key]) {
      const diffKey = `  ${key}`;
      const value = obj1[key];
      diff[diffKey] = value;
    } else {
      if (_.has(obj1, key)) {
        const diffKey = `- ${key}`;
        const value = obj1[key];
        diff[diffKey] = value;
      }

      if (_.has(obj2, key)) {
        const diffKey = `+ ${key}`;
        const value = obj2[key];
        diff[diffKey] = value;
      }
    }
  });

  return JSON.stringify(diff, null, '  ');
};

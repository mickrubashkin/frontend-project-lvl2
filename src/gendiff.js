/* eslint no-nested-ternary: "off" */

import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import { getTypeof, hasKey } from './helpers.js';
import parser from './parser.js';
import format from './formatters/index.js';

const getFileData = (filePath) => {
  const dirname = process.cwd();
  const resolvedPath = path.resolve(dirname, filePath);
  const data = readFileSync(resolvedPath, 'utf-8');
  const ext = path.parse(resolvedPath).ext.slice(1);

  return { data, ext };
};

const isObj = (data) => getTypeof(data) === 'object';

const mkdiff = (name, type, values) => {
  const diff = {
    [name]: { type, ...values },
  };

  return diff;
};

const calcDiff = (source, target) => {
  const keys = Object.keys({ ...source, ...target });
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.map((key) => {
    const val1 = source[key];
    const val2 = target[key];

    if (!hasKey(source, key) && hasKey(target, key)) {
      return mkdiff(key, 'added', { value: val2 });
    }

    if (hasKey(source, key) && !hasKey(target, key)) {
      return mkdiff(key, 'removed', { value: val1 });
    }

    if (val1 === val2) {
      return mkdiff(key, 'unchanged', { value: val1 });
    }

    if (isObj(val1) && isObj(val2)) {
      const children = calcDiff(val1, val2);
      return mkdiff(key, 'nested', { children });
    }

    return mkdiff(key, 'updated', { from: val1, to: val2 });
  })
    .reduce((acc, item) => {
      const newAcc = { ...acc, ...item };
      return newAcc;
    }, {});

  return diff;
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const { data: data1, ext: ext1 } = getFileData(filepath1);
  const { data: data2, ext: ext2 } = getFileData(filepath2);

  const obj1 = parser(data1, ext1);
  const obj2 = parser(data2, ext2);

  const diff = calcDiff(obj1, obj2);

  const formatted = format(diff, formatName);

  return formatted;
};

export default gendiff;

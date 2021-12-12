/* eslint no-nested-ternary: "off" */

import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
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

const isPlain = (data) => getTypeof(data) !== 'object';
// const isObj = (data) => getTypeof(data) === 'object';

// const mkdiff = (key, type, props) => {
//   const {
//     value,
//     from,
//     to,
//     children,
//   } = props;

//   if (['added', 'removed', 'unchanged'].includes(type)) {
//     return ({ [key]: { type, value } });
//   }

//   if (type === 'updated') {
//     return ({ [key]: { type, from, to } });
//   }

//   // if (type === 'nested') {
//   return ({ [key]: { type, children } });
//   // }
// };

// const calcDiff = (source, target) => {
//   const keys = Object.keys({ ...source, ...target });

//   const diff = [...keys]
//     .sort()
//     .map((key) => {
//       const val1 = source[key];
//       const val2 = target[key];

//       if (!hasKey(source, key) && hasKey(target, key)) {
//         return mkdiff(key, 'added', { value: val2 });
//       }

//       if (hasKey(source, key) && !hasKey(target, key)) {
//         return mkdiff(key, 'removed', { value: val1 });
//       }

//       if (val1 === val2) {
//         return mkdiff(key, 'unchanged', { value: val1 });
//       }

//       if (isObj(val1) && isObj(val2)) {
//         const children = calcDiff(val1, val2);
//         return mkdiff(key, 'deep', { children });
//       }

//       return mkdiff(key, 'updated', { from: val1, to: val2 });
//     })
//     .reduce((acc, item) => {
//       const newAcc = { ...acc, ...item };
//       return newAcc;
//     }, {});

//   return diff;
// };

const keyAdded = (obj1, obj2, key) => (
  !hasKey(obj1, key) && hasKey(obj2, key)
);

const keyRemoved = (obj1, obj2, key) => (
  hasKey(obj1, key) && !hasKey(obj2, key)
);

const keyUpdated = (obj1, obj2, key) => (
  hasKey(obj1, key)
  && hasKey(obj2, key)
  && (isPlain(obj1[key]) || isPlain(obj2[key]))
  && (obj1[key] !== obj2[key])
);

const keyUnchanged = (obj1, obj2, key) => (
  hasKey(obj1, key)
  && hasKey(obj2, key)
  && obj1[key] === obj2[key]
);

const getKeyState = (obj1, obj2, key) => {
  if (keyAdded(obj1, obj2, key)) return 'added';
  if (keyRemoved(obj1, obj2, key)) return 'removed';
  if (keyUpdated(obj1, obj2, key)) return 'updated';
  if (keyUnchanged(obj1, obj2, key)) return 'unchanged';
  return 'deep';
};

const mkdiff = (name, type, value) => ({ name, type, value });

const calcDiff = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 }).sort();
  const diffKeys = keys.map((key) => {
    const name = key;
    const type = getKeyState(obj1, obj2, key);
    const value = (
      (type === 'deep') ? calcDiff(obj1[key], obj2[key])
        : (type === 'added') ? obj2[key]
          : (type === 'removed') ? obj1[key]
            : (type === 'updated') ? ({ from: obj1[key], to: obj2[key] })
              : obj1[key]
    );

    return mkdiff(name, type, value);
  });

  const diff = diffKeys.reduce((acc, item) => {
    const { name, type, value } = item;
    const newAcc = { ...acc };
    newAcc[name] = { type, value };

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

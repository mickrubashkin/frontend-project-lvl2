import fs from 'fs';
import path from 'path';
import process from 'process';

import parse from './parsers/index.js';
import calculateDiff from './calculateDiff.js';
import format from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const dirname = process.cwd();
  const absolutePath1 = path.resolve(dirname, filepath1);
  const absolutePath2 = path.resolve(dirname, filepath2);

  try {
    const fileContent1 = fs.readFileSync(absolutePath1, 'utf-8');
    const fileFormat1 = path.parse(absolutePath1).ext.slice(1);
    const fileContent2 = fs.readFileSync(absolutePath2, 'utf-8');
    const fileFormat2 = path.parse(absolutePath2).ext.slice(1);

    const data1 = parse(fileContent1, fileFormat1);
    const data2 = parse(fileContent2, fileFormat2);

    const diff = calculateDiff(data1, data2);
    const formattedDiffString = format(diff, formatName);

    return formattedDiffString;
  } catch (e) {
    return e.message;
  }
};

export default gendiff;

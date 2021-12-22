import fs from 'fs';
import path from 'path';
import process from 'process';

import parse from './parsers/index.js';
import calculateDiff from './calculateDiff.js';
import format from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  // Resolve file pathes
  const dirname = process.cwd();
  const absolutePath1 = path.resolve(dirname, filepath1);
  const absolutePath2 = path.resolve(dirname, filepath2);

  // Get string content from files (handle errors?)
  const fileContent1 = fs.readFileSync(absolutePath1, 'utf-8');
  const fileFormat1 = path.parse(absolutePath1).ext.slice(1);
  const fileContent2 = fs.readFileSync(absolutePath2, 'utf-8');
  const fileFormat2 = path.parse(absolutePath2).ext.slice(1);

  // Parse string content to js data object (handle errors?)
  const data1 = parse(fileContent1, fileFormat1);
  const data2 = parse(fileContent2, fileFormat2);

  // Build diff tree
  const diff = calculateDiff(data1, data2);

  // Convert diff to formatted string
  const formattedDiffString = format(diff, formatName);

  return formattedDiffString;
};

export default gendiff;

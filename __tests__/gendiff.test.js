import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff', () => {
  const expectedJsonDiff = readFile('expectedDiff.json');
  const expected = JSON.parse(expectedJsonDiff);
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  console.log(expected);
  console.log(actual);
  expect(actual).toEqual(expected);
});

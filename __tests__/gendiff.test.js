import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../index.js';
import { stylish, plain, json } from '../__fixtures__/expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Generates diff recursively for json files', () => {
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toEqual(stylish);
});

test('Generates diff recursively for yaml files', () => {
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(actual).toEqual(stylish);
});

test('Prints diff in plain format', () => {
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(actual).toEqual(plain);
});

test('Prints diff in json format', () => {
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
  expect(actual).toEqual(json);
});

import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import gendiff from '../index.js';
import diff from '../src/dummyDiffObj.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Generates diff recursively for json files', () => {
  const actual = JSON.parse(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json'));
  expect(actual).toEqual(diff);
});

test('Generates diff recursively for yaml files', () => {
  const actual = JSON.parse(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json'));
  expect(actual).toEqual(diff);
});

test('Prints diff in stylish format', () => {
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const expected = readFileSync(getFixturePath('stylish.txt'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('Prints diff in plain format', () => {
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  const expected = readFileSync(getFixturePath('plain.txt'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('Prints diff in json format', () => {
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
  const expected = readFileSync(getFixturePath('json.txt'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('Handles nonexisting files/paths', () => {
  const expectedMessage = "ENOENT: no such file or directory, open '/no/such/file.json'";
  const actual = gendiff('/no/such/file.json', 'file2.json');
  expect(actual).toEqual(expectedMessage);
});

test('Handles invalid json/yml files', () => {
  const expectedMessage = 'Unexpected token } in JSON at position 11';
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('invalid.json'));
  expect(actual).toEqual(expectedMessage);
});

test('Handles unsupported file types', () => {
  const expectedMessage = 'Unsupported file type: txt\nSupported formats: json, yaml, yml';
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('json.txt'));
  expect(actual).toEqual(expectedMessage);
});

test('Handles invalid formatter name', () => {
  const expectedMessage = 'Unsupported format "fantasy".\nPlease use stylish, plain, or json';
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'fantasy');
  expect(actual).toEqual(expectedMessage);
});

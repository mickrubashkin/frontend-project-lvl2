import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const diff = [
  {
    key: 'common',
    type: 'nested',
    children: [
      {
        key: 'follow',
        type: 'added',
        value: false,
      },
      {
        key: 'setting1',
        type: 'unchanged',
        value: 'Value 1',
      },
      {
        key: 'setting2',
        type: 'removed',
        value: 200,
      },
      {
        key: 'setting3',
        type: 'updated',
        from: true,
        to: null,
      },
      {
        key: 'setting4',
        type: 'added',
        value: 'blah blah',
      },
      {
        key: 'setting5',
        type: 'added',
        value: {
          key5: 'value5',
        },
      },
      {
        key: 'setting6',
        type: 'nested',
        children: [
          {
            key: 'doge',
            type: 'nested',
            children: [
              {
                key: 'wow',
                type: 'updated',
                from: '',
                to: 'so much',
              },
            ],
          },
          {
            key: 'key',
            type: 'unchanged',
            value: 'value',
          },
          {
            key: 'ops',
            type: 'added',
            value: 'vops',
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    type: 'nested',
    children: [
      {
        key: 'baz',
        type: 'updated',
        from: 'bas',
        to: 'bars',
      },
      {
        key: 'foo',
        type: 'unchanged',
        value: 'bar',
      },
      {
        key: 'nest',
        type: 'updated',
        from: {
          key: 'value',
        },
        to: 'str',
      },
    ],
  },
  {
    key: 'group2',
    type: 'removed',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  },
  {
    key: 'group3',
    type: 'added',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  },
];

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

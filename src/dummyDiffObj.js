export default [
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

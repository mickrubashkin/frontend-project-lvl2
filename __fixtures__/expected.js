export const plain = ''
  + 'Property \'common.follow\' was added with value: false\n'
  + 'Property \'common.setting2\' was removed\n'
  + 'Property \'common.setting3\' was updated. From true to null\n'
  + 'Property \'common.setting4\' was added with value: \'blah blah\'\n'
  + 'Property \'common.setting5\' was added with value: [complex value]\n'
  + 'Property \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\'\n'
  + 'Property \'common.setting6.ops\' was added with value: \'vops\'\n'
  + 'Property \'group1.baz\' was updated. From \'bas\' to \'bars\'\n'
  + 'Property \'group1.nest\' was updated. From [complex value] to \'str\'\n'
  + 'Property \'group2\' was removed\n'
  + 'Property \'group3\' was added with value: [complex value]';

export const stylish = '{\n'
  + '    common: {\n'
  + '      + follow: false\n'
  + '        setting1: Value 1\n'
  + '      - setting2: 200\n'
  + '      - setting3: true\n'
  + '      + setting3: null\n'
  + '      + setting4: blah blah\n'
  + '      + setting5: {\n'
  + '            key5: value5\n'
  + '        }\n'
  + '        setting6: {\n'
  + '            doge: {\n'
  + '              - wow: \n'
  + '              + wow: so much\n'
  + '            }\n'
  + '            key: value\n'
  + '          + ops: vops\n'
  + '        }\n'
  + '    }\n'
  + '    group1: {\n'
  + '      - baz: bas\n'
  + '      + baz: bars\n'
  + '        foo: bar\n'
  + '      - nest: {\n'
  + '            key: value\n'
  + '        }\n'
  + '      + nest: str\n'
  + '    }\n'
  + '  - group2: {\n'
  + '        abc: 12345\n'
  + '        deep: {\n'
  + '            id: 45\n'
  + '        }\n'
  + '    }\n'
  + '  + group3: {\n'
  + '        deep: {\n'
  + '            id: {\n'
  + '                number: 45\n'
  + '            }\n'
  + '        }\n'
  + '        fee: 100500\n'
  + '    }\n'
  + '}';

export const json = '{"common":{"type":"deep","value":{"follow":{"type":"added","value":false},"setting1":{"type":"unchanged","value":"Value 1"},"setting2":{"type":"removed","value":200},"setting3":{"type":"updated","value":{"from":true,"to":null}},"setting4":{"type":"added","value":"blah blah"},"setting5":{"type":"added","value":{"key5":"value5"}},"setting6":{"type":"deep","value":{"doge":{"type":"deep","value":{"wow":{"type":"updated","value":{"from":"","to":"so much"}}}},"key":{"type":"unchanged","value":"value"},"ops":{"type":"added","value":"vops"}}}}},"group1":{"type":"deep","value":{"baz":{"type":"updated","value":{"from":"bas","to":"bars"}},"foo":{"type":"unchanged","value":"bar"},"nest":{"type":"updated","value":{"from":{"key":"value"},"to":"str"}}}},"group2":{"type":"removed","value":{"abc":12345,"deep":{"id":45}}},"group3":{"type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}}';

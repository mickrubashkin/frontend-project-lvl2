import { Command } from 'commander/esm.mjs';

export default () => {
  const program = new Command();

  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
  // .arguments('<filepath1> <filepath2>')
  // .option('-f --format [type]', 'output format')

  program.parse();
};

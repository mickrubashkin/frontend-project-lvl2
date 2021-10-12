#!/usr/bin/env node

// This example shows specifying the arguments using argument() function.

import { Command } from 'commander/esm.mjs';

const program = new Command();

program
  .version('0.1.0')
  .argument('<username>', 'user to login')
  .argument('[password]', 'password for user, if required', 'no password given')
  .description('example program for argument')
  .action((username, password) => {
    console.log('username:', username);
    console.log('password:', password);
  });

program.parse();

// Try the following:
//    node arguments.js --help
//    node arguments.js user
//    node arguments.js user secret
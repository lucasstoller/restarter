#!/usr/bin/env node
'use strict';
const program = require('commander');
const fs = require('fs');
const { COPYFILE_EXCL } = fs.constants;

program
    .option('-s, --setup-name <name>', 'Create a setup file with a custom name.')
    .option('-p, --path <path>', 'Create a setup file in a specific directory')
    .parse(process.argv);

const name = program.setupName ? program.setupName : 'setup'
const path = program.path ? program.path : process.cwd()
const dest = `${path}/${name}.json`

const src = `${__dirname}/.default-setup-file.json`

try {
    fs.copyFileSync(src, dest, COPYFILE_EXCL);
    console.log(`${dest} created`);
    console.log('Open and populate it with your apps! :)');
} catch (error) {
    switch (error.errno) {
        case -17:
            console.log('File alread exists!');
            break;
    
        default:
            console.log('Sorry, something went wrong. Try again later :/');
            break;
    }
}




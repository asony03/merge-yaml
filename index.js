#!/usr/bin/env node

const util = require('./util.js');

var target_file_path = process.argv[2];

var merged_output = util.recursive_merge(target_file_path);

process.stdout.write(merged_output);

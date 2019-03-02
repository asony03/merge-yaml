var util = require('./util.js');

var target_file_path = process.argv[2];
var files_to_consider = util.get_paths(target_file_path);
merged_output = util.merge(files_to_consider);

process.stdout.write(merged_output);

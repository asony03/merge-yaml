const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

//Starting from the directory of the target file, go up the hierarchy to find all the files to merge and add their paths to an array.
var get_paths = function(target_file) {
  var target_file_path = path.resolve(target_file);
  var target_file_name = target_file_path.split(path.sep).pop();
  var cur_dir = path.dirname(target_file_path);
  var parent_dir = path.dirname(cur_dir);

  var paths = [];
  paths.unshift(target_file_path);

  while(parent_dir != cur_dir && fs.existsSync(parent_dir+path.sep+target_file_name)) {
    paths.unshift(parent_dir+path.sep+target_file_name);
    cur_dir = parent_dir;
    parent_dir = path.dirname(parent_dir);
  }
  return paths;
}

//Given an array of yaml file paths, this function megers their contents.
var merge = function(file_paths) {
  var file_contents = file_paths.map((file_path) => yaml.safeLoad(fs.readFileSync(file_path), 'utf8'));
  var merged_content = _.mergeWith({},...file_contents,customizer);
  const output = yaml.dump(merged_content);
  return output;
}

var customizer = function(objValue, srcValue) {
  if(srcValue == null) {
    return objValue;
  }

  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

exports.get_paths = get_paths;
exports.merge = merge;

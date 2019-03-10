# merge-yaml
[![Build Status](https://travis-ci.com/asony03/merge-yaml.svg?token=pw3pzVPsJZMSEDbHsqBv&branch=master)](https://travis-ci.com/asony03/merge-yaml)

A script that takes a single argument: the path to an input yaml file and prints to stdout, in yaml format, that input file, merged with any files of the same name in parent directories.

## Pre-requisites

Node v6 or higher.

## Installation

### Global installation through command line.
```bash
npm install -g @asony03/merge-yaml
```
#### Usage

```bash
merge-yaml test/fixtures/dir1/dir2/dir3/dir4/input.yml
```
Input:
```bash
test/fixtures/dir1/dir2/dir3/dir4/input.yml
```
```bash
todo:
  vacuum:
    priority: "high"
  dishes:
    type1:
      priority: "low"
    type2:
      priority: "low"
    type3:
      priority: "high"
arr: ["truck"]
weather:
```
The follwing files will be merged in the order top to bottom.
```bash
test/fixtures/dir1/dir2/dir3/dir4/input.yml
test/fixtures/dir1/dir2/dir3/input.yml
test/fixtures/dir1/dir2/input.yml
test/fixtures/dir1/input.yml
```
Output:
```
Greeting: Hello
todo:
  dishes:
    type1:
      priority: low
    type3:
      priority: high
    type2:
      priority: low
  laundry:
    priority: low
  vacuum:
    priority: high
arr:
  - car
  - bus
  - truck
weather:
  - sunny
  - windy
  - rainy
  ```
  
  The files will be recursively merged until the parent directory does not have a file with the same name(and type) or if the root is reached. 

While merging, for string, int and float values, the child value overrides the parent value where as for lists, the child list is concatenanted to the parent list.

### For use as a node dependency
```bash
npm install --save @asony03/merge-yaml
```
```bash 
const recursive_merge = require('merge-yaml').recursive_merge;

var merged_output = recursive_merge('<target_file_path>');
```

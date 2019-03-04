const yaml = require('js-yaml');
const fs = require('fs');
const expect = require('chai').expect;
const merge = require('../util.js').merge;
const get_paths = require('../util.js').get_paths;
const path = require('path');

describe('merge()', function() {

	it('given an array of yaml files, it should merge(update) the contents of the files from right to left', function() {

		var file_paths = get_paths('./test/fixtures/dir1/dir2/dir3/dir4/input.yml');
		var output = merge(file_paths);

		var expected = yaml.safeLoad(fs.readFileSync('./test/fixtures/dir1/dir2/dir3/dir4/result.yml'));
		expected = yaml.dump(expected);

		expect(output).to.eql(expected);
	});

});
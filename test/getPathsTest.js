const expect = require('chai').expect;
const get_paths = require('../util.js').get_paths;
const path = require('path');

describe('get_paths()', function () {
  it('should return the desired file paths [1. Recursively go up until the file is missing in the parent or it has reached the root. 2. Ignore sibling directories. ]', function () {

    var path1 = path.resolve('./test/fixtures/dir1/dir2/dir3/dir4/input.yml');
    var path2 = path.resolve('./test/fixtures/dir1/dir2/dir3/input.yml');
    var path3 = path.resolve('./test/fixtures/dir1/dir2/input.yml');
    var path4 = path.resolve('./test/fixtures/dir1/input.yml');

    var actual = [path4,path3,path2,path1];
    var expected = get_paths('./test/fixtures/dir1/dir2/dir3/dir4/input.yml');

    expect(expected).to.eql(actual);

    path1 = path.resolve('./test/fixtures/dir1/dir2/dir3/input2.yml');
    path2 = path.resolve('./test/fixtures/dir1/dir2/dir3/dir4/input2.yml');

    actual = [path1,path2];
    expected = get_paths('./test/fixtures/dir1/dir2/dir3/dir4/input2.yml');

    expect(expected).to.eql(actual);
  });

  it('should validate the file path', function() {
    var file_path = path.resolve('./test/fixtures/input4.yml');
    expect(() => get_paths('./test/fixtures/input4.yml')).to.throw('ENOENT: no such file or directory, access \'' + file_path + '\'');
  });

  it('should validate the file type', function() {
    expect(() => get_paths('./test/fixtures/dir1/dir2/dir3/dir4/input3.txt')).to.throw('Target file should be a yaml file');
  });

});

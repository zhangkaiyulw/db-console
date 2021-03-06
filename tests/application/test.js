const path = require('path');
const { assert } = require('chai');
const runProcessSync = require('../helpers/runProcessSync');
const packageJson = require('../../package.json');

describe('Output version: ', function() {

  it('with --version, outputs version and exit', function() {
    const response = runProcessSync(
      'node', path.join(__dirname, '../../index.js'), '--version'
    );
    assert.equal(response.stdout.toString(), `${packageJson.version}\n`);
    assert.equal(response.stderr.toString(), '');
  });

  it('with -v, outputs version and exit', function() {
    const response = runProcessSync(
      'node', path.join(__dirname, '../../index.js'), '-v'
    );
    assert.equal(response.stdout.toString(), `${packageJson.version}\n`);
    assert.equal(response.stderr.toString(), '');
  });

});

describe('Output help: ', function() {

  describe('content of help: ', function() {
    let output;
    before(function() {
      const response = runProcessSync(
        'node', path.join(__dirname, '../../index.js'), '--help'
      );
      output = response.stdout.toString();
    });

    it("has section 'DB Console'", function() {
      assert.match(output, /DB Console/);
    });

    it('has version', function() {
      assert.match(output, new RegExp(packageJson.version));
    });

    it('has description', function() {
      assert.match(output, new RegExp(packageJson.description));
    });

    it("has section 'Options'", function() {
      assert.match(output, /Options/);
    });

    it("has option 'help'", function() {
      assert.match(output, /-h, +--help +view db-console's help/);
    });

    it("has option 'version'", function() {
      assert.match(output, /-v, +--version +view db-console's version/);
    });

    it("has option 'config-file'", function() {
      assert.match(output, /-c, +--config-file/);
      assert.match(output, /the config file to load/);
    });

    it("has option 'history-file'", function() {
      assert.match(output, /-H, +--history-file/);
      assert.match(output, /the history file to use/);
    });

    it("has option 'orm-file'", function() {
      assert.match(output, /-o, +--orm/);
      assert.match(output, /the orm library of the models/);
    });

    it("has option 'db'", function() {
      assert.match(output, /-d, +--db/);
      assert.match(output, /the database connection url/);
    });

    it("has option 'models'", function() {
      assert.match(output, /-m, +--models/);
      assert.match(output, /model files matcher/);
    });

    it("has option 'model-base-directory'", function() {
      assert.match(output, /-b, +--model-base-directory/);
      assert.match(output, /where to execute model files matcher/);
    });

    it("has option 'prompt'", function() {
      assert.match(output, /-p, +--prompt/);
      assert.match(output, /the shape of the prompt/);
    });

    it("has section 'Supported ORMs'", function() {
      assert.match(output, /Supported ORMs/);
    });

    it("has orm 'mongoose'", function() {
      assert.match(output, /mongoose/);
    });

    it("has orm 'sequelize'", function() {
      assert.match(output, /sequelize/);
    });

    it("has orm 'sequelize-typescript'", function() {
      assert.match(output, /sequelize-typescript/);
    });

    it("has orm 'typegoose'", function() {
      assert.match(output, /typegoose/);
    });

    it("has orm 'typeorm'", function() {
      assert.match(output, /typeorm/);
    });

  });

  it('with --help, outputs help and exit', function() {
    const response = runProcessSync(
      'node', path.join(__dirname, '../../index.js'), '--help'
    );
    assert.match(response.stdout.toString(), /DB Console/);
    assert.match(response.stdout.toString(), /Options/);
    assert.match(response.stdout.toString(), /Supported ORMs/);
    assert.equal(response.stderr.toString(), '');
  });

  it('with -h, outputs help and exit', function() {
    const response = runProcessSync(
      'node', path.join(__dirname, '../../index.js'), '-h'
    );
    assert.match(response.stdout.toString(), /DB Console/);
    assert.match(response.stdout.toString(), /Options/);
    assert.match(response.stdout.toString(), /Supported ORMs/);
    assert.equal(response.stderr.toString(), '');
  });

});

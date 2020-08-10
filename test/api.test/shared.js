var chai = require('chai');
var expect = chai.expect;
var api = require('./api');
var mysql = require('./mysql');
const config = require('./config');
// const Redis = require('./redis');

config.phase = process.env.NODE_ENV || 'local';

var shared = {
  chai: chai,
  expect: expect,
  api: new api({ url: 'http://localhost:1337' }),
  mysql: mysql,
  config: config,
  // redis: Redis
};

shared.setTimeOut = function(n) {
  it('讓子彈飛一回,等個'+n/1000+'秒', function(done) {
    setTimeout(function() {
      done();
    }, n);
  });
};

module.exports = shared;

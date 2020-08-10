var Database = require('../db');
var config = require('../config');
var rdsConfig = config[process.env.NODE_ENV || 'local'].rds;

exports.connect = function() {
  it('建立 mysql 連線', function() {
    this.mysql = new Database(rdsConfig);
  });
};

exports.disConnect = function() {
  it('關閉 mysql 連線', function() {
    if (this.mysql && this.mysql.db) {
      this.mysql.db.destroy();
    }
  });
};

exports.selectOne = function(table) {
  it('SELECT FIRST', function(done) {
    var _this = this;
    this.mysql
      .db(table || this.table)
      .where(this.where || {})
      .first(this.select || '*')
      .then(function(info) {
        _this[table || _this.table] = info;
        done();
      });
  });
};

exports.insert = function (table) {
  it('INSERT INTO', function (done) {
    var self = this;
    this.mysql
      .db
      .insert(this.insert)
      .into(table || this.table)
      .then(function(data) {
        self.data = data;
        done();
      });
  });
};

exports.selectAll = function(table) {
  it('SELECT FROM ', function(done) {
    var self = this;
    this.mysql
      .db(table || this.table)
      .where(this.where || {})
      .select('*')
      .then(function(data) {
        self.data = data;
        done();
      });
  });
};

exports.update = function (table) {
  it('UPDATE ' + table, function (done) {
    var self = this;
    self.mysql
      .db(table || this.table)
      .where(this.where || { })
      .update(this.update)
      .then(function (updateInfo) {
        self.updateInfo = updateInfo;
        done();
      });
  });
};

exports.deleteFrom = function(table) {
  it('DELETE FROM ', function(done) {
    this.mysql
      .db(table || this.table)
      .where(this.where || {})
      .del()
      .then(function() {
        done();
      });
  });
};

exports.raw = function () {
  it('EXECUTE Raw ', function(done) {
    this.mysql
      .db.raw(this.sql, this.sqlParams)
      .then(function() {
        done();
      });
  });
};

exports.truncate = function(table) {
  it('TRUNCATE FROM ', function(done) {
    this.mysql
      .db(table || this.table)
      .truncate()
      .then(function() {
        done();
      });
  });
};
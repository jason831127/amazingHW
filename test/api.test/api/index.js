var request = require('supertest');

function api(opt) {
  this.container = request(opt.url);
}



api.prototype.post = function (p) {
  let apiSelf = this;

  it('發起 http post - ' + p, function (done) {
    this.timeout(200 * 1000);
    let sendBody = this.sendBody || {};
    let self = this;
    let rPath = p + this.reqInfo + (this.query || '');
    let auth = '';
    if (this.auth) auth = this.auth;
    apiSelf.container
      .post(rPath)
      .set('Authorization', auth)
      .send(sendBody)
      .expect(200)
      .then(function (response) {
        if (!response) throw new Error('pas invoke fail');
        else {
          self.body = response.body;
          done();
        }
      }).catch(function (err) {
        console.log(err);
        done();
      });
  });
};


api.prototype.get = function (p) {
  let apiSelf = this;

  it('發起 http get - ' + p, function (done) {
    this.timeout(200 * 1000);
    let self = this;
    let rPath = p + this.reqInfo + (this.query || '');
    let auth = '';
    apiSelf.container
      .get(rPath)
      .set('Authorization', auth)
      .expect(200)
      .then(function (response) {
        if (!response) throw new Error('pas invoke fail');
        else {
          self.body = response.body;
          done();
        }
      })
      .catch(function (err) {
        console.log(err);
        done();
      });
  });
};

module.exports = api;

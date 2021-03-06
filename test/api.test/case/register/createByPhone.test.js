var shared = require('../../shared');

describe('/register/create by phone', function () {

  shared.mysql.connect();

  it('註冊帳號byPhone', function () {
    this.sendBody = {
      "password": "123451234213",
      "nickname": "test",
      "type": "tel",
      // "mail" : "jason831127@gmail.com",
      "test": true,
      "tel": "0912345678"
    }
    this.query = '?lang=tw'

  });

  shared.api.post('/v1/user/register');


  it('檢查 response 是否正確', function () {
    shared.expect(this.body.code).to.be.equal('200');
    shared.expect(this.body.token).to.be.an('String');

  });

  shared.api.post('/v1/user/register');


  it('檢查 response 是否正確', function () {
    shared.expect(this.body.code).to.be.equal('001.008');
    shared.expect(this.body.error_message).to.be.equal('手機已被使用');

  });


  it('密碼輸入過少', function () {
    this.sendBody = {
      "password": "1321",
      "nickname": "test",
      "type": "tel",
      // "mail" : "jason831127@gmail.com",
      "test": true,
      "tel": "0912345678"
    }
    this.query = '?lang=tw'

  });
  shared.api.post('/v1/user/register');


  it('檢查 response 是否正確', function () {
    console.log(this.body)
    shared.expect(this.body.code).to.be.equal('001.005');
    shared.expect(this.body.error_message).to.be.equal('密碼必須超過8字元');

  });



  shared.mysql.deleteFrom('user');

  shared.mysql.disConnect();
});
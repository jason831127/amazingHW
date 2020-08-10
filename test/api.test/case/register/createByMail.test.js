var shared = require('../../shared');

describe('/register/create by mail', function () {

  shared.mysql.connect();

  it('註冊帳號byPhone', function () {
    this.sendBody = {
      "password": "123451234213",
      "nickname": "test",
      "type": "mail",
      "mail": "jason831127@gmail.com",
      "test": true,
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
    shared.expect(this.body.code).to.be.equal('001.004');
    shared.expect(this.body.error_message).to.be.equal('Email已被使用');
    
  });



  it('mail格式錯誤', function () {
    this.sendBody = {
      "password": "1321",
      "nickname": "test",
      "type": "mel",
       "mail" : "jason831127 sadf@gmail.com",
      "test": true,
    }
    this.query = '?lang=tw'

  });
  shared.api.post('/v1/user/register');


  it('檢查 response 是否正確', function () {
     shared.expect(this.body.error_message).to.be.equal('Email格式錯誤');

  });

  shared.mysql.deleteFrom('user');

  shared.mysql.disConnect();
});
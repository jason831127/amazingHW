/**
 * 005.註冊
 * ref: https://docs.google.com/document/d/1HVJB5BQIlF67MFc8fJkpwAZbFDnZj5XHAQOtT8Sc5lI/edit#
 */
var shared = require('../../../mysql/shared');

describe('/register/create', function() {

  shared.mysql.connect();

  it('註冊帳號byPhone', function () {
    this.sendBody = {
        "password": "123451234213",
        "nickname": "test",
        "type" : "tel",
        // "mail" : "jason831127@gmail.com",
        "test" : true,
        "tel" : "0912345678"
    }
  });

  shared.api.post('/v1/user/register?lang=tw');


  it('檢查 response 是否正確', function () {
    console.log(this.body);
    shared.expect(this.body.code).to.be.equal('200');
  });

//   it('[mysql] 抓取玩家資料', function () {
//     this.where = { account: this.sendBody.a };
//   });
//   shared.mysql.selectOne('player');
//   it('[mysql] 檢查資料是否正確', function () {
//     shared.expect(this.player.account).to.be.equal(this.sendBody.a, 'wrong player account');
//     shared.expect(this.player.regType).to.be.equal('AA', 'wrong player regType');
//     shared.expect(this.player.state).to.be.equal('NORMAL', 'wrong player state');
//     shared.expect(this.player.telStatus).to.be.equal('unverified', 'wrong player telStatus');

//     shared.expect(this.player.lv).to.be.equal(1);
//     shared.expect(this.player.lvExp).to.be.equal(0);
//     shared.expect(this.player.gold).to.be.equal(0);
//     shared.expect(this.player.chip).to.be.equal(0);
//     shared.expect(this.player.diamond).to.be.equal(0);
//     shared.expect(this.player.vip).to.be.equal(0);
//   });

//   shared.mysql.deleteFrom('player');

//   it('reset', function () {
//     delete this.where;
//   });

//   shared.mysql.deleteFrom('device');
//   shared.mysql.deleteFrom('devicePlayer');
//   shared.mysql.deleteFrom('refreshToken');
  shared.mysql.disConnect();
});
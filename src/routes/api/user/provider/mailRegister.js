
const jwt = require('jsonwebtoken');
const md5 = require('md5');

module.exports = async function (ctx) {
  let userInfo = null;
  let body = ctx.request.body;
  if (!body.mail) ctx.throwApiError('001.003', 'missing mail');



  try {
    //密碼簡單使用MD5加密
    ctx.service.user.checkPassword(body.password)
    let md5p = md5(body.password);
    userInfo = await ctx.service.user.getByMail(body.mail);
    if (userInfo) {
      await ctx.service.user.new(null, { nickname: body.nickname, mail: body.mail, password: md5p });
      let newToken = await ctx.signToken(ctx.payload, { expiresIn: ctx.tokenExpiresIn });
      let mail = {};
      mail.content = ctx.__( 'mail.register.mailContent');
      mail.title = ctx.__( 'mail.register.mailTitle', {name: body.nickname});
      await ctx.mail.sendMail(mail);

      ctx.model = {
        token: newToken
      }
    } else
      ctx.throwApiError('001.004', 'mail exist');

  } catch (err) {
    switch (err.code) {
      case '004':
        ctx.throwApiError('001.004', 'mail exist');
      case '005':
        ctx.throwApiError('001.005', 'password too short');
      case '006':
        ctx.throwApiError('001.006', 'weak password');
      default:
        throw err
    }
  }
};


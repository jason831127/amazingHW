
const jwt = require('jsonwebtoken');
const md5 = require('md5');

module.exports = async function (ctx) {
  let userInfo = null;
  let body = ctx.request.body;
  if (!body.mail) ctx.throwApiError('001.003', 'missing mail');
  let checkPD = ctx.service.user.checkPassword(body.password)
  if (!checkPD) ctx.throwApiError('001.005', 'password too short');
  try {
    //密碼簡單使用MD5加密
    let md5p = md5(body.password);
    userInfo = await ctx.service.user.getByMail(body.mail);
    if (!userInfo) {
      await ctx.service.user.new(null, { nickname: body.nickname, email: body.mail, password: md5p });
      let newToken = await ctx.signToken(ctx.request.body, { expiresIn: ctx.tokenExpiresIn });
      let mail = {};
      mail.html = ctx.__('mail.register.mailTitle');
      mail.subject = ctx.__('mail.register.mailContent', { name: body.nickname });
      mail.to = body.mail;
      mail.from = ctx.server.config.mailServer.mailSender;
      await ctx.service.mail.sendMail(mail, ctx.request.body.test);

      ctx.model = {
        token: newToken
      }
    } else
      ctx.throwApiError('001.004', 'mail exist');

  } catch (err) {
    if (err.code = 'ER_DUP_ENTRY')
      ctx.throwApiError('001.004', 'mail exist');
    switch (err.message) {
      case '006':
        ctx.throwApiError('001.006', 'weak password');
      default:
        throw err
    }
  }
};


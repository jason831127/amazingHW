
const jwt = require('jsonwebtoken');
const md5 = require('md5');

module.exports = async function (ctx) {
  let userInfo = null;
  let body = ctx.request.body;
  if (!body.tel) ctx.throwApiError('001.003', 'missing mail');
  
  try {
    //密碼簡單使用MD5加密
    ctx.service.user.checkPassword(body.password)
    let md5p = md5(body.password);
    userInfo = await ctx.service.user.getByTel(body.tel);
    if (userInfo) {
      await ctx.service.user.new(null, { nickname: body.nickname, tel: body.tel, password: md5p });
      let newToken = await ctx.signToken(ctx.payload, { expiresIn: ctx.tokenExpiresIn });
      let message =  ctx.__( 'sms.register', {name: body.nickname});;
      await ctx.sms.sendMessage(message);


      ctx.model = {
        token: newToken
      }
    } else
      ctx.throwApiError('001.004', 'mail exist');

  } catch (err) {
    switch (err.message) {
      case 'mail exist':
        ctx.throwApiError('001.004', 'mail exist');
      case 'password too short':
        ctx.throwApiError('001.005', 'password too short');
      case 'weak password':
        ctx.throwApiError('001.006', 'weak password');
      default:
        throw err
    }
  }
};


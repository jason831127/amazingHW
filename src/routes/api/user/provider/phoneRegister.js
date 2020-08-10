
const jwt = require('jsonwebtoken');
const md5 = require('md5');

module.exports = async function (ctx) {
  let userInfo = null;
  let body = ctx.request.body;
  if (!body.tel) ctx.throwApiError('001.007', 'missing tel');
  if (!ctx.regexlib.tel.test(body.tel)) ctx.throwApiError('001.011', '電話格式錯誤');

  try {
    //密碼簡單使用MD5加密
    ctx.service.user.checkPassword(body.password)
    let md5p = md5(body.password);
    userInfo = await ctx.service.user.getByTel(body.tel);
    if (!userInfo) {
      await ctx.service.user.new(null, { nickname: body.nickname, tel: body.tel, password: md5p });
      let newToken = await ctx.signToken(ctx.request.body, { expiresIn: ctx.tokenExpiresIn });
      let message = ctx.__('sms.register', { name: body.nickname });;
      await ctx.sms.sendMessage(body.tel, message);
      ctx.model = {
        token: newToken
      }
    } else
      ctx.throwApiError('001.008', 'tel exist');

  } catch (err) {
    if (err.code = 'ER_DUP_ENTRY')
      ctx.throwApiError('001.008', 'tel exist');
    switch (err.message) {
      case 'password too short':
        ctx.throwApiError('001.009', 'password too short');
      case 'weak password':
        ctx.throwApiError('001.010', 'weak password');
      default:
        throw err
    }
  }
};


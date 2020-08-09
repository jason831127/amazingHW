/**
 * 註冊驗證
 */
// mail 帳號登入流程
const mailRegister = require('./provider/mailRegister');
// phone 帳號登入的邏輯
const phoneRegister = require('./provider/phoneRegister');


module.exports = async (ctx, next) => {
  if (!ctx.request.body.type) ctx.throwApiError('001.000', 'missing parameter: type');

  //密碼不再這層作處理，不同登錄方式不一定要密碼

  try {
     await login(ctx);
  } catch (err) {
    throw err;
  }

  await next();
};

const login = async function (ctx) {
  let type = ctx.request.body.type;

  switch (type) {
    case 'phone':
      await phoneRegister(ctx);
      break;
    case 'mail':
      await mailRegister(ctx);
      break;
    default:
      ctx.throwApiError('001.000', 'wrong parameter: type');
  }

};


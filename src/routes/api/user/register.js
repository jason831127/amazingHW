/**
 * 註冊驗證
 */
// mail 帳號登入流程
const mailRegister = require('./loginProvider/mailRegister');
// phone 帳號登入的邏輯
const phoneRegister = require('./loginProvider/phoneRegister');


module.exports = async (ctx, next) => {
  if (!ctx.request.body.type) ctx.throwApiError('003.000', 'missing parameter: type');

  let playerInfo = null;
  
  try {
    playerInfo = await login(ctx);
  } catch (err) {
    throw err;
  }

  await next();
};

const login = async function (ctx) {
  let type = ctx.request.body.type;

  let playerInfo = null;
  switch (type) {
    case 'phone':
      playerInfo = await phoneRegister(ctx);
      break;
    case 'mail':
      playerInfo = await mailRegister(ctx);
      break;
    default:
      ctx.throwApiError('003.000', 'wrong parameter: type');
  }

  return playerInfo;
};


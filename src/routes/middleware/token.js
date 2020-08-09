var jwt = require('jsonwebtoken');
const SECRET = 'TEST';

// authorization = Bearer {token}
async function verify(authorization, opt) {
  return new Promise((resolve, reject) => {
    if (!authorization) return resolve(null);
    var bearer = authorization.split(' ');
    if (bearer.length != 2) return resolve(null);
    if (bearer[1] == '' || !bearer[1]) return resolve(null);
    jwt.verify(bearer[1], SECRET, opt, (err, payload) => {
      if (err) throw err;
      else return resolve(payload);
    });
  });
}

async function sign(payload, opt) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, opt, (err, token) => {
      if (err) throw err;
      else return resolve(token);
    });
  });
}

exports.parse = function () {
  return async (ctx, next) => {
    try {
      ctx.payload = await verify(ctx.headers.authorization, { ignoreExpiration: true });
      ctx.signToken = sign;
    } catch (err) {
      ctx.throwApiError('400', err.message);
    }
    await next();
  };
};



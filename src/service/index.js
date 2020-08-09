
const User = require('./user');


module.exports = function (server) {

  var service = { };
  service.user = new User(server);

  return async (ctx, next) => {
    ctx.service = service;
    await next();
  };
};

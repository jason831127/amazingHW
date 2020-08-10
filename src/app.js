const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Routes = require('./routes');
const Service = require('./service');
const localesLib = require('./localesLib');
const serve = require('koa-static');
const path = require('path');
const RegexLib = require('./lib/regex');
const SMS = require('./lib/sms');

module.exports = function (server) {
  const app = new Koa();
  app.context.server = server;
  app.context.tokenExpiresIn = 60 * 60;
  app.context.regexlib = RegexLib;
  app.context.sms = new SMS(server.config.smsConfig);

  //掛載通用 function 模組
  app.use(bodyParser({ jsonLimit: '100mb', formLimit: '100mb' }));
  app.use(Service(server));
  // 掛載多國語系
  localesLib(app, { basedir: path.join(__dirname, 'locales', 'resources') });
  server.__ = app.context.__;
  // i18n as service
  app.use(serve('./src/locales'));

  app.use(async (ctx, next) => {
    try {
      await next();
      ctx.app.emit('log', ctx);
    } catch (err) {
      ctx.status = err.status || 500;
      let data = {
        d: ctx.query ? ctx.query.d : '',
        path: ctx.path,
        code: err.code || '500',
        error_message: ctx.__(err.code || err.message ) || err.message,
        //stack: JSON.stringify(err.stack),
        //data: err.data || null
      };
      ctx.body = data;
      ctx.app.emit('error', err, ctx);
    }
  });

  app.use(Routes.routes());


  // Error Handling
  app.on('error', (err, ctx) => {
    /* centralized error handling:
    *   console.log error
    *   write error to log file
    *   save error and request information to database if ctx.request match condition
    */
    logger.log('ctx', ctx.request.path);
    logger.log('server error', err);
  });

  return app;
};


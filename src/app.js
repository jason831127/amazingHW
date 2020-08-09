const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Routes = require('./routes');
const Service = require('./service');
const localesLib = require('./localesLib');
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
        p: ctx.path,
        code: err.code || '500',
        error_message: ctx.__(err.code || '500') || err.message,
        stack: JSON.stringify(err.stack),
        data: err.data || null
      };
      ctx.body = data;
      ctx.app.emit('error', err, ctx);
    }
  });

  app.use(Routes.routes());

  app.on('log', ctx => {
    let logFormat = logMessage(ctx, 'apiLog');
    logger.log(JSON.stringify(logFormat));
  });

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

function logMessage (ctx, logName, err) {
  return {
    logName: logName,
    time: new Date().toISOString(),
    phase: process.env.PHASE,
    payload: ctx.payload || null,
    method: ctx.request.method,
    path: ctx.request.path,
    query: ctx.request.query,
    body: ctx.request.body,
    authorization: ctx.headers ? (ctx.headers.authorization || null) : null,
    modelStr: ctx.model ? JSON.stringify(ctx.model): '',
    errMessage: err ? err.message : '',
    err: err || null,
  };
}

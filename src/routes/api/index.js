const Router = require('koa-router');
const router = new Router();

router.use(async (ctx, next) => {
  await next();
  if (ctx.type == 'image/jpeg') return;
  ctx.model = ctx.model || {};
  ctx.model.code = '200';
  ctx.model.message = ctx.model.message || '';
  ctx.model.d = ctx.query.d;
  ctx.model.p = ctx.path;
  ctx.body = ctx.model;
});


router
  .use('/user', require('./user'))

module.exports = router;
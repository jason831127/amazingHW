const Router = require('koa-router');
const router = new Router();

router.post('/check', async (ctx) => {
  ctx.body = 'ok';
});

router.get('/check', async (ctx) => {
  ctx.body = 'ok';
});

module.exports = router;
const Router = require('koa-router');
const router = new Router();
const apiRoutes = require('./api');
const token = require('./middleware/token');

router.use('/healthy', require('./healthy').routes());

router
.use(token.parse())
.use('/v1', apiRoutes.routes());

module.exports = router;
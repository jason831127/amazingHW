const Router = require('koa-router');
const router = new Router();
const validate = require('../../middleware/validate');

const reqInfoValidate = {
  body: {
    nickname: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().required()
  }
};
router
  .post('/register', validate(reqInfoValidate, ctx.throwApiError, 101), require('./register'))

module.exports = router;
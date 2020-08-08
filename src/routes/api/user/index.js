const Router = require('koa-router');
const router = new Router();
const validate = require('../middleware/validate');

const reqInfoValidate = {
  body: {
    nickname: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    passward: Joi.string().required()
  }
};
router
  .post('/register', validate(reqInfoValidate), require('./register'))

module.exports = router;
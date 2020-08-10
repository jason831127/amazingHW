const Router = require('koa-router');
const router = new Router();
const validate = require('../../middleware/validate');
const Joi = require('@hapi/joi');

const reqInfoValidate = {
  body: {
    nickname: Joi.string().required(),
    mail: Joi.string().email().trim().error(new Error('001.013')),
    password: Joi.string().required(),
    tel: Joi.string(),
    test: Joi.boolean()
  }
};
router
  .post('/register', validate(reqInfoValidate), require('./register'))

module.exports = router;
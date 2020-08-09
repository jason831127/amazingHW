const Router = require('koa-router');
const router = new Router();
const validate = require('../../middleware/validate');
const Joi = require('@hapi/joi');

const reqInfoValidate = {
  body: {
    nickname: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().required(),
    tel: Joi.string()
  }
};
router
  .post('/register', validate(reqInfoValidate), require('./register'))

module.exports = router;
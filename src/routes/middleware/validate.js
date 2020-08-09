const Joi = require('joi');
module.exports = function (schema, apiError, code) {
  return async (ctx, next) => {
    let error;
    code = code || '000';
    if (schema.query && !ctx.query) apiError(`${code}.001`, 'req.query required');
    if (schema.body && !ctx.body) apiError(`${code}.002`, 'req.body required');
    if (ctx.query && schema.query) {
      let obj = {};
      for (let i in ctx.query) {
        if (schema.query[i]) obj[i] = ctx.query[i];
      }
      error = validateObject(obj, schema.query);
      if (error !== null) throw error;
    }
    if (ctx.body && schema.body) {
      let obj = {};
      for (let i in ctx.body) {
        if (schema.body[i]) obj[i] = ctx.body[i];
      }
      error = validateObject(obj, schema.query);
      if (error !== null) throw error;
    }
    await next();
  };
};

function validateObject(object, schema) {
  const result = Joi.validate(object, schema);
  if (result.error)
    return result.error;
}
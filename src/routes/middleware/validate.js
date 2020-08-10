const Joi = require('@hapi/joi');
module.exports = function(schema) {
  return async (ctx, next) => {
    let error;
    if (schema.query && !ctx.query) throw new Error('req.query required');
    if (schema.body && !ctx.request.body) throw new Error('req.body required');
    if (ctx.query && schema.query) {
      let obj = {};
      for (let i in ctx.request.query) {
        if (schema.query[i]) obj[i] = ctx.request.query[i];
      }
      error = validateObject(obj, schema.query);
      if (error !== null) throw error;
    }
    if (ctx.request.body && schema.body) {
      let obj = {};
      for (let i in ctx.request.body) {
        if (schema.body[i]) obj[i] = ctx.request.body[i];
      }
      error = validateObject(obj, schema.body);
      if (error !== null) throw error;
    }
    await next();
  };
};

function validateObject(object, schema) {
  const result = Joi.validate(object, schema);
  return result.error;
}
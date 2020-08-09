/**
 * 用來回應 api 錯誤的 error 類型
 * @param {String} code error code
 * @param {String} message error message
 * @param {String} status http status
 * @param {object} status 額外要傳的資料
 */
function ApiError(code, message, status, data) {
  Error.captureStackTrace(this);
  this.code = code;
  this.message = message;
  this.status = isNaN(parseInt(status, 10)) ? 200 : parseInt(status, 10);
  this.data = data || null;

  this.toApiResponse = function() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      data: this.data
    };
  };
}

ApiError.prototype = Object.create(Error.prototype);

exports.throw = function (code, message, status, data) { 
  throw new ApiError(code, message, status, data);
};


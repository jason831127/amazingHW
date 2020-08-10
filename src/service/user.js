function user(server) {
  this.server = server;
}


/**
* 用 mail 取得 用戶資料
* @param {String} mail mail 
*/
user.prototype.getByMail = async function (mail) {
  let rds = this.server.rds;
  return await rds('user').where('email', '=', mail).first('*');
};



/**
 * 用 tel  取得 用戶資料
 * @param {String} tel tel
 */
user.prototype.getByTel = async function (tel) {
  let rds = this.server.rds;
  return await rds('user').where('tel', '=', tel).first('*');
};



/**
 * 檢查用戶密碼規則
 * @param {String} pd pd
 */
user.prototype.checkPassword = function (pd) {
  if (!pd.length || pd.length < 8) return false
  return true;
};


/**
 * 註冊帳號流程流程
 */
user.prototype.new = async function (trx, newUser) {
  let rds = trx || this.server.rds;
  let result =  await rds.insert(newUser).into('user');
  if (result.err) {
    if (result.err.code == 'ER_DUP_ENTRY') {
      // 代表已經有人註冊過這個帳號
      throw new Error('mail exist');
    } else {
      throw err;
    }
  }
  
};

module.exports = user;
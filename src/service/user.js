function user(server) {
    this.server = server;
  }
  
  /**
   * 取得所有的置頂訊息
   * @param {String} playerId 玩家編號
   */
  user.prototype.getList = async function (now) { 
    let rds = this.server.rds;
  
    let data = await rds('user')
      .where(function() {
        this.where('startTime', '<', now)
          .andWhere('endTime', '>', now);
      })
      .orWhereNull('startTime', 'endTime')
      .orderBy('startTime', 'desc')
      .select('*');
  
    return data;
  };
  
  module.exports = user;
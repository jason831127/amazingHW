let request = require('request-promise');

module.exports = function(config) {
  return new Sms(config);
};

/**
 * 將資料加到 cache
 */

function Sms(config) {
  this.config = config;
  this.option = {
    url: config.url,
    method: 'POST',
    json: {
      authentication: {
        username: config.username,
        password: config.password
      },
      messages: [ {
        sender: 'jason',
        text: null,
        datacoding: '8',
        recipients: [ {
          gsm: null
        } ]
      } ]
    }
  };
}

Sms.prototype.sendMessage = async function (tel, message) {
  let self = this;
  self.option.json.messages[0].text = message;
  self.option.json.messages[0].recipients[0].gsm = tel;
  logger.log(`send sms tel: ${tel} content: ${message}`);
  return true;
  // let data = await request.post(self.option);
  // if (data.results[0].status != '0') throw new Error('SMS error, status : ' + data.results[0].status);
  // return data.results[0];
};



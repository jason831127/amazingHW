var nodemailer = require('nodemailer');


module.exports = function (config) {
  this.senderMail = config.mailServer.auth.user;
  this.mailTransport = nodemailer.createTransport('SMTP', config.mailServer);
};



Mail.prototype.sendMail = async function (mail, subject, content) {
  let self = this;
  await this.mailTransport.sendMail(
    {
      from: self.senderMail,
      to: mail,
      subject: subject,
      html: content
    }
  )

};

var nodemailer = require('nodemailer');

function mail(server) {
    this.server = server;
    let config = this.server.config;
    this.mailTransport = nodemailer.createTransport(config.mailServer);

}

mail.prototype.sendMail = async function (mailObj, test) {
  if (!(!process.env.DISABLE_TESTCASE && test))
    await this.mailTransport.sendMail(mailObj);

};



module.exports = mail;
global.logger = require('tracer').colorConsole();
const Knex = require('knex');
const Server = require('./server');
// 應用程式
const App = require('./app');

const ACCEPTLANG = [ 'en', 'es', 'tw', 'cn' ];
const phase = process.env.PHASE || 'docker';

//通用模組
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const init = async () => {
  const config = require('./config/local');
  logger.info(config);

  let server = Server.getInstance('v1');
  server.acceptLang = ACCEPTLANG;
  server.defaultLang = 'en';
  // 掛載 plugin
  server.config = config;
  server.rds = Knex(config['rds']);
  server.phase = phase;

  server.onReady = onServerReady;
};


/**
 * 當 Server Ready 之後
 * 1) redis connect 完成
 * 2) init data 完成
 * @param {Object} server Server 物件
 * @param {Object} args 參數
 */
function onServerReady (server) {
  let PORT_HTTP = process.env.PORT_HTTP || 1337;
  let PORT_HTTPS = process.env.PORT_HTTPS || 61337;
  const app = App(server);
  if (!process.env.DISABLE_BUILD_IN_HTTPS) {
    // SSL options
    const options = {
      key: fs.readFileSync(path.join(__dirname, './key/testKey.key')),
      cert: fs.readFileSync(path.join(__dirname, './key/testCrt.crt')),
      ca: fs.readFileSync(path.join(__dirname, './key/testCa.crt'))
    };
    // start the server
    http.createServer(app.callback()).listen(PORT_HTTP);  
    https.createServer(options, app.callback()).listen(PORT_HTTPS);
    logger.log(`Server 【${serviceType}】 listening on port: ${PORT_HTTPS}`);
  } else {
    // 0.0.0.0 -> 是為了偵聽 ipv4
    let httpServ = app.listen(PORT_HTTP, '0.0.0.0', () => {
      logger.log(`Server 【${serviceType}】 listening on port: ${PORT_HTTP}`);
    });
    // 先不改 timeout , 一樣是 預設為 5000, 要改再說
    httpServ.keepAliveTimeout = 5000;
  }
}

init()
  .catch((err) => {
    logger.error(err);
  });

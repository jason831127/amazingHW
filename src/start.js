global.logger = require('tracer').colorConsole();
const Knex = require('knex');
const Server = require('./server');
// 應用程式
const App = require('./app');

const ACCEPTLANG = ['en', 'tw'];
const phase = process.env.PHASE || 'docker';

//通用模組
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const init = async () => {
  const config = require('../config/local');
  logger.info(config);
  let server = new Server();
  server.acceptLang = ACCEPTLANG;
  server.defaultLang = 'tw';
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
function onServerReady(server) {
  let PORT_HTTP = process.env.PORT_HTTP || 1337;
  const app = App(server);
  let httpServ = app.listen(PORT_HTTP, '0.0.0.0', () => {
    logger.log(`Server 【${serviceType}】 listening on port: ${PORT_HTTP}`);
  });
  httpServ.keepAliveTimeout = 5000;
}

init()
  .catch((err) => {
    logger.error(err);
  });

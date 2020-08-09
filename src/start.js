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
  let server = new Server();
  server.acceptLang = ACCEPTLANG;
  server.defaultLang = 'tw';
  // 掛載 plugin
  server.config = config;
  server.rds = Knex(config['rds']);
  server.phase = phase;
  let PORT_HTTP = process.env.PORT_HTTP || 1337;
  const app = App(server);
    // 0.0.0.0 -> 是為了偵聽 ipv4
    let httpServ = app.listen(PORT_HTTP, '0.0.0.0', () => {
      logger.log(`Server 【${serviceType}】 listening on port: ${PORT_HTTP}`);
    });
    // 先不改 timeout , 一樣是 預設為 5000, 要改再說
    httpServ.keepAliveTimeout = 5000;
};


init()
  .catch((err) => {
    logger.error(err);
  });

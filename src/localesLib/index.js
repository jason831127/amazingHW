'use strict';

const fs = require('fs');
const path = require('path');
const locales = require('koa-locales');
const DEFAULTLOCALEALIAS = { en: 'en-US', tw: 'zh-TW'};

module.exports = function (app, opt) {

  opt = opt || { };
  opt.queryField = opt.queryField || 'lang',
  opt.localeAlias = opt.localeAlias || DEFAULTLOCALEALIAS;

  if (!opt.basedir) throw new Error('opt.basedir required');
  let dirs = fs.readdirSync(opt.basedir);
  let localeDirs = [ ];
  for (var idx in dirs) {
    let aaa = path.join(opt.basedir, dirs[idx]);
    if (!fs.lstatSync(aaa).isDirectory()) continue;
    localeDirs.push(aaa);
  }
  opt.dirs = localeDirs;

  return locales(app, opt);
};
USE mydb;
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '使用者編號',
  `password` VARCHAR(256) NULL COMMENT 'MD5加密過後的密碼',
  `email` VARCHAR(256) NULL COMMENT '信箱',
  `tel` VARCHAR(20) NULL COMMENT '電話',
  `telStatus` INT(1) NOT NULL DEFAULT 0 COMMENT '電話驗證的狀態',
  `nickname` VARCHAR(50) NOT NULL UNIQUE COMMENT '暱稱',
  `lastReadTimeBox` DATETIME NULL COMMENT '信件匣最後的讀取時間',
  `createDate` DATETIME NOT NULL DEFAULT NOW() COMMENT '建立時間',
  `lastUpdate` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() COMMENT '修改時間',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE UNIQUE INDEX idx_user_email ON user (`email`);
CREATE UNIQUE INDEX idx_user_tel ON user (`tel`);

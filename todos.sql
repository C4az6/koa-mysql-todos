/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : todos

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-12-11 10:55:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for todos
-- ----------------------------
DROP TABLE IF EXISTS `todos`;
CREATE TABLE `todos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `done` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of todos
-- ----------------------------
INSERT INTO `todos` VALUES ('1', '1', '学习Koa框架', '1');
INSERT INTO `todos` VALUES ('2', '1', '学习Node.js', '1');
INSERT INTO `todos` VALUES ('3', '0', '123', '0');
INSERT INTO `todos` VALUES ('4', '0', '123213213', '0');
INSERT INTO `todos` VALUES ('5', '0', '123213213', '0');
INSERT INTO `todos` VALUES ('16', '1', '睡觉', '1');
INSERT INTO `todos` VALUES ('17', '1', '学习Mysql', '1');
INSERT INTO `todos` VALUES ('18', '1', '学习TypeScript', '1');
INSERT INTO `todos` VALUES ('19', '1', '学习数据库ORM框架', '1');
INSERT INTO `todos` VALUES ('20', '1', '做Vue项目', '1');
INSERT INTO `todos` VALUES ('21', '1', '学习React', '1');
INSERT INTO `todos` VALUES ('22', '1', '做React项目', '1');
INSERT INTO `todos` VALUES ('23', '0', '做Nuxt.js项目', '1');
INSERT INTO `todos` VALUES ('24', '0', '学习Dart', '1');
INSERT INTO `todos` VALUES ('25', '0', '学习Flutter', '1');
INSERT INTO `todos` VALUES ('26', '0', '做Flutter项目', '1');
INSERT INTO `todos` VALUES ('27', '0', '学习uniAPP', '1');
INSERT INTO `todos` VALUES ('28', '0', '做uniapp项目', '1');
INSERT INTO `todos` VALUES ('29', '0', '学习Electron', '1');
INSERT INTO `todos` VALUES ('30', '0', '做Electron项目', '1');
INSERT INTO `todos` VALUES ('31', '0', '植发', '1');
INSERT INTO `todos` VALUES ('32', '0', '学习webpack源码', '1');
INSERT INTO `todos` VALUES ('33', '0', '学习Promise源码', '1');
INSERT INTO `todos` VALUES ('34', '1', '学习JavaScript面向对象', '1');
INSERT INTO `todos` VALUES ('35', '1', '学习服务端SSR技术', '1');

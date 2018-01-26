/*
Navicat MySQL Data Transfer

Source Server         : baonakang
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : zhongying

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-01-23 16:03:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for zy_about
-- ----------------------------
DROP TABLE IF EXISTS `zy_about`;
CREATE TABLE `zy_about` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL COMMENT '分类',
  `title` varchar(255) DEFAULT NULL COMMENT '表题',
  `content` text COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zy_about
-- ----------------------------
INSERT INTO `zy_about` VALUES ('1', '0', null, '青岛华讯云信息科技有限公司是一家专门服务于金融行业，进行金融衍生品软件开发、系统集成和运营服务的金融科技公司，产品汇集互联网券商交易系统，证券、期货、国际衍生品的交易系统，结算清算系统、社交系统、行情系统、量化交易系统、风控系统、用户CRM系统等开发和调试。\r\n中盈网作为青岛华讯云信息科技有限公司旗下品牌，是一家专注于为个人及机构投\r\n资者提供全球金融市场数据与软件综合服务商，产品覆盖全球24个国家和地区的股票、 \r\n期货、外汇、期权、ETF基金、债券等6大类别以及中美两大数据中心，为用户提供极速、稳定的数据与交易服务。');
INSERT INTO `zy_about` VALUES ('2', '1', '主创团队', '和单纯的互联网公司、金融公司有所区别，中盈网团队研发工程人员约占80%，大部分都是硕士及以上学位，这其中不乏985、211名校毕业生，骨干成员更是有华为、网易、360等名企工作经历。不同于传统IT“码农”，中盈网团队有着丰富的金融及技术交叉融合背景，对行业交叉发展前景具有敏锐的嗅觉和可信赖的实践能力，能够为各类用户提供全面、契合金融发展趋势的高端金融工程解决方案。');
INSERT INTO `zy_about` VALUES ('3', '2', '经营理念', '“创造极致的客户体验，打造共赢的交易平台”是中盈网对全球资产配置服务行业的理解和愿景。“中”，既暗含中国文化的骨髓中庸之道，又代表广大中国投资者；“盈”，指盈利、共赢 ，代表投资者利益。\r\n中盈网，始终以极致精神面对客户和市场，进行创新的同时保持初心，秉承与生俱来的“体验至上、客户第一”的经营理念，努力为广大的中国投资者打造一个真实、便捷、安全的全球化资产配置平台，通过提供优质投资渠道、优化服务和体验，让其拥有更多直面国际市场的交易机会，共享世界红利。');
INSERT INTO `zy_about` VALUES ('4', '3', '企业使命', '为了给机构投资者提供高质量的后台，从第一行代码开始，中盈网就开始进行多项关键技术攻关，率先将数据与交易服务业务从证券领域拓展到金融衍生品，突破了一般交易系统只能进行单一品种交易的限制，独立研发出业界领先的超低延时、超高并发的中盈网交易系统。\r\n我们更懂得时间的价值，以光速交易，是我们孜孜不倦的追求。中盈网交易系统处理响应请求仅需0.003秒，是目前市场上响应速度最快、并发处理能力最强的交易系统；中盈网所有交易数据采用世界顶级加密算法，保证交易安全；得益于阿里云的鼎立协助，中盈网的基础IT架构实现了弹性扩张和跨区域机房的冗余备份，提升了接入的可靠性。');
INSERT INTO `zy_about` VALUES ('5', '4', '股东背景', '华外经济贸易有限公司隶属于中投海外贸易发展基金（CIC INTERNATIONAL TRADE DEVELOPMENT FUND）旗下的对外经济贸易集团公司，是对外经济贸易集团设立在广州南沙区的独资企业，主要承担集团公司的境外投资和大宗贸易金融资产化业务，并专注于开展直接投资和多双边基金管理。中投海外贸易发展基金此次通过旗下公司华外经济贸易有限公司战略入股华讯云，也是对互联网项目的又一重大投资举措。\r\n山东国际贸易集团是由山东省政府批准组建的综合性外经贸企业集团，经营范围涉及国内外贸易、实业、房地产、物流、旅游、电子通讯和招投标等业务领域，是省政府重点扶持的大型骨干企业集团，连年位居全国进出口500强和出口200强企业之列，目前市值已逾200亿元。山东省国际贸易集团对中盈网战略入股是其在互联网项目上的首次投资尝试。');

-- ----------------------------
-- Table structure for zy_admin
-- ----------------------------
DROP TABLE IF EXISTS `zy_admin`;
CREATE TABLE `zy_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zy_admin
-- ----------------------------
INSERT INTO `zy_admin` VALUES ('1', 'admin', '202cb962ac59075b964b07152d234b70');

-- ----------------------------
-- Table structure for zy_lianxi
-- ----------------------------
DROP TABLE IF EXISTS `zy_lianxi`;
CREATE TABLE `zy_lianxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL COMMENT '分类',
  `title` varchar(255) DEFAULT NULL COMMENT '表题',
  `content` varchar(255) DEFAULT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zy_lianxi
-- ----------------------------
INSERT INTO `zy_lianxi` VALUES ('1', '1', '电话', '400-801-9850');
INSERT INTO `zy_lianxi` VALUES ('2', '2', '邮箱', 'zhongyinwangzs@163.com');
INSERT INTO `zy_lianxi` VALUES ('3', '3', '地址', '青岛市市南区燕儿岛路10号32楼');

-- ----------------------------
-- Table structure for zy_licheng
-- ----------------------------
DROP TABLE IF EXISTS `zy_licheng`;
CREATE TABLE `zy_licheng` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '历程表',
  `time` varchar(255) DEFAULT NULL COMMENT '时间',
  `title` varchar(255) DEFAULT NULL COMMENT '表题',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zy_licheng
-- ----------------------------
INSERT INTO `zy_licheng` VALUES ('1', '2014.12', '华讯云公司成立');
INSERT INTO `zy_licheng` VALUES ('2', '2015.01', '软件研发组正式成立');
INSERT INTO `zy_licheng` VALUES ('3', '2015.06', '数据中心建立 \r\n着手对接券商');
INSERT INTO `zy_licheng` VALUES ('4', '2015.09', '行情系统完成');
INSERT INTO `zy_licheng` VALUES ('5', '2016.11', '交易产品发布');
INSERT INTO `zy_licheng` VALUES ('6', '2017.01', '中银网正式推广');
INSERT INTO `zy_licheng` VALUES ('7', '2017.09', '中投海外贸易发展基金与山东国际贸易集团战略入股');

-- ----------------------------
-- Table structure for zy_news
-- ----------------------------
DROP TABLE IF EXISTS `zy_news`;
CREATE TABLE `zy_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '新闻标题',
  `link` text COMMENT '新闻链接',
  `content` varchar(255) DEFAULT NULL COMMENT '新闻内容',
  `img` varchar(255) DEFAULT NULL COMMENT '图片',
  `time` varchar(255) DEFAULT NULL COMMENT '新闻时间',
  `new` varchar(255) DEFAULT NULL COMMENT '最新新闻 标记为1 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zy_news
-- ----------------------------
INSERT INTO `zy_news` VALUES ('32', '中银网:不忘初心履使命,砥砺前行创华章', 'https://baijiahao.baidu.com/s?id=1576578989348544191&wfr=spider&for=pc&qq-pf-to=pcqq.c2c', '晚上11点，夜以至深，街道上已少有行人。大楼林立的CBD商圈里，也少了些白天的繁忙与喧嚣，但中盈网所在的办公层，却依旧灯火通明。对于互联网券商中盈网这群“不舍昼夜”的员工来说，加班到深夜已是“常态”。', 'image/2017-11-16/5a0cffdb834d8.jpg', null, '1');
INSERT INTO `zy_news` VALUES ('33', '海外资产配置兴起，中盈网详解四大投资趋势', 'http://www.caijing.com.cn/20171107/4355945.shtml', null, null, '2017-11-07', '0');
INSERT INTO `zy_news` VALUES ('34', '中银网：2017港股投资群体大数据分析', 'http://dy.163.com/v2/article/detail/D28LR0090519B0S4.html', null, null, '2017-11-02', '0');
INSERT INTO `zy_news` VALUES ('35', '中银网：为何我们的用户盈利面大？', 'http://news.xinhuanet.com/money/2017-10/27/c_1121871152.htm', null, null, '2017-10-27', '0');
INSERT INTO `zy_news` VALUES ('36', '中银网:网易单日上涨近7%，游戏公司如何投资', 'https://jigou.cngold.org/company/9031/news/c1088526.htm', null, null, '2017-10-25', '0');
INSERT INTO `zy_news` VALUES ('37', '中银网：年内上涨30.50%，投资港股正当时', 'https://www.toutiao.com/i6480345226601824782/', null, null, '2017-10-24', '0');

-- ----------------------------
-- Table structure for zy_tongji
-- ----------------------------
DROP TABLE IF EXISTS `zy_tongji`;
CREATE TABLE `zy_tongji` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '首页头部统计数据',
  `type` varchar(255) DEFAULT NULL COMMENT '分类',
  `type_title` varchar(255) DEFAULT NULL COMMENT '分类标题',
  `frist` varchar(255) DEFAULT NULL COMMENT '第一个参数',
  `last` varchar(255) DEFAULT NULL COMMENT '第二个参数',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zy_tongji
-- ----------------------------
INSERT INTO `zy_tongji` VALUES ('1', '1', '中银网累计已为超20万+用户提供数据服务，每月为30000+用户提供资产配置服务', '20', '3');
INSERT INTO `zy_tongji` VALUES ('2', '2', '中银网数据覆盖全球24个国家和地区的股票、期货、外汇、期权、ETF基金、债券等6大类别', '24', '6');
INSERT INTO `zy_tongji` VALUES ('3', '3', '中美两大数据中心为用户提供超过100兆专线的可靠服务', '2', '100');

-- ----------------------------
-- Table structure for zy_users
-- ----------------------------
DROP TABLE IF EXISTS `zy_users`;
CREATE TABLE `zy_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `addtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zy_users
-- ----------------------------
INSERT INTO `zy_users` VALUES ('1', '123qwe', '18100386352', 'e10adc3949ba59abbe56e057f20f883e', '2017-12-08 11:48:51');

-- ----------------------------
-- Table structure for zy_verify
-- ----------------------------
DROP TABLE IF EXISTS `zy_verify`;
CREATE TABLE `zy_verify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) DEFAULT NULL,
  `validcode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zy_verify
-- ----------------------------
INSERT INTO `zy_verify` VALUES ('1', '18100386352', '123456');

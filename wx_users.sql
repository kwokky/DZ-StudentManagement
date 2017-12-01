/*
Navicat MySQL Data Transfer

Source Server         : 倪宝山
Source Server Version : 50148
Source Host           : qdm169548231.my3w.com:3306
Source Database       : qdm169548231_db

Target Server Type    : MYSQL
Target Server Version : 50148
File Encoding         : 65001

Date: 2017-11-22 10:04:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for wx_users
-- ----------------------------
DROP TABLE IF EXISTS `wx_users`;
CREATE TABLE `wx_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL COMMENT '姓名',
  `sex` varchar(3) DEFAULT NULL COMMENT '性别',
  `idcate` char(18) DEFAULT NULL COMMENT '身份证号码',
  `dorm_id` char(5) DEFAULT NULL COMMENT '宿舍',
  `iclass` tinyint(3) DEFAULT NULL COMMENT '班级',
  `adress` varchar(50) DEFAULT NULL COMMENT '家庭住址',
  `nation` varchar(15) DEFAULT NULL COMMENT '民族',
  `major` varchar(10) DEFAULT NULL COMMENT '专业',
  `birthday` date DEFAULT NULL COMMENT '出生日期',
  `photo` varchar(200) DEFAULT NULL COMMENT '头像',
  `famname` varchar(15) DEFAULT NULL COMMENT '家长姓名',
  `hujiadress` varchar(50) DEFAULT NULL COMMENT '户籍所在地',
  `stutel` char(11) DEFAULT NULL COMMENT '学生手机号',
  `weixin` varchar(50) DEFAULT NULL COMMENT '微信号',
  `qq` varchar(10) DEFAULT NULL COMMENT 'QQ号',
  `email` varchar(20) DEFAULT NULL COMMENT '邮箱',
  `famtel` char(11) DEFAULT NULL COMMENT '家长手机号',
  `pro` varchar(20) DEFAULT NULL COMMENT '省',
  `city` varchar(20) DEFAULT NULL COMMENT '市',
  `area` varchar(20) DEFAULT NULL COMMENT '区',
  `rili` char(2) DEFAULT NULL COMMENT '阴历阳历',
  `bed` tinyint(3) DEFAULT NULL COMMENT '床位',
  `openid` varchar(30) DEFAULT NULL COMMENT '微信唯一标识',
  `status` tinyint(3) DEFAULT '0' COMMENT '是否被锁定',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_users
-- ----------------------------
INSERT INTO `wx_users` VALUES ('1', '刘飞', '男', '371311199812033416', '3-615', '2', '山东省临沂市罗庄区付庄街道彭庄村', '汉族', 'PHP', '1998-12-03', 'https://www.yanyufanchen.com/public/Uploads/userphoto/liufei.jpg', '刘景洋', '山东省临沂市罗庄区付庄街道彭庄村', '15666395595', 'liu15666395595', '1368638084', '1368638084@qq.com', '13953916362', '山东', '临沂', '罗庄区', '阳历', '8', '', '1');
INSERT INTO `wx_users` VALUES ('3', '李冯', '男', '371302199911214312', '3-620', '2', '山东省临沂市兰山区', '汉族', 'PHP', '1999-11-21', 'https://www.yanyufanchen.com/public/Uploads/userphoto/lifeng.jpg', '李春国', '山东省临沂市兰山区', '17664561233', 'l786740880', '786740880', '786740880@qq.com', '15963909333', '山东', '临沂', '兰山区', '阳历', '4', '', '1');
INSERT INTO `wx_users` VALUES ('4', '王济友', '男', '37131219980426531X', '3-615', '2', '临沂市河东区经济开发区朝阳街道', '汉族', 'PHP', '1998-04-26', 'https://www.yanyufanchen.com/public/Uploads/userphoto/wangjiyou.jpg', '王乐勇', '山东省临沂市河东区经济开发区朝阳街道', '13181223521', 'y393798765', '1120424673', '1120424673@qq.com', '15863925458', '山东', '临沂', '河东区', '阳历', '4', null, '1');
INSERT INTO `wx_users` VALUES ('5', '周洪成', '男', '371311199802043119', '3-618', '3', '山东省临沂市罗庄区', '汉族', 'PHP', '1998-02-04', 'https://www.yanyufanchen.com/public/Uploads/userphoto/zhouhongcheng.jpg', '周克民', '山东省临沂市罗庄区', '18263997819', 'jiu1064771933', '1064771933', '1064771933@qq.com', '15963482158', '山东', '临沂', '罗庄区', '阳历', '7', null, '1');
INSERT INTO `wx_users` VALUES ('6', '刘彦莹', '女', '371329199809072426', '1-601', '3', '山东省临沂市临沭县', '汉族', 'PHP', '1998-09-07', 'https://www.yanyufanchen.com/public/Uploads/userphoto/liuyanying.jpg', '刘德群', '山东省临沂市临沭县西盘东村', '18206491069', '18206491069', '1016052898', '1016052898@qq.com', '15192870335', '山东', '临沂', '临沭县', '阳历', '1', null, '1');
INSERT INTO `wx_users` VALUES ('7', '诸葛瑞兵', '男', '371312199607175710', '3-611', '1', '山东省临沂市相公街道高团村', '汉族', 'PHP', '2017-07-17', 'https://www.yanyufanchen.com/public/Uploads/userphoto/zhugeruibing.jpg', '诸葛祥超', '山东省临沂市相公街道高团村', '18369370238', '18369370238', '2297371465', '17686930979@163.com', '17686930979', '山东', '临沂', '河东区', '阳历', '1', null, '1');
INSERT INTO `wx_users` VALUES ('8', '刘栋', '男', '371311199712233111', '3-611', '1', '临沂市兰山区', '汉族', 'PHP', '1997-12-23', 'https://www.yanyufanchen.com/public/Uploads/userphoto/liudong.jpg', '唐敬梅', '山东临沂兰山区', '15269915585', 'muyichengz-', '1479803579', '1479803579@qq.com', '17753948514', '山东', '临沂', '兰山区', '阳历', '2', null, '1');
INSERT INTO `wx_users` VALUES ('9', '李浩东', '男', '371312199708267112', '3-611', '2', '山东省临沂市河东区', '汉族', 'PHP', '1997-08-26', 'https://www.yanyufanchen.com/public/Uploads/userphoto/lihaodong.jpg', '李汝辉', '山东省临沂市河东区汤头办事处', '13044051210', 'lihaodong970826', '1648009866', '1648009866@qq.com', '15969933935', '山东', '临沂', '河东区', '阳历', '3', null, '1');
INSERT INTO `wx_users` VALUES ('10', '张文雪', '女', '371302199705113721', '1-601', '2', '山东省临沂市兰山区鑫城家园', '汉族', 'PHP', '1997-05-11', 'https://www.yanyufanchen.com/public/Uploads/userphoto/zhangwenxue.jpg', '张春礼', '山东省临沂市兰山区义堂镇', '15376929773', '15376929773', '1027951124', '1027951124@qq.com', '13562969000', '山东', '临沂', '兰山区', '阳历', '2', null, '1');
INSERT INTO `wx_users` VALUES ('11', '李祥', '男', '371321199901187217', '3-618', '1', '山东省临沂市沂南县', '汉族', 'PHP', '1999-01-18', 'https://www.yanyufanchen.com/public/Uploads/userphoto/lixiang.jpg', '李厚德', '山东省临沂市沂南县', '15094747515', 'li973480295', '973480295', '973480295@qq.com', '15505397560', '山东', '临沂', '沂南县', '阳历', '4', null, '1');
INSERT INTO `wx_users` VALUES ('12', '王艺开', '男', '371322199666666966', '3-611', '1', '山东省临沂市郯城县', '汉族', 'PHP', '2017-12-01', 'https://www.yanyufanchen.com/public/Uploads/userphoto/wangyikai.jpg', '王凤宝', '郯城县', '15762940527', '15762940527', '1251783627', '1251783627@qq.com', '17686940468', '山东', '临沂', '郯城县', '阳历', '4', null, '1');
INSERT INTO `wx_users` VALUES ('13', '李赞赞', '男', '371324199802029810', '3-612', '2', '山东省临沂市苍山县卞庄镇东埝头村', '汉族', 'PHP', '1998-02-02', 'https://www.yanyufanchen.com/public/Uploads/userphoto/lizanzan.jpg', '李记学', '山东省临沂市苍山县卞庄镇东埝头村', '14768114856', 'wjzanzan', '1143525952', 'over.you.1314@qq.com', '18769963295', '山东', '临沂', '罗庄区', '阳历', '1', null, '1');
INSERT INTO `wx_users` VALUES ('14', '刘明豪', '女', '371654852321195321', '3-612', '1', '西大埠', '汉族', 'PHP', '2017-11-01', 'https://www.yanyufanchen.com/public/Uploads/userphoto/liuminghao.jpg', '刘银光', '临沂市西大埠村', '15854900861', '15854900861', '624117875', '15854900861@136.com', '15854900861', '山东', '临沂', '苍山县', '阴历', '2', null, '1');
INSERT INTO `wx_users` VALUES ('16', '颜胜胜', '男', '37132419980919945x', '3-617', '1', '山东省临沂市罗庄区沂堂镇南沂堂村', '汉族', 'PHP', '2017-09-19', 'https://www.yanyufanchen.com/public/Uploads/userphoto/yanshengsheng.jpg', '颜丙华', '山东省临沂市罗庄区沂堂镇南沂堂村', '15216566007', 'yss1401823155', '1401823155', '1401823155@qq.com', '13275398831', '山东', '临沂', '兰山区', '阳历', '3', null, '1');
INSERT INTO `wx_users` VALUES ('17', '王宁', '男', '371326199909098213', '3-617', '1', '山东省临沂市', '汉族', 'PHP', '1998-01-24', 'https://www.yanyufanchen.com/public/Uploads/userphoto/wangning.jpg', '赵吉兰', '山东省平邑县', '17669131226', 'yanyufanchen', '2241302902', '2241302902@qq.com', '17669131226', '山东', '临沂', '罗庄区', '阳历', '5', null, '1');
INSERT INTO `wx_users` VALUES ('18', '孙凤利', '男', '371322199705158319', '3-611', '3', '山东省临沂市郯城县李庄镇', '汉族', 'PHP', '1997-07-11', 'https://www.yanyufanchen.com/public/Uploads/userphoto/sunfengli.jpg', '孙绍玉', '山东省临沂市郯城县李庄镇大官庄村', '13295498944', 'jin63933', '595039028', 'tcszsfl@163.com', '15194096981', '山东', '临沂', '--请选择市区--', '阴历', '5', null, '1');
INSERT INTO `wx_users` VALUES ('19', '陈丽香', '女', '371324199804291126', '1-601', '1', '山东省临沂市兰陵县向城镇坊前村', '汉族', 'PHP', '1998-04-29', 'https://www.yanyufanchen.com/public/Uploads/userphoto/chenlixiang.jpg', '马凤爱', '山东省临沂市兰陵县蔡庙村', '13817459778', '1582440097CLX', '1582440097', '1582440097@qq.com', '17660555019', '山东', '临沂', '罗庄区', '阳历', '6', null, '1');
INSERT INTO `wx_users` VALUES ('20', '朱孟钦', '男', '371312199712227113', '3-615', '2', '山东省临沂市河东区', '汉族', 'PHP', '2017-12-22', 'https://www.yanyufanchen.com/public/Uploads/userphoto/zhumengqin.jpg', '朱孔宝', '山东省临沂市河东区', '18660929217', 'ZMQ7113', '286897747', '286897747@qq.com', '15853908286', '山东', '临沂', '河东区', '阳历', '1', null, '1');
INSERT INTO `wx_users` VALUES ('21', '陈鑫磊', '男', '371324200003011134', '3-617', '3', '中国山东', '汉族', 'PHP', '2017-03-01', 'https://www.yanyufanchen.com/public/Uploads/userphoto/chenxinlei.jpg', '陈飞飞', '中国山东', '17660550605', ' ictrip', '1085928815', '1085928815@qq.com', '15000585847', '山东', '临沂', '罗庄区', '阳历', '6', null, '1');
INSERT INTO `wx_users` VALUES ('22', '崔金栋', '男', '371321199703184218', '3-617', '1', '临沂市河东区汤头镇', '汉族', 'PHP', '1997-03-18', 'https://www.yanyufanchen.com/public/Uploads/userphoto/cuijindong.jpg', '崔世波', '临沂市河东区汤头镇', '13082653166', '13082653166', '1570303152', '1570303152@qq.com', '18653907851', '山东', '临沂', '河东区', '阳历', '1', null, '1');
INSERT INTO `wx_users` VALUES ('23', '赵隆宇', '男', '371322199711074332', '3-612', '3', '临沂市郯城县', '汉族', 'PHP', '1997-11-07', 'https://www.yanyufanchen.com/public/Uploads/userphoto/zhaolongyu.jpg', '赵敬德', '山东省临沂市郯城县马头镇', '15563653851', '302600236', '302600236', 'alroyy@qq.com', '15563653851', '山东', '临沂', '郯城县', '阳历', '4', null, '1');
INSERT INTO `wx_users` VALUES ('24', '史磊', '男', '371322199707142716', '3-617', '2', '山东省郯城县胜利乡南刘宅子村', '汉族', 'PHP', '1997-07-14', 'https://www.yanyufanchen.com/public/Uploads/userphoto/shilei.jpg', '史中利', '山东省郯城县胜利乡南刘宅子村', '18705495602', '18705495602', '2512555174', '2512555174@qq.com', '18352958230', '山东', '临沂', '郯城县', '阳历', '2', null, '1');
INSERT INTO `wx_users` VALUES ('25', '王雨', '女', '317132519970117792', '1-601', '1', '临沂兰山', '汉族', 'PHP', '1997-01-17', 'https://www.yanyufanchen.com/public/Uploads/userphoto/wangyu.jpg', '王文俊', '临沂费县马庄镇', '15552995375', 'wy970117', '1402214874', '1402214874@qq.com', '13280569718', '山东', '临沂', '兰山区', '阳历', '8', null, '1');
INSERT INTO `wx_users` VALUES ('26', '刘秀晴', '女', '371312220000222554', '1-601', '3', '山东省临沂市河东区月亮湾刘村', '汉族', 'PHP', '2000-02-22', 'https://www.yanyufanchen.com/public/Uploads/userphoto/liuxiuqing.jpg', '刘子红', '山东省临沂市河东区月亮湾刘村', '15275780149', 'LXQ835260', '1835446250', 'a15165528350@163.com', '15165528350', '山东', '临沂', '河东区', '阳历', '7', null, '1');
INSERT INTO `wx_users` VALUES ('27', '王艳峰', '男', '371324199809290712', '3-612', '1', '临沂市兰陵县大仲村镇涝坡村', '汉族', 'PHP', '1998-09-29', 'https://www.yanyufanchen.com/public/Uploads/userphoto/wangyanfeng.jpg', '王云祥', '山东省苍山县大仲村镇涝坡村301号', '13345071366', 'w1090799019', '1090799019', 'wxygreat11@126.com', '18604627187', '山东', '临沂', '苍山县', '阳历', '5', null, '1');
INSERT INTO `wx_users` VALUES ('28', '卞传震', '男', '371311199801242335', '3-612', '1', '山东临沂罗庄', '汉族', 'PHP', '1998-01-24', 'https://www.yanyufanchen.com/public/Uploads/userphoto/bianchuanzhen.jpg', '卞穆堂', '山东临沂罗庄', '15163916901', 'DJ12315', '1430208730', '1430208730@qq.com', '13969986407', '山东', '临沂', '罗庄区', '阳历', '6', null, '1');
INSERT INTO `wx_users` VALUES ('29', '孙东波', '男', '271327199702262710', '3-611', '3', '山东省临沂市莒南县岭泉镇', '汉族', 'PHP', '1997-02-26', 'https://www.yanyufanchen.com/public/Uploads/userphoto/sundongbo.jpg', '孙立来', '山东省临沂市莒南县岭泉镇西岭泉村', '15266633546', 'sdb14520', '842521603', '842521603@qq.com', '15554891018', '山东', '临沂', '莒南县', '阳历', '6', null, '1');
INSERT INTO `wx_users` VALUES ('30', '杨丽萍', '女', '37132219980825272x', '1-601', '2', '山东省临沂市郯城县', '汉族', 'PHP', '1998-06-29', 'https://www.yanyufanchen.com/public/Uploads/userphoto/yangliping.jpg', '杨兴田', '山东省临沂市郯城县胜利镇', '15192918205', 'Y1600632066', '1600632066', '1600632066@qq.com', '15864851198', '山东', '临沂', '郯城县', '阴历', '4', null, '1');
INSERT INTO `wx_users` VALUES ('31', '徐秦伟', '男', '371311199802102836', '3-611', '2', '山东省临沂市罗庄区', '汉族', 'PHP', '1998-01-14', 'https://www.yanyufanchen.com/public/Uploads/userphoto/xuqinwei.jpg', '徐志峰', '山东省临沂市罗庄区册山镇', '15550499940', 'Ss-XQW', '474384116', '474384116@qq.com', '15964833582', '山东', '临沂', '罗庄区', '阳历', '7', null, '1');
INSERT INTO `wx_users` VALUES ('32', '许杨', '男', '371311199804242656', '3-611', '3', '临沂市罗庄区肖庄', '汉族', 'PHP', '1998-03-24', 'https://www.yanyufanchen.com/public/Uploads/userphoto/xuyang.jpg', '许凤军', '临沂市罗庄区肖庄', '15964890244', 'xy15964890244', '1343147506', '1343147506@qq.com', '15953915963', '山东', '临沂', '罗庄区', '阳历', '8', null, '1');
INSERT INTO `wx_users` VALUES ('33', '夏龙浩', '男', '371327199805310914', '3-612', '2', '山东省临沂市莒南县坪上镇金龙和社区', '汉族', 'PHP', '1998-05-31', 'https://www.yanyufanchen.com/public/Uploads/userphoto/xialonghao.jpg', '夏得常', '山东省临沂市莒南县坪上镇院前村', '17853978129', 'xia2323232323', '2278259541', '2278259541@qq.com', '13053910365', '山东', '临沂', '罗庄区', '阳历', '3', null, '1');
INSERT INTO `wx_users` VALUES ('34', '孙贵芹', '女', '371325199608097920', '1-601', '1', '临沂市费县马庄镇芍药山乡', '汉族', 'PHP', '1996-08-09', 'https://www.yanyufanchen.com/public/Uploads/userphoto/sunguiqin.jpg', '孙学安', '山东省临沂市费县马庄镇芍药山乡', '15092906136', 'SGQ4WEYYI', '3532207041', '3532207041@qq.com', '13685493805', '山东', '临沂', '费县', '阳历', '3', null, '1');
INSERT INTO `wx_users` VALUES ('35', '林清飞', '男', '37132419960924325x', '3-615', '3', '山东省临沂市苍山县', '汉族', 'PHP', '1996-09-24', 'https://www.yanyufanchen.com/public/Uploads/userphoto/linqingfei.jpg', '林付行', '山东省临沂市苍山县', '18615393245', '18615393245', '1148645344', '1148645344@qq.com', '18615393245', '山东', '临沂', null, '阳历', '7', null, '1');
INSERT INTO `wx_users` VALUES ('37', '王艳婷', '女', '371312199811147127', '1-601', '3', '河东区汤头镇官庄村', '汉族', 'PHP', '1998-11-14', 'https://www.yanyufanchen.com/public/Uploads/userphoto/wangyanting.jpg', '王俊臣', '山东省临沂市河东区汤头镇官庄村', '17664667030', '15965498270', '849081767', '849081767@qq.com', '15864805719', '山东', '临沂', '河东区', '阳历', '5', null, '1');
INSERT INTO `wx_users` VALUES ('38', '郭凯元', '男', '370283199812247014', '3-620', '2', '山东省潍坊诸城市', '汉族', 'PHP', '1998-12-24', 'https://www.yanyufanchen.com/public/Uploads/userphoto/guokaiyuan.jpg', '郭阿布', '山东省青岛平度市', '15153698985', 'aa1305864975', '1305864975', '1305864975@qq.com', '13883822238', '山东', '临沂', '罗庄区', '阳历', '5', null, '1');
INSERT INTO `wx_users` VALUES ('39', '王前程', '男', '371324199706038033', '3-612', '3', '山东省临沂市苍山县芦柞镇南哨村', '汉族', 'PHP', '1997-04-28', 'https://www.yanyufanchen.com/public/Uploads/userphoto/wangqiancheng.jpg', '王银喜', '山东省临沂市苍山县芦柞镇南哨村', '15864890052', 'w937978402', '937978402', '937978402@qq.com', '15092388943', '山东', '临沂', '苍山县', '阴历', '7', null, '1');
INSERT INTO `wx_users` VALUES ('40', '张东升', '男', '371311199611213154', '3-617', '2', '美国加利福尼亚州洛杉矶', '哈尼族', 'PHP', '2017-11-12', 'https://www.yanyufanchen.com/public/Uploads/userphoto/zhangdongsheng.jpg', '张张张', '洛杉矶', '15563239095', '402832626', '402832626', '402832626@qq.com', '15563239095', '广东', '汕头', '濠江区', '阳历', '8', null, '1');
INSERT INTO `wx_users` VALUES ('41', '吴士林', '男', '371324199806123230', '3-615', '3', '山东省临沂市兰陵县金岭镇莲子汪村', '汉族', 'PHP', '1998-06-12', 'https://www.yanyufanchen.com/public/Uploads/userphoto/wushilin.jpg', '吴清银', '山东省临沂市兰陵县金岭镇莲子汪村630号', '15253985415', '15253985415', '2536206450', '2536206450@qq.com', '18265978551', '山东', '临沂', '苍山县', '阳历', '5', null, '1');
INSERT INTO `wx_users` VALUES ('42', '余蛟龙', '男', '371312199711236413', '3-615', '3', '临沂市兰山区沂蒙路一号华尔兹A栋205', '汉族', 'PHP', '1997-10-24', 'https://www.yanyufanchen.com/public/Uploads/userphoto/yujiaolong.jpg', '余德勤', '临沂市河东区郑旺镇', '17853947920', 'y1339953262', '1339953262', 'dongproud@qq.com', '15106398209', '山东', '临沂', '兰山区', '阴历', '3', null, '1');
INSERT INTO `wx_users` VALUES ('43', '于芝政', '男', '371322199', '3-615', '3', '河东', '汉族', 'PHP', '2002-11-15', 'https://www.yanyufanchen.com/public/Uploads/userphoto/yuzhizheng.jpg', '老于', '河东', '15553905404', '15553950404', '976062795', '976062795@qq.com', '13562968868', '山东', '临沂', '河东区', '阳历', '6', null, '1');
INSERT INTO `wx_users` VALUES ('44', '王浩', '男', '371312199709306937', '3-612', '1', '山东省临沂市河东区八湖镇', '汉族', 'PHP', '1997-08-29', 'https://www.yanyufanchen.com/public/Uploads/userphoto/wanghao.jpg', '王靖春', '山东省临沂市河东区八湖镇古沂庄村', '15963331510', 'qbylkwh', '1336755528', '1336755528@qq.com', '15163912735', '山东', '临沂', '河东区', '阳历', '8', null, '1');
INSERT INTO `wx_users` VALUES ('45', '丁兆一', '男', '371102199705294410', '3-617', '3', '岚山区巨峰镇', '汉族', 'PHP', '1997-05-29', 'https://www.yanyufanchen.com/public/Uploads/userphoto/dingzhaoyi.jpg', '丁元平', '岚山区巨峰镇', '13468357500', '15318238533', '2660208913', '2660208913@qq.com', '13256065807', '山东', '日照', '岚山区', '阳历', '7', '', '1');

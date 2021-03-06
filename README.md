---
title: 数据库数据模型设计与实现-project
tags: 小书匠, TYF, 数据库小组, 课题项目, markdown
---
[toc]
># ==选题综述==
**按照下列描述进行数据库设计，主要完成需求分析、概念设计与逻辑设计**
# 英文原题 
Academy Cruises Company (ACA) has decided that their manual system of booking passengers onto their ships will not hold up when they get a new one next month. They currently have two ships (not including the new one) and will probably expand to five or six by 2015. They are named “Goodsea” and “Goodwind,” and the new one will be called “Goodsky.” Eachship has a specific passenger capacity and registry. Registry is the country that the ship is registered with. They do not need to worry about tonnage or draft or anything else about the ship. Each year ACA puts out a brochure with information about their cruises. Every cruise has a name and duration in number of days. They offer three, seven, eleven, and fourteen day cruises. Each cruise also has a specific ship assigned to it; some people want to go on only the newer ships. For each cruise, there are different port stops. A three day cruise will have only one stop, always on the second day of the cruise; a seven day cruise will have three port stops. Cascade varies port stops depending on where the cruise originates. For example, the Los Angeles, CA cruises go to Mexico ports like Cabo San Lucas and Acapulco, the Miami cruises go to the Bahamas and the Virgin Islands, and the Anchorage cruises make stops all through Alaska. Depending upon the length of each cruise, the cruise will make port calls on different days out. Passengers book a given cruise, which has a certain length and number of ports. Depending on the cruise that they pick, customers are informed of the available cabins. After the passenger chooses a cabin, they can get a price. The price also depends on the number of people in the cabin and the “class” of the cabin. After the cabin is booked, it is then removed from the list of available cabins unless the passenger indicated that they want to share with someone else. If the cabin can hold four people, and they are traveling alone, then the price will be cheaper if they share. After passengers are booked and a deposit is received, the travel agent who made the reservation will receive the commission for the cruise.

# 中文翻译（搜狗）
学院游轮公司(ACA)已经决定，当他们有了新的游轮后，他们的手工订票系统将不再适用下个月。他们目前有两艘船(不包括新的那艘)，到2015年可能会增加到五六艘。它们被命名为“Goodsea”和“Goodwind”，新的将被命名为“Goodsky”每艘船都有特定的载客量和注册。注册地是船舶注册的国家。他们不需要担心吨位或吃水深度或船的其他任何事情。每年ACA都会出版一本小册子，介绍他们的航行情况。每次巡游都有一个名称和持续天数。他们提供**三天、七天、十一天和十四天的巡游**。每个巡航也有一个特定的船只分配给它；==有些人只想乘坐较新的船只==。**每次巡游都有不同的停靠港口**。==为期三天的巡航将只有一个停留，总是在巡航的第二天；七天的巡游将有三个港口停留。Cascade根据游轮的出发地点改变停靠的港口==。例如，加州洛杉机游轮去墨西哥的Cabo圣卢卡斯和阿卡普尔科等港口，迈阿密游轮去巴哈马和维尔京群岛，安克雷奇游轮在阿拉斯加中途停留。根据每次巡航的时间长短，巡航将在不同的日期停靠港口。乘客预订一个特定的邮轮，该邮轮有一定的长度和港口数量。==根据他们选择的邮轮，客户被告知可提供的客舱==。乘客选好舱位后，他们可以得到一个**价格**。价格还取决于客舱的人数和客舱的“等级”。在客舱被预订后，它将从可用客舱列表中删除，除非乘客表示他们希望与其他人共享。如果机舱能容纳四个人，而且他们是一个人旅行，那么如果他们合租的话价格会更便宜。在乘客预订并收到押金后，预订的旅行社将收到游轮的佣金。

## 课题要求
>>**项目要求**：自由一组，经阅读文献了解知识后，设计需求，设计数据库，==根据项目实际描述进行分析、设计，并使用 powerdesigner 画出数据流程图、E-R 图并转换为关系模型。==
>>**课题要求**：
（1）设计方案要合理；
（2）能基于该方案完成系统要求的功能；
（3）设计方案有一定的合理性分析。


# 一、工具依赖

# 二、技术依赖

# 三、分析实现
## 0. 问题分析
- ==就是要设计实现一个订票管理系统==，现在有两艘船，即将新进一艘船；
- 注册地是注册的国家
- 每次巡游都是一个操作单元，有属性名称+巡游天数
- 巡游有3天、7天、11天和14天几种，每次巡游任务都会分配船只
- 乘客会有人只想使用新船
- 巡游的停靠港口不固定
- 3天巡游的船只只能在第二天停靠港口
- 7天巡游的任务可以停靠3个港口
- 其余的根据出发地调整停靠港口
- 根据巡航时间长短，调整停靠港口的日期
- 给定航程，告知用户客舱量；选好客舱后得到价格
- ==价格==取决于客舱人数+客舱等级
- 被用户预订的客舱，如果用户（乘客）不共享客舱，则系统不再显示；否则继续显示；
- 共享-合租客舱可以得到价格优惠
- 顾客预订并支付后，供给商得到佣金。
## 1、数据库设计实现
### 1.0 初步分析设计
>根据如上分析，需要设计至少如下表，得出如下结论

1. 公司需要向乘客展示航程，乘客根据航程和自己的需要选择航程并预定；
2. 航程表需要存储使用的船只，对应巡游，剩余座位，当前价格，出发地，目的地，航程表根据出发地和目的地去港口表查询途经的港口，并最终选择可停靠港口，先采用随机选择方式选择可停靠港口；
3. 乘客需要是本系统的用户，预订之后需要提交支付信息，并存储到支付表中；
4. 公司收支表根据用户支付表的数据进行统计，得到公司最终的收入，如果有乘客退款，那么删除支付表中相应条目，在公司收支表操作refund退款数据，并重新计算最终收益；
5. 港口表需要记录所有的可停靠港口；
6. 乘客支付需要根据选择的舱段，确定最终价格；
7. 用户表存储了用户角色，乘客只能看到基本航程信息相关表；而管理员可以查看所有数据信息；

**当前缺陷：**
1. 暂时没有实现有的乘客更喜爱新船；
2. 暂时没有实现乘客是否共享船舱从而调整不同的价格的问题；

| 表名       | 属性                                                         | 备注                                   |
| ---------- | ------------------------------------------------------------ | -------------------------------------- |
| 巡游表     | strollID,rideLength                                          | 标识每次巡游的基本信息                 |
| 港口表     | portID,portName                                              | 可停靠的港口                           |
| 客舱表     | cabinID,cabinName,price                                      |                                        |
| 船只表     | cruiseID,cruiseName,isNewer                                  |                                        |
| 航程表     | rideID,strollID,rideDate,cruiseID,cruiseSeats, price,departureID,destinationID,dockablePortID | 航程选定的船只及客舱价格等             |
| 乘客支付表 | passengerID,passengerName,rideID,cabinID,payment             | 用于管理公司收到的乘客支付，一人一条目 |
| 用户表     | userID,userName,password,sex,age,telephone,Role              | 用于存储注册系统的用户                 |
| 公司收支表 | IOID,income,refund                                           | 用于存储公司总收入和退款金额           |
### 1.1 实体及属性
### 1.2 系统E-R图

![image-20220522235533903](E:\Tang_programe\repositories_projects\Laboratory_pro\cruiseManagement\callImg\README.asset\image-20220522235533903.png)

## 2.系统逻辑设计
### 2.1 系统关系模型

数据库初始化脚本见附件一。

1. 针对逻辑模型实现，因为乘客需要获得航程表数据，以确定需要选择的航程，选择航程之后，后台应当添加成课表条目，同时公司的收支表应当重新计算收支数据；此处我们通过数据的触发器来实现，即当有乘客产生，则计算公司收入和添加乘客条目------>添加乘客数据是通过获取用户数据及选择数据进行添加，而公司收支所需要通过触发器实现：

```mysql
mysql> create trigger autoChangeIncome after insert on passengerPay for each row update co
rporation_io set income=(select sum(payment) from passengerPay);
```

2. 针对数据库各个表之间，实体之间应当存在依赖关系，如乘客必须是用户，不是系统用户的话不能进入系统预订航程，也就是说，如果乘客想要购票，需要成为系统用户，所以乘客表中的userID是源自于sys_user表，即为外键。与此同理，航程表中的游轮ID、巡游ID、港口ID都是外键，避免向航程表添加数据时，错误的添加不存在的数据。
3. 管理员应当有权限去查看乘坐某一艘游轮的所有用户，便于管理，因为有三艘游轮，暂时设置三个视图，每个视图为获取乘坐当前游轮的所有乘客，视图创建如下：

```mysql
mysql> create view cruise_goodwind as select * from passengerPay a where a.rideID=0;
mysql> create view cruise_goodsky as select * from passengerPay a where a.rideID=1;
mysql> create view cruise_goodsnow as select * from passengerPay a where a.rideID=2;
```

4. 航程表和巡游表之间是一对一的，与途径港口是一对多的，与乘客表是一对多的，与游轮表是一对一的；成课表与舱段表是一对一的，与系统用户表是一对一的，与公司收支表是一对多的关系。

### 2.2 系统表结构

![image-20220522235453294](E:\Tang_programe\repositories_projects\Laboratory_pro\cruiseManagement\callImg\README.asset\image-20220522235453294.png)

# 四、技术实现
## 1. 综述

## 2. 实现效果

![](./resultImg/console.png)

![](./resultImg/manager.png)

![](./resultImg/0511purchase.png)

# 五、问题综述

1. 当前项目还没有完全实现，如还未完全判断乘客是否共享船舱，共享之后的价格还没有直接确定；
2. 页面实现还未完全，许多数据目前仍是写死的，这受限于时间原因；
3. 数据库之间的联系还不是很明确，存在各自分离的情况，应添加触发器等使数据进一步同步；
4. 在Web页面部分，还未完全实现管理员功能，管理员还不能动态添加旅游管理数据，仅实现了获取和查看；
5. 暂未加入冲突检测，如游轮被使用到某一航程之后，其他航程不能再使用此游轮。
6. 暂未实现乘客可退款选项。

# 六、项目总结

暂无

# 七、参考文献

暂无

# 附录

附录一：初始化数据库所用脚本

```mysql
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: cruise_management
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cabin`
--

DROP TABLE IF EXISTS `cabin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cabin` (
  `cabinID` int NOT NULL,
  `cabinName` char(20) DEFAULT NULL,
  `cabinPrice` int DEFAULT NULL,
  PRIMARY KEY (`cabinID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabin`
--

LOCK TABLES `cabin` WRITE;
/*!40000 ALTER TABLE `cabin` DISABLE KEYS */;
INSERT INTO `cabin` VALUES (0,'头等舱',1000),(1,'经济舱',800);
/*!40000 ALTER TABLE `cabin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `corporation_io`
--

DROP TABLE IF EXISTS `corporation_io`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `corporation_io` (
  `ioID` int NOT NULL,
  `income` int DEFAULT NULL,
  `refund` int DEFAULT NULL,
  PRIMARY KEY (`ioID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corporation_io`
--

LOCK TABLES `corporation_io` WRITE;
/*!40000 ALTER TABLE `corporation_io` DISABLE KEYS */;
INSERT INTO `corporation_io` VALUES (0,3000,0);
/*!40000 ALTER TABLE `corporation_io` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cruise`
--

DROP TABLE IF EXISTS `cruise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cruise` (
  `cruiseID` int NOT NULL,
  `cruiseName` char(20) DEFAULT NULL,
  `isNewer` int DEFAULT NULL,
  PRIMARY KEY (`cruiseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cruise`
--

LOCK TABLES `cruise` WRITE;
/*!40000 ALTER TABLE `cruise` DISABLE KEYS */;
INSERT INTO `cruise` VALUES (0,'Goodsea',0),(1,'Goodwind',0),(2,'Goodsky',1);
/*!40000 ALTER TABLE `cruise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `cruise_goodsky`
--

DROP TABLE IF EXISTS `cruise_goodsky`;
/*!50001 DROP VIEW IF EXISTS `cruise_goodsky`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cruise_goodsky` AS SELECT 
 1 AS `passengerID`,
 1 AS `passengerName`,
 1 AS `rideID`,
 1 AS `cabinID`,
 1 AS `userID`,
 1 AS `payment`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `cruise_goodsnow`
--

DROP TABLE IF EXISTS `cruise_goodsnow`;
/*!50001 DROP VIEW IF EXISTS `cruise_goodsnow`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cruise_goodsnow` AS SELECT 
 1 AS `passengerID`,
 1 AS `passengerName`,
 1 AS `rideID`,
 1 AS `cabinID`,
 1 AS `userID`,
 1 AS `payment`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `cruise_goodwind`
--

DROP TABLE IF EXISTS `cruise_goodwind`;
/*!50001 DROP VIEW IF EXISTS `cruise_goodwind`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cruise_goodwind` AS SELECT 
 1 AS `passengerID`,
 1 AS `passengerName`,
 1 AS `rideID`,
 1 AS `cabinID`,
 1 AS `userID`,
 1 AS `payment`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `passengerpay`
--

DROP TABLE IF EXISTS `passengerpay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passengerpay` (
  `passengerID` int NOT NULL,
  `passengerName` char(20) DEFAULT NULL,
  `rideID` int DEFAULT NULL,
  `cabinID` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `payment` int DEFAULT NULL,
  PRIMARY KEY (`passengerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passengerpay`
--

LOCK TABLES `passengerpay` WRITE;
/*!40000 ALTER TABLE `passengerpay` DISABLE KEYS */;
INSERT INTO `passengerpay` VALUES (0,'admin',0,0,0,1000),(1,'张三',0,0,1,1000),(2,'李四',0,0,2,1000);
/*!40000 ALTER TABLE `passengerpay` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `autoChangeIncome` AFTER INSERT ON `passengerpay` FOR EACH ROW update corporation_io set income=(select sum(payment) from passengerPay) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `port`
--

DROP TABLE IF EXISTS `port`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `port` (
  `portID` int NOT NULL,
  `portName` char(20) DEFAULT NULL,
  PRIMARY KEY (`portID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `port`
--

LOCK TABLES `port` WRITE;
/*!40000 ALTER TABLE `port` DISABLE KEYS */;
INSERT INTO `port` VALUES (0,'重庆'),(1,'贵州');
/*!40000 ALTER TABLE `port` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ride`
--

DROP TABLE IF EXISTS `ride`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ride` (
  `rideID` int NOT NULL,
  `strollID` int DEFAULT NULL,
  `rideDate` timestamp NULL DEFAULT NULL,
  `cruiseID` int DEFAULT NULL,
  `cruiseSeats` int DEFAULT NULL,
  `price` json DEFAULT NULL,
  `departureID` int DEFAULT NULL,
  `destinationID` int DEFAULT NULL,
  `dockablePort` json DEFAULT NULL,
  PRIMARY KEY (`rideID`),
  KEY `fk_stroll_ride` (`strollID`),
  KEY `fk_port_departure` (`departureID`),
  KEY `fk_port_destination` (`destinationID`),
  KEY `fk_cruise_ride` (`cruiseID`),
  CONSTRAINT `fk_cruise_ride` FOREIGN KEY (`cruiseID`) REFERENCES `cruise` (`cruiseID`),
  CONSTRAINT `fk_port_departure` FOREIGN KEY (`departureID`) REFERENCES `port` (`portID`),
  CONSTRAINT `fk_port_destination` FOREIGN KEY (`destinationID`) REFERENCES `port` (`portID`),
  CONSTRAINT `fk_stroll_ride` FOREIGN KEY (`strollID`) REFERENCES `stroll` (`strollID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ride`
--

LOCK TABLES `ride` WRITE;
/*!40000 ALTER TABLE `ride` DISABLE KEYS */;
INSERT INTO `ride` VALUES (0,0,'2022-04-04 16:00:00',0,100,'{\"0\": 1000, \"1\": 800}',0,0,'{\"0\": \"重庆\"}');
/*!40000 ALTER TABLE `ride` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stroll`
--

DROP TABLE IF EXISTS `stroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stroll` (
  `strollID` int NOT NULL,
  `strollLength` int DEFAULT NULL,
  PRIMARY KEY (`strollID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stroll`
--

LOCK TABLES `stroll` WRITE;
/*!40000 ALTER TABLE `stroll` DISABLE KEYS */;
INSERT INTO `stroll` VALUES (0,3),(1,7),(2,11),(3,14);
/*!40000 ALTER TABLE `stroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user` (
  `userID` int NOT NULL,
  `userName` char(20) DEFAULT NULL,
  `password` char(20) DEFAULT NULL,
  `sex` int DEFAULT NULL,
  `age` int DEFAULT NULL,
  `telephone` char(20) DEFAULT NULL,
  `Role` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (0,'admin','123456',1,23,'18223097363',1),(1,'张三','123456',0,21,'19282736252',0);
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `cruise_goodsky`
--

/*!50001 DROP VIEW IF EXISTS `cruise_goodsky`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cruise_goodsky` AS select `a`.`passengerID` AS `passengerID`,`a`.`passengerName` AS `passengerName`,`a`.`rideID` AS `rideID`,`a`.`cabinID` AS `cabinID`,`a`.`userID` AS `userID`,`a`.`payment` AS `payment` from `passengerpay` `a` where (`a`.`rideID` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `cruise_goodsnow`
--

/*!50001 DROP VIEW IF EXISTS `cruise_goodsnow`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cruise_goodsnow` AS select `a`.`passengerID` AS `passengerID`,`a`.`passengerName` AS `passengerName`,`a`.`rideID` AS `rideID`,`a`.`cabinID` AS `cabinID`,`a`.`userID` AS `userID`,`a`.`payment` AS `payment` from `passengerpay` `a` where (`a`.`rideID` = 2) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `cruise_goodwind`
--

/*!50001 DROP VIEW IF EXISTS `cruise_goodwind`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cruise_goodwind` AS select `a`.`passengerID` AS `passengerID`,`a`.`passengerName` AS `passengerName`,`a`.`rideID` AS `rideID`,`a`.`cabinID` AS `cabinID`,`a`.`userID` AS `userID`,`a`.`payment` AS `payment` from `passengerpay` `a` where (`a`.`rideID` = 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-22 23:48:50

```


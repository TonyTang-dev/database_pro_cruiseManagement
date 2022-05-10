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
INSERT INTO `corporation_io` VALUES (0,1000,0);
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
INSERT INTO `passengerpay` VALUES (0,'admin',0,0,0,1000);
/*!40000 ALTER TABLE `passengerpay` ENABLE KEYS */;
UNLOCK TABLES;

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
  `rideLength` int DEFAULT NULL,
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
INSERT INTO `sys_user` VALUES (0,'admin','123456',1,23,'18227363737',1);
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-10 23:41:52

-- MySQL dump 10.13  Distrib 5.7.20, for Win64 (x86_64)
--
-- Host: localhost    Database: taoxue
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `idadmin` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`idadmin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `idgoods` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `goodsName` varchar(15) NOT NULL,
  `price` double NOT NULL,
  `img` varchar(300) NOT NULL,
  `stock` int(11) NOT NULL,
  `category` varchar(15) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `click` int(11) DEFAULT '0',
  `goodsDetails` varchar(50) DEFAULT '无',
  PRIMARY KEY (`idgoods`),
  KEY `iduser` (`iduser`),
  CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (5,1,'iphonex',7688,'iphonex.jpg',10,'电子产品','2018-05-10 08:28:13',48,NULL),(7,1,'平衡车',1999,'平衡车.jpg',8,'代步工具','2018-05-10 08:33:32',25,NULL),(8,1,'记忆枕',49,'记忆枕.jpg',15,'生活用品','2018-05-10 08:34:45',18,NULL),(9,1,'23寸小吉他',129,'23寸小吉他.jpg',10,'乐器','2018-05-10 08:35:28',11,NULL),(10,1,'一汽丰田',163888,'一汽丰田.jpg',2,'其他','2018-05-10 08:38:30',11,NULL),(11,2,'围城',42,'围城.jpg',3,'书籍教材','2018-05-13 04:49:36',6,NULL),(12,2,'活着',17,'活着.jpg',15,'书籍教材','2018-05-13 05:27:58',6,NULL),(13,2,'哑铃',68,'哑铃.jpg',23,'体育健身','2018-05-13 05:53:59',3,NULL),(14,2,'仰卧板',258,'仰卧板.jpg',7,'体育健身','2018-05-13 05:54:12',0,NULL),(17,2,'奔驰',998,'奔驰.jpg',6,'代步工具','2018-05-23 10:18:32',1,'只要998，奔驰带回家！');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seekings`
--

DROP TABLE IF EXISTS `seekings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seekings` (
  `idseekings` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `seekingsName` varchar(15) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `trading` varchar(10) DEFAULT NULL,
  `category` varchar(15) NOT NULL,
  `details` varchar(100) DEFAULT NULL,
  `img` varchar(300) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  PRIMARY KEY (`idseekings`),
  KEY `iduser` (`iduser`),
  CONSTRAINT `seekings_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seekings`
--

LOCK TABLES `seekings` WRITE;
/*!40000 ALTER TABLE `seekings` DISABLE KEYS */;
INSERT INTO `seekings` VALUES (1,2,'神探夏洛克',31,'当面交易','书籍教材','最近太迷悬疑推理小说了，每天都在刷，家里也堆了很多小 说。现在为了节约成本，求购闲置的推理小说。','','2018-05-11 02:33:11'),(2,2,'iphone7',3688,'当面交易','电子产品','想要个苹果用用,买买买!','','2018-05-11 03:07:43'),(3,2,'奔驰',50,'当面交易','代步工具','你有？？？？？','奔驰.jpg','2018-05-23 10:29:11');
/*!40000 ALTER TABLE `seekings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shopping_cart` (
  `iduser` int(11) NOT NULL,
  `idgoods` int(11) NOT NULL,
  `number` int(11) DEFAULT '1',
  `checked` tinyint(4) DEFAULT '0',
  `trading` varchar(10) NOT NULL DEFAULT '校园代送',
  PRIMARY KEY (`iduser`,`idgoods`),
  KEY `shopping_cart_ibfk_2` (`idgoods`),
  CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`),
  CONSTRAINT `shopping_cart_ibfk_2` FOREIGN KEY (`idgoods`) REFERENCES `goods` (`idgoods`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (2,7,3,1,'校园代送'),(2,9,11,1,'校园代送'),(2,11,1,1,'当面交易'),(2,12,2,1,'校园代送'),(2,13,4,1,'当面交易');
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `telephone` varchar(13) NOT NULL,
  `qq` int(11) DEFAULT NULL,
  `wechat` varchar(20) DEFAULT NULL,
  `nickName` varchar(15) DEFAULT NULL,
  `sign` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'tjf56tjf','1qaz2wsx','15951671505',529042309,'ywy94ywy','Des.Yang','发布商品的账号'),(2,'ywy94ywy','1qaz2wsx','15951671505',529042309,'ywy94ywy','Des.Yang','yangwenyuan');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_address`
--

DROP TABLE IF EXISTS `user_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_address` (
  `idaddress` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `address` varchar(50) NOT NULL,
  `defaultAddress` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idaddress`),
  KEY `iduser` (`iduser`),
  CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_address`
--

LOCK TABLES `user_address` WRITE;
/*!40000 ALTER TABLE `user_address` DISABLE KEYS */;
INSERT INTO `user_address` VALUES (1,2,'南京审计大学泽园3站',1),(4,2,'hahah ',0);
/*!40000 ALTER TABLE `user_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_message`
--

DROP TABLE IF EXISTS `user_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_message` (
  `idmessage` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `message` varchar(100) NOT NULL,
  `createDate` datetime NOT NULL,
  `idgoods` int(11) NOT NULL,
  PRIMARY KEY (`idmessage`),
  KEY `iduser` (`iduser`),
  KEY `user_message_ibfk_2_idx` (`idgoods`),
  CONSTRAINT `user_message_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`),
  CONSTRAINT `user_message_ibfk_2` FOREIGN KEY (`idgoods`) REFERENCES `goods` (`idgoods`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_message`
--

LOCK TABLES `user_message` WRITE;
/*!40000 ALTER TABLE `user_message` DISABLE KEYS */;
INSERT INTO `user_message` VALUES (1,2,'太贵了！买不起！','2018-05-23 03:20:14',5),(2,2,'这本书还行！','2018-05-23 06:00:25',12),(3,2,'你确定吗？','2018-05-23 06:00:55',12);
/*!40000 ALTER TABLE `user_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_orders`
--

DROP TABLE IF EXISTS `user_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_orders` (
  `iduo` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `idgoods` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `trading` varchar(45) DEFAULT NULL,
  `createDate` datetime NOT NULL,
  PRIMARY KEY (`iduo`),
  KEY `iduser` (`iduser`),
  KEY `idgoods` (`idgoods`),
  CONSTRAINT `user_orders_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`),
  CONSTRAINT `user_orders_ibfk_2` FOREIGN KEY (`idgoods`) REFERENCES `goods` (`idgoods`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_orders`
--

LOCK TABLES `user_orders` WRITE;
/*!40000 ALTER TABLE `user_orders` DISABLE KEYS */;
INSERT INTO `user_orders` VALUES (19,2,7,3,'校园代送','2018-05-26 01:26:05'),(20,2,12,2,'校园代送','2018-05-26 01:26:05'),(21,2,13,4,'当面交易','2018-05-26 01:26:05'),(22,2,9,1,'校园代送','2018-05-26 01:26:05'),(23,2,11,1,'当面交易','2018-05-26 01:26:05');
/*!40000 ALTER TABLE `user_orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-26 12:14:43

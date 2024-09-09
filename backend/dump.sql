-- MySQL dump 10.13  Distrib 8.0.26, for macos11.4 (arm64)
--
-- Host: localhost    Database: examinationdb
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `coursemaster`
--

DROP TABLE IF EXISTS `coursemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursemaster` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `semester_count` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursemaster`
--

LOCK TABLES `coursemaster` WRITE;
/*!40000 ALTER TABLE `coursemaster` DISABLE KEYS */;
INSERT INTO `coursemaster` VALUES (1,'BCA',6),(2,'B.E.',8);
/*!40000 ALTER TABLE `coursemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examinationmaster`
--

DROP TABLE IF EXISTS `examinationmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examinationmaster` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subjectid` int DEFAULT NULL,
  `questionIds` text,
  `examDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examinationmaster`
--

LOCK TABLES `examinationmaster` WRITE;
/*!40000 ALTER TABLE `examinationmaster` DISABLE KEYS */;
INSERT INTO `examinationmaster` VALUES (1,2,'2,4,3,6','2021-11-20 12:00:00');
/*!40000 ALTER TABLE `examinationmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Login`
--

DROP TABLE IF EXISTS `Login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Login` (
  `id` int NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Login`
--

LOCK TABLES `Login` WRITE;
/*!40000 ALTER TABLE `Login` DISABLE KEYS */;
INSERT INTO `Login` VALUES (1,'brij','brij','admin','Brij Mohan Bhasin'),(2,'shiv','shiv','admin','Shivasav Bhasin');
/*!40000 ALTER TABLE `Login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text,
  `option1` text,
  `option2` text,
  `option3` text,
  `option4` text,
  `answer` text,
  `type` varchar(50) DEFAULT NULL,
  `subjectid` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'what is 1+1','1','3','2','5','2','mcq',2),(2,'what is 1+4','1','3','2','5','4','mcq',2),(3,'explain what is java scipt','NA','NA','NA','NA','1','subjective',2),(4,'explain Cs','NA','NA','NA','NA','1','subjective',2),(5,'what is 1+2','1','3','2','5','3','mcq',2),(6,'what is 1+3','4','3','2','5','2','mcq',2);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `id` varchar(1000) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `examId` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `score` varchar(100) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES ('fd61654d-0899-4928-86c1-96a4e4bb6e24','brij.bhasin7@gmail.com',1,2,'3','Brij Mohan Bhasin'),('36f0e3a4-ed04-44e1-a7f7-95cba4cd65d0','shivasavbhasin@gmail.com',1,1,'NA','Shivasav Bhasin');
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectmaster`
--

DROP TABLE IF EXISTS `subjectmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectmaster` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `semester` varchar(50) DEFAULT NULL,
  `courseid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courseid` (`courseid`),
  CONSTRAINT `subjectmaster_ibfk_1` FOREIGN KEY (`courseid`) REFERENCES `coursemaster` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectmaster`
--

LOCK TABLES `subjectmaster` WRITE;
/*!40000 ALTER TABLE `subjectmaster` DISABLE KEYS */;
INSERT INTO `subjectmaster` VALUES (1,'ITPL','1',1),(2,'SE','2',1),(3,'NF','2',1);
/*!40000 ALTER TABLE `subjectmaster` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-21 16:41:46

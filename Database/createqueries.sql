-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: airport_db
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `users`
--

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
INSERT INTO users (username, password)
VALUES ('admin', 'admin123');

--
-- Table structure for table `airplane`
--

DROP TABLE IF EXISTS `airplane`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airplane` (
  `Registration_no` int NOT NULL,
  `Manufacturer` varchar(15) DEFAULT NULL,
  `Model` varchar(50) DEFAULT NULL,
  `AP_Number` int DEFAULT NULL,
  PRIMARY KEY (`Registration_no`),
  KEY `type_idx` (`Model`),
  KEY `parked_in_idx` (`AP_Number`),
  CONSTRAINT `parked_in` FOREIGN KEY (`AP_Number`) REFERENCES `airport_apron` (`AP_number`),
  CONSTRAINT `type` FOREIGN KEY (`Model`) REFERENCES `type_of_plane` (`Model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airplane`
--

LOCK TABLES `airplane` WRITE;
/*!40000 ALTER TABLE `airplane` DISABLE KEYS */;
INSERT INTO `airplane` VALUES (1001,'Boeing','Boeing 737',1),(1002,'Airbus','Airbus A320',2),(1003,'Boeing','Boeing 747',3),(1004,'Embraer','Embraer E175',4),(1005,'Cessna','Cessna 172',5),(1006,'Bombardier','Bombardier Challenger 300',6),(1007,'Gulfstream','Gulfstream G650',7),(1008,'Antonov','Antonov An-225',8),(1009,'Lockheed','Lockheed C-130 Hercules',9),(1010,'Piper','Piper PA-28 Cherokee',10),(1011,'Airbus','Airbus A380',11),(1012,'Boeing','Boeing 777',12),(1013,'Embraer','Embraer E190',13),(1014,'Cessna','Cessna Citation X',14),(1015,'Bombardier','Bombardier Global 7500',15),(1016,'Dassault','Dassault Falcon 7X',16),(1017,'Boeing','Boeing 787 Dreamliner',17),(1018,'Lockheed','Lockheed Martin F-35',18),(1019,'Sikorsky','Sikorsky UH-60 Black Hawk',19),(1020,'Bell','Bell AH-1 Cobra',20);
/*!40000 ALTER TABLE `airplane` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airport_apron`
--

DROP TABLE IF EXISTS `airport_apron`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airport_apron` (
  `AP_number` int NOT NULL,
  `Capacity` int DEFAULT NULL,
  `AP_location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`AP_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airport_apron`
--

LOCK TABLES `airport_apron` WRITE;
/*!40000 ALTER TABLE `airport_apron` DISABLE KEYS */;
INSERT INTO `airport_apron` VALUES (1,50,'Terminal A'),(2,40,'Terminal B'),(3,60,'Terminal C'),(4,55,'Terminal D'),(5,30,'Cargo Area 1'),(6,25,'Cargo Area 2'),(7,20,'Maintenance Area 1'),(8,22,'Maintenance Area 2'),(9,15,'Hangar 1'),(10,20,'Hangar 2'),(11,18,'Private Jets Area 1'),(12,12,'Private Jets Area 2'),(13,10,'General Aviation Area 1'),(14,8,'General Aviation Area 2'),(15,40,'Remote Apron 1'),(16,30,'Remote Apron 2'),(17,35,'Remote Apron 3'),(18,28,'Remote Apron 4'),(19,5,'Sample Area 1'),(20,5,'Sample Area 2');
/*!40000 ALTER TABLE `airport_apron` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `corporation`
--

DROP TABLE IF EXISTS `corporation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `corporation` (
  `Name` varchar(50) NOT NULL,
  `Street` varchar(45) DEFAULT NULL,
  `City` varchar(45) DEFAULT NULL,
  `State` varchar(45) DEFAULT NULL,
  `Zip` varchar(45) DEFAULT NULL,
  `cphone_no` bigint DEFAULT NULL,
  `owner_id` int DEFAULT NULL,
  PRIMARY KEY (`Name`),
  KEY `1_idx` (`owner_id`),
  CONSTRAINT `3` FOREIGN KEY (`owner_id`) REFERENCES `owns` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corporation`
--

LOCK TABLES `corporation` WRITE;
/*!40000 ALTER TABLE `corporation` DISABLE KEYS */;
INSERT INTO `corporation` VALUES ('AeroPro Solutions','777 Walnut St','Atlanta','Georgia','22222',9999666222,8),('AirJet Innovations','555 Maple St','Miami','Florida','98765',9736736273,5),('AviationTech','456 Elm St','Los Angeles','California','67890',6785425367,2),('BlueSky Corp','123 Main St','New York City','New York','12345',7892456789,1),('Cloud Aviation','222 Birch St','Seattle','Washington','54321',3456434343,6),('FlyHigh Inc','333 Spruce St','Dallas','Texas','44444',3456789100,10),('Horizon Flights','999 Cedar St','Denver','Colorado','11111',6789654443,7),('Skyline Enterprises','789 Oak St','Chicago','Illinois','13579',8765678987,3),('Skyward Ventures','444 Ash St','Phoenix','Arizona','33333',7776665554,9),('Wings Unlimited','987 Pine St','Houston','Texas','24680',9807567890,4);
/*!40000 ALTER TABLE `corporation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Efname` varchar(20) DEFAULT NULL,
  `EMi` varchar(2) DEFAULT NULL,
  `Elname` varchar(20) DEFAULT NULL,
  `Salary` int DEFAULT NULL,
  `Essn` varchar(9) NOT NULL,
  `Esex` varchar(1) DEFAULT NULL,
  `Shift` varchar(10) DEFAULT NULL,
  `Eaddress` varchar(50) DEFAULT NULL,
  `Role` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Essn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('John','M','Doe',50000,'123456789','M','Day','123 Main St','Pilot'),('Michael','L','Wright',58000,'123456987','M','Day','444 Maple St','Traffic Controller'),('Ava','S','Anderson',52000,'123789456','F','Night','333 Spruce St','Technician'),('Sophia','D','Hill',65000,'159753753','F','Night','888 Ash St','Traffic Controller'),('William','R','Davis',54000,'159753852','M','Day','999 Cedar St','Technician'),('Mia',NULL,'Hall',54000,'321789654','F','Night','999 Birch St','Traffic Controller'),('Sophia','A','Jones',63000,'321987654','F','Night','222 Birch St','Technician'),('Olivia','M','Miller',58000,'357159852','F','Night','777 Walnut St','Technician'),('Olivia','N','King',62000,'357951852','F','Night','222 Walnut St','Traffic Controller'),('Michael',NULL,'Johnson',55000,'456789123','M','Day','789 Oak St','Pilot'),('Robert','D','Brown',58000,'654321987','M','Day','555 Maple St','Pilot'),('William','C','Thomas',61000,'654789321','M','Day','111 Oak St','Traffic Controller'),('Emily','L','Williams',52000,'789123456','F','Night','987 Pine St','Pilot'),('Aiden',NULL,'Green',53000,'789123789','M','Day','777 Spruce St','Traffic Controller'),('Michael','B','Lee',57000,'789456123','M','Day','888 Pine St','Technician'),('Alexander','S','Young',53000,'852369741','M','Day','555 Cedar St','Traffic Controller'),('James',NULL,'Wilson',61000,'852753951','M','Day','444 Ash St','Technician'),('Isabella','J','Scott',59000,'987456321','F','Night','777 Elm St','Technician'),('Jane','K','Smith',60000,'987654321','F','Night','456 Elm St','Pilot'),('Amelia','P','Baker',55000,'987654987','F','Night','333 Pine St','Traffic Controller');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owns`
--

DROP TABLE IF EXISTS `owns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owns` (
  `owner_id` int NOT NULL,
  `Registration_no` int DEFAULT NULL,
  `Purchase_date` date DEFAULT NULL,
  `type_of_owner` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`owner_id`),
  KEY `1_idx` (`Registration_no`),
  KEY `2_idx` (`owner_id`),
  CONSTRAINT `1` FOREIGN KEY (`Registration_no`) REFERENCES `airplane` (`Registration_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owns`
--

LOCK TABLES `owns` WRITE;
/*!40000 ALTER TABLE `owns` DISABLE KEYS */;
INSERT INTO `owns` VALUES (1,1001,'2023-07-01','corporation'),(2,1002,'2023-07-02','corporation'),(3,1003,'2023-07-03','corporation'),(4,1004,'2023-07-04','corporation'),(5,1005,'2023-07-05','corporation'),(6,1006,'2023-07-06','corporation'),(7,1007,'2023-07-07','corporation'),(8,1008,'2023-07-08','corporation'),(9,1009,'2023-07-09','corporation'),(10,1010,'2023-07-10','corporation'),(11,1011,'2023-07-11','person'),(12,1012,'2023-07-12','person'),(13,1013,'2023-07-13','person'),(14,1014,'2023-07-14','person'),(15,1015,'2023-07-15','person'),(16,1016,'2023-07-16','person'),(17,1017,'2023-07-17','person'),(18,1018,'2023-07-18','person'),(19,1019,'2023-07-19','person'),(20,1020,'2023-07-20','person');
/*!40000 ALTER TABLE `owns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `Ssn` varchar(9) NOT NULL,
  `Fname` varchar(45) DEFAULT NULL,
  `MI` varchar(45) DEFAULT NULL,
  `Lname` varchar(45) DEFAULT NULL,
  `Street` varchar(45) DEFAULT NULL,
  `State` varchar(45) DEFAULT NULL,
  `City` varchar(45) DEFAULT NULL,
  `Zip` varchar(45) DEFAULT NULL,
  `per_phone` bigint DEFAULT NULL,
  `owner_id` int DEFAULT NULL,
  PRIMARY KEY (`Ssn`),
  KEY `1_idx` (`owner_id`),
  CONSTRAINT `5` FOREIGN KEY (`owner_id`) REFERENCES `owns` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES ('000112222','Ava','S','Anderson','333 Spruce St','Arizona','Phoenix','85001',1237894560,20),('111223333','John','M','Doe','123 Main St','New York','New York City','10001',1234567890,11),('222334444','Jane','K','Smith','456 Elm St','California','Los Angeles','90001',9876543210,12),('333445555','Michael',NULL,'Johnson','789 Oak St','Texas','Houston','77001',4567891230,13),('444556666','Emily','L','Williams','987 Pine St','Florida','Miami','33101',7891234560,14),('555667777','Robert','D','Brown','555 Maple St','Illinois','Chicago','60601',6543219870,15),('666778888','Sophia','A','Jones','222 Birch St','Massachusetts','Boston','02101',3219876540,16),('777889999','William','R','Davis','999 Cedar St','Washington','Seattle','98101',1597538520,17),('888990000','Olivia','M','Miller','777 Walnut St','Colorado','Denver','80201',3571598520,18),('999001111','James',NULL,'Wilson','444 Ash St','Georgia','Atlanta','30301',8527539510,19);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pilot`
--

DROP TABLE IF EXISTS `pilot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pilot` (
  `Essn` varchar(9) DEFAULT NULL,
  `Pil_license` varchar(45) DEFAULT NULL,
  KEY `1_idx` (`Essn`),
  CONSTRAINT `6` FOREIGN KEY (`Essn`) REFERENCES `employee` (`Essn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pilot`
--

LOCK TABLES `pilot` WRITE;
/*!40000 ALTER TABLE `pilot` DISABLE KEYS */;
INSERT INTO `pilot` VALUES ('123456789','PL001'),('987654321','PL002'),('456789123','PL003'),('789123456','PL004'),('654321987','PL005');
/*!40000 ALTER TABLE `pilot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technician`
--

DROP TABLE IF EXISTS `technician`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technician` (
  `Area of expertise` varchar(20) DEFAULT NULL,
  `Essn` varchar(45) DEFAULT NULL,
  KEY `1_idx` (`Essn`),
  CONSTRAINT `7` FOREIGN KEY (`Essn`) REFERENCES `employee` (`Essn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technician`
--

LOCK TABLES `technician` WRITE;
/*!40000 ALTER TABLE `technician` DISABLE KEYS */;
INSERT INTO `technician` VALUES ('Avionics','321987654'),('Mechanical','159753852'),('Electrical','357159852'),('Avionics','852753951'),('Mechanical','123789456'),('Electrical','789456123'),('Avionics','987456321');
/*!40000 ALTER TABLE `technician` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traffic_controller`
--

DROP TABLE IF EXISTS `traffic_controller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `traffic_controller` (
  `Essn` varchar(9) DEFAULT NULL,
  `License` varchar(15) DEFAULT NULL,
  `TC_Experience` int DEFAULT NULL,
  KEY `1_idx` (`Essn`),
  CONSTRAINT `8` FOREIGN KEY (`Essn`) REFERENCES `employee` (`Essn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traffic_controller`
--

LOCK TABLES `traffic_controller` WRITE;
/*!40000 ALTER TABLE `traffic_controller` DISABLE KEYS */;
INSERT INTO `traffic_controller` VALUES ('654789321','TC001',3),('321789654','TC002',5),('852369741','TC003',7),('357951852','TC004',2),('123456987','TC005',6),('159753753','TC006',7),('789123789','TC007',2),('987654987','TC008',6);
/*!40000 ALTER TABLE `traffic_controller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_of_plane`
--

DROP TABLE IF EXISTS `type_of_plane`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_of_plane` (
  `Model` varchar(50) NOT NULL,
  `Capacity` int DEFAULT NULL,
  `Weight` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`Model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_of_plane`
--

LOCK TABLES `type_of_plane` WRITE;
/*!40000 ALTER TABLE `type_of_plane` DISABLE KEYS */;
INSERT INTO `type_of_plane` VALUES ('787',1223,123545.00),('Airbus A320',140,60.20),('Airbus A380',853,560.20),('Antonov An-225',1000,285.30),('Bell AH-1 Cobra',2,2.70),('Boeing 737',150,65.50),('Boeing 747',400,182.90),('Boeing 777',368,236.70),('Boeing 787 Dreamliner',296,227.90),('Bombardier Challenger 300',9,12.70),('Bombardier Global 7500',19,32.60),('Cessna 172',4,1.80),('Cessna Citation X',12,7.90),('Dassault Falcon 7X',16,25.40),('Embraer E175',78,30.80),('Embraer E190',114,35.20),('Gulfstream G650',18,27.50),('Lockheed C-130 Hercules',92,34.60),('Lockheed Martin F-35',1,13.10),('Piper PA-28 Cherokee',4,1.30),('Sikorsky UH-60 Black Hawk',11,5.30);
/*!40000 ALTER TABLE `type_of_plane` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `works_on`
--

DROP TABLE IF EXISTS `works_on`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `works_on` (
  `Essn` varchar(9) DEFAULT NULL,
  `Registration_no` int DEFAULT NULL,
  KEY `a_idx` (`Essn`),
  KEY `b_idx` (`Registration_no`),
  CONSTRAINT `11` FOREIGN KEY (`Essn`) REFERENCES `employee` (`Essn`),
  CONSTRAINT `12` FOREIGN KEY (`Registration_no`) REFERENCES `airplane` (`Registration_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `works_on`
--

LOCK TABLES `works_on` WRITE;
/*!40000 ALTER TABLE `works_on` DISABLE KEYS */;
INSERT INTO `works_on` VALUES ('123456789',1001),('321987654',1001),('357159852',1001),('159753852',1001),('654789321',1001),('987654321',1002),('159753852',1002),('789456123',1002),('852753951',1002),('321789654',1002),('852369741',1002),('789123456',1003),('456789123',1003),('357159852',1003),('987456321',1003),('123789456',1003),('123456987',1003);
/*!40000 ALTER TABLE `works_on` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-29 16:43:00

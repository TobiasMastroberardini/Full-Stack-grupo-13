
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,'2024-06-25 14:06:55'),(2,2,'2024-07-02 20:17:11'),(3,3,'2024-07-02 20:18:06'),(4,3,'2024-07-02 20:19:13'),(5,1,'2024-07-02 20:49:13'),(6,1,'2024-07-02 20:56:34'),(7,1,'2024-07-02 21:17:43'),(8,1,'2024-07-02 21:30:44'),(9,1,'2024-07-03 02:23:17'),(10,1,'2024-07-03 02:26:08');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


CREATE TABLE `cart_items` (
  `cart_items_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_items_id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,1,1,2,'2024-06-25 14:12:04'),(2,1,1,2,'2024-06-25 16:39:29'),(3,1,1,2,'2024-06-25 16:39:39'),(4,1,1,2,'2024-06-25 16:39:41'),(5,1,1,2,'2024-06-25 16:39:41'),(6,1,1,2,'2024-06-25 16:39:42'),(7,1,1,2,'2024-06-25 16:41:49'),(8,1,1,2,'2024-06-25 16:42:01'),(9,1,3,2,'2024-06-25 16:42:59'),(10,1,4,2,'2024-06-25 16:45:42'),(11,1,17,6,'2024-06-26 15:27:46'),(13,1,29,3,'2024-06-27 21:33:04'),(14,5,20,1,'2024-07-02 20:49:13'),(15,5,21,1,'2024-07-02 20:49:13'),(16,6,16,5,'2024-07-02 20:56:34'),(17,7,16,5,'2024-07-02 21:17:43'),(18,8,17,1,'2024-07-02 21:30:44'),(19,9,17,1,'2024-07-03 02:23:17'),(20,9,15,1,'2024-07-03 02:23:17'),(21,9,21,2,'2024-07-03 02:23:17'),(22,9,22,1,'2024-07-03 02:23:17'),(23,10,22,1,'2024-07-03 02:26:08'),(24,10,15,1,'2024-07-03 02:26:08'),(25,10,21,2,'2024-07-03 02:26:08'),(26,10,17,1,'2024-07-03 02:26:08');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;





CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `clearance` tinyint(1) DEFAULT '0',
  `quantity` int DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `openPackage` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (15,'Gomitas Fantasia',4100.00,'description 20','assets/img/gomitasfantasia.jpg',0,0,26,'url 20','Gomitas',3),(16,'Gomitas Yummi Moritas',3200.00,'','assets/img/yummimoritas.png',0,0,12,'url 19','gomitas',NULL),(17,'kinder Bueno',1400.00,'','assets/img/kinderbueno.png',1,0,42,'url 18','chocolates',NULL),(18,'Kinder Barra',1200.00,'','assets/img/kinderbarra.webp',0,0,25,'url17','chocolates',NULL),(19,'Alka strong',90.00,'description 16','assets/img/alkastrong.jpg',0,0,26,'url16','caramelos',NULL),(20,'Alka menta',2900.00,'','assets/img/alkamenta.png',0,0,46,'url15','caramelos',NULL),(21,'Butter Toffes Aguila',5000.00,'','assets/img/butteraguila.jpg',0,0,11,'url14','caramelos',NULL),(22,'Butter Toffes Blanco',5000.00,'','assets/img/butterblanco.jpg',0,0,12,'url13','caramelos',NULL),(23,'Blockazo 1 kilo',5000.00,'','assets/img/blockazo.webp',0,0,40,'url11','chocolates',NULL),(24,'Chocolate Arcor negro',500.00,'','assets/img/chocoarcornegro.jpg',1,0,54,'url10','chocolates',NULL),(25,'Chocolate Arcor blanco',580.00,'','assets/img/chocoarcorblanco.jpg',1,0,99,'url9','chocolates',NULL),(26,'Alfajor Guaymallen negro',290.00,'','assets/img/guaymallennegro.jpg',0,0,93,'url8','alfajores',NULL),(27,'Alfajor Guaymallen blanco',200.00,'','assets/img/guaymallenblanco.webp',1,0,46,'url7','alfajores',NULL),(28,'Alfajor Fulbito chocolate',130.00,'description 6','assets/img/fulbitochocolate.jpg',0,0,7,'url6','alfajores',NULL),(29,'Alfajor Fulbito mani',130.00,'','assets/img/fulbitomani.jpg',0,0,7,'url5','alfajores',NULL),(30,'Don Satur grasa',569.00,'','assets/img/donsaturgrasa.png',0,0,52,'url4','galletitas',NULL),(31,'Don Satur agridulce 200gr',569.00,'','assets/img/donsaturagridulce.png',0,0,52,'url3','galletitas',NULL),(32,'9 de oro agridulce 200gr',524.00,'','assets/img/9deoroagridulce.webp',0,0,52,'url2','galletitas',NULL),(33,'9 de oro clasico 200gr',524.00,'','assets/img/9deoroclasico.jpg',0,0,52,'url1','galletitas',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;





CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(512) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'Maria','Bertuzzi','02494552058','tmastroberardinibertuzzi@gmail.com','scrypt:32768:8:1$HO4F3zXVINE3FXr5$7174fed27fd080f829e349d9df9e8c0cf8d2f438d65db9c6e3274a5465e63942e921a0af43849abdbd71e4274d91f92847f46c88bf62adb3ac693093254999a0',0),(7,'prueba','prueba','1234','prueba@gmail.com','scrypt:32768:8:1$S8QhQIc8v89NkeIN$407ed0e8f93162fbe54fb5c17944b7ac98a99da2428445d46373ea7fe8fdbf09dfd89088e4f3506dcd759c424345f2cc8b969a5c397e21109d6687c5e81a2e6c',0),(8,'juan carlos','Mastroberardini','02494552058','juancarlos@gmail.com','scrypt:32768:8:1$tDVaohZcAbjvu0Mq$c04c3e9ead1d5030677fb74541b87f1674b1962ba3b095cc6972f5f3404d4de925caadc88025ac6915f270b4de916c06d49708764fdd289001fab058578a841f',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

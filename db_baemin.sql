-- -------------------------------------------------------------
-- TablePlus 6.1.2(568)
--
-- https://tableplus.com/
--
-- Database: db_baemin
-- Generation Time: 2024-10-12 04:22:14.9230
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `driver_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `vehicle_type` varchar(50) DEFAULT NULL,
  `license_plate` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `driver_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `menu_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurant_id` int DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT '1',
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`),
  CONSTRAINT `menu_items_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `menu_item_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `menu_item_id` (`menu_item_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `restaurant_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','preparing','delivering','completed','cancelled') DEFAULT 'pending',
  `delivery_address` varchar(255) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `restaurant_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `restaurant_name` varchar(100) NOT NULL,
  `cuisine_type` varchar(50) DEFAULT NULL,
  `opening_hours` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `restaurant_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `restaurants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `opening_hours` varchar(100) DEFAULT NULL,
  `is_partner` tinyint(1) DEFAULT '0',
  `image_url` varchar(255) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `restaurant_id` int DEFAULT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `user_type` enum('customer','restaurant','driver','admin') DEFAULT 'customer',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_user_location` (`latitude`,`longitude`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `categories` (`id`, `name`, `description`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 'Phở', 'Món phở truyền thống Việt Nam với nước dùng đậm đà và bánh phở mềm.', 'https://res.cloudinary.com/dx8xdfn9d/image/upload/v1728422380/uploads/d24exz4cv332gy53ghl6.jpg', '2024-10-11 20:07:13', '2024-10-11 20:45:35'),
(2, 'Bánh mì', 'Bánh mì kẹp thịt với nhiều loại nhân như pate, thịt nướng, và chả lụa.', 'https://res.cloudinary.com/dx8xdfn9d/image/upload/v1728422380/uploads/d24exz4cv332gy53ghl6.jpg', '2024-10-11 20:07:13', '2024-10-11 20:45:35'),
(3, 'Bún chả', 'Bún chả Hà Nội với thịt nướng và nước mắm pha chế tinh tế.', 'https://res.cloudinary.com/dx8xdfn9d/image/upload/v1728422380/uploads/d24exz4cv332gy53ghl6.jpg', '2024-10-11 20:07:13', '2024-10-11 20:45:35'),
(4, 'Gỏi cuốn', 'Gỏi cuốn tươi với tôm, thịt và rau sống, chấm kèm với nước mắm.', 'https://res.cloudinary.com/dx8xdfn9d/image/upload/v1728422380/uploads/d24exz4cv332gy53ghl6.jpg', '2024-10-11 20:07:13', '2024-10-11 20:45:35'),
(5, 'Cơm tấm', 'Cơm tấm sườn bì chả đặc trưng miền Nam với nước mắm chua ngọt.', 'https://res.cloudinary.com/dx8xdfn9d/image/upload/v1728418603/uploads/mi5slddlvamv5alkgvha.jpg', '2024-10-11 20:07:13', '2024-10-11 21:15:34');

INSERT INTO `users` (`id`, `username`, `email`, `password`, `phone_number`, `avatar`, `latitude`, `longitude`, `user_type`, `created_at`, `updated_at`) VALUES
(1, 'vinh', 'testUser@gmail.com', '$2b$10$LN1fkClLbftThFfAsnSpeuh4rAzj77YDi6FRZX6BmbQQioG8cld3C', NULL, NULL, NULL, NULL, 'customer', '2024-10-10 15:10:25', '2024-10-10 15:10:25'),
(2, 'john_doe', 'john@example.com', 'hashed_password1', '123456789', NULL, NULL, NULL, 'customer', '2024-10-10 15:12:08', '2024-10-10 15:12:08'),
(3, 'jane_smith', 'jane@example.com', 'hashed_password2', '987654321', NULL, NULL, NULL, 'customer', '2024-10-10 15:12:08', '2024-10-10 15:12:08'),
(4, 'alice_wong', 'alice@example.com', 'hashed_password3', '1122334455', NULL, NULL, NULL, 'customer', '2024-10-10 15:12:08', '2024-10-10 15:12:08'),
(5, 'bob_miller', 'bob@example.com', 'hashed_password4', '5566778899', NULL, NULL, NULL, 'customer', '2024-10-10 15:12:08', '2024-10-10 15:12:08'),
(6, 'charlie_brown', 'charlie@example.com', 'hashed_password5', '9988776655', NULL, NULL, NULL, 'customer', '2024-10-10 15:12:08', '2024-10-10 15:12:08'),
(7, '', '', '$2b$10$6y1smX5xIA7hoad3v24m.OQAsYdgaM5dnUmubU4flO1J603v0pT76', NULL, NULL, NULL, NULL, 'customer', '2024-10-10 18:51:22', '2024-10-10 18:51:22'),
(15, 'user', 'user@gmail.com', '$2b$10$3wcW0JyyayduChBg3yFejObi8DbtGC228s7mzQrx2ohxaWyJBBb5O', NULL, NULL, NULL, NULL, 'customer', '2024-10-11 20:01:18', '2024-10-11 20:01:18'),
(16, 'user2', 'user2@gmail.com', '$2b$10$bvLKlivG/qqkl5/q9/94DuHJ.djj9lD/moTZqY1oM9.CMhi6mm2w2', NULL, NULL, NULL, NULL, 'customer', '2024-10-11 20:01:55', '2024-10-11 20:01:55');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
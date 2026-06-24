-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2026 at 08:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oss`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image`, `created_at`) VALUES
(5, 'Electronics', 'Premium electronic devices including smartphones, laptops, headphones, smartwatches, and accessories designed for work, entertainment, and everyday life.', 'storage/uploads/categories/category_6a3a534d15dd71782207309.avif', '2026-06-23 09:33:54'),
(6, 'Fashion', 'Trendy and comfortable clothing for men and women, suitable for casual wear, formal occasions, and seasonal fashion.', 'storage/uploads/categories/category_6a3a549747b061782207639.jpg', '2026-06-23 09:40:39'),
(7, 'Shoes', 'High-quality footwear for sports, casual outings, formal events, and everyday comfort.', 'storage/uploads/categories/category_6a3a57487714b1782208328.webp', '2026-06-23 09:52:08');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','paid','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `phone`, `address`, `total_amount`, `status`, `created_at`) VALUES
(6, 3, '0618762134', 'Geed jaceyl, warta nabadda, mogadishu, somalia', 100.00, 'pending', '2026-06-24 05:38:21');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(6, 6, 6, 2, 50.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `description`, `price`, `stock`, `image`, `created_at`) VALUES
(4, 5, 'iPhone 15 Pro Max', 'Apple\'s flagship smartphone featuring a powerful processor, advanced cameras, and premium titanium design.', 1200.00, 50, 'storage/uploads/products/product_6a3a5578d429e1782207864.jpg', '2026-06-23 09:38:04'),
(5, 6, 'Men\'s Casual T-Shirt', 'Comfortable cotton t-shirt perfect for daily wear.', 15.00, 100, 'storage/uploads/products/product_6a3a55265cfc91782207782.jpg', '2026-06-23 09:43:02'),
(6, 7, 'Nike Air Max 270', 'Comfortable running shoes with responsive cushioning technology.', 50.00, 40, 'storage/uploads/products/product_6a3a5897719351782208663.jpg', '2026-06-23 09:57:43');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(3, 'customer'),
(2, 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `country` varchar(100) NOT NULL,
  `nationality` varchar(100) NOT NULL,
  `profile_image` varchar(255) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `full_name`, `email`, `password`, `gender`, `country`, `nationality`, `profile_image`, `status`, `created_at`) VALUES
(1, 3, 'John', 'mo@gmail.com', '', 'male', 'england', 'england', 'storage/uploads/profileImages/profile_6a34f62fe11931781855791.png', 'active', '2026-06-19 05:56:15'),
(2, 1, 'Mohamed', 'm@gmail.com', '$2y$10$eTnqZnedcMyH79E/aelfc.6mc3wa.jJ0fn0Fq.wcd1Y8KlSAH3FPe', 'male', 'Somalia', 'Somali', 'storage/uploads/defaults/male.jpg', 'active', '2026-06-19 06:40:18'),
(3, 1, 'Saciid ahmed Abdi', 'saciid@gmail.com', '$2y$10$IRFVY.iBbBQW.GfamTB7beK.fe4Z/4zlaFeBNMNLQlL7iP1iAHuI.', 'female', 'Somalia', 'Somali', 'storage/uploads/profileImages/profile_6a383f4d000e41782071117.jpg', 'active', '2026-06-19 08:10:46'),
(4, 3, 'Feysal', 'feysal@gmail.com', '$2y$10$9dJe4.H2UPNKBsaRZfQh6./HLLGM1/TNxjgjvwXDJg3eSh6Ioa4Zq', 'male', 'Somalia', 'Somali', 'storage/uploads/defaults/male.jpg', 'active', '2026-06-21 12:33:01'),
(5, 3, 'Deqa', 'deqa@gmail.com', '$2y$10$Xx9qwxoqWN7tbqsXYHbFbeuA/493xbEeqoUecW0ZB9Fkaz3akTFy6', 'female', 'somalia', 'somalia', 'storage/uploads/defaults/female.jpg', 'active', '2026-06-21 12:49:36'),
(6, 3, 'Jamac', 'jamac@gmail.com', '$2y$10$.0URLX/qcN60Gzs3YboXb.lRPc3nzIGid7krdK7clYBei3f3c7kSO', 'male', 'somalia', 'somali', 'storage/uploads/defaults/male.jpg', 'active', '2026-06-21 14:32:36'),
(7, 3, 'Sucad Abdirahman Jamac', 'sucad@gmail.com', '$2y$10$6a4DJ7APDjMG9ZrwYCLWmeo8iDWKTXeP5MjFDQ8oqlBSCv/4sL1fm', 'female', 'somalia', 'somali', 'storage/uploads/defaults/female.jpg', 'active', '2026-06-23 08:46:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

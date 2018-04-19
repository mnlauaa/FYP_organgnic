-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2018 at 12:56 AM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fyp_organgnic`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_logs`
--

CREATE TABLE `chat_logs` (
  `id` int(11) UNSIGNED NOT NULL,
  `sender_id` int(11) UNSIGNED DEFAULT NULL,
  `receiver_id` int(11) UNSIGNED DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `_read` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_logs`
--

INSERT INTO `chat_logs` (`id`, `sender_id`, `receiver_id`, `datetime`, `message`, `_read`, `active`) VALUES
(1, 2, 1, '2018-04-18 14:07:18', 'Welcome to the app', 1, 1),
(2, 3, 1, '2018-04-18 14:07:18', 'Welcome to the app 222', 1, 1),
(3, 1, 2, '2018-04-19 14:35:18', 'OK but what is that', 1, 1),
(4, 1, 3, '2018-04-19 19:07:18', 'OKOK what was that?', 1, 1),
(5, 2, 1, '2018-04-20 01:50:40', 'I don\'t know', 1, 1),
(6, 1, 2, '2018-04-20 01:52:22', 'WTF', 1, 1),
(7, 1, 2, '2018-04-20 01:52:38', 'OKOK', 1, 1),
(8, 1, 2, '2018-04-20 03:00:33', 'So What?', 1, 1),
(9, 1, 2, '2018-04-20 03:03:23', 'hello', 1, 1),
(10, 2, 1, '2018-04-20 03:06:16', 'please show', 1, 1),
(11, 2, 1, '2018-04-20 03:07:03', 'please show', 1, 1),
(12, 2, 1, '2018-04-20 03:08:22', 'please show', 1, 1),
(13, 2, 1, '2018-04-20 03:11:21', 'please show', 1, 1),
(14, 2, 1, '2018-04-20 03:20:48', '!!', 1, 1),
(15, 2, 1, '2018-04-20 03:21:11', '!!', 1, 1),
(16, 2, 1, '2018-04-20 03:21:30', '!!', 1, 1),
(17, 2, 1, '2018-04-20 03:22:10', '!!', 1, 1),
(18, 2, 1, '2018-04-20 03:22:42', '!!', 1, 1),
(19, 2, 1, '2018-04-20 03:23:32', '!!', 1, 1),
(20, 1, 2, '2018-04-20 03:43:20', '!!!', 1, 1),
(21, 1, 2, '2018-04-20 03:44:35', '!!!!', 1, 1),
(22, 1, 2, '2018-04-20 03:47:27', '!!!!!', 1, 1),
(23, 1, 2, '2018-04-20 03:48:46', 'aa', 1, 1),
(24, 1, 2, '2018-04-20 03:49:44', 'bbb', 1, 1),
(25, 1, 2, '2018-04-20 03:51:50', '111', 1, 1),
(26, 1, 2, '2018-04-20 03:57:25', 'ok', 1, 1),
(27, 1, 2, '2018-04-20 03:58:07', '123', 1, 1),
(28, 2, 1, '2018-04-20 04:01:17', 'Why you so good', 1, 1),
(29, 2, 1, '2018-04-20 04:52:27', 'Hi', 1, 1),
(30, 2, 1, '2018-04-20 04:53:12', '112', 1, 1),
(31, 2, 1, '2018-04-20 04:54:04', '100', 1, 1),
(32, 2, 1, '2018-04-20 04:54:51', 'Hi', 1, 1),
(33, 2, 1, '2018-04-20 04:55:27', '111', 1, 1),
(34, 2, 1, '2018-04-20 04:56:29', 'Ww', 1, 1),
(35, 2, 1, '2018-04-20 04:57:21', 'Ee', 1, 1),
(36, 2, 1, '2018-04-20 04:58:53', 'Ddd', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `farm_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`id`, `buyer_id`, `farm_id`, `amount`, `active`) VALUES
(1, 1, 2, 50, 1);

-- --------------------------------------------------------

--
-- Table structure for table `farms`
--

CREATE TABLE `farms` (
  `id` int(11) UNSIGNED NOT NULL,
  `seller_id` int(11) DEFAULT NULL,
  `about_intro` text,
  `banner_pic_url` varchar(500) DEFAULT NULL,
  `shipping_cost` float NOT NULL DEFAULT '0',
  `shipping_margin` float NOT NULL DEFAULT '0',
  `home_additional_cost` float NOT NULL DEFAULT '0',
  `bank_deposit_info` varchar(1000) DEFAULT NULL,
  `margin_on` tinyint(1) NOT NULL DEFAULT '1',
  `coupon_on` tinyint(1) NOT NULL DEFAULT '1',
  `home_on` tinyint(1) NOT NULL DEFAULT '1',
  `bank_deposit_on` tinyint(1) NOT NULL DEFAULT '1',
  `pay_after_on` tinyint(1) NOT NULL DEFAULT '1',
  `active` tinyint(1) UNSIGNED DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `farms`
--

INSERT INTO `farms` (`id`, `seller_id`, `about_intro`, `banner_pic_url`, `shipping_cost`, `shipping_margin`, `home_additional_cost`, `bank_deposit_info`, `margin_on`, `coupon_on`, `home_on`, `bank_deposit_on`, `pay_after_on`, `active`) VALUES
(1, 2, 'We persist to provide the best quality organic \r\nfood to you. Our farm mainly produce green\r\nvegetables, potato, tomato, and apple. \r\nSometimes, we offer our recommendation\r\npackage for those who can’t decide what to\r\neat too!', 'http://vml1wk037.cse.ust.hk:3000/user/banner-1523206819727.png', 20, 0, 0, 'ABC Bank account: 999-9999-9999 ', 0, 1, 1, 1, 1, 1),
(2, 3, NULL, NULL, 30, 400, 20, 'HSBC account: 123-456-789-000', 0, 0, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `farms_pickup`
--

CREATE TABLE `farms_pickup` (
  `id` int(11) NOT NULL,
  `farm_id` int(11) NOT NULL,
  `location` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `func_on` tinyint(1) NOT NULL DEFAULT '1',
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `farms_pickup`
--

INSERT INTO `farms_pickup` (`id`, `farm_id`, `location`, `func_on`, `active`) VALUES
(1, 2, 'MK', 1, 0),
(2, 2, 'Sham Shui Po MTR Station', 1, 1),
(4, 2, 'HKUST', 1, 1),
(5, 2, 'CCCU', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) UNSIGNED NOT NULL,
  `farm_id` int(11) UNSIGNED DEFAULT NULL,
  `buyer_id` int(11) UNSIGNED DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `favorite`
--

INSERT INTO `favorite` (`id`, `farm_id`, `buyer_id`, `active`) VALUES
(1, 2, 1, 1),
(2, 1, 1, 0),
(3, 1, 1, 0),
(4, 1, 1, 0),
(5, 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) UNSIGNED NOT NULL,
  `farm_id` int(11) UNSIGNED DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `title` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `image_url` varchar(500) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `farm_id`, `datetime`, `title`, `description`, `image_url`, `active`) VALUES
(1, 1, '2018-04-01 17:15:00', 'Potato buy one get one free', 'From 1/2/2017 to 1/3/2018, you may enjoy a buy one get one free on our potato!', 'http://www.valleyspuds.com/wp-content/uploads/Valley-Spuds-White-Kennebec-Potatoes.jpg', 1),
(2, 1, '2018-04-09 23:06:17', 'VISIT our tomato farm for 30% off!', 'From 10/4/2018 to 10/5/2018, we offer 30% off for our tomato farm tour. ', 'https://www.engineersaustralia.org.au/portal/sites/default/files/styles/highlight/public/ricardoes%20tomatoes%20pic.jpg?itok=CXsaHK9A', 1),
(3, 0, '2018-04-09 23:11:04', 'test', 'testing', 'null', 1),
(4, 0, '2018-04-09 23:13:09', 'test', 'testing', 'null', 1),
(6, 1, '2018-04-18 22:21:58', 'Sweet Potato have a 80% off until 20-04-2018!!', 'Just a Testing', 'http://www.valleyspuds.com/wp-content/uploads/Valley-Spuds-White-Kennebec-Potatoes.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_forms`
--

CREATE TABLE `order_forms` (
  `id` int(11) UNSIGNED NOT NULL,
  `farm_id` int(11) UNSIGNED DEFAULT NULL,
  `buyer_id` int(11) UNSIGNED DEFAULT NULL,
  `amount` float NOT NULL,
  `date` datetime DEFAULT NULL,
  `pickup_method` int(2) DEFAULT NULL,
  `pickup_location` varchar(1000) DEFAULT NULL,
  `payment_method` int(2) NOT NULL DEFAULT '0',
  `deposite_method` int(2) DEFAULT NULL,
  `receipt_url` varchar(500) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_forms`
--

INSERT INTO `order_forms` (`id`, `farm_id`, `buyer_id`, `amount`, `date`, `pickup_method`, `pickup_location`, `payment_method`, `deposite_method`, `receipt_url`, `status`, `active`) VALUES
(1, 1, 1, 110, '2018-04-18 13:33:35', 0, 'Home', 0, NULL, NULL, 6, 1),
(2, 1, 1, 1159, '2018-04-18 13:43:06', 0, 'Home', 1, 1, 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg', 6, 1),
(3, 1, 1, 65, '2018-04-18 00:49:35', 0, 'Home', 0, NULL, NULL, 1, 0),
(4, 2, 1, 70, '2018-04-19 03:03:47', 1, 'HKUST', 0, NULL, NULL, 1, 1),
(5, 1, 1, 75, '2018-04-19 16:42:24', 0, 'Home', 0, NULL, NULL, 1, 0),
(6, 1, 1, 75, '2018-04-20 05:27:15', 0, 'Home', 1, 1, NULL, 1, 1),
(7, 1, 1, 75, '2018-04-20 05:29:36', 0, 'Home', 0, NULL, NULL, 1, 0),
(8, 1, 1, 75, '2018-04-20 05:31:13', 0, 'Home', 0, NULL, NULL, 1, 1),
(9, 1, 1, 80, '2018-04-20 05:32:17', 0, 'Home', 0, NULL, NULL, 1, 1),
(10, 1, 1, 75, '2018-04-20 05:33:00', 0, 'Home', 0, NULL, NULL, 1, 1),
(11, 2, 1, 0, '2018-04-20 05:41:48', NULL, NULL, 0, NULL, NULL, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) UNSIGNED NOT NULL,
  `farm_id` int(11) UNSIGNED NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `classification` int(2) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `weight` int(11) DEFAULT NULL,
  `special_price` float DEFAULT NULL,
  `special_weight` float DEFAULT NULL,
  `special_expiry` date DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `rating_number` int(11) DEFAULT NULL,
  `last_update` date DEFAULT NULL,
  `image_url` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `farm_id`, `name`, `classification`, `qty`, `price`, `weight`, `special_price`, `special_weight`, `special_expiry`, `rating`, `rating_number`, `last_update`, `image_url`, `active`) VALUES
(1, 1, 'Russet Potato', 8, 5, 45, 600, NULL, NULL, NULL, 14.4, 3, '2018-04-01', 'http://www.valleyspuds.com/wp-content/uploads/Valley-Spuds-White-Kennebec-Potatoes.jpg', 1),
(2, 1, 'Strawberry', 2, 10, 60, 250, 0, 0, '2018-04-18', 27, 6, '2018-04-18', 'https://fruitguys.com/sites/default/files/05_2016_AskTFG_strawberries_iStock_000008841070_1800px.jpg', 1),
(3, 2, 'Purple Potato', 8, 5, 46, 400, 40, 400, '2018-05-15', 36, 8, '2018-04-15', 'https://s3-us-west-2.amazonaws.com/product-images-figbo/purple_potatoes.jpg', 1),
(6, 1, 'Apple', 2, 8, 55, 500, NULL, NULL, NULL, 25, 6, '2018-04-15', 'http://foodservice.treetop.com/Assets/Images/Products/Juice/bg/bg-apples-04.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) UNSIGNED NOT NULL,
  `farm_id` int(11) DEFAULT NULL,
  `buyer_id` int(11) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `comment` text CHARACTER SET utf8,
  `date` date DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `farm_id`, `buyer_id`, `rating`, `comment`, `date`, `active`) VALUES
(1, 1, 1, NULL, 'Test', '2018-04-19', 1),
(3, 1, 3, NULL, 'Other message', '2018-04-19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) UNSIGNED NOT NULL,
  `order_id` int(11) UNSIGNED DEFAULT NULL,
  `product_id` int(11) UNSIGNED DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `order_id`, `product_id`, `qty`, `rating`, `active`) VALUES
(1, 1, 1, 2, NULL, 1),
(2, 2, 1, 2, NULL, 1),
(3, 2, 2, 1, NULL, 1),
(4, 2, 6, 1, NULL, 1),
(5, 3, 1, 1, NULL, 1),
(6, 4, 3, 1, NULL, 1),
(7, 5, 6, 1, NULL, 1),
(8, 6, 6, 1, NULL, 1),
(9, 7, 6, 1, NULL, 1),
(10, 8, 6, 1, NULL, 1),
(11, 9, 2, 1, NULL, 1),
(12, 10, 6, 1, NULL, 1),
(13, 11, 3, 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `fb_id` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `display_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `phone_number` int(20) DEFAULT NULL,
  `address` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `liabilities` tinyint(1) NOT NULL DEFAULT '0',
  `profile_pic_url` varchar(500) DEFAULT NULL,
  `identity` int(1) NOT NULL,
  `iat` varchar(100) CHARACTER SET utf8 NOT NULL,
  `active` tinyint(1) UNSIGNED DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fb_id`, `display_name`, `phone_number`, `address`, `liabilities`, `profile_pic_url`, `identity`, `iat`, `active`) VALUES
(1, 'test', 'test', NULL, 'SamLau', 27893025, 'Home', 0, 'http://vml1wk037.cse.ust.hk:3000/user/icon-1523333815754.png', 0, '1524177940', 1),
(2, 'seller', 'seller', NULL, 'BiG FARM', 27999999, 'Big Road, Sai Kung, Hong Kong', 0, 'https://img.ashampoo.com/ashampoo.com_images/img/1/products/game0001/en/big-farm-logo-800x800.jpg', 1, '1524175227', 1),
(3, 'seller2', 'seller2', NULL, 'HEALITHY FARM', 23456789, 'Healthy Road, Tai Po, Hong Kong', 0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbTnrgUpDrZS3yblAZJnevdVJ-6wUZXavUTJEBz2gxKHJ9kXNZ', 1, '1523923415', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_logs`
--
ALTER TABLE `chat_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farms`
--
ALTER TABLE `farms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farms_pickup`
--
ALTER TABLE `farms_pickup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_forms`
--
ALTER TABLE `order_forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_logs`
--
ALTER TABLE `chat_logs`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `farms`
--
ALTER TABLE `farms`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `farms_pickup`
--
ALTER TABLE `farms_pickup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_forms`
--
ALTER TABLE `order_forms`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

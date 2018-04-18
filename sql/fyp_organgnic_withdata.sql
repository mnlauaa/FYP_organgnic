-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2018 at 04:47 AM
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
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 2, 'Hi, I need some thing here', 'http://vml1wk037.cse.ust.hk:3000/user/banner-1523206819727.png', 20, 0, 0, 'ABC Bank account: 999-9999-9999 ', 0, 1, 1, 1, 1, 1),
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
(1, 2, 1, 1);

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
(1, 1, '2018-04-01 17:15:00', 'Potato buy one get one free', 'From 1/2/2017 to 1/3/2018, you may enjoy a buy one get one free on our potato!', 'https://cdn1.medicalnewstoday.com/content/images/articles/280/280579/potatoes-can-be-healthful.jpg', 1),
(2, 1, '2018-04-09 23:06:17', 'test', 'testing', 'null', 1),
(3, 0, '2018-04-09 23:11:04', 'test', 'testing', 'null', 1),
(4, 0, '2018-04-09 23:13:09', 'test', 'testing', 'null', 1);

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
(1, 1, 1, 110, '2018-04-17 08:03:49', 0, 'Home', 0, NULL, NULL, 4, 1),
(2, 1, 1, 1159, '2018-04-17 08:49:28', 0, 'Home', 1, 1, NULL, 4, 1);

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
(1, 1, 'Potato', 8, 10, 45, 600, NULL, NULL, NULL, 14.4, 3, '2018-04-01', 'https://cdn1.medicalnewstoday.com/content/images/articles/280/280579/potatoes-can-be-healthful.jpg', 1),
(2, 1, 'Sweet Potato', 8, 3, 50, 300, NULL, NULL, NULL, 27, 6, '2018-04-02', 'https://www.burpee.com/dw/image/v2/ABAQ_PRD/on/demandware.static/-/Sites-masterCatalog_Burpee/default/dw367e7208/Images/Product%20Images/prod001584/prod001584.jpg?sw=322&sh=380&sm=fit', 1),
(3, 2, 'Purple Potato', 8, 5, 46, 400, 40, 400, '2018-05-15', 36, 8, '2018-04-15', 'http://www.pvmi.org/varieties/images/Purple%20Pelisse_c.jpg', 1),
(6, 1, 'rubbish', 5, 10, 999, 15, NULL, NULL, NULL, NULL, NULL, '2018-04-15', 'http://vml1wk037.cse.ust.hk:3000/product/product-1523729210578.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) UNSIGNED NOT NULL,
  `farm_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `comment` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `date` date DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(4, 2, 6, 1, NULL, 1);

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
(1, 'test', 'test', NULL, 'SamLau', 27893025, 'Home', 0, 'http://vml1wk037.cse.ust.hk:3000/user/icon-1523333815754.png', 0, '1523930411', 1),
(2, 'seller', 'seller', NULL, 'BiG FARM', 27999999, 'I don\'t know ', 0, 'http://vml1wk037.cse.ust.hk:3000/user/icon-1523206819727.png', 1, '1523930849', 1),
(3, 'seller2', 'seller2', NULL, 'HEALITHY FARM', 55555555, 'Hong Kong', 0, 'http://78.media.tumblr.com/21cab5fea7a46ff65a6ca559a2bcf77b/tumblr_owapvnemjP1v7o0xyo6_500.png', 1, '1523923415', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_logs`
--
ALTER TABLE `chat_logs`
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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_forms`
--
ALTER TABLE `order_forms`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

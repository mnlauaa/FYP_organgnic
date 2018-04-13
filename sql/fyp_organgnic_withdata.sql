-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- 主機: localhost
-- 產生時間： 2018 年 04 月 13 日 06:58
-- 伺服器版本: 10.1.31-MariaDB
-- PHP 版本： 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `fyp_organgnic`
--

-- --------------------------------------------------------

--
-- 資料表結構 `chat_logs`
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
-- 資料表結構 `farms`
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
-- 資料表的匯出資料 `farms`
--

INSERT INTO `farms` (`id`, `seller_id`, `about_intro`, `banner_pic_url`, `shipping_cost`, `shipping_margin`, `home_additional_cost`, `bank_deposit_info`, `margin_on`, `coupon_on`, `home_on`, `bank_deposit_on`, `pay_after_on`, `active`) VALUES
(1, 2, 'Hi, I need some thing here', 'http://vml1wk037.cse.ust.hk:3000/user/banner-1523206819727.png', 0, 0, 0, NULL, 1, 1, 1, 0, 1, 1),
(2, 3, NULL, NULL, 30, 400, 20, 'HSBC account: 123-456-789-000', 0, 0, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `farms_pickup`
--

CREATE TABLE `farms_pickup` (
  `id` int(11) NOT NULL,
  `farm_id` int(11) NOT NULL,
  `location` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `func_on` tinyint(1) NOT NULL DEFAULT '1',
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `farms_pickup`
--

INSERT INTO `farms_pickup` (`id`, `farm_id`, `location`, `func_on`, `active`) VALUES
(1, 2, 'MK', 1, 0),
(2, 2, 'Sham Shui Po MTR Station', 1, 1),
(4, 2, 'HKUST', 1, 1),
(5, 2, 'CCCU', 1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) UNSIGNED NOT NULL,
  `farm_id` int(11) UNSIGNED DEFAULT NULL,
  `buyer_id` int(11) UNSIGNED DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `favorite`
--

INSERT INTO `favorite` (`id`, `farm_id`, `buyer_id`, `active`) VALUES
(1, 2, 1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `news`
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
-- 資料表的匯出資料 `news`
--

INSERT INTO `news` (`id`, `farm_id`, `datetime`, `title`, `description`, `image_url`, `active`) VALUES
(1, 1, '2018-04-01 17:15:00', 'Potato buy one get one free', 'From 1/2/2017 to 1/3/2018, you may enjoy a buy one get one free on our potato!', 'https://cdn1.medicalnewstoday.com/content/images/articles/280/280579/potatoes-can-be-healthful.jpg', 1),
(2, 1, '2018-04-09 23:06:17', 'test', 'testing', 'null', 1),
(3, 0, '2018-04-09 23:11:04', 'test', 'testing', 'null', 1),
(4, 0, '2018-04-09 23:13:09', 'test', 'testing', 'null', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `order_forms`
--

CREATE TABLE `order_forms` (
  `id` int(11) UNSIGNED NOT NULL,
  `farm_id` int(11) UNSIGNED DEFAULT NULL,
  `buyer_id` int(11) UNSIGNED DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `order_forms`
--

INSERT INTO `order_forms` (`id`, `farm_id`, `buyer_id`, `date`, `status`, `active`) VALUES
(1, 1, 1, '2018-04-04', 0, 1),
(2, 2, 1, '2018-04-04', 0, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `products`
--

CREATE TABLE `products` (
  `id` int(11) UNSIGNED NOT NULL,
  `farm_id` int(11) UNSIGNED NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `classification` varchar(500) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `weight` int(11) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `rating_number` int(11) DEFAULT NULL,
  `last_update` date DEFAULT NULL,
  `image_url` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 資料表的匯出資料 `products`
--

INSERT INTO `products` (`id`, `farm_id`, `name`, `classification`, `qty`, `price`, `weight`, `rating`, `rating_number`, `last_update`, `image_url`, `active`) VALUES
(1, 1, 'Potato', 'Tubers', 10, 45, 600, 14.4, 3, '2018-04-01', 'https://cdn1.medicalnewstoday.com/content/images/articles/280/280579/potatoes-can-be-healthful.jpg', 1),
(2, 1, 'Sweet Potato', 'Tubers', 3, 50, 300, 27, 6, '2018-04-02', 'https://www.burpee.com/dw/image/v2/ABAQ_PRD/on/demandware.static/-/Sites-masterCatalog_Burpee/default/dw367e7208/Images/Product%20Images/prod001584/prod001584.jpg?sw=322&sh=380&sm=fit', 1),
(3, 2, 'Purple Potato', 'Tubers', 5, 46, 400, 36, 8, '2018-04-04', 'http://www.pvmi.org/varieties/images/Purple%20Pelisse_c.jpg', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `reviews`
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
-- 資料表結構 `transactions`
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
-- 資料表的匯出資料 `transactions`
--

INSERT INTO `transactions` (`id`, `order_id`, `product_id`, `qty`, `rating`, `active`) VALUES
(1, 1, 1, 1, NULL, 1),
(2, 1, 2, 2, NULL, 1),
(3, 2, 3, 1, NULL, 1),
(4, 2, 3, 1, NULL, 1),
(5, 1, 2, 1, NULL, 1),
(6, 2, 3, 2, NULL, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `users`
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
-- 資料表的匯出資料 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fb_id`, `display_name`, `phone_number`, `address`, `liabilities`, `profile_pic_url`, `identity`, `iat`, `active`) VALUES
(1, 'test', 'test', NULL, 'SamLau', 27893025, 'Home', 0, 'http://vml1wk037.cse.ust.hk:3000/user/icon-1523333815754.png', 0, '1523550336', 1),
(2, 'seller', 'seller', NULL, 'BiG FARM', 27999999, 'I don\'t know ', 0, 'http://vml1wk037.cse.ust.hk:3000/user/icon-1523206819727.png', 1, '1523590831', 1),
(3, 'seller2', 'seller2', NULL, 'HEALITHY FARM', 55555555, 'Hong Kong', 0, 'http://78.media.tumblr.com/21cab5fea7a46ff65a6ca559a2bcf77b/tumblr_owapvnemjP1v7o0xyo6_500.png', 1, '1523532265', 1);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `chat_logs`
--
ALTER TABLE `chat_logs`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `farms`
--
ALTER TABLE `farms`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `farms_pickup`
--
ALTER TABLE `farms_pickup`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `order_forms`
--
ALTER TABLE `order_forms`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `chat_logs`
--
ALTER TABLE `chat_logs`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `farms`
--
ALTER TABLE `farms`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表 AUTO_INCREMENT `farms_pickup`
--
ALTER TABLE `farms_pickup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表 AUTO_INCREMENT `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表 AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表 AUTO_INCREMENT `order_forms`
--
ALTER TABLE `order_forms`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表 AUTO_INCREMENT `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表 AUTO_INCREMENT `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 使用資料表 AUTO_INCREMENT `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

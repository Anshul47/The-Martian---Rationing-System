-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 23, 2020 at 05:58 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `martian`
--

-- --------------------------------------------------------

--
-- Table structure for table `supplies`
--

CREATE TABLE `supplies` (
  `sid` varchar(36) NOT NULL,
  `packet_id` varchar(36) NOT NULL,
  `packet_type` int(1) NOT NULL COMMENT '1 = Food, 2 = water',
  `packet_content` varchar(100) NOT NULL,
  `calories` int(11) NOT NULL,
  `expiry_date` date NOT NULL,
  `qty_in_litres` int(11) NOT NULL,
  `cdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `supplies`
--

INSERT INTO `supplies` (`sid`, `packet_id`, `packet_type`, `packet_content`, `calories`, `expiry_date`, `qty_in_litres`, `cdate`) VALUES
('137f205c-5578-11ea-8586-9a000c019a90', 'F8', 1, 'Chocolate', 500, '2020-02-29', 0, '2020-02-22 00:00:00'),
('17134a14-5563-11ea-8586-9a000c019a90', 'F4', 1, 'Rice', 1500, '2020-05-06', 0, '2020-02-22 00:00:00'),
('56daaebc-55ef-11ea-8586-9a000c019a90', 'F9', 1, 'Chips', 2500, '2020-02-29', 0, '2020-02-23 09:18:23'),
('69b996b6-5562-11ea-8586-9a000c019a90', 'F3', 1, 'Dry fruits', 1000, '2020-06-27', 0, '2020-02-22 00:00:00'),
('6c186cd6-55f6-11ea-8586-9a000c019a90', 'W1', 2, '', 0, '0000-00-00', 2, '2020-02-23 10:09:05'),
('70c1532e-55f6-11ea-8586-9a000c019a90', 'W2', 2, '', 0, '0000-00-00', 2, '2020-02-23 10:09:13'),
('74c0630c-55f6-11ea-8586-9a000c019a90', 'W3', 2, '', 0, '0000-00-00', 2, '2020-02-23 10:09:19'),
('784dc7da-55f6-11ea-8586-9a000c019a90', 'W4', 2, '', 0, '0000-00-00', 1, '2020-02-23 10:09:25'),
('7c26d8e2-55f6-11ea-8586-9a000c019a90', 'W5', 2, '', 0, '0000-00-00', 1, '2020-02-23 10:09:32'),
('7f1740ba-5582-11ea-8586-9a000c019a90', 'F2', 1, 'Protein Bar', 2000, '2020-06-06', 0, '2020-02-22 00:00:00'),
('851db51a-55f6-11ea-8586-9a000c019a90', 'W6', 2, '', 0, '0000-00-00', 2, '2020-02-23 10:09:47'),
('877f4f36-555f-11ea-8586-9a000c019a90', 'F1', 1, 'MRE', 1000, '2020-05-07', 0, '2020-02-22 00:00:00'),
('8932ba38-55f6-11ea-8586-9a000c019a90', 'W7', 2, '', 0, '0000-00-00', 2, '2020-02-23 10:09:54'),
('8ee3788c-55f6-11ea-8586-9a000c019a90', 'W9', 2, '', 0, '0000-00-00', 2, '2020-02-23 10:10:03'),
('9458aa42-5562-11ea-8586-9a000c019a90', 'F5', 1, 'Biscuits', 1000, '2020-12-31', 0, '2020-02-22 00:00:00'),
('d89e1106-55f3-11ea-8586-9a000c019a90', 'F11', 1, 'Chocolate', 700, '2020-02-29', 0, '2020-02-23 09:50:38'),
('e11b41c8-55f3-11ea-8586-9a000c019a90', 'F12', 1, 'Chocolate', 300, '2020-02-29', 0, '2020-02-23 09:50:53'),
('e832f080-55f0-11ea-8586-9a000c019a90', 'F10', 1, 'Chocolate', 500, '2020-02-29', 0, '2020-02-23 09:29:36'),
('ec3b2f14-55f3-11ea-8586-9a000c019a90', 'F13', 1, 'Chips', 300, '2020-02-29', 0, '2020-02-23 09:51:11'),
('f31ed196-5562-11ea-8586-9a000c019a90', 'F6', 1, 'Apple Pie', 1500, '2020-07-06', 0, '2020-02-22 00:00:00'),
('f31edede-5562-11ea-8586-9a000c019a90', 'F7', 1, 'MRE', 1000, '2020-03-07', 0, '2020-02-22 00:00:00'),
('f6160388-55f3-11ea-8586-9a000c019a90', 'F14', 1, 'Chocolate', 1200, '2020-02-29', 0, '2020-02-23 09:51:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `supplies`
--
ALTER TABLE `supplies`
  ADD PRIMARY KEY (`sid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

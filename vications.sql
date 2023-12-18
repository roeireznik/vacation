-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2023 at 05:36 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vications`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`id`, `userID`, `vacationID`) VALUES
(315, 18, 1),
(471, 17, 1),
(479, 17, 3),
(480, 17, 2),
(481, 17, 56),
(483, 17, 46),
(484, 17, 40);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first` varchar(30) NOT NULL,
  `last` varchar(30) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `password` int(100) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first`, `last`, `user_name`, `password`, `type`) VALUES
(17, 'roei', 'reznik', 'roeireznik@gmail.com', 12341234, 'user'),
(18, 'roei', 'reznik', 'client@codeglen.com', 12341234, ''),
(19, 'roei', 'reznik', 'roeireznik1@gmail.com', 12341234, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `id` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(400) NOT NULL,
  `picture` varchar(2300) NOT NULL,
  `start` date NOT NULL DEFAULT '1990-07-13',
  `end` date NOT NULL DEFAULT '1990-07-13',
  `price` int(11) NOT NULL,
  `followers` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`id`, `destination`, `description`, `picture`, `start`, `end`, `price`, `followers`) VALUES
(1, 'Toronto, Canada', '$33 per night for three-star accommodation\r\n\r\n', 'https://www.travelandleisure.com/thmb/xfIG8Q7KS0jhtx5w88X_6_7pGo0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/toronto-canada-downtown-BUDGETINTL0719-e540ca73bbc349ff8a3d93e5faeb23b8.jpg', '2023-12-12', '2023-12-17', 165, '2'),
(2, 'Grand Est, France', 'The area formerly known as Alsace (now officially part of the larger Grand Est region) is beloved by French travelers.89$ pair night.', 'https://www.travelandleisure.com/thmb/4f1CMWSMQlOz7yENPP2F1BpIRtc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/alsace-france-kaysersberg-BUDGETINTL0719-91ac0835cc2f4c489f2e38908528bb8d.jpg', '2023-12-14', '2023-12-20', 534, '1'),
(3, 'Armenia', 'Armenia attracts tourists with its rich arts scene, upscale shopping, and history museums packed with treasures.$90 per night.', 'https://www.travelandleisure.com/thmb/raEoXCM8zMPLttjPIEjoOEQoYiY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/armenia-khor-virap-monastery-BUDGETINTL0719-b025e6ed70d24971876c5e6d8c89870f.jpg', '2023-12-16', '2023-12-21', 450, '1'),
(40, 'Brisbane, Australia', 'The capital of Queensland on Australia\'s east coas', 'https://www.travelandleisure.com/thmb/553zHfyrgvC5tVat_NIH6XipsHs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/brisbane-australia-lone-pine-koala-sanctuary-BUDGETINTL0719-f5ee64be53e84596845565720886331d.jpg', '2023-11-17', '2023-11-22', 750, '1'),
(42, 'Brisbane, Australia', 'The capital of Queensland on Australia\'s east coas', 'https://www.travelandleisure.com/thmb/553zHfyrgvC5tVat_NIH6XipsHs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/brisbane-australia-lone-pine-koala-sanctuary-BUDGETINTL0719-f5ee64be53e84596845565720886331d.jpg', '2023-11-17', '2023-11-22', 750, '0'),
(43, 'Brisbane, Australia', 'The capital of Queensland on Australia\'s east coas', 'https://www.travelandleisure.com/thmb/553zHfyrgvC5tVat_NIH6XipsHs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/brisbane-australia-lone-pine-koala-sanctuary-BUDGETINTL0719-f5ee64be53e84596845565720886331d.jpg', '2023-11-17', '2023-11-22', 750, '0'),
(44, 'Brisbane, Australia', 'The capital of Queensland on Australia\'s east coas', 'https://www.travelandleisure.com/thmb/553zHfyrgvC5tVat_NIH6XipsHs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/brisbane-australia-lone-pine-koala-sanctuary-BUDGETINTL0719-f5ee64be53e84596845565720886331d.jpg', '2023-11-17', '2023-11-22', 750, '0'),
(45, 'Brisbane, Australia', 'The capital of Queensland on Australia\'s east coas', 'https://www.travelandleisure.com/thmb/553zHfyrgvC5tVat_NIH6XipsHs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/brisbane-australia-lone-pine-koala-sanctuary-BUDGETINTL0719-f5ee64be53e84596845565720886331d.jpg', '2023-11-17', '2023-11-22', 750, '0'),
(46, 'Brisbane, Australia', 'The capital of Queensland on Australia\'s east coas', 'https://www.travelandleisure.com/thmb/553zHfyrgvC5tVat_NIH6XipsHs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/brisbane-australia-lone-pine-koala-sanctuary-BUDGETINTL0719-f5ee64be53e84596845565720886331d.jpg', '2023-11-17', '2023-11-22', 750, '1'),
(56, 'Brisbane, Australia', 'The capital of Queensland on Australia\'s east coas', 'https://www.travelandleisure.com/thmb/553zHfyrgvC5tVat_NIH6XipsHs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/brisbane-australia-lone-pine-koala-sanctuary-BUDGETINTL0719-f5ee64be53e84596845565720886331d.jpg', '2023-11-10', '2023-11-20', 1500, '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `vacationID` (`vacationID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=485;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationID`) REFERENCES `vacation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

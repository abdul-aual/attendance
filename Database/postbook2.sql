-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2025 at 02:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `postbook2`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentId` int(11) NOT NULL,
  `commentOfPostId` int(11) NOT NULL,
  `commentedUserId` int(11) NOT NULL,
  `commentText` varchar(500) NOT NULL,
  `commentTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentId`, `commentOfPostId`, `commentedUserId`, `commentText`, `commentTime`) VALUES
(1, 1, 1002, 'tnx bro', '2025-07-23 19:15:42'),
(2, 1, 1001, 'are nursery. tomake to sei lagtese apu', '2025-07-23 19:18:25'),
(3, 2, 1002, 'library te manush jay poralekha korar jnno, tui gechis vondami korte?? akhno onk smy ache valo hoye ja', '2025-07-23 16:56:19'),
(5, 3, 1002, 'debdash vai amar(1)', '2025-07-23 17:15:04'),
(6, 3, 1002, 'debdash vai amr (2)', '2025-07-23 17:15:04');

-- --------------------------------------------------------

--
-- Table structure for table `ninephy`
--

CREATE TABLE `ninephy` (
  `attendance_id` int(11) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `roll` int(11) NOT NULL,
  `attendance_date` date NOT NULL,
  `status` enum('Present','Absent') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ninephy`
--

INSERT INTO `ninephy` (`attendance_id`, `student_name`, `roll`, `attendance_date`, `status`) VALUES
(991, 'Laila Hasan', 1, '2025-01-31', 'Absent'),
(992, 'Javed Khan', 2, '2025-01-31', 'Present'),
(993, 'Nadia Islam', 3, '2025-01-31', 'Present'),
(994, 'Shahriar Hossain', 4, '2025-01-31', 'Present'),
(995, 'Mumtaz Begum', 5, '2025-01-31', 'Present'),
(996, 'Fahim Chowdhury', 6, '2025-01-31', 'Present'),
(997, 'Sumona Akter', 7, '2025-01-31', 'Present'),
(998, 'Rashed Ahmed', 8, '2025-01-31', 'Present'),
(999, 'Marzia Rahman', 9, '2025-01-31', 'Present'),
(1000, 'Shuvo Islam', 10, '2025-01-31', 'Present'),
(1001, 'Nishat Jahan', 11, '2025-01-31', 'Present'),
(1002, 'Anwar Hossain', 12, '2025-01-31', 'Present'),
(1003, 'Sabrina Khatun', 13, '2025-01-31', 'Present'),
(1004, 'Rezaul Karim', 14, '2025-01-31', 'Present'),
(1005, 'Tania Akter', 15, '2025-01-31', 'Present'),
(1006, 'Farhan Ali', 16, '2025-01-31', 'Present'),
(1007, 'Shahnaz Begum', 17, '2025-01-31', 'Present'),
(1008, 'Jasim Uddin', 18, '2025-01-31', 'Present'),
(1009, 'Mina Rahman', 19, '2025-01-31', 'Present'),
(1010, 'Imtiaz Khan', 20, '2025-01-31', 'Present'),
(1011, 'Sultana Begum', 21, '2025-01-31', 'Present'),
(1012, 'Rafiqul Islam', 22, '2025-01-31', 'Present'),
(1013, 'Lubna Akter', 23, '2025-01-31', 'Present'),
(1014, 'Habib Ullah', 24, '2025-01-31', 'Present'),
(1015, 'Nusrat Jahan', 25, '2025-01-31', 'Present'),
(1016, 'Mohi Uddin', 26, '2025-01-31', 'Present'),
(1017, 'Rina Akter', 27, '2025-01-31', 'Present'),
(1018, 'Mamun Hossain', 28, '2025-01-31', 'Present'),
(1019, 'Sadia Khatun', 29, '2025-01-31', 'Present'),
(1020, 'Sabbir Ahmed', 30, '2025-01-31', 'Absent'),
(1021, 'Laila Hasan', 1, '2025-01-30', 'Absent'),
(1022, 'Javed Khan', 2, '2025-01-30', 'Absent'),
(1023, 'Nadia Islam', 3, '2025-01-30', 'Absent'),
(1024, 'Shahriar Hossain', 4, '2025-01-30', 'Absent'),
(1025, 'Mumtaz Begum', 5, '2025-01-30', 'Absent'),
(1026, 'Fahim Chowdhury', 6, '2025-01-30', 'Absent'),
(1027, 'Sumona Akter', 7, '2025-01-30', 'Absent'),
(1028, 'Rashed Ahmed', 8, '2025-01-30', 'Absent'),
(1029, 'Marzia Rahman', 9, '2025-01-30', 'Present'),
(1030, 'Shuvo Islam', 10, '2025-01-30', 'Present'),
(1031, 'Nishat Jahan', 11, '2025-01-30', 'Present'),
(1032, 'Anwar Hossain', 12, '2025-01-30', 'Present'),
(1033, 'Sabrina Khatun', 13, '2025-01-30', 'Present'),
(1034, 'Rezaul Karim', 14, '2025-01-30', 'Present'),
(1035, 'Tania Akter', 15, '2025-01-30', 'Present'),
(1036, 'Farhan Ali', 16, '2025-01-30', 'Present'),
(1037, 'Shahnaz Begum', 17, '2025-01-30', 'Present'),
(1038, 'Jasim Uddin', 18, '2025-01-30', 'Present'),
(1039, 'Mina Rahman', 19, '2025-01-30', 'Present'),
(1040, 'Imtiaz Khan', 20, '2025-01-30', 'Present'),
(1041, 'Sultana Begum', 21, '2025-01-30', 'Present'),
(1042, 'Rafiqul Islam', 22, '2025-01-30', 'Present'),
(1043, 'Lubna Akter', 23, '2025-01-30', 'Present'),
(1044, 'Habib Ullah', 24, '2025-01-30', 'Present'),
(1045, 'Nusrat Jahan', 25, '2025-01-30', 'Present'),
(1046, 'Mohi Uddin', 26, '2025-01-30', 'Present'),
(1047, 'Rina Akter', 27, '2025-01-30', 'Present'),
(1048, 'Mamun Hossain', 28, '2025-01-30', 'Present'),
(1049, 'Sadia Khatun', 29, '2025-01-30', 'Present'),
(1050, 'Sabbir Ahmed', 30, '2025-01-30', 'Present');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postId` int(11) NOT NULL,
  `postedUserId` int(11) NOT NULL,
  `postedTime` datetime NOT NULL,
  `postText` varchar(500) NOT NULL,
  `postImageUrl` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`postId`, `postedUserId`, `postedTime`, `postText`, `postImageUrl`) VALUES
(1, 1002, '2025-07-23 19:07:13', 'This is my picture', 'https://img.drz.lazcdn.com/static/bd/p/81351159f9ef7c95f582a8ec5646adfd.jpg_720x720q80.jpg'),
(2, 1001, '2025-07-23 17:10:40', 'this is my varsity Library', 'https://i.ibb.co/CKNRkrRp/WIN-20240306-13-33-43-Pro.jpg'),
(3, 1001, '2025-07-23 17:16:21', 'hangzhou masjid', 'https://i.ibb.co/B77dH1G/WIN-20241109-12-00-36-Pro.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `roll` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `gender` varchar(7) NOT NULL,
  `academic_year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `name`, `roll`, `class`, `gender`, `academic_year`) VALUES
(1030, 'Laila Hasan', 1, 9, 'F', 2025),
(1031, 'Javed Khan', 2, 9, 'M', 2025),
(1032, 'Nadia Islam', 3, 9, 'F', 2025),
(1033, 'Shahriar Hossain', 4, 9, 'M', 2025),
(1034, 'Mumtaz Begum', 5, 9, 'F', 2025),
(1035, 'Fahim Chowdhury', 6, 9, 'M', 2025),
(1036, 'Sumona Akter', 7, 9, 'F', 2025),
(1037, 'Rashed Ahmed', 8, 9, 'M', 2025),
(1038, 'Marzia Rahman', 9, 9, 'F', 2025),
(1039, 'Shuvo Islam', 10, 9, 'M', 2025),
(1040, 'Nishat Jahan', 11, 9, 'F', 2025),
(1041, 'Anwar Hossain', 12, 9, 'M', 2025),
(1042, 'Sabrina Khatun', 13, 9, 'F', 2025),
(1043, 'Rezaul Karim', 14, 9, 'M', 2025),
(1044, 'Tania Akter', 15, 9, 'F', 2025),
(1045, 'Farhan Ali', 16, 9, 'M', 2025),
(1046, 'Shahnaz Begum', 17, 9, 'F', 2025),
(1047, 'Jasim Uddin', 18, 9, 'M', 2025),
(1048, 'Mina Rahman', 19, 9, 'F', 2025),
(1049, 'Imtiaz Khan', 20, 9, 'M', 2025),
(1050, 'Sultana Begum', 21, 9, 'F', 2025),
(1051, 'Rafiqul Islam', 22, 9, 'M', 2025),
(1052, 'Lubna Akter', 23, 9, 'F', 2025),
(1053, 'Habib Ullah', 24, 9, 'M', 2025),
(1054, 'Nusrat Jahan', 25, 9, 'F', 2025),
(1055, 'Mohi Uddin', 26, 9, 'M', 2025),
(1056, 'Rina Akter', 27, 9, 'F', 2025),
(1057, 'Mamun Hossain', 28, 9, 'M', 2025),
(1058, 'Sadia Khatun', 29, 9, 'F', 2025),
(1059, 'Sabbir Ahmed', 30, 9, 'M', 2025),
(1060, 'Nabila Hasan', 1, 10, 'F', 2025),
(1061, 'Farid Uddin', 2, 10, 'M', 2025),
(1062, 'Sabina Khatun', 3, 10, 'F', 2025),
(1063, 'Monir Hossain', 4, 10, 'M', 2025),
(1064, 'Shamima Akter', 5, 10, 'F', 2025),
(1065, 'Zakir Hossain', 6, 10, 'M', 2025),
(1066, 'Moushumi Begum', 7, 10, 'F', 2025),
(1067, 'Raju Islam', 8, 10, 'M', 2025),
(1068, 'Rita Sultana', 9, 10, 'F', 2025),
(1069, 'Hasan Ali', 10, 10, 'M', 2025),
(1070, 'Sumaiya Begum', 11, 10, 'F', 2025),
(1071, 'Imran Hossain', 12, 10, 'M', 2025),
(1072, 'Nafisa Rahman', 13, 10, 'F', 2025),
(1073, 'Arif Chowdhury', 14, 10, 'M', 2025),
(1074, 'Rokeya Begum', 15, 10, 'F', 2025),
(1075, 'Jamil Uddin', 16, 10, 'M', 2025),
(1076, 'Nusrat Jahan', 17, 10, 'F', 2025),
(1077, 'Sabbir Hossain', 18, 10, 'M', 2025),
(1078, 'Tania Islam', 19, 10, 'F', 2025),
(1079, 'Saiful Alam', 20, 10, 'M', 2025),
(1080, 'Rina Khatun', 21, 10, 'F', 2025),
(1081, 'Kamal Hossain', 22, 10, 'M', 2025),
(1082, 'Salma Akter', 23, 10, 'F', 2025),
(1083, 'Rashed Uddin', 24, 10, 'M', 2025),
(1084, 'Sabina Rahman', 25, 10, 'F', 2025),
(1085, 'Faruk Hossain', 26, 10, 'M', 2025),
(1086, 'Maya Khatun', 27, 10, 'F', 2025),
(1087, 'Imtiaz Alam', 28, 10, 'M', 2025),
(1088, 'Nusrat Begum', 29, 10, 'F', 2025),
(1089, 'Habib Uddin', 30, 10, 'M', 2025),
(1090, 'Sumaiya Khatun', 31, 10, 'F', 2025),
(1091, 'Rafiq Ahmed', 32, 10, 'M', 2025),
(1092, 'Sadia Rahman', 33, 10, 'F', 2025),
(1093, 'Fahim Chowdhury', 34, 10, 'M', 2025),
(1094, 'Rina Begum', 35, 10, 'F', 2025),
(1095, 'Javed Hossain', 36, 10, 'M', 2025),
(1096, 'Anika Rahman', 37, 10, 'F', 2025),
(1097, 'Nazmul Islam', 38, 10, 'M', 2025),
(1098, 'Mina Akter', 39, 10, 'F', 2025),
(1099, 'Sabbir Uddin', 40, 10, 'M', 2025),
(1101, 'Bob Smith', 2, 32, 'Male', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_code` varchar(50) NOT NULL,
  `subject_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_code`, `subject_name`) VALUES
('CHEM91', 'Chemistry'),
('GM101', 'General Math'),
('PHY101', 'Physics'),
('PHY91', 'Physics');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_subject`
--

CREATE TABLE `teacher_subject` (
  `userId` int(11) NOT NULL,
  `subject_code` varchar(20) NOT NULL,
  `class` int(11) DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_subject`
--

INSERT INTO `teacher_subject` (`userId`, `subject_code`, `class`, `subject`) VALUES
(1001, 'CHEM91', 9, 'Chemistry'),
(1001, 'GM101', 10, 'General Math'),
(1002, 'PHY101', 10, 'Physics'),
(1002, 'PHY91', 9, 'Physics');

-- --------------------------------------------------------

--
-- Table structure for table `tenphy`
--

CREATE TABLE `tenphy` (
  `attendance_id` int(11) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `roll` int(11) NOT NULL,
  `attendance_date` date NOT NULL,
  `status` enum('Present','Absent') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tenphy`
--

INSERT INTO `tenphy` (`attendance_id`, `student_name`, `roll`, `attendance_date`, `status`) VALUES
(41, 'Nabila Hasan', 1, '2025-06-01', 'Absent'),
(42, 'Farid Uddin', 2, '2025-06-01', 'Present'),
(43, 'Sabina Khatun', 3, '2025-06-01', 'Present'),
(44, 'Monir Hossain', 4, '2025-06-01', 'Present'),
(45, 'Shamima Akter', 5, '2025-06-01', 'Present'),
(46, 'Zakir Hossain', 6, '2025-06-01', 'Present'),
(47, 'Moushumi Begum', 7, '2025-06-01', 'Present'),
(48, 'Raju Islam', 8, '2025-06-01', 'Present'),
(49, 'Rita Sultana', 9, '2025-06-01', 'Present'),
(50, 'Hasan Ali', 10, '2025-06-01', 'Present'),
(51, 'Sumaiya Begum', 11, '2025-06-01', 'Present'),
(52, 'Imran Hossain', 12, '2025-06-01', 'Present'),
(53, 'Nafisa Rahman', 13, '2025-06-01', 'Present'),
(54, 'Arif Chowdhury', 14, '2025-06-01', 'Present'),
(55, 'Rokeya Begum', 15, '2025-06-01', 'Present'),
(56, 'Jamil Uddin', 16, '2025-06-01', 'Present'),
(57, 'Nusrat Jahan', 17, '2025-06-01', 'Present'),
(58, 'Sabbir Hossain', 18, '2025-06-01', 'Present'),
(59, 'Tania Islam', 19, '2025-06-01', 'Present'),
(60, 'Saiful Alam', 20, '2025-06-01', 'Present'),
(61, 'Rina Khatun', 21, '2025-06-01', 'Present'),
(62, 'Kamal Hossain', 22, '2025-06-01', 'Present'),
(63, 'Salma Akter', 23, '2025-06-01', 'Present'),
(64, 'Rashed Uddin', 24, '2025-06-01', 'Present'),
(65, 'Sabina Rahman', 25, '2025-06-01', 'Present'),
(66, 'Faruk Hossain', 26, '2025-06-01', 'Present'),
(67, 'Maya Khatun', 27, '2025-06-01', 'Present'),
(68, 'Imtiaz Alam', 28, '2025-06-01', 'Present'),
(69, 'Nusrat Begum', 29, '2025-06-01', 'Present'),
(70, 'Habib Uddin', 30, '2025-06-01', 'Present'),
(71, 'Sumaiya Khatun', 31, '2025-06-01', 'Present'),
(72, 'Rafiq Ahmed', 32, '2025-06-01', 'Present'),
(73, 'Sadia Rahman', 33, '2025-06-01', 'Present'),
(74, 'Fahim Chowdhury', 34, '2025-06-01', 'Present'),
(75, 'Rina Begum', 35, '2025-06-01', 'Absent'),
(76, 'Javed Hossain', 36, '2025-06-01', 'Absent'),
(77, 'Anika Rahman', 37, '2025-06-01', 'Absent'),
(78, 'Nazmul Islam', 38, '2025-06-01', 'Absent'),
(79, 'Mina Akter', 39, '2025-06-01', 'Present'),
(80, 'Sabbir Uddin', 40, '2025-06-01', 'Absent');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userImage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userPassword`, `userImage`) VALUES
(1001, 'Abdul Awal', 'kaka1', 'https://i.ibb.co/B77dH1G/WIN-20241109-12-00-36-Pro.jpg'),
(1002, 'Hafizur Rahman Khan', 'kaka2', 'https://img.drz.lazcdn.com/static/bd/p/81351159f9ef7c95f582a8ec5646adfd.jpg_720x720q80.jpg'),
(1006, 'azad kalam', 'azad', 'https://i.ibb.co/B77dH1G/WIN-20241109-12-00-36-Pro.jpg'),
(1007, 'azad kalam', '12', 'https://i.ibb.co/B77dH1G/WIN-20241109-12-00-36-Pro.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentId`);

--
-- Indexes for table `ninephy`
--
ALTER TABLE `ninephy`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postId`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_code`);

--
-- Indexes for table `teacher_subject`
--
ALTER TABLE `teacher_subject`
  ADD PRIMARY KEY (`userId`,`subject_code`),
  ADD KEY `subject_code` (`subject_code`);

--
-- Indexes for table `tenphy`
--
ALTER TABLE `tenphy`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ninephy`
--
ALTER TABLE `ninephy`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1051;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1103;

--
-- AUTO_INCREMENT for table `tenphy`
--
ALTER TABLE `tenphy`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1008;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `teacher_subject`
--
ALTER TABLE `teacher_subject`
  ADD CONSTRAINT `teacher_subject_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `teacher_subject_ibfk_2` FOREIGN KEY (`subject_code`) REFERENCES `subjects` (`subject_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

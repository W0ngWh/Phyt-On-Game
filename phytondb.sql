-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 11, 2024 at 03:39 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phytondb`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `answer_text` varchar(255) NOT NULL,
  `answer_bool` int NOT NULL,
  `question_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `answer_text`, `answer_bool`, `question_id`) VALUES
(1, 'def', 1, 1),
(2, 'func', 0, 1),
(3, 'function', 0, 1),
(4, 'None', 1, 2),
(5, 'int', 0, 2),
(6, 'True', 0, 2),
(7, 'comma (,)', 1, 3),
(8, 'colon (:)', 0, 3),
(9, 'semicolon (;)', 0, 3),
(10, 'global', 1, 4),
(11, 'outer', 0, 4),
(12, 'static', 0, 4),
(13, 'Using tuples', 1, 5),
(14, 'Using lists', 0, 5),
(15, 'Using dictionaries', 0, 5),
(16, 'lambda x: x + 2', 1, 6),
(17, 'def lambda(x): x + 2', 0, 6),
(18, 'lambda(x) => x + 2', 0, 6),
(19, 'A function that wraps another function', 1, 7),
(20, 'A function that multiplies inputs', 0, 7),
(21, 'By reference for mutable objects, by value for immutable objects', 1, 8),
(22, 'Always by reference', 0, 8),
(23, 'Always by value', 0, 8),
(24, 'eval', 1, 9),
(25, 'exec', 0, 9),
(26, 'lambda', 0, 9),
(27, 'def my_function():', 1, 10),
(28, 'function my_function():', 0, 10),
(29, 'create my_function():', 0, 10),
(30, 'define my_function():', 0, 10),
(31, 'None', 1, 11),
(32, '0', 0, 11),
(33, 'False', 0, 11),
(34, 'Empty string', 0, 11),
(35, 'my_function()', 1, 12),
(36, 'call my_function', 0, 12),
(37, 'execute my_function()', 0, 12),
(38, 'my_function(call)', 0, 12),
(39, 'To send a result back to the caller', 1, 13),
(40, 'To define a function', 0, 13),
(41, 'To print output', 0, 13),
(42, 'To receive input', 0, 13),
(43, 'By assigning them in the function header', 1, 14),
(44, 'By specifying them when calling the function', 0, 14),
(45, 'By defining them outside the function', 0, 14),
(46, 'Using the \"global\" keyword', 0, 14),
(47, 'A small anonymous function', 1, 15),
(48, 'A function with a single argument', 0, 15),
(49, 'A function that returns True or False', 0, 15),
(50, 'A named function', 0, 15),
(51, 'Allows a function to accept variable number of arguments', 1, 16),
(52, 'Creates a list of arguments', 0, 16),
(53, 'Forces all arguments to be integers', 0, 16),
(54, 'Makes arguments optional', 0, 16),
(55, 'By using nested function syntax', 1, 17),
(56, 'Using the keyword \"inner\"', 0, 17),
(57, 'Using the \"with\" statement', 0, 17),
(58, 'It is not possible in Python', 0, 17),
(59, 'Positional arguments are based on order; keyword arguments are based on name', 1, 18),
(60, 'Keyword arguments are faster than positional', 0, 18),
(61, 'They are always the same', 0, 18),
(62, 'Keyword arguments can only be strings', 0, 18),
(63, 'def', 1, 19),
(64, 'function', 0, 19),
(65, 'func', 0, 19),
(66, 'start', 0, 19),
(67, '2cool', 1, 20),
(68, 'my_function', 0, 20),
(69, 'function_2', 0, 20),
(70, '_hidden_function', 0, 20),
(71, 'None', 1, 21),
(72, '0', 0, 21),
(73, 'example()', 0, 21),
(74, 'Error', 0, 21),
(75, 'A function that calls itself', 1, 22),
(76, 'A function with no parameters', 0, 22),
(77, 'A function that returns None', 0, 22),
(78, 'A function defined with the \"global\" keyword', 0, 22),
(79, 'Only the first return statement will execute', 1, 23),
(80, 'All return statements will execute', 0, 23),
(81, 'The function will cause an error', 0, 23),
(82, 'The function will execute only the last return statement', 0, 23),
(83, 'By assigning default values in the function definition', 1, 24),
(84, 'By adding \"optional\" before the parameter name', 0, 24),
(85, 'By using a list for parameters', 0, 24),
(86, 'Using a global variable', 0, 24),
(87, 'Allows a function to accept a variable number of keyword arguments', 1, 25),
(88, 'Makes arguments optional', 0, 25),
(89, 'Only allows string arguments', 0, 25),
(90, 'Forces arguments to be named', 0, 25),
(91, 'A function that remembers the state of its enclosing scope', 1, 26),
(92, 'A function with no arguments', 0, 26),
(93, 'A lambda function', 0, 26),
(94, 'A function inside a class', 0, 26),
(95, '@classmethod', 1, 27),
(96, '@staticmethod', 0, 27),
(97, '@property', 0, 27),
(98, '@funcmethod', 0, 27);

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

DROP TABLE IF EXISTS `leaderboard`;
CREATE TABLE IF NOT EXISTS `leaderboard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `score` int NOT NULL,
  `difficulty` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `leaderboard`
--

INSERT INTO `leaderboard` (`id`, `username`, `score`, `difficulty`) VALUES
(29, 'tenzix', 700, 'hard'),
(24, 'Roboute Rizzalot', 900, 'easy'),
(38, 'Wong', 800, 'easy'),
(39, 'Testing', 900, 'easy');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `difficulty` varchar(20) NOT NULL,
  `question_text` varchar(255) NOT NULL,
  `question_answer_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `difficulty`, `question_text`, `question_answer_id`) VALUES
(1, 'easy', 'What keyword is used to define a function in Python?', '1'),
(2, 'easy', 'What is the default return type of a function in Python if no return statement is specified?', '4'),
(3, 'easy', 'What symbol is used to separate parameters in a function definition?', '7'),
(4, 'medium', 'Which keyword allows a function to use a variable from the outer scope?', '10'),
(5, 'medium', 'How can a function return multiple values in Python?', '13'),
(6, 'medium', 'Which of the following is an example of a lambda function?', '15'),
(7, 'hard', 'What is a decorator in Python?', '18'),
(8, 'hard', 'How does Python handle arguments passed by reference vs by value in functions?', '21'),
(9, 'hard', 'Which built-in function can dynamically invoke a function in Python by its name?', '24'),
(10, 'easy', 'Which of these statements correctly defines a function?', '27'),
(11, 'easy', 'What does a function return if there is no return statement?', '31'),
(12, 'easy', 'How do you call a function named \"my_function\" in Python?', '35'),
(13, 'medium', 'What is the purpose of the \"return\" keyword in a function?', '39'),
(14, 'medium', 'How can you pass default values to function parameters?', '43'),
(15, 'medium', 'What is a lambda function?', '47'),
(16, 'hard', 'What does *args do in a function?', '51'),
(17, 'hard', 'How can you define a function inside another function?', '55'),
(18, 'hard', 'What is the difference between positional and keyword arguments?', '59'),
(19, 'easy', 'What symbol is used to indicate the start of a function in Python?', '63'),
(20, 'easy', 'Which of these is NOT a valid function name in Python?', '67'),
(21, 'easy', 'What is the output of the following code? def example(): pass; print(example())', '71'),
(22, 'medium', 'Which of these is an example of a recursive function?', '75'),
(23, 'medium', 'What will happen if a function has multiple return statements?', '79'),
(24, 'medium', 'How can you define a function with optional parameters?', '83'),
(25, 'hard', 'What does **kwargs do in a function?', '87'),
(26, 'hard', 'What is a closure in Python?', '91'),
(27, 'hard', 'Which of the following decorators is used to make a method a class method?', '95');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(40) NOT NULL,
  `password` varchar(15) NOT NULL,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`) VALUES
(1, 'celes@gmail.com', 'Celes123!', 'Celes'),
(2, 'Test@gmail.com', 'Testing12@', 'Testing'),
(3, 'Maggot@gmail.com', 'Maggot', 'Maggot'),
(4, 'Dubi@gmail.com', 'Dubi', 'Dubi'),
(5, 'Mikok@gmail.com', 'Maikusee', 'Roboute Rizzalot'),
(8, 'tristenchris@gmail.com', 'tris', 'tenzix'),
(9, 'Sus@gmail.com', '1', 'Sus'),
(10, 'Nebur@gmail.com', 'sus', 'Sus'),
(11, 'Wong@gmail.com', 'Wong', 'Wong'),
(12, 'nigga@gmail.com', 'NIGGA', 'NIGGA');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

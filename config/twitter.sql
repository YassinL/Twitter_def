-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Ven 05 Juin 2020 à 16:02
-- Version du serveur :  5.7.30-0ubuntu0.18.04.1
-- Version de PHP :  7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `twitter`
--
CREATE DATABASE IF NOT EXISTS `twitter` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `twitter`;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `content` varchar(140) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `messages`
--

INSERT INTO `messages` (`id`, `content`, `created_at`, `id_user`) VALUES
(61, 'Hello', '2020-06-03 16:17:20', 13),
(62, 'Hello', '2020-06-03 16:26:06', 17),
(63, 'Hello', '2020-06-03 16:32:08', 12),
(64, 'Hello', '2020-06-03 16:32:28', 14),
(65, 'Hello', '2020-06-03 16:32:44', 16),
(66, 'Bonjour je m\'appelle Jack Sparrow et je suis un pirate #cool et #bogoss', '2020-06-03 17:07:17', 16),
(67, 'Je me suis fait douiller par twitter ils ont perdus la carte au trésor #douille #fatigué #trésor #carte', '2020-06-03 17:08:32', 16),
(68, 'HI !!', '2020-06-03 18:10:38', 13),
(69, 'Hello', '2020-06-04 11:00:46', 16),
(70, 'ZBEUB ZBEUB', '2020-06-04 11:18:12', 12);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('jU9ZCHgAIEvZPyarNiuQhJT0MWPkXSra', 1591440631, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` int(10) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id_user`, `first_name`, `last_name`, `birthday`, `city`, `email`, `telephone`, `username`, `password`, `picture`) VALUES
(12, 'Lucas', 'Beneston', '2020-06-01', 'Paris', 'luca@beneston.com', 678765654, 'lucasB', '$2b$10$ARA85fPUteriFxfLEjXKUOyy2xxTrl4m6THxrgdOfh7XYDkTNb3Ke', 'https://pyxis.nymag.com/v1/imgs/812/37c/876d83b544f78a187b456a1b412504b1e6-Johnny-Depp-.rsquare.w700.jpg'),
(13, 'Yassin', 'Leclercq', '2020-06-02', 'Paris', 'yassin@leclercq.com', 678787900, 'yassin', '$2b$10$Dgzj.B8IFaLCft1TV6AbUegFROTFUmOD5MVNfyMq31gUUn8l1APr.', 'https://lutinbazar.fr/wp-content/uploads/2012/04/hercule.png'),
(14, 'Chloe', 'Dargelez', '2020-06-04', 'Paris', 'chloe@dargelez', 909090909, 'Chloe', '$2b$10$pJYUuF1GNdXO/TkXEOzUh.LsTzGMWPdtfvw80m7elZ60L3qF2FyBe', 'https://assets.afcdn.com/story/20190716/2016267_w767h767c1cx963cy443cxt0cyt0cxb1686cyb1000.jpg/360/height/450?cb=20200210172336&path-prefix=fr'),
(16, 'Jack', 'Sparrow', '2020-06-01', 'Tortuga', 'jack@sparrow', 606060606, 'Jack', '$2b$10$jCw/7Sghb0PAtHL.rQbl8eCwowAd8pA/KncGDiGEpt0g9OPSR6ZQa', 'https://celebrityaccess.com/wp-content/uploads/2018/12/pirates.jpg'),
(17, 'Samira', 'Tajik', '2020-06-18', 'Paris', 'samira@taijk.com', 789898999, 'Samira', '$2b$10$l5KWmJIBzC2CpjEinB1DyOxOOEhrZ0q2StW634FdqzNxbtjUajz6.', 'https://p0.storage.canalblog.com/08/87/183178/103776913_o.jpg'),
(18, 'Twitter', 'tweet', '2020-06-22', 'Montrouge', 'twitter@tweet.com', 637383939, 'Twitter', '$2b$10$rDNld5UkIquI3Mjh8vVOf.0.GxDokCX9A6YTiN.FTUm544anRKf5a', '1200px-Twitter_Bird.svg.png');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

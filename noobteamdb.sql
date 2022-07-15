-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 14 Lip 2022, 21:49
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `noobteamdb`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `characters`
--

CREATE TABLE `characters` (
  `userId` varchar(36) NOT NULL,
  `accountId` varchar(56) DEFAULT NULL,
  `profileIconId` int(11) DEFAULT NULL,
  `revisionDate` int(11) NOT NULL DEFAULT 0,
  `name` varchar(30) NOT NULL,
  `id` varchar(63) DEFAULT NULL,
  `puuid` varchar(78) NOT NULL,
  `summonerLevel` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `characters`
--

INSERT INTO `characters` (`userId`, `accountId`, `profileIconId`, `revisionDate`, `name`, `id`, `puuid`, `summonerLevel`) VALUES
('d49e4c49-b0f6-41a5-9d5f-9a10981c4cbb', 'xojjpQ8EmV8dJBEd3OVFJKpK9sLXOP6WJMcZva6517DPOA', 4763, 2147483647, 'Punman', 'tsMvqGZWtdx_oY6McIWratxP6FeqhP-FNyN5U1Ly0yWV_b4', 'aBnjvvPz1xoYLAvQwoAlbzOD3iyOcPkIWncY4i-EgOJthF4Zjd1fJo3AKnqD3u054y44TpBJlbcrkQ', 291);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `userId` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(20) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`userId`, `name`, `password`, `email`, `createdAt`) VALUES
('94e8503e-2097-4b59-bd3f-c1ff1eaa4f0c', 'Gracz Artur', '$2b$10$ymvJuOWLlWAWdIcczmaqE.LbFKWQZmRb6aklkP.G5Otmo/0F2SG6a', 'haslo@o2.pl', '2022-06-26'),
('d49e4c49-b0f6-41a5-9d5f-9a10981c4cbb', 'Konto testowe, mam nadzieję, że rekruter ;)', '$2b$10$dJ3G.Re98UoObplpCSafm.Prxb.Wccy3nYqIyStTN23W7tHLEcO2G', 'test@test.pl', '2022-07-13');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `characters`
--
ALTER TABLE `characters`
  ADD KEY `userId` (`userId`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `characters`
--
ALTER TABLE `characters`
  ADD CONSTRAINT `characters_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

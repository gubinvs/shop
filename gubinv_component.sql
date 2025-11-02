-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Окт 05 2025 г., 14:06
-- Версия сервера: 5.7.21-20-beget-5.7.21-20-1-log
-- Версия PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `gubinv_component`
--

-- --------------------------------------------------------

--
-- Структура таблицы `goods_table`
--
-- Создание: Мар 17 2025 г., 08:14
-- Последнее обновление: Окт 01 2025 г., 10:19
--

DROP TABLE IF EXISTS `goods_table`;
CREATE TABLE `goods_table` (
  `id` int(11) NOT NULL,
  `imgLinkPage` text NOT NULL,
  `vendorCode` text NOT NULL,
  `nameComponent` text NOT NULL,
  `manufacturer` text NOT NULL,
  `quantity` int(8) NOT NULL,
  `deliveryТime` int(2) NOT NULL,
  `price` int(8) NOT NULL,
  `bestseller` int(1) NOT NULL,
  `chapter` text NOT NULL,
  `linkPage` text NOT NULL,
  `guid` text NOT NULL,
  `basketImgPath` text NOT NULL,
  `imgLinkIconCard` text NOT NULL,
  `productDescription` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `goods_table`
--

INSERT INTO `goods_table` (`id`, `imgLinkPage`, `vendorCode`, `nameComponent`, `manufacturer`, `quantity`, `deliveryТime`, `price`, `bestseller`, `chapter`, `linkPage`, `guid`, `basketImgPath`, `imgLinkIconCard`, `productDescription`) VALUES
(8, 'https://encomponent.ru/img/img-product/PUGVNG-115B%D0%A1-200/PUGVNG-115B%D0%A1-200_img_page.jpg', 'PUGVNG-115BС-200', 'Провод ПуВнг(A)-LS 1x1,5 мм² Черный в коробке по 200 метров', 'Цветлит', 0, 1, 2800, 0, 'Клеммы и провода', 'https://encomponent.ru/comp-page/vendorCode_PUGVNG115B%D0%A1-200_page.php', 'f78eebea-788c-4880-9c62-94313ffb2bd1', 'https://encomponent.ru/img/img-product/PUGVNG-115B%D0%A1-200/PUGVNG-115B%D0%A1-200_img_card.jpg', 'https://encomponent.ru/img/img-product/PUGVNG-115B%D0%A1-200/PUGVNG-115B%D0%A1-200_img_card.jpg', 'Провода'),
(9, 'https://encomponent.ru/img/img-product/PUGVNG-115RC-200/PUGVNG-115RC-200_img_page.jpg', 'PUGVNG-115RC-200', 'Провод ПуВнг(A)-LS 1x1,5 мм² Красный в коробке по 200 метров', 'Цветлит', 0, 1, 2800, 0, 'Клеммы и провода', 'https://encomponent.ru/comp-page/vendorCode_PUGVNG-115RC-200_page.php', '1ff01f94-a296-43a3-8e25-ee4a5147acfa', 'https://encomponent.ru/img/img-product/PUGVNG-115RC-200/PUGVNG-115RC-200_img_page.png', 'https://encomponent.ru/img/img-product/PUGVNG-115R%D0%A1-200/PUGVNG-115R%D0%A1-200_img_card.jpg', 'Провода'),
(10, 'https://encomponent.ru/img/img-product/PUGVNG-115BLUEC-200/PUGVNG-115BLUEC-200_img_page.jpg', 'PUGVNG-115BLUEC-200', 'Провод ПуВнг(A)-LS 1x1,5 мм² Синий в коробке по 200 метров', 'Цветлит', 0, 1, 2800, 0, 'Клеммы и провода', 'https://encomponent.ru/comp-page/vendorCode_PUGVNG-115BLUEC-200_page.php', '7719a5d3-25ea-493f-b44a-2e2124e2df1b', 'https://encomponent.ru/img/img-product/PUGVNG-115BLUEC-200/PUGVNG-115BLUEC-200_img_card.jpg', 'https://encomponent.ru/img/img-product/PUGVNG-115BLUEC-200/PUGVNG-115BLUEC-200_img_card.jpg', 'Провода'),
(11, 'https://encomponent.ru/img/img-product/PUGVNG-115YC-200/PUGVNG-115YC-200_img_page.jpg', 'PUGVNG-115YC-200', 'Провод силовой ПуГВ нг(А)-LS 1х1,5 Желто-зеленый в коробке по 200 метров', 'Цветлит', 0, 1, 2800, 0, 'Клеммы и провода', 'https://encomponent.ru/comp-page/vendorCode_PUGVNG-115YC-200_page.php', 'ba771934-b97d-447f-9830-8127407490ab', 'https://encomponent.ru/img/img-product/PUGVNG-115YC-200/PUGVNG-115YC-200_img_card.jpg', 'https://encomponent.ru/img/img-product/PUGVNG-115YC-200/PUGVNG-115YC-200_img_card.jpg', 'Провода'),
(12, 'https://encomponent.ru/img/img-product/PUGVNG-115WC-200/PUGVNG-115WC-200_img_page.jpg', 'PUGVNG-115WC-200', 'Провод силовой ПуГВ нг(А)-LS 1х1,5 Белый в коробке по 200 метров', 'Цветлит', 0, 1, 2800, 0, 'Клеммы и провода', 'https://encomponent.ru/comp-page/vendorCode_PUGVNG-115WC-200_page.php', 'dc5d9da9-74fc-40cb-92d4-76dc390da920', 'https://encomponent.ru/img/img-product/PUGVNG-115WC-200/PUGVNG-115WC-200_img_card.jpg', 'https://encomponent.ru/img/img-product/PUGVNG-115WC-200/PUGVNG-115WC-200_img_card.jpg', 'Провода'),

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `goods_table`
--
ALTER TABLE `goods_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `goods_table`
--
ALTER TABLE `goods_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

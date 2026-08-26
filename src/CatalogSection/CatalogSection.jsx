import React from 'react';
import "./catalogSection.css";
import Header from '../Header/Header';
import HeaderGuest from "../Header/HeaderGuest.jsx";
import {jsonCartTest} from "../js/jsonCartTest.js";
import CardComponetGroopLocalData from "../CardComponetGroop/CardComponetGroopLocalData.jsx";
import Footer from '../Footer/Footer.jsx';
import GroupOfCards from '../GroupOfCards/GroupOfCards.jsx';

const CatalogSection = ({nomenclature}) => {
  // Определяем название каталога
  const chapter = new URLSearchParams(window.location.search).get("chapter");
  const newChapter = chapter === "Модульные автоматы" ? "Модульное оборудование" : chapter;

  // Проверка авторизации пользователя
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  // Фильтруеммассив по принадлежности товара к каталогу
  const cardDataSort = jsonCartTest.filter(item => item.chapter === chapter);
  

  
  return (
    <>
      {/* ----- Хэдер в зависимости от авторизации ----- */}
      {!isAuthenticated ? <HeaderGuest /> : <Header />}

      {/*--- Карточки товара ----*/}
      <GroupOfCards cardData={cardDataSort} />
    </>
  );
};


export default CatalogSection;
import React from 'react';
import "./catalogSection.css";
import Header from '../Header/Header';
import HeaderGuest from "../Header/HeaderGuest.jsx";
import {jsonCartTest} from "../js/jsonCartTest.js";
import GroupOfCards from '../GroupOfCards/GroupOfCards.jsx';
import NewDirectoryGroupsMin from "../Home/NewDirectoryGroupsMin.jsx";

const CatalogSection = ({nomenclature}) => {
  // Определяем название каталога
  const chapter = new URLSearchParams(window.location.search).get("chapter");

  // Проверка авторизации пользователя
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  // Фильтруеммассив по принадлежности товара к каталогу
  const cardDataSort = jsonCartTest.filter(item => item.chapter === chapter);
  

  
  return (
    <>
      {/* ----- Хэдер в зависимости от авторизации ----- */}
      {!isAuthenticated ? <HeaderGuest /> : <Header />}

      {/* ---- Маленькие карточки каталога ---- */}
      <NewDirectoryGroupsMin />

      {/*--- Карточки товара ----*/}
      <GroupOfCards cardData={cardDataSort} />
    </>
  );
};


export default CatalogSection;
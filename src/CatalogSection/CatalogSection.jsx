import { useState, useEffect } from 'react';
import {jsonDataCardProduct} from "../js/jsonDataCardProduct.js";
import "./catalogSection.css";
import Header from '../Header/Header';
import HeaderGuest from "../Header/HeaderGuest.jsx";
import GroupOfCards from '../GroupOfCards/GroupOfCards.jsx';
import NewDirectoryGroupsMin from "../DirectoryGroups/NewDirectoryGroupsMin.jsx";
import NewFooter from '../Footer/NewFooter.jsx';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

const CatalogSection = ({nomenclature}) => {
  // Определяем название каталога
  const chapter = new URLSearchParams(window.location.search).get("chapter");
  // Если заходим по адресу страницы с поисковиков и для ботов, достаем из адреса каталог
  // if(chapter === undefined || chapter === null) {chapter = };

  // Проверка авторизации пользователя
  const isAuthenticated = localStorage.getItem('token') !== null;

      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
  
      useEffect(() => {
          // 2. Вызываем асинхронную функцию внутри useEffect
          jsonDataCardProduct()
              .then(data => {
                  setProducts(data);
                  setLoading(false);
              })
              .catch(error => {
                  console.error("Ошибка при загрузке:", error);
                  setLoading(false);
              });
      }, []);
  
      if (loading) return <LoadingSpinner />;
  
  // Фильтруеммассив по принадлежности товара к каталогу
  const cardDataSort = products.filter(item => item.Chapter === chapter);
  
  return (
    <>
      {/* ----- Хэдер в зависимости от авторизации ----- */}
      {!isAuthenticated ? <HeaderGuest /> : <Header />}

      {/* ---- Маленькие карточки каталога ---- */}
      <NewDirectoryGroupsMin />

      {/*--- Карточки товара ----*/}
      <GroupOfCards cardData={cardDataSort} />

      <NewFooter/>
    </>
  );
};


export default CatalogSection;
import React from 'react';
import Header from '../Header/Header.jsx';
import HeaderGuest from '../Header/HeaderGuest.jsx'
import './home.css';
import GroupOfCards from '../GroupOfCards/GroupOfCards.jsx';
import NewDirectoryGroupsMin from './NewDirectoryGroupsMin.jsx';
import {jsonCartTest} from "../js/jsonCartTest.js";


const Home = () => {
    // Проверка авторизации пользователя для выдачи хэдера
    const isAuthenticated = localStorage.getItem('token') !== null;

    return (
        <>
            {/* ----- Хэдер в зависимости от авторизации ----- */}
            {!isAuthenticated ? <HeaderGuest /> : <Header />}

            {/* ---- Маленькие карточки каталога ---- */}
            <NewDirectoryGroupsMin />

            {/*--- Карточки товара ----*/}
            <GroupOfCards cardData={jsonCartTest} />

        </> 
    );
};

export default Home;    
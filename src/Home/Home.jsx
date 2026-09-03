import {jsonCartTest} from "../js/jsonCartTest.js";



import React from 'react';
import Header from '../Header/Header.jsx';
import HeaderGuest from '../Header/HeaderGuest.jsx'
import './home.css';
import GroupOfCards from '../GroupOfCards/GroupOfCards.jsx';
import NewDirectoryGroupsMin from './NewDirectoryGroupsMin.jsx';
import DeliverySection from "../DeliveryAndPayment/DeliverySection.jsx";


const Home = () => {
    // Проверка авторизации пользователя для выдачи хэдера
    const isAuthenticated = localStorage.getItem('token') !== null;

    return (
        <>
            {/* ----- Хэдер в зависимости от авторизации ----- */}
            {!isAuthenticated ? <HeaderGuest /> : <Header />}

            {/* ---- Маленькие карточки каталога ---- */}
            <NewDirectoryGroupsMin />

            {/*--- Карточки товара, количество выдаваемых карточек ограничивается передаваемым параметром quantityCart  ----*/}
            <GroupOfCards cardData={jsonCartTest} quantityCart={20} />

            {/* -- Информация о доставке */}
            <DeliverySection />

        </> 
    );
};

export default Home;    
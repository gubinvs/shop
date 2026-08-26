import React from 'react';
import Header from '../Header/Header.jsx';
import HeaderGuest from '../Header/HeaderGuest.jsx'
import './home.css';
import NewDirectoryGroups from "./NewDirectoryGroups.jsx";
import CardComponetGroop from "../CardComponetGroop/CardComponetGroop.jsx";
import Footer from "../Footer/Footer.jsx";
import CardComponent from '../CardComponent/CardComponent.jsx';
import GroupOfCards from '../GroupOfCards/GroupOfCards.jsx';
import NewDirectoryGroupsMin from './NewDirectoryGroupsMin.jsx';
import {jsonCartTest} from "../js/jsonCartTest.js";


const Home = () => {
    // Простейший стейт для проверки авторизации
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
import React from 'react';
import { useState } from "react";
import DirectoryGroups from "../Home/DirectoryGroups.jsx";
import Header from '../Header/Header';
import HeaderGuest from '../Header/HeaderGuest';
import CardComponetGroop from "../CardComponetGroop/CardComponetGroop.jsx";
import Footer from '../Footer/Footer.jsx';


const CatalogSection = () => {
    // Получаем группу товара из строки запроса
    const chapter = new URLSearchParams(window.location.search).get("chapter");

    const newChapter = chapter == "Модульные автоматы"? "Модульное оборудование" : chapter;

    // Простейший стейт для проверки авторизации
    const isAuthenticated = localStorage.getItem('token') !== null;


    return (
        <>
            {isAuthenticated ? <Header /> : <HeaderGuest />} 
            <DirectoryGroups />
            <CardComponetGroop h2={newChapter} api={"/api/CatalogSectionSearchItem/" + chapter} />
            <Footer />
        </>
    )

};

export default CatalogSection;
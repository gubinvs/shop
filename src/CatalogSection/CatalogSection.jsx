import React from 'react';
// import { useState } from "react";
import DirectoryGroups from "../Home/DirectoryGroups.jsx";
import Header from '../Header/Header';
// import HeaderGuest from '../Header/HeaderGuest';
// import CardComponetGroop from "../CardComponetGroop/CardComponetGroop.jsx";
import CardComponetGroopLocalData from "../CardComponetGroop/CardComponetGroop.jsx";

import Footer from '../Footer/Footer.jsx';


const CatalogSection = ({nomenclature}) => {
    // Получаем группу товара из строки запроса
    const chapter = new URLSearchParams(window.location.search).get("chapter");

    const newChapter = chapter === "Модульные автоматы"? "Модульное оборудование" : chapter;

    // Простейший стейт для проверки авторизации
    // const isAuthenticated = localStorage.getItem('token') !== null;
    if (!nomenclature || nomenclature.length === 0) {
        return <div>Загрузка товаров...</div>;
    }
console.log("CatalogSection"+nomenclature)
    return (
        <>
            {/* {isAuthenticated ? <Header /> : <HeaderGuest />}  */}
            <Header />
            <DirectoryGroups />
            {/* <CardComponetGroop h2={newChapter} api={"/api/CatalogSectionSearchItem/" + chapter} /> */}
            <CardComponetGroopLocalData h2={newChapter} nomenclature={nomenclature}/>
            <Footer />
        </>
    )

};

export default CatalogSection;
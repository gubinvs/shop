import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApiUrl from '../js/ApiUrl.js';
import HeaderGuest from '../Header/HeaderGuest.jsx';
import Header from '../Header/Header.jsx';
import './Home.css';
import HomeMainSection from "./HomeMainSection.jsx";
import DirectoryGroups from "./DirectoryGroups.jsx";
import CardComponetGroop from "../CardComponetGroop/CardComponetGroop.jsx";
import AvailableForOrder from "./AvailableForOrder.jsx";
import Footer from "../Footer/Footer.jsx"


const Home = () => {
    // Простейший стейт для проверки авторизации
    const isAuthenticated = localStorage.getItem('token') !== null;
    const cardItem = [{
        id: 1,
        imgLinkIconCard: "https://encomponent.ru/img/img-product/TM241CE40T/TM241CE40T_big_1920.jpg",
        vendorСode: "TM241CE40T",
        nameComponent: "Контроллер M241-40IO транзисторный источник ETHERNET",
        quantity: 2,
        linkPage: "https://encomponent.ru/comp-page/vendorCode_TM241CE40T_page.phphttps://encomponent.ru/comp-page/vendorCode_TM241CE40T_page.php",
        price: 22000,
        basketImgPath: "https://encomponent.ru/img/img-product/TM241CE40T/TM241CE40T_basket_icon.jpg",
        guidId: "kldjas",
        bestseller: 1
    }];

    // Загрузим всю базу данных номенклатуры
        useEffect(() => {
        fetch(ApiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
           
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
        {/* Если не авторизован выводим шапку для гостя */}
            {isAuthenticated ? <Header /> : <HeaderGuest />} 
            <HomeMainSection />
            {/* <DirectoryGroups /> */}
            {/* <CardComponetGroop h2="Популярные товары" api={"/api/Bestsellers"} /> */}
            <AvailableForOrder h2Title="Доступно для заказа" cardItem={cardItem} />
            <Footer />
        </> 
    );

};

export default Home;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderGuest from '../Header/HeaderGuest.jsx';
import Header from '../Header/Header.jsx';
import './Home.css';
import HomeMainSection from "./HomeMainSection.jsx";
import DirectoryGroups from "./DirectoryGroups.jsx";
import CardComponetGroop from "../CardComponetGroop/CardComponetGroop.jsx"
import Footer from "../Footer/Footer.jsx"


const Home = () => {
    // Простейший стейт для проверки авторизации
    const isAuthenticated = localStorage.getItem('token') !== null;

    return (
        <>
        {/* Если не авторизован выводим шапку для гостя */}
            {isAuthenticated ? <Header /> : <HeaderGuest />} 
            {/* <HomeMainSection /> */}
            {/* <DirectoryGroups /> */}
            <CardComponetGroop />
            {/* <Footer /> */}
        </> 
    );

};

export default Home;
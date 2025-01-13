import React, { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import "./Basket.css";
import Cart from "./Cart.jsx";




const Basket = () => {

    // Считываем данные из строки запроса
    const param = new URLSearchParams(window.location.search).get('vendorCode');
    
    return (
        <>
            <Header />
            <Cart />
        </>
    );
};

export default Basket;
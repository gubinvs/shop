import React, { useState } from "react";
import "./PersonalSpace.css";
import { data } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Home from "../Home/Home.jsx";




const PersonalSpace =() => {
    return (
        <>
            <Header/>
            <Home />
        </>
        
    );
}

export default PersonalSpace;

import React from 'react';
import HeaderGuest from '../Header/HeaderGuest.jsx';
import './Home.css';
import HomeMainSection from "./HomeMainSection.jsx";
import DirectoryGroups from "./DirectoryGroups.jsx";
import CardComponetGroop from "../CardComponetGroop/CardComponetGroop.jsx"


const Home = () => {

    return (
        <>
            {/* <HeaderGuest />
            <HomeMainSection /> */}
            <DirectoryGroups />
            {/* <CardComponetGroop /> */}
        </> 
    );

};

export default Home;
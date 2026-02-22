import React from 'react';
import Header from '../Header/Header.jsx';
import './home.css';
import NewDirectoryGroups from "./NewDirectoryGroups.jsx";
import CardComponetGroop from "../CardComponetGroop/CardComponetGroop.jsx";
import Footer from "../Footer/Footer.jsx";


const Home = () => {
    // Простейший стейт для проверки авторизации
    // const isAuthenticated = localStorage.getItem('token') !== null;

    return (
        <>
            <Header />
            <NewDirectoryGroups />
            <CardComponetGroop h2="Популярные товары" api={"/api/Bestsellers"} />
            <div className="home-delivery-section">
                <div className="container home-delivery-section__container">
                    <h2 className='home-delivery-section__title'>Способы доставки</h2>
                    <img 
                        className='home-delivery-section__images'
                        src="/images/delivry-man__1920.png" 
                        alt="Молодой человек с желтой сумкой доставки" 
                    />
                    <div className="home-delivery-section__icon-block">
                        <img 
                            src="/images/del-line-logo__1920.png" 
                            alt="Логотип деловых линий" 
                            className="home-delivery-section__icon" 
                        />
                        <img 
                            src="/images/sdeck-logo__1920.png" 
                            alt="Логотип деловых линий" 
                            className="home-delivery-section__icon" 
                        />
                        <img 
                            src="/images/ozon-logo__1920.png" 
                            alt="Логотип деловых линий" 
                            className="home-delivery-section__icon" 
                        />
                    </div>
                    <div className="home-delivery-section__discr">
                        Мы сотрудничаем с надежными транспортными компаниями. Сроки и стоимость перевозки зависят от региона и рассчитываются в индивидуальном порядке.
                    </div>
                </div>
            </div>
            <Footer />
        </> 
    );

};

export default Home;    
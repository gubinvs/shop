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
            {/*<NewDirectoryGroups />*/}
            <CardComponetGroop h2="Популярные товары" api={"/api/Bestsellers"} />
            <div className="home-delivery-section">
                <div className="container home-delivery-section__container">
                    <h2 className='home-delivery-section__title'>Способы доставки</h2>
                        <picture className='delivry-man__picture'>
                            <source srcset="/images/img-delivery-section/delivry-man__1920.png" media="(min-width: 1281px)" />
                            <source srcset="/images/img-delivery-section/delivry-man__1280.png" media="(min-width: 1025px)" />
                            <source srcset="/images/img-delivery-section/delivry-man__1024.png" media="(min-width: 961px)" />
                            <source srcset="/images/img-delivery-section/delivry-man__960.png" media="(min-width: 801px)" />
                            <source srcset="/images/img-delivery-section/delivry-man__800.png" media="(min-width: 641px)" />
                            <img 
                                className='home-delivery-section__images home-delivery-section__images_man'
                                src="/images/img-delivery-section/delivry-man__1920.png" 
                                alt="Молодой человек с желтой сумкой доставки" 
                            />
                        </picture>
                
                    <div className="home-delivery-section__icon-block">
                        <picture>
                            <source srcset="/images/img-delivery-section/del-line-logo__1920.png" media="(min-width: 1281px)" />
                            <source srcset="/images/img-delivery-section/del-line-logo__1280.png" media="(min-width: 1025px)" />
                            <source srcset="/images/img-delivery-section/del-line-logo__1024.png" media="(min-width: 961px)" />
                            <source srcset="/images/img-delivery-section/del-line-logo__960.png" media="(min-width: 801px)" />
                            <source srcset="/images/img-delivery-section/del-line-logo__800.png" media="(min-width: 641px)" />
                            <source srcset="/images/img-delivery-section/del-line-logo__480.png" media="(min-width: 481px)" />
                            
                            <img 
                                src="/images/img-delivery-section/del-line-logo__1920.png" 
                                alt="Логотип деловых линий" 
                                className="home-delivery-section__icon" 
                            />
                        </picture>
                      
                        <picture>
                            <source srcset="/images/img-delivery-section/sdeck-logo__1920.png" media="(min-width: 1281px)" />
                            <source srcset="/images/img-delivery-section/sdeck-logo__1280.png" media="(min-width: 1025px)" />
                            <source srcset="/images/img-delivery-section/sdeck-logo__1024.png" media="(min-width: 961px)" />
                            <source srcset="/images/img-delivery-section/sdeck-logo__960.png" media="(min-width: 801px)" />
                            <source srcset="/images/img-delivery-section/sdeck-logo__800.png" media="(min-width: 641px)" />
                            <source srcset="/images/img-delivery-section/sdeck-logo__480.png" media="(min-width: 481px)" />
                            <img 
                                src="/images/img-delivery-section/sdeck-logo__1920.png" 
                                alt="Логотип деловых линий" 
                                className="home-delivery-section__icon" 
                            />
                        </picture>
                       
                        <picture>
                            <source srcset="/images/img-delivery-section/ozon-logo__1920.png" media="(min-width: 1281px)" />
                            <source srcset="/images/img-delivery-section/ozon-logo__1280.png" media="(min-width: 1025px)" />
                            <source srcset="/images/img-delivery-section/ozon-logo__1024.png" media="(min-width: 961px)" />
                            <source srcset="/images/img-delivery-section/ozon-logo__960.png" media="(min-width: 801px)" />
                            <source srcset="/images/img-delivery-section/ozon-logo__800.png" media="(min-width: 641px)" />
                            <source srcset="/images/img-delivery-section/ozon-logo__480.png" media="(min-width: 481px)" />
                            <img 
                                src="/images/img-delivery-section/ozon-logo__1920.png" 
                                alt="Логотип деловых линий" 
                                className="home-delivery-section__icon" 
                            />
                        </picture>
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
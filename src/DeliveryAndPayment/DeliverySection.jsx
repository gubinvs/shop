


import "./deliverySection.css";




const DeliverySection = () => {
    return (
        <>
            <section className="home-delivery-section">
                <div className="container home-delivery-section__container">
                    <div className="home-delivery-section__context"> 
                        <div className="home-delivery-section__discr-block">
                            <h2 className='home-delivery-section__title'>Способы доставки</h2>
                            <div className="home-delivery-section__icon-block">
                                <picture>
                                    <source srcset="/images/img-delivery-section/del-line-logo__1280.png" media="(min-width: 1281px)" />
                                    <source srcset="/images/img-delivery-section/del-line-logo__1024.png" media="(min-width: 1025px)" />
                                    <source srcset="/images/img-delivery-section/del-line-logo__960.png" media="(min-width: 961px)" />
                                    <source srcset="/images/img-delivery-section/del-line-logo__800.png" media="(min-width: 801px)" />
                                    <source srcset="/images/img-delivery-section/del-line-logo__640.png" media="(min-width: 641px)" />
                                    <source srcset="/images/img-delivery-section/del-line-logo__480.png" media="(min-width: 481px)" />
                    
                                    <img 
                                        src="/images/img-delivery-section/del-line-logo__1920.png" 
                                        alt="Логотип деловых линий" 
                                        className="home-delivery-section__icon" 
                                    />
                                </picture>
                                
                                <picture>
                                    <source srcset="/images/img-delivery-section/sdeck-logo__1280.png" media="(min-width: 1281px)" />
                                    <source srcset="/images/img-delivery-section/sdeck-logo__1024.png" media="(min-width: 1025px)" />
                                    <source srcset="/images/img-delivery-section/sdeck-logo__960.png" media="(min-width: 961px)" />
                                    <source srcset="/images/img-delivery-section/sdeck-logo__800.png" media="(min-width: 801px)" />
                                    <source srcset="/images/img-delivery-section/sdeck-logo__640.png" media="(min-width: 641px)" />
                                    <source srcset="/images/img-delivery-section/sdeck-logo__480.png" media="(min-width: 481px)" />
                        
                                    <img 
                                        src="/images/img-delivery-section/sdeck-logo__1920.png" 
                                        alt="Логотип деловых линий" 
                                        className="home-delivery-section__icon" 
                                    />
                                </picture>
                                
                                <picture>
                                    <source srcset="/images/img-delivery-section/ozon-logo__1280.png" media="(min-width: 1281px)" />
                                    <source srcset="/images/img-delivery-section/ozon-logo__1024.png" media="(min-width: 1025px)" />
                                    <source srcset="/images/img-delivery-section/ozon-logo__960.png" media="(min-width: 961px)" />
                                    <source srcset="/images/img-delivery-section/ozon-logo__800.png" media="(min-width: 801px)" />
                                    <source srcset="/images/img-delivery-section/ozon-logo__640.png" media="(min-width: 641px)" />
                                    <source srcset="/images/img-delivery-section/ozon-logo__480.png" media="(min-width: 481px)" />
                                    
                                    <img 
                                        src="/images/img-delivery-section/ozon-logo__1920.png" 
                                        alt="Логотип деловых линий" 
                                        className="home-delivery-section__icon" 
                                    />
                                </picture>
                            </div>
                            <div className="home-delivery-section__discr">
                                Мы доставляем заказы через проверенные транспортные компании, 
                                гарантируя сохранность груза. Сроки и стоимость рассчитываются индивидуально — мы подберем оптимальный 
                                тариф под ваш регион и бюджет.
                            </div>
                            <button 
                                className="home-delivery-section__button"
                                onClick={()=> window.location.href = "/DeliveryAndPayment"}
                            >Подробнее</button>
                        </div>
                        <img className="home-delivery-section__image" src="/images/img-delivery-section/5eb22a0dd5bed0f601b8d251c4465e6a.jpg" alt="@#$" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default DeliverySection;
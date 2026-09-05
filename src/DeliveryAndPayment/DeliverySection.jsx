


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
        
                                    <img 
                                        src="/images/img-delivery-section/del-line-logo__1920.png" 
                                        alt="Логотип деловых линий" 
                                        className="home-delivery-section__icon" 
                                    />
                               
                                    <img 
                                        src="/images/img-delivery-section/sdeck-logo__1920.png" 
                                        alt="Логотип деловых линий" 
                                        className="home-delivery-section__icon" 
                                    />
                                
                                    <img 
                                        src="/images/img-delivery-section/ozon-logo__1920.png" 
                                        alt="Логотип деловых линий" 
                                        className="home-delivery-section__icon" 
                                    />
                               
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
                        <img className="home-delivery-section__image" src="/images/img-delivery-section/img-delivery-section.jpg" alt="@#$" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default DeliverySection;
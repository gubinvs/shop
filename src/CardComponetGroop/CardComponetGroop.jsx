import React from 'react';
import './CardComponetGroop.css';




const CardComponetGroop = () => {

    const formatPrice = (price) => {
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const item = [
        {
            imgLinkIconCard : "https://shop.encomponent.ru/img/img-product/A9D56616/A9D56616.jpg",
            vendorСode : "A9D56616",
            nameComponent : "Дифавтомат Schneider Electric Acti9 2P 16А (B) 6кА 30мА (AC)",
            quantity : 0,
            linkPage: "https://shop.encomponent.ru/page-component/9f69c252-cd77-4f5e-9958-7c8341a82f83.php",
            price : 11800
        },
        {
            imgLinkIconCard : "https://shop.encomponent.ru/img/img-product/1SFA898116R7000/1SFA898116R7000_icon-card.jpg",
            vendorСode : "1SFA898116R7000",
            nameComponent : "Софтстартер PSTX470-600-70 250кВт 400В 470A , с функцией защиты двигателя",
            quantity : 2,
            price : 999000
        },
        {
            imgLinkIconCard : "https://shop.encomponent.ru/img/img-product/1SFA898116R7000/1SFA898116R7000_icon-card.jpg",
            vendorСode : "1SFA898116R7000",
            nameComponent : "Софтстартер PSTX470-600-70 250кВт 400В 470A , с функцией защиты двигателя",
            quantity : 2,
            price : 999000
        },
        {
            imgLinkIconCard : "https://shop.encomponent.ru/img/img-product/1SFA898116R7000/1SFA898116R7000_icon-card.jpg",
            vendorСode : "1SFA898116R7000",
            nameComponent : "Софтстартер PSTX470-600-70 250кВт 400В 470A , с функцией защиты двигателя",
            quantity : 1,
            price : 999000
        },
        {
            imgLinkIconCard : "https://shop.encomponent.ru/img/img-product/1SFA898116R7000/1SFA898116R7000_icon-card.jpg",
            vendorСode : "1SFA898116R7000",
            nameComponent : "Софтстартер PSTX470-600-70 250кВт 400В 470A , с функцией защиты двигателя",
            quantity : 2,
            price : 999000
        },
        {
            imgLinkIconCard : "https://shop.encomponent.ru/img/img-product/1SFA898116R7000/1SFA898116R7000_icon-card.jpg",
            vendorСode : "1SFA898116R7000",
            nameComponent : "Софтстартер PSTX470-600-70 250кВт 400В 470A , с функцией защиты двигателя",
            quantity : 2,
            price : 999000
        },
        {
            imgLinkIconCard : "https://shop.encomponent.ru/img/img-product/1SFA898116R7000/1SFA898116R7000_icon-card.jpg",
            vendorСode : "1SFA898116R7000",
            nameComponent : "Софтстартер PSTX470-600-70 250кВт 400В 470A , с функцией защиты двигателя",
            quantity : 2,
            price : 999000
        },
        {
            imgLinkIconCard : "https://shop.encomponent.ru/img/img-product/1SFA898116R7000/1SFA898116R7000_icon-card.jpg",
            vendorСode : "1SFA898116R7000",
            nameComponent : "Софтстартер PSTX470-600-70 250кВт 400В 470A , с функцией защиты двигателя",
            quantity : 2,
            price : 999000
        }
    ];

    return (
        <>
            <div className="card-componet-groop-section">
                <div className="container">
                  <h2 className="directory-groups__title">Популярные товары</h2>  
                </div>
                
                <div className="container card-componet-groop-section__container">
                    
                    {
                        item.map((element) => {
                            return (    
                                 
                                    <div className="card-component">
                                        <div className="card-component__top">
                                            <img src={element.imgLinkIconCard} className="card-component__img" alt="Фото компонента"/>
                                            <div className="card-component__vendor">{element.vendorСode}</div>
                                            <div className="card-component__name" onClick={() => window.location.href = element.linkPage}>{element.nameComponent}</div>
                                        
                                        </div>
                                        <div className="card-component__bottom"> 
                                            <div className="cc-basket-block__delivry-block">
                                                <div className={element.quantity==0? "delivry-block__quantity delivry-block__quantity_0": "delivry-block__quantity"}>Наличие: {element.quantity} шт.</div>
                                            </div>
                                            <div className="card-component__price">{formatPrice(element.price)}</div>
                                            <div className="card-component__basket-block">
                                                <div className="basket-block__quantity-item">
                                                    <div className="quantity-item__minus">-</div>
                                                    <div className="quantity-item__input">120</div>
                                                    <div className="quantity-item__plus">+</div>    
                                                </div>
                                                <div className="basket-block__button">В корзину</div>
                                            </div>
                                        </div>
                                    </div> 
                             
                            );
                        })
                    }
                </div>
             </div>
        </>
    );

};

export default CardComponetGroop;
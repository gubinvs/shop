import "./pageComponent.css";
import {addProductToCart} from "../js/addProductToCart.js";
import { useEffect, useState } from "react";



const PageComponent = ({dataComponent})=> {

    // Сначала получаем vendorCode из URL, если он есть
    const urlParams = new URLSearchParams(window.location.search);
    const vendorCodeFromUrl = urlParams.get("vendorCode");


    // Проверка на наличие данного товара в корзине, для этого загрузим данные из корзины и преобразуем в массив
    const basketProduct = JSON.parse(localStorage.getItem('cart'));
    const [isItemBasket, setIsItemBasket] = useState(false);
    
    // Отфильтруем массив и проверим наличие нашего товара
    useEffect(()=>{
        const isExist = basketProduct.some(item => item.vendorCode === dataComponent.vendorCode); // метод some не просто фльтрует, он выдает true, если значение есть и наоборот

        if (isExist) {
            setIsItemBasket(true);
        };
    }, []);

    return(
        <>
            <section className="component-page-section">
                <div className="container component-page-section__container">
                    <h1 className="component-page-section__title">{dataComponent.vendorCode + "," + " " + dataComponent.nameComponent}</h1>
                    <div className="component-page-section__main-block">
                        {/* Основная фотография товара */}
                        <img src={dataComponent.imageCard} alt={"Фото товара с артикулом" + dataComponent.vendorCode} className="cps-main-block__img" />
                        
                        {/* Дополнительные фото товара */}
                        <div className="cps-main-block__img-dop-block">
                            {dataComponent.dopImages.map((item, index) => {
                                if(index === 3) {
                                    return;
                                }
                                return (
                                    <>
                                        <img key={index} src={item} alt="#" className="cmb-img-dop-block__img" />
                                    </>
                                );
                            })}
                        </div>

                        {/* Информация о товаре */}
                        <div className="component-page-section__data">
                            <div className="cps-data__vendor">
                                <span className="cps-d-vendor__name">Артикул производителя:</span>
                                <span className="cps-d-vendor__vendor">{dataComponent.vendorCode}</span> 
                            </div>
                            <hr className='cps-data__hr'/>
                            <div class='characteristics-block'>
                                <div class='characteristics-block__title'>Основные характеристики:</div>
                                <ul class='characteristics-block__list'>
                                    <li key={1} class='characteristics-block__item flex'>
                                        <div class='characteristics-item__title'>Производитель:</div>
                                        <div class='characteristics-item__discr'>{dataComponent.manufacturer}</div>
                                    </li>
                                    {dataComponent.characteristic.map((item, index) => {
                                        return(
                                            <>
                                                <li key={index+50} class='characteristics-block__item flex'>
                                                    <div class='characteristics-item__title'>{item.name}</div>
                                                    <div class='characteristics-item__discr'>{item.param}</div>
                                                </li>
                                            </>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="warehouse-end-price-block">
                                <div className="cps-data__warehouse-block">
                                    <div className="cpsd-warehouse-block__title">Наличие на складах:</div>
                                    <div className="cpsd-warehouse-block__title_fon"></div>
                                    <div className="cpsd-warehouse-block__warehouse">
                                        {dataComponent.warehouse.map((element, index) => {
                                            return (
                                                <>
                                                    <div className='warehouse-param'>
                                                        <div key={index+100} className="cpsd-wb-warehouse__name">{element.name}</div>
                                                        <div key={index+1000} className="cpsd-wb-warehouse__quantity">{element.quantity} шт.</div>
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="cps-data__price-block">
                                    <div className="cps-d-price-block__price">
                                        {dataComponent.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })}
                                    <span className="cps-d-price-block__nalog">в т.ч. НДС 22%</span>
                                    </div>
                                    {!isItemBasket?
                                    <>
                                        <button 
                                            className="cps-d-button-block__basket-button"
                                            onClick={()=> addProductToCart(dataComponent, urlParams)}
                                        >Добавить в корзину</button>
                                    </>:
                                    <>
                                        <button 
                                            className="cps-d-button-block__basket-button_add"
                                            onClick={()=>{window.location.href = "/Basket"}}
                                        >Уже в корзине</button>
                                    </>
                                    }
  
                                </div>
                                
                            </div>
                            <div className="cps-data__button-block">
                                <button className="cps-d-button-block__ozon-button" onClick={() => {window.location.href = dataComponent.ozonLink}}>Купить на ОЗОН</button>
                                <button className="cps-d-button-block__ofer-button" onClick={() => {window.location.href = "/RegistrationAndDelivery"}}>Купить в 1 клик</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PageComponent;
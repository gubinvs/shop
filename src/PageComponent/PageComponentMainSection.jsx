import {addProductToDasket} from "../js/addProductToDasket.js";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import ApiUrl from "../js/ApiUrl.js";
import "./pageComponentMainSection.css";


// --- Главная секция товара с фото, краткими характеристиками и кнопками для покупок
const PageComponentMainSection = ({dataComponent}) => {

    // Сначала получаем vendorCode из URL, если он есть
    const urlParams = new URLSearchParams(window.location.search);
    const vendorCodeFromUrl = urlParams.get("vendorCode");
    const navigate = useNavigate();
    const [warehouseSpb, setWarehouseSpb] = useState(0);
    const [warehouseOzon, setWarehouseOzon] = useState(0);
    const [formEmail, setFormEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [agree, setAgree] = useState(false);

    useEffect(()=>{
        dataComponent.Warehouse.forEach((item) => {
            if (item.Name === "Санкт-Петербург") {
                setWarehouseSpb(item.Quantity);
            } else if (item.Name === "Склады ОЗОН") {
                setWarehouseOzon(item.Quantity);
            }
        });
    },[]);

    const requestQuote = async (email, vendor) => {
        
        // Формируем запрос
        var reguast = {
            email : email,
            vendor: vendor
        };

        // Подставляем пароль прямо в URL (в конец пути), как в Swagger!
        const response = await fetch(`${ApiUrl}/api/RequestQuote`, {
            method: "POST",
            headers: {
                "accept": "*/*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reguast)
        });

        if (!response.ok) {
            throw new Error("Ошибка запроса: " + response.status);
        }

        // Закрываем окно ввода почты
        setFormEmail(false);
    };


    // Отправляем данные на почту с запросом КП
    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        
        // Дополнительная проверка, если HTML5-валидации недостаточно
        if (!email || !agree) return;

        // Вызываем функцию отправки с актуальным email
        requestQuote(email, dataComponent.VendorCode); 
    };

    // Проверка на наличие данного товара в корзине, для этого загрузим данные из корзины и преобразуем в массив
    const [basketProduct, setBasketProduct] = useState(() => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    });
    const [isItemBasket, setIsItemBasket] = useState(false);

    // Состояние блоков вывода на экран большой картинки товара
    const [maxImgBlock, setMaxImgBlock] = useState([]);

    // Перебираем массив и присваиваем по умолчанию значения
    useEffect(() => {
        // Фильтруем и сразу маппим в массив из false
        const filteredArray = dataComponent.DopImages
            .map(() => false); 

        setMaxImgBlock(filteredArray);
    }, [dataComponent, vendorCodeFromUrl]);

    // Функция для открытия увеличенного изображения товара при клике
    const openBigImageForClick = (count) => {
        // .map создает абсолютно новый массив
        const newArray = maxImgBlock.map((item, index) => {
            // Если текущий индекс совпадает с переданным кликнутым номером, возвращаем true, иначе false
            return index === count; 
        });

        setMaxImgBlock(newArray);
    };

    // Функция обновляет массив и зарывает все увеличенные картинки
    const closeAllBigImages = () => {
        // Проходим по всему массиву и каждый элемент заменяем на false
        const resetArray = maxImgBlock.map(() => false);
    
        setMaxImgBlock(resetArray);
    };
     
    // Отфильтруем массив и проверим наличие нашего товара
    useEffect(() => {
        const isExist = basketProduct?.some(item => 
            (item.VendorCode === dataComponent.VendorCode) || (item.vendorCode === dataComponent.VendorCode)
        );

        if (isExist) {
            setIsItemBasket(true);
        } else {
            setIsItemBasket(false);
        }
    }, [basketProduct, dataComponent.VendorCode]);


    return (
        <>
            <section className="component-page-section">
                <div className="container component-page-section__container">
                    <h1 className="component-page-section__title">{dataComponent.VendorCode + "," + " " + dataComponent.NameComponent}</h1>
                    <div className="component-page-section__main-block">

                        {/* Основная фотография товара */}
                        <img src={dataComponent.MainImagePage} alt={"Фото товара с артикулом" + dataComponent.VendorCode} className="cps-main-block__img" />
                        
                        {/* Дополнительные фото товара */}
                        <div className="cps-main-block__img-dop-block">
                            {dataComponent.DopImages.map((item, index) => {
                                if(item === "" || item === undefined || item === null || item === "Нет данных") return;
                                return (
                                    <>
                                        <img 
                                            key={index} 
                                            src={item} 
                                            alt="." 
                                            className="cmb-img-dop-block__img"
                                            onClick={()=> openBigImageForClick(index)}
                                        />
                                        <div className={maxImgBlock[index]? "__max-img-block __max-img-block_active" : "__max-img-block"}>
                                            <span 
                                                className="__max-img-block__close"
                                                onClick={()=> closeAllBigImages()}
                                            >X</span>
                                            <img key={index+10} src={item} alt="#" className="__max-img-block__img" />
                                        </div>
                                    </>
                                );
                            })}
                        </div>

                        {/* Информация о товаре */}
                        <div className="component-page-section__data">
                            <div className="cps-data__vendor">
                                <span className="cps-d-vendor__name">Артикул производителя:</span>
                                <span className="cps-d-vendor__vendor">{dataComponent.VendorCode}</span> 
                            </div>
                            <hr className='cps-data__hr'/>
                            <div class='characteristics-block'>
                                <div class='characteristics-block__title'>Основные характеристики:</div>
                                <ul class='characteristics-block__list'>
                                    <li key={1} class='characteristics-block__item flex'>
                                        <div class='characteristics-item__title'>Производитель:</div>
                                        <div class='characteristics-item__discr'>{dataComponent.Manufacturer}</div>
                                    </li>
                                     <li key={1} class='characteristics-block__item flex'>
                                        <div class='characteristics-item__title'>Произведено:</div>
                                        <div class='characteristics-item__discr'>{dataComponent.Origin}</div>
                                    </li>
                                    {dataComponent.DiscriptionParam.map((item, index) => {                                
                                        return(
                                            <>
                                                <li key={index+50} class='characteristics-block__item flex'>
                                                    <div class='characteristics-item__title'>{item.Name}</div>
                                                    <div class='characteristics-item__discr'>{item.Param}</div>
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
                                        {dataComponent.Warehouse.map((element, index) => {
                                            return (
                                                <>
                                                    <div className='warehouse-param'>
                                                        <div key={index+100} className="cpsd-wb-warehouse__name">{element.Name}</div>
                                                        <div key={index+1000} className="cpsd-wb-warehouse__quantity">{element.Quantity} шт.</div>
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="cps-data__price-block">
                                    <div className="cps-d-price-block__price">
                                        {warehouseOzon > 0 || warehouseSpb > 0?
                                            <>
                                                {dataComponent.Price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })}
                                                {/* <span className="cps-d-price-block__nalog">в т.ч. НДС</span> */}
                                            </>
                                            :<div className="cps-d-price-block__price_no">Возим на заказ!</div>
                                        }
                                    </div>
                                    {!isItemBasket?
                                    <>
                                        {warehouseOzon > 0 || warehouseSpb > 0?
                                        <>
                                            <button 
                                                className="cps-d-button-block__basket-button"
                                                onClick={()=> {
                                                    addProductToDasket(dataComponent);
                                                    setIsItemBasket(true);
                                                }}
                                            >Купить как юр.лицо</button>
                                        </>
                                        :
                                        <>
                                            <button 
                                                className="cps-d-button-block__basket-button"
                                                onClick={()=>{setFormEmail(true)}}
                                            >Запросить КП</button>
                                        </>}
                                    </>:
                                    <>
                                        <button 
                                            className="cps-d-button-block__basket-button_add"
                                            onClick={()=>{window.location.href = "/Basket"}}
                                        >В корзине юр.лиц</button>
                                    </>
                                    }
                                </div>
                            </div>
                            <div className="cps-data__button-block">
                                {warehouseOzon > 0?
                                    <>
                                        <button 
                                            className="cps-d-button-block__ozon-button" 
                                            onClick={() => {window.location.href = dataComponent.OzonLink}}
                                        >Купить на ОЗОН
                                        </button>
                                    </>
                                    :
                                    <button 
                                        className="cps-d-button-block__ozon-button_no-quantity" 
                                    >Купить на ОЗОН
                                    </button>
                                }
                                {warehouseSpb > 0?
                                    <>
                                        <button 
                                            className="cps-d-button-block__ofer-button" 
                                            onClick={() => {
                                                // Переходим на страницу и «подкладываем» объект в историю браузера
                                                navigate("/RegistrationAndDelivery", { state: { dataComponent } });
                                            }}>Купить в 1 клик
                                        </button>
                                    </>
                                    :
                                    <button 
                                        className="cps-d-button-block__ofer-button_no-quantity" 
                                    >Купить в 1 клик
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {formEmail?
                    <>
                        <div className="component-page-section__email-form-block">
                            <form className="email-form-block__email-form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    className="cps-email-form_input"
                                    placeholder="Введите Ваш email"
                                    value={email} // Делаем компонент контролируемым
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                
                                <button type="submit" className="cps-email-form_button">
                                    Отправить запрос
                                </button>

                                {/* Политика ОПД */}
                                <div className="check-box">
                                    <input
                                    className="check-box__input"
                                    type="checkbox"
                                    name="chekBox"
                                    id="opd-checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    required
                                    />
                                    <div className="check-box__discr">
                                    {/* Для лучшего UX и доступности связываем текст с чекбоксом через label */}
                                    <label htmlFor="opd-checkbox">
                                        Даю согласие на обработку персональных данных согласно{' '}
                                    </label>
                                    <a href="/PersonalData" target="_blank" rel="noopener noreferrer">
                                        Политике ОПД
                                    </a>
                                    </div>
                                    <input type="hidden" name="active-form" value="message" />
                                </div>

                                <div className="cps-email-form_X" onClick={() => setFormEmail(false)}>
                                    X
                                </div>
                            </form>
                        </div>
                    </>
                :""}
                
            </section>

        
        </>
    );
};

export default PageComponentMainSection;
import { useState, useEffect } from 'react';
import { productDataPage } from '../js/productDataPage.js';
import Header from '../Header/Header.jsx';
import HeaderGuest from '../Header/HeaderGuest.jsx';
import PageComponent from '../PageComponent/PageComponent.jsx';

// import { components } from '../js/components.js'; // Временный массив

const SearchResults = ( 
    { article } 
) => {

    // Сначала получаем vendorCode из URL, если он есть
    // Если его нет получаем из пропса, в том случае если переходили с поисковиков по поддельным ссылкам
    // важно артикул в названии страниц разделить символами ( -- и .html )
    // .../products/schneider/kontaktor--LC1D18M7.html он может быть и таким /products/schneider/kontaktor--LC1D-18M7.html
    // и таким /products/schneider/kontaktor--LC1D18.M7.html
    const [vendorCode, setVendorCode] = useState(null);  
    
    // Загружаем данные товара
    const [component, setComponent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Проверка авторизации пользователя для выдачи хэдера
    const isAuthenticated = localStorage.getItem('token') !== null;


    // Достаем артикул из ссылок и запросов
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const vendorCodeFromUrl = urlParams.get("vendorCode");

        //   Присваиваем значение vendorCode из url или props в зависимости от источника захода на страницу, 
        // из url если заход по прямой ссылке из карточки товара или платной рекламы, где четко указан параметр артикула
        // или через пропс article если пользователь заходит с поисковой выдачи и из хвостика названия файла забираем артикул --LC1D-18M7, 
        // не путать! артикул забирам после -- , а название каталога после ==

        if (article === undefined || article === null) {
            setVendorCode(vendorCodeFromUrl);
        } else {
            setVendorCode(article);
        }

        // Если нет артикула, загружаем стартовую страницу
        if (!vendorCodeFromUrl) {
            window.location.href = "/";
        }   

        // Загружаем данные товара 
       const loadProduct = async () => {
            try {
                const data = await productDataPage(vendorCode);

                console.log(data);

                setComponent(data);
            } catch (error) {
                console.log("Ошибка загрузки товара:", error);
            } finally {
                setLoading(false);
            }
        };
        
        loadProduct();

    }, [vendorCode]); 


    return (
        <>
            {/* ----- Хэдер в зависимости от авторизации ----- */}
            {!isAuthenticated ? <HeaderGuest /> : <Header />}

           
            {/* -- страница товара */}
            {loading ? (
                <div>Загрузка данных товаре...</div>
            ) : component ? (
                <PageComponent dataComponent={component} />
            ) : (
                <div>Загрузка данных о товаре...</div>
            )}

        </>
    );
};

export default SearchResults;

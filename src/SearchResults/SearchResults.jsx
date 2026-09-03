import { useState, useEffect } from 'react';
import ApiUrl from '../js/ApiUrl.js';
import Header from '../Header/Header.jsx';
import HeaderGuest from '../Header/HeaderGuest.jsx';
import PageComponent from '../PageComponent/PageComponent.jsx';

import { components } from '../js/components.js'; // Временный массив

const SearchResults = ( 
    { article } 
) => {

    // Сначала получаем vendorCode из URL, если он есть
    // Если его нет получаем из пропса, в том случае если переходили с поисковиков по поддельным ссылкам
    // важно артикул в названии страниц разделить символами ( -- и .html )
    // .../products/schneider/kontaktor--LC1D18M7.html он может быть и таким /products/schneider/kontaktor--LC1D-18M7.html
    // и таким /products/schneider/kontaktor--LC1D18.M7.html
    const [vendorCode, setVendorCode] = useState('');

    // Проверка авторизации пользователя для выдачи хэдера
    const isAuthenticated = localStorage.getItem('token') !== null;

    // Загружаем данные товара
    const [component, setComponent] = useState([]);


    // Достаем артикул из ссылок и запросов
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const vendorCodeFromUrl = urlParams.get("vendorCode");
        // if (vendorCodeFromUrl) {
        //     localStorage.setItem("vendorCode_GoToPageComponent", vendorCodeFromUrl);
        // }   
        //vendorCode = localStorage.getItem("vendorCode_GoToPageComponent");

        
        //   Присваиваем значение vendorCode из url или props в зависимости от источника захода на страницу
        if (article === undefined || article === null) {
            
            setVendorCode(vendorCodeFromUrl);
        } else {
            setVendorCode(article);
        }

        // Если нет артикула, загружаем стартовую страницу
        if (!vendorCodeFromUrl) {
            window.location.href = "/";
        }   

    }, [article]);
    
    
    useEffect(() => {
        if (!vendorCode) return;

        fetch(`${ApiUrl}/api/BasketItem/${vendorCode}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            
            if (data.length > 0) {
                const item = data[0];
                setComponent({
                    id: item.Id,
                    guidId: item.Guid,
                    vendorCode: item.VendorCode,
                    nameComponent: item.NameComponent || "Нет данных",
                    productDescription: item.ProductDescription,
                    manufacturer: item.Manufacturer,
                    linkPage: item.LinkPage || "",
                    price: item.Price || 0,
                    quantity: item.Quantity,
                    imageCard: item.ImgLinkIconCard || "",
                });
            }
        })
        .catch(err => console.log("Ошибка получения данных:", err));
    }, [vendorCode]);    

    return (
        <>
            {/* ----- Хэдер в зависимости от авторизации ----- */}
            {!isAuthenticated ? <HeaderGuest /> : <Header />}

            {/* -- страница товара */}
            <PageComponent dataComponent={components} />

        </>
    );
};

export default SearchResults;

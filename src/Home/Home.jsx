import {jsonDataCardProduct} from "../js/jsonDataCardProduct.js";
import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import HeaderGuest from '../Header/HeaderGuest.jsx'
import './home.css';
import GroupOfCards from '../GroupOfCards/GroupOfCards.jsx';
import NewDirectoryGroupsMin from '../DirectoryGroups/NewDirectoryGroupsMin.jsx';
import DeliverySection from "../DeliveryAndPayment/DeliverySection.jsx";
import Footer from "../Footer/Footer.jsx";


const Home = () => {    
    // Проверка авторизации пользователя для выдачи хэдера
    const isAuthenticated = localStorage.getItem('token') !== null;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 2. Вызываем асинхронную функцию внутри useEffect
        jsonDataCardProduct()
            .then(data => {
                console.log(data);
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Ошибка при загрузке:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Загрузка...</div>;

    return (
        <>
            {/* ----- Хэдер в зависимости от авторизации ----- */}
            {!isAuthenticated ? <HeaderGuest /> : <Header />}

            {/* ---- Маленькие карточки каталога ---- */}
            <NewDirectoryGroupsMin />

            {/*--- Карточки товара, количество выдаваемых карточек ограничивается передаваемым параметром quantityCart  ----*/}
            <GroupOfCards cardData={products} quantityCart={20} />

            {/* -- Информация о доставке */}
            <DeliverySection />

            {/*---  Footer  ---*/}
            <Footer />

        </> 
    );
};

export default Home;    
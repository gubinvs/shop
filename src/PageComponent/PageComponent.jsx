import {jsonCartTest} from "../js/jsonCartTest.js";


import "./pageComponent.css";
import PageComponentDiscription from "./PageComponentDiscription.jsx";
import PageComponentMainSection from "./PageComponentMainSection.jsx";
import PageComponentCharacteristicsSection from "./PageComponentCharacteristicsSection.jsx";
import PageComponentDocFileSection from "./PageComponentDocFileSection.jsx";
import NewDirectoryGroupsMin from "../Home/NewDirectoryGroupsMin.jsx";
import GroupOfCards from '../GroupOfCards/GroupOfCards.jsx';

const PageComponent = ({dataComponent})=> {

    return(
        <>
            {/*Главная секция товара с фото, краткими характеристиками и кнопками для покупок*/}
            <PageComponentMainSection dataComponent={dataComponent} />

            {/* Секция с описанием товара */}
            <PageComponentDiscription discription={dataComponent.productDescription}/>

            {/* -- Секция с динамическими характеристиками товара, принимает пропсом артикул и выводит в заголовке,а также массив с характеристиками */}
            <PageComponentCharacteristicsSection vendor={dataComponent.vendorCode} characteristics={dataComponent.characteristics}/>

            {/* Секция с ссылками на техническую документацию, принимает пропсом массав file */}
            <PageComponentDocFileSection file={dataComponent.file} />

            {/* Секция с предложениями (карточками товаров) из этого-же раздела, на основе параметра chapter */}
            <GroupOfCards cardData={jsonCartTest} quantityCart={4} />
            
            {/*--- Разделы товара ----*/}
            <NewDirectoryGroupsMin/>



        </>
    );
};

export default PageComponent;
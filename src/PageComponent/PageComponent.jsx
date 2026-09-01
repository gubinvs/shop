
import "./pageComponent.css";
import PageComponentDiscription from "./PageComponentDiscription.jsx";
import PageComponentMainSection from "./PageComponentMainSection.jsx";


const PageComponent = ({dataComponent})=> {


    return(
        <>
            {/*Главная секция товара с фото, краткими характеристиками и кнопками для покупок*/}
            {/* <PageComponentMainSection dataComponent={dataComponent} /> */}

            {/* Секция с описанием товара */}
            <PageComponentDiscription discription={dataComponent.productDescription}/>
        </>
    );
};

export default PageComponent;
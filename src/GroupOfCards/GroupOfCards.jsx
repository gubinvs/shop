import "./groupOfCards.css";
import CardComponent from "../CardComponent/CardComponent";




const GroupOfCards = () => {


    // ------  Временная константа пока налаживаю
    const images = [
        "https://encomponent.ru/img/img-product/LC1D09M7/contactor-LC1D09M7.jpg",
        "https://encomponent.ru/img/img-product/LC1D18M7/contactor-LC1D18M7.jpg",
        "https://encomponent.ru/img/img-product/LC1D25M7/contactor-LC1D25M7.jpg"
    ];
    const urlImgCard = "https://encomponent.ru/img/img-product/LC1D32M7/contactor-LC1D32M7.jpg";
    const priceGoods = 2500;
    const discr = "LC1D25M7, Электромеханический контактор - Schneider Electric kdfj kdjfgh kdsjgk sdkjg kajsdg kasjdgkjsdhgjh kasdjgkas";
    const urlPage = "https://encomponent.ru"
    const gradeGoods = "5.0";
    const reviewsGoods = "230";
    // -----  / Временная константа пока налаживаю

    return (
        <>
            <div className='group-of-cards-section'>
                <div className="container group-of-cards-section__container">
                    <CardComponent urlImg={urlImgCard} price={priceGoods} dicription={discr} imgArray={images} linkPage={urlPage} grade={gradeGoods} reviews={reviewsGoods}/>
                    <CardComponent urlImg={urlImgCard} price={priceGoods} dicription={discr} imgArray={images} linkPage={urlPage} grade={gradeGoods} reviews={reviewsGoods}/>
                    <CardComponent urlImg={urlImgCard} price={priceGoods} dicription={discr} imgArray={images} linkPage={urlPage} grade={gradeGoods} reviews={reviewsGoods}/>
                    <CardComponent urlImg={urlImgCard} price={priceGoods} dicription={discr} imgArray={images} linkPage={urlPage} grade={gradeGoods} reviews={reviewsGoods}/>
                    <CardComponent urlImg={urlImgCard} price={priceGoods} dicription={discr} imgArray={images} linkPage={urlPage} grade={gradeGoods} reviews={reviewsGoods}/>
                </div>
            </div>
        </>
    );

}

export default GroupOfCards;
import "./groupOfCards.css";
import CardComponent from "../CardComponent/CardComponent";




const GroupOfCards = ({
        cardData,
        quantityCart
    }) => {
    // Компонент выводит на экран карточки товаров на основе данных пришедших пропсом
    return (
        <>
            <div className='group-of-cards-section'>
                <div className="container group-of-cards-section__container">
                    {cardData.slice(0, quantityCart).map((element, index)=>{
                        return(
                            <>
                                <CardComponent key={index} urlImg={element.urlImgCard} price={element.priceGoods} dicription={element.discr} imgArray={element.images} linkPage={element.urlPage} grade={element.gradeGoods} reviews={element.reviewsGoods}/> 
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );

}

export default GroupOfCards;
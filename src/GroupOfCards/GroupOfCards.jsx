import "./groupOfCards.css";
import CardComponent from "../CardComponent/CardComponent.jsx";



//  cardData - массив данных о товарах, для отрисовки карточек товара
// quantityCart - количество карточек товара которые необходимо выводить пользователю

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
                                <CardComponent 
                                    key={index} 
                                    urlImg={element.UrlImgCard} 
                                    price={element.PriceGoods} 
                                    quantity={element.Quantity}
                                    dicription={element.Discr} 
                                    imgArray={element.Images} 
                                    linkPage={element.UrlPage} 
                                    grade={element.GradeGoods} 
                                    reviews={element.ReviewsGoods}
                                    availabilityInWarehouses={element.AvailabilityInWarehouses}
                                /> 
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );

}

export default GroupOfCards;
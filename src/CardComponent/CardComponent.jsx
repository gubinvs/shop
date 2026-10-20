import "./cardComponent.css";
import { useState, useRef } from "react";


// Карточка товара
const CardComponent = (
    {
        urlImg, 
        price, 
        quantity,
        dicription, 
        imgArray, 
        linkPage,
        grade,
        reviews,
        availabilityInWarehouses
    }
) => {

    // Добавление новой ссылки в начало массива
    const images = [
        urlImg,
        ...imgArray
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef(null);

    const handleScroll = () => {
        if (!sliderRef.current) return;
        
        const slider = sliderRef.current;
        // Делим текущую прокрутку на ширину одного слайда
        const index = Math.round(slider.scrollLeft / slider.offsetWidth);
        
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    // Функция для клика по точке (чтобы слайд переключался)
    const scrollToSlide = (index) => {
        if (!sliderRef.current) return;
        const slider = sliderRef.current;
        slider.scrollLeft = index * slider.offsetWidth;
    };

    return(
        <>
            <div className="card-goods">
                {/* Нативный CSS-галерея слайдер */}
                <div 
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="card-goods__slider-native"
                >
                    {images.map((url, index) => {
                        if (url === "Нет данных") return null;
                        return (
                            <img 
                                key={index} 
                                src={url} 
                                className="card-goods__img card-goods__img-slide" 
                                alt={`Product ${index}`} 
                            />
                        )
                    })}
                </div>

                {/* Блок с точками пагинации */}
                {images.length > 1 && (
                    <div className="card-goods__dots">
                        {images.map((element, index) => {
                            if (element === "Нет данных") return null;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    className={`card-goods__dot ${index === activeIndex ? "card-goods__dot--active" : ""}`}
                                    onClick={() => scrollToSlide(index)}
                                    aria-label={`Перейти к слайду ${index + 1}`}
                                />
                            );
                        })}
                    </div>
                )}

                <div className="card-goods__price-block">
                    <div className="card-goods__price">
                        {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(price)}
                    </div>  
                    {availabilityInWarehouses > 0?
                        <>
                        <div className="cg-price-block__quantity">
                            <div className="cgpb-quantity__title">В наличии</div>
                            <div className="cgpb-quantity__quantity">{availabilityInWarehouses}</div>
                            <div className="cgpb-quantity__discr">шт.</div>  
                        </div>
                        </>:
                        <div className="cgpb-quantity__title_null">Под заказ</div>
                    }
                    
                </div>
              
                <div 
                    className="card-goods__discription"
                    onClick={() => window.location.href = linkPage}
                >
                    {dicription}
                </div>

                <div className="card-goods__reviews">
                    <img src="/images/gold-star.png" className="reviews__img" alt="t" />
                    <div className="reviews__discr reviews__discr_count">{grade}</div>    
                    <img src="/images/icon-message.svg" className="reviews__img reviews__img_message" alt="t" />
                    <div className="reviews__discr reviews__discr_message">{reviews}</div> 
                    <div className="reviews__discr reviews__discr_reviews">отзывов</div>  
                </div>
            </div>
        </>
    )
    
};


export default CardComponent;
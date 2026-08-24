import "./cardComponent.css";
import React from "react";
import { useState, useRef } from "react";


// Карточка товара
const CardComponent = (
    {
        urlImg, 
        price, 
        dicription, 
        imgArray, 
        linkPage,
        grade,
        reviews
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
                    {images.map((url, index) => (
                        <img 
                            key={index} 
                            src={url} 
                            className="card-goods__img card-goods__img-slide" 
                            alt={`Product ${index}`} 
                            onClick={() => window.location.href = linkPage} 
                        />
                    ))}
                </div>

                {/* Блок с точками пагинации */}
                {images.length > 1 && (
                    <div className="card-goods__dots">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`card-goods__dot ${index === activeIndex ? "card-goods__dot--active" : ""}`}
                            onClick={() => scrollToSlide(index)}
                            aria-label={`Перейти к слайду ${index + 1}`}
                        />
                    ))}
                    </div>
                )}

                <div className="card-goods__price">
                    {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 }).format(price)}
                </div>
                
                <div 
                    className="card-goods__discription"
                    onClick={() => window.location.href = linkPage}
                >
                    {dicription}
                </div>

                <div className="card-goods__reviews">
                    <img src="images/gold-star.png" className="reviews__img" alt="t" />
                    <div className="reviews__discr reviews__discr_count">{grade}</div>    
                    <img src="images/icon-message.svg" className="reviews__img reviews__img_message" alt="t" />
                    <div className="reviews__discr reviews__discr_message">{reviews}</div> 
                    <div className="reviews__discr reviews__discr_reviews">отзывов</div>  
                </div>
            </div>
        </>
    )
    
};


export default CardComponent;
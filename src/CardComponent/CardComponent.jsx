import "./cardComponent.css";
import React from "react";
import { useState, useRef } from "react";


// Карточка товара
const CardComponent = ({urlImg, price, dicription}) => {
    const images = [
        "https://encomponent.ru/img/img-product/LC1D09M7/contactor-LC1D09M7.jpg",
        "https://encomponent.ru/img/img-product/LC1D18M7/contactor-LC1D18M7.jpg",
        "https://encomponent.ru/img/img-product/LC1D25M7/contactor-LC1D25M7.jpg"
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
                
                <div className="card-goods__discription">
                    {dicription}
                </div>
                </div>
        </>
    )
    
};


export default CardComponent;
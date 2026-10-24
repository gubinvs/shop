import "./cardComponent.css";
import { useState, useRef } from "react";

// Компонент-заглушка (SVG), который показывается во время загрузки
const ImageSkeleton = () => (
    <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6", // Светло-серый фон
        position: "absolute",
        top: 0,
        left: 0,
        animation: "pulse 1.5s ease-in-out infinite"
    }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#d1d5db"/>
            <circle cx="8" cy="8" r="2" fill="#9ca3af"/>
            <path d="M21 15L16 10L5 21H21V15Z" fill="#9ca3af"/>
        </svg>
        <style>{`
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.6; }
            }
        `}</style>
    </div>
);

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
    const images = [urlImg, ...imgArray];
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef(null);
    
    // Состояние для отслеживания загруженных изображений по индексу
    const [loadedImages, setLoadedImages] = useState({});

    const handleScroll = () => {
        if (!sliderRef.current) return;
        const slider = sliderRef.current;
        const index = Math.round(slider.scrollLeft / slider.offsetWidth);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    const scrollToSlide = (index) => {
        if (!sliderRef.current) return;
        const slider = sliderRef.current;
        slider.scrollLeft = index * slider.offsetWidth;
    };

    return (
        <>
            <div className="card-goods">
                <div 
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="card-goods__slider-native"
                >
                    {images.map((url, index) => {
                        if (url === "Нет данных") return null;
                        
                        const isLoaded = loadedImages[index];

                        return (
                            <div 
                                key={index} 
                                style={{ position: "relative", width: "100%", flexShrink: 0 }}
                            >
                                {/* Показываем SVG, пока картинка не загрузилась */}
                                {!isLoaded && <ImageSkeleton />}
                                
                                <img 
                                    src={url} 
                                    className={`card-goods__img card-goods__img-slide ${isLoaded ? "is-loaded" : ""}`} 
                                    alt={`Product ${index}`} 
                                    onClick={() => window.location.href = linkPage}
                                    // Когда картинка загрузилась, обновляем состояние
                                    onLoad={() => setLoadedImages(prev => ({ ...prev, [index]: true }))}
                                    // Если ошибка загрузки, тоже убираем заглушку (чтобы не крутилась вечно)
                                    onError={() => setLoadedImages(prev => ({ ...prev, [index]: true }))}
                                    style={{ 
                                        opacity: isLoaded ? 1 : 0, 
                                        transition: "opacity 0.3s ease-in-out",
                                        position: "relative",
                                        zIndex: 1
                                    }}
                                />
                            </div>
                        );
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
                    {availabilityInWarehouses > 0 ? (
                        <div className="cg-price-block__quantity">
                            <div className="cgpb-quantity__title">Наличие:</div>
                            <div className="cgpb-quantity__quantity">{availabilityInWarehouses}</div>
                            <div className="cgpb-quantity__discr">шт.</div>  
                        </div>
                    ) : (
                        <div className="cgpb-quantity__title_null">Под заказ</div>
                    )}
                </div>
              
                <div 
                    className="card-goods__discription"
                    onClick={() => window.location.href = linkPage}
                >
                    {dicription}
                </div>

                <div className="card-goods__reviews">
                    <img src="/images/gold-star.png" className="reviews__img" alt="rating" />
                    <div className="reviews__discr reviews__discr_count">{grade}</div>    
                    <img src="/images/icon-message.svg" className="reviews__img reviews__img_message" alt="reviews" />
                    <div className="reviews__discr reviews__discr_message">{reviews}</div> 
                    <div className="reviews__discr reviews__discr_reviews">отзывов</div>  
                </div>
            </div>
        </>
    );
};

export default CardComponent;
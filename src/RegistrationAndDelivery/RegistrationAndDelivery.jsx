import { useEffect } from "react";
import "./registrationAndDelivery.css";
import { useNavigate, useLocation } from 'react-router-dom'; // Должно быть так


// Компонент для регистрации доставки транспортной компанией, пока планируется выбор между ОЗОН и СДЕК.
// Первый этап доставка через СДЕК, далее переход на выбор из предложенных вариантов (СДЕК, ОЗОН, Яндекс)

const RegistrationAndDelivery = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // Достаем данные, которые пришли с первой страницы
    const dataComponent = location.state?.dataComponent;

    useEffect(() => {
        // Делаем редирект и прокидываем эти же данные дальше
        navigate("/OzonDeliveryMap", { state: { dataComponent } });
    }, [dataComponent, navigate]);
    
    return(
        <></>
        // <>
        //     <div className="registration-and-delivery-section">
        //         <div className="container registration-and-delivery-section__container">
        //             {/* --- Банеры на выбор транспортной компании --- */}
        //             <img 
        //                 className="registration-and-delivery-section__banner registration-and-delivery-section__banner_ozon" 
        //                 src="../../images/img-delivery-section/600x600_light_ozon_blue.png" 
        //                 alt="Доставка ОЗОН" 
        //                 onClick={()=>{navigate("/OzonDeliveryMap", { state: { dataComponent } })}}
        //             />
        //         </div>
        //     </div>
        // </>
    );
};

export default RegistrationAndDelivery;
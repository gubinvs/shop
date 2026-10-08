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
        <>
            {/* --- Банеры на выбор транспортной компании --- */}
            
        </>
    );
};

export default RegistrationAndDelivery;
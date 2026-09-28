import { useEffect } from "react";
import "./registrationAndDelivery.css";





// Компонент для регистрации доставки транспортной компанией, пока планируется выбор между ОЗОН и СДЕК.
// Первый этап доставка через СДЕК, далее переход на выбор из предложенных вариантов (СДЕК, ОЗОН, Яндекс)

const RegistrationAndDelivery = () => {


    // Временно на момент разработки переадресация, далее здесь будет выбор траспортной компании
    function redirect () {
        window.location.href= "/OzonDeliveryMap"
    }
    useEffect(()=>{
        redirect();
    },[]);
    
    return(
        <>
            {/* --- Банеры на выбор транспортной компании --- */}
            
        </>
    );
};

export default RegistrationAndDelivery;
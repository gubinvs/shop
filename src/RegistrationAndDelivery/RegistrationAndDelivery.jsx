import "./registrationAndDelivery.css";
import OzonDeliveryMap from "../OzonDeliveryMap/OzonDeliveryMap.jsx";




// Компонент для регистрации доставки транспортной компанией, пока планируется выбор между ОЗОН и СДЕК.
// Первый этап доставка через СДЕК, далее переход на выбор из предложенных вариантов (СДЕК, ОЗОН, Яндекс)

const RegistrationAndDelivery =()=> {



    return(
        <>
            <OzonDeliveryMap />
        </>
    );
};

export default RegistrationAndDelivery;
import React, { useEffect, useState } from 'react';
import './orderSuccess.css';
import { useSearchParams } from 'react-router-dom';
import {serverMarketUrl} from "../js/serverMarketUrl.js";
import ApiOzonService from '../js/ApiOzonService.js';


const OrderStatus = () => {

    const [animated, setAnimated] = useState(true);
    const [dataStatus, setDataStatus] = useState('');

    // Читаем идентификатор заказа из адресно строки
    // 1. Получаем объект searchParams
    const [searchParams] = useSearchParams();
    
    // 2. Достаём нужное значение по ключу
    const guidIdOrder = searchParams.get('guidIdOrder');

    useEffect(() => {
        const updateStatus = async () => {
            try {
            // 1. Переносим guidIdOrder в URL в виде Query-параметра
            const responseStatusOrder = await fetch(`${ApiOzonService}/v1/ReturnOrderFromIndividualsStatus?guid=${guidIdOrder}`, {
                method: 'POST', // Метод POST, как в вашем curl
                headers: {
                'accept': '*/*',
                // 'Content-Type': 'application/json' можно убрать, так как тело запроса пустое
                }
            });

            // Проверяем, успешно ли сервер принял данные
            if (!responseStatusOrder.ok) {
                const errorText = await responseStatusOrder.text();
                throw new Error(`Ошибка сервера (${responseStatusOrder.status}): ${errorText}`);
            }

            // 2. ИСПРАВЛЕНО: Извлекаем JSON из ответа сервера через .json()
            const responseDataStatus = await responseStatusOrder.json();

            // Записываем весь пришедший объект в стейт
            setDataStatus(responseDataStatus);
            
            
            } catch (error) {
                console.error('Не удалось обновить заказ:', error);
            }
        };

        // Вызываем созданную функцию
        updateStatus();
    }, [guidIdOrder]); // Рекомендуется добавить guidIdOrder в зависимости, если он может измениться



    // Данные заказа (приходят из API или пропсов)
    const order = {
        number: String(dataStatus.number),
        amount: new Intl.NumberFormat('ru-RU', { 
            style: 'currency', 
            currency: 'RUB', 
            minimumFractionDigits: 0 
        }).format(dataStatus.amount),
        date: dataStatus.date,
        items: [dataStatus.name],
        status: dataStatus.status
    };

    // Базовый массив стадий (без жестко заданного status)
    const stages = [
        {
            title: 'Оплата получена',
            description: 'Деньги зачислены на наш расчётный счёт',
            icon: '✓',
        },
        {
            title: 'Собираем заказ',
            description: 'Комплектуем позиции на складе',
            icon: '📦',
        },
        {
            title: 'Передано в доставку',
            description: 'Упаковали и передали транспортной компании',
            icon: '🚚',
        },
        {
            title: 'Доставлено',
            description: 'Заказ уже у вас',
            icon: '🏭',
        },
    ];

    // 🔥 МАГИЯ ЗДЕСЬ: Находим индекс текущей активной стадии
    const currentStageIndex = stages.findIndex(stage => stage.title === order.status);
    // Если статус по какой-то причине не найден, по умолчанию делаем активной первую стадию (или можно поставить 0)
    const activeIndex = currentStageIndex !== -1 ? currentStageIndex : 0;


    return(
        <>
            <div className="order-success-page">
                <div className="order-success-container">
                    {/* HERO-секция с галочкой */}
                    <div className="success-hero">
                        <div className={`success-icon ${animated ? 'animated' : ''}`}>
                            <svg viewBox="0 0 52 52" className="checkmark">
                                <circle
                                cx="26"
                                cy="26"
                                r="25"
                                fill="none"
                                className="checkmark__circle"
                                />
                                <path
                                fill="none"
                                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                className="checkmark__check"
                                />
                            </svg>
                        </div>
                        <h1 className="success-title">Текущая стадия вашего заказа:</h1>
                    </div>
            
                    {/* Карточка с деталями заказа */}
                    <div className="order-card">
                        <div className="order-card__header">
                        <h2>Детали заказа</h2>
                        <span className="order-badge">Оплачен</span>
                        </div>
            
                        <div className="order-details-grid">
                        <div className="order-detail">
                            <span className="order-detail__label">Номер заказа</span>
                            <span className="order-detail__value">{order.number}</span>
                        </div>
                        <div className="order-detail">
                            <span className="order-detail__label">Сумма</span>
                            <span className="order-detail__value order-detail__value--accent">
                            {order.amount}
                            </span>
                        </div>
                        <div className="order-detail">
                            <span className="order-detail__label">Дата оплаты</span>
                            <span className="order-detail__value">{order.date}</span>
                        </div>
                            <div className="order-items">
                            <ul>
                                {order.items.map((item, idx) => (
                                <li key={idx}>
                                    {item}
                                </li>
                                ))}
                            </ul>
                            </div>
                        </div>
                    </div>
            
                    {/* Стадии заказа (Timeline) */}
                    <div className="stages-card">
                        <h2>Стадии заказа</h2>
                        <div className="timeline">
                            {stages.map((stage, idx) => {
                                // 🎯 Динамически определяем класс в зависимости от индекса
                                let dynamicStatus = 'pending';
                                if (idx < activeIndex) {
                                    dynamicStatus = 'done';
                                } else if (idx === activeIndex) {
                                    dynamicStatus = 'active';
                                }

                                return (
                                    <div
                                        key={idx}
                                        className={`timeline-step timeline-step--${dynamicStatus}`}
                                    >
                                        <div className="timeline-marker">
                                            <span className="timeline-icon">{stage.icon}</span>
                                        </div>
                                        
                                        {/* Линия рисуется везде, кроме последнего элемента */}
                                        {idx < stages.length - 1 && <div className="timeline-line" />}
                                        
                                        <div className="timeline-content">
                                            <h4>{stage.title}</h4>
                                            <p>{stage.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
            
                    {/* Блок поддержки */}
                    <div className="support-block">
                        <div className="support-icon">💬</div>
                        <div className="support-text">
                        <h4>Остались вопросы?</h4>
                        <p>
                            Наш менеджер на связи с 9:00 до 18:00 по МСК. Поможём с
                            документацией, подбором аналогов или сроками доставки.
                        </p>
                        <div className="support-contacts">
                            <a href="tel:+79215971">📞 +7 (812) 921-59-71</a>
                            <a href="mailto:support@ec-market.ru">✉️ support@ec-market.ru</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>      
        </>
    );

};

export default OrderStatus;
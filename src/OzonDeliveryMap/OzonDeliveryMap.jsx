import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import ApiOzonService from '../js/ApiOzonService.js';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

const OzonDeliveryMap = () => {
  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Загружаем данные из вашего .NET бэкенда
  useEffect(() => {
    fetch(ApiOzonService+'/v1/DeliveryPointList', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: ["pickup"], // только пункты выдачи
        pagination: { offset: 0, limit: 100 }
      })
    })
      .then(res => res.json())
      .then(data => {
        // Предполагаем, что ваш бэкенд уже возвращает обогащенные данные с адресами и координатами.
        // Если бэкенд возвращает только ID, то координаты для примера ниже сгенерированы/захардкожены.
        setPoints(data.delivery_points || []);
        setLoading(false);
        console.log(data);
      })
      .catch(err => {
        console.error("Ошибка загрузки ПВЗ:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ display: 'flex', width: '100%', height: '500px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* ЛЕВАЯ ПАНЕЛЬ: Список адресов */}
      <div style={{ width: '30%', overflowY: 'auto', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h3>Пункты выдачи Ozon</h3>
        {points.map((point) => (
          <div 
            key={point.delivery_point_id}
            onClick={() => setSelectedPoint(point)}
            style={{
              padding: '10px',
              marginBottom: '5px',
              backgroundColor: selectedPoint?.delivery_point_id === point.delivery_point_id ? '#e3f2fd' : '#f5f5f5',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          >
            {/* Вместо ID здесь будет point.address, когда вы подключите метод /info */}
            <strong>ПВЗ №{point.delivery_point_id}</strong>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              Способ отгрузки: {point.shipment_method_ids?.[0]}
            </div>
          </div>
        ))}
      </div>

      {/* ПРАВАЯ ПАНЕЛЬ: Интерактивная карта Яндекс */}
      <div style={{ width: '70%', height: '100%' }}>
        <YMaps query={{ apikey: 'ВАШ_API_КЛЮЧ_ЯНДЕКС_КАРТ' }}>
          <Map 
            // Центрируем карту по умолчанию (например, Москва) или по выбранному пункту
            state={{ 
              center: selectedPoint?.lat && selectedPoint?.lng 
                ? [selectedPoint.lat, selectedPoint.lng] 
                : [55.755814, 37.617635], 
              zoom: selectedPoint ? 15 : 10 
            }} 
            width="100%" 
            height="100%"
          >
            {/* Отрисовываем метки (Placemarks) для каждого ПВЗ */}
            {points.map((point) => {
              // Временные координаты для теста, пока ваш бэкенд не отдает реальные lat/lng из метода /info
              const fakeLat = 55.755814 + (point.delivery_point_id % 100) * 0.002;
              const fakeLng = 37.617635 + (point.delivery_point_id % 50) * 0.003;
              const coords = [point.lat || fakeLat, point.lng || fakeLng];

              return (
                <Placemark
                  key={point.delivery_point_id}
                  geometry={coords}
                  properties={{
                    // Текст внутри всплывающего балуна на карте
                    balloonContentBody: `
                      <div>
                        <h4>Озон ПВЗ №${point.delivery_point_id}</h4>
                        <p>Доступен для выбора при оформлении заказа</p>
                        <button onclick="window.selectOzonPoint(${point.delivery_point_id})">Выбрать этот пункт</button>
                      </div>
                    `
                  }}
                  options={{
                    // Стилизация метки под фирменный синий цвет Ozon
                    preset: 'islands#blueCircleDotIcon', 
                  }}
                  onClick={() => setSelectedPoint(point)}
                />
              );
            })}
          </Map>
        </YMaps>
      </div>

    </div>
  );
};

export default OzonDeliveryMap;

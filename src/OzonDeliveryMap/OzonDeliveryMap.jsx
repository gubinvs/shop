import React, { useEffect, useRef, useState } from 'react';
import "./ozonDeliveryMap.css";

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import ApiOzonService from '../js/ApiOzonService.js';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

const OzonDeliveryMap = () => {
  const [points, setPoints] = useState([]); // Текущий рабочий пул ПВЗ
  const [selectedPoint, setSelectedPoint] = useState(null);
  
  const [searchText, setSearchText] = useState("");      // Текст в инпуте
  const [loading, setLoading] = useState(true);          // Первая загрузка
  const [searching, setSearching] = useState(false);      // Процесс поиска

  const mapRef = useRef(null);

  // Центрирование карты и выбор точки
  const selectPoint = (point) => {
    if (!point) return;
    setSelectedPoint(point);
    if (mapRef.current) {
      mapRef.current.setCenter([point.lat, point.lng], 15, { duration: 300 });
    }
  };

  // Регистрируем глобальный метод для обработки кликов из балуна Яндекс.Карт
  useEffect(() => {
    window.handleSelectOzonPoint = (id) => {
      const point = points.find(p => String(p.delivery_point_id) === String(id));
      if (point) {
        selectPoint(point);
        if (mapRef.current) {
          mapRef.current.balloon.close();
        }
        console.log("ПВЗ выбран для заказа:", point);
      }
    };

    return () => {
      delete window.handleSelectOzonPoint;
    };
  }, [points]);

  // 1. Первичный запрос (Загружаем первые 50 точек напрямую через старый POST)
  useEffect(() => {
    const loadDefaultPoints = async () => {
      try {
        const response = await fetch(ApiOzonService + '/v1/DeliveryPointList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: ["pickup"],
            pagination: {
              offset: 0,
              limit: 50 // Грузим 50 штук в стейт
            }
          })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const deliveryPoints = data.delivery_points || [];
        setPoints(deliveryPoints);

        if (deliveryPoints.length > 0) {
          setSelectedPoint(deliveryPoints[0]); // Строго первый ЭЛЕМЕНТ [0]
        }
      } catch (error) {
        console.error("Ошибка начальной загрузки:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDefaultPoints();
  }, []);

  // 2. Живой поиск по загруженным точкам
  const query = searchText.toLowerCase().trim();
  const localFilteredPoints = points.filter((point) => {
    if (!query) return true;
    return (
      (point.name || "").toLowerCase().includes(query) ||
      (point.address || "").toLowerCase().includes(query) ||
      (point.delivery_point_number || "").toLowerCase().includes(query)
    );
  });

  // ЗОЛОТОЕ ПРАВИЛО: Если строка пустая — выводим строго 10 точек. 
  // Если пользователь что-то пишет — показываем все локальные совпадения.
  const visiblePoints = query ? localFilteredPoints : localFilteredPoints.slice(0, 10);

  // 3. Поиск (пока ищет локально по стейту, чтобы ничего не падало без вашей БД)
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!query) return;

    if (visiblePoints.length > 0) {
      selectPoint(visiblePoints[0]); // Центрируем на первом совпадении
    } else {
      alert("В текущем списке ничего не найдено. Нужен бэкенд с БД для поиска по всей стране.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="ozon-delivery-map-section">
      <div className="container ozon-delivery-map-section__container">
        
        {/* Левая панель с ПВЗ */}
        <div className="ozon-delivery-map-section__left-block">
          <h3 className="ozon-delivery-map-section__title">Пункты выдачи Ozon</h3>
          
          <form className="ozon-delivery-search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Введите город или адрес"
              className="ozon-delivery-search__input"
            />
            <button type="submit" className="ozon-delivery-search__button">
              Найти
            </button>
          </form>

          <div className="ozon-delivery-search__info">
            {query
              ? `Найдено совпадений: ${visiblePoints.length}`
              : `Показаны доступные ПВЗ: ${visiblePoints.length}`
            }
          </div>

          <div className="ozon-delivery-points">
            {visiblePoints.length === 0 ? (
              <div className="ozon-delivery-points__empty">
                Ничего не найдено.
              </div>
            ) : (
              visiblePoints.map((point) => (
                <div
                  key={point.delivery_point_id}
                  className={
                    selectedPoint?.delivery_point_id === point.delivery_point_id
                      ? "ozon-delivery__point ozon-delivery__point_selected"
                      : "ozon-delivery__point"
                  }
                  onClick={() => selectPoint(point)}
                >
                  <strong>{point.name}</strong>
                  <div>{point.address}</div>
                  <div className="ozon-delivery__point-storage">
                    Хранение: {point.storage_period_days} дней
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Правая часть: Карта */}
        <div className="ozon-delivery-map-section__map">
          <YMaps query={{ apikey: 'ВАШ_API_КЛЮЧ_ЯНДЕКС_КАРТ' }}>
            <Map
              instanceRef={mapRef}
              state={{
                center: selectedPoint
                  ? [selectedPoint.lat, selectedPoint.lng]
                  : points.length > 0
                    ? [points[0].lat, points[0].lng] // Исправлено на points[0]
                    : [55.755814, 37.617635],
                zoom: selectedPoint ? 15 : 10
              }}
              width="100%"
              height="100vh"
            >
              {visiblePoints.map((point) => {
                const isSelected = selectedPoint?.delivery_point_id === point.delivery_point_id;
                const schedule = point.working_hours || "Не указано";

                return (
                  <Placemark
                    key={point.delivery_point_id}
                    geometry={[point.lat, point.lng]}
                    properties={{
                      balloonContentBody: `
                        <div class="ozon-balloon">
                          <div class="ozon-balloon__header">
                            <span class="ozon-balloon__badge">Ozon ПВЗ</span>
                            <h4 class="ozon-balloon__title">${point.name}</h4>
                          </div>
                          <div class="ozon-balloon__body">
                            <p class="ozon-balloon__text"><strong>Адрес:</strong> ${point.address}</p>
                            <p class="ozon-balloon__text"><strong>Режим работы:</strong> ${schedule}</p>
                            <div class="ozon-balloon__meta">
                              <span class="ozon-balloon__storage">📦 Срок хранения: ${point.storage_period_days} дн.</span>
                            </div>
                          </div>
                          <button 
                            class="ozon-balloon__btn" 
                            onclick="window.handleSelectOzonPoint('${point.delivery_point_id}')"
                          >
                            Выбрать этот пункт
                          </button>
                        </div>
                      `
                    }}
                    options={{
                      preset: isSelected ? 'islands#redCircleDotIcon' : 'islands#blueCircleDotIcon',
                      balloonMinWidth: 280,
                      balloonMaxWidth: 320,
                      balloonCloseButton: true,
                    }}
                  />
                );
              })}
            </Map>
          </YMaps>
        </div>

      </div>
    </section>
  );
};

export default OzonDeliveryMap;

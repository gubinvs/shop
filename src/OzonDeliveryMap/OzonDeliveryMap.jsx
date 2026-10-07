import React, { useEffect, useRef, useState } from 'react';
import "./ozonDeliveryMap.css";
import {deliveryCheckout} from "../js/deliveryCheckout.js";

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import ApiOzonService from '../js/ApiOzonService.js';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

const OzonDeliveryMap = () => {
  const [points, setPoints] = useState([]); // Текущие отображаемые ПВЗ (дефолтные или найденные)
  const [selectedPoint, setSelectedPoint] = useState(null);
  // Пункт назначения
  const [pointDestination, setPointDestination] = useState(0)
  
  const [searchText, setSearchText] = useState("");      // Текст в инпуте
  const [loading, setLoading] = useState(true);          // Первая загрузка приложения
  const [searching, setSearching] = useState(false);      // Фоновый индикатор поиска

  const mapRef = useRef(null);

  // Инициализируем состояние значением '+7 '
  const [phone, setPhone] = useState('+7 ');
  
  const [phoneInput, setPhoneInput] = useState(false); // Показывать или нет форму ввода телефона
  const [priceGoods, setPriceGoods] = useState(1500); // Стоимость товара
  const [deliveryPrice, setDeliveryPrice] = useState(0); // Расчетная стоимость доставки

  // Функция для наложения маски: +7 922 354-00-43
  const formatPhone = (value) => {
    // Оставляем только цифры, идущие после +7
    const digits = value.slice(2).replace(/\D/g, '');
    
    let result = '+7';

    if (digits.length > 0) result += ' ' + digits.substring(0, 3);
    if (digits.length > 3) result += ' ' + digits.substring(3, 6);
    if (digits.length > 6) result += '-' + digits.substring(6, 8);
    if (digits.length > 8) result += '-' + digits.substring(8, 10);

    return result;
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Защита от стирания префикса
    if (!inputValue.startsWith('+7')) {
      setPhone('+7 ');
      return;
    }

    // Форматируем строку
    const formattedValue = formatPhone(inputValue);

    // Ограничиваем длину (максимум 16 символов для "+7 922 354-00-43")
    if (formattedValue.length <= 16) {
      setPhone(formattedValue);
    }
  };

  const handleKeyDown = (e) => {
    // Если пользователь нажимает Backspace, а в конце пробел или дефис,
    // удаляем его вместе с предыдущей цифрой, чтобы ввод не «застревал»
    if (e.key === 'Backspace') {
      const lastChar = phone[phone.length - 1];
      if (lastChar === ' ' || lastChar === '-') {
        setPhone(phone.slice(0, -2));
        e.preventDefault();
      }
    }
  };

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

  // Общая функция для выполнения POST-запросов к вашей БД
  const fetchPointsFromDb = async (searchQuery) => {
    const response = await fetch(`${ApiOzonService}/v1/DeliveryPointSearch`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ query: searchQuery })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  };

  // 1. ПЕРВИЧНЫЙ ЗАПРОС: Загружаем стартовые точки при пустой строке
  const loadDefaultPoints = async () => {
    try {
      const deliveryPoints = await fetchPointsFromDb("");
      setPoints(deliveryPoints || []);

      // if (deliveryPoints && deliveryPoints.length > 0) {
      //   setSelectedPoint(deliveryPoints[0]); 
      // }
    } catch (error) {
      console.error("Ошибка начальной загрузки из БД:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDefaultPoints();
  }, []);

  // 2. ЖИВОЙ ПОИСК «НА ГОРЯЧУЮ» С DEBOUNCE
  useEffect(() => {
    const query = searchText.trim();

    // Если строку стёрли — плавно возвращаем дефолтный список точек
    if (query.length === 0) {
      setSearching(false);
      loadDefaultPoints();
      return;
    }

    // Начинаем поиск в БД, только если ввели хотя бы 3 символа
    if (query.length < 3) return;

    setSearching(true);

    // Включаем таймер задержки на 400 мс (защита от спама базы при быстром наборе)
    const delayDebounceFn = setTimeout(async () => {
      try {
        const data = await fetchPointsFromDb(query);
        setPoints(data || []);

        // Автоматически фокусируемся на первом результате живого поиска
        // if (data && data.length > 0) {
        //   setSelectedPoint(data[0]);
        // }
      } catch (error) {
        console.error("Ошибка живого поиска по БД:", error);
      } finally {
        setSearching(false);
      }
    }, 400);

    // Очистка предыдущего таймера при вводе следующей буквы
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  // 3. ОБРАБОТЧИК КНОПКИ «НАЙТИ» И НАЖАТИЯ ENTER
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Так как поиск уже отработал на горячую, кнопка просто центрирует карту на первом найденном элементе
    if (points.length > 0) {
      selectPoint(points[0]);
    } else {
      alert("Ничего не найдено по этому адресу.");
    }
  };

  // Переход на ввод телефона и дальнейшую проверку возможности доставки
  const proceedToCheckout = (pointId) => {
      // Записали идентификатор ПВЗ
      setPointDestination(pointId);
      setSelectedPoint(null);
      setPhoneInput(true);   
  };


  if (loading) return <LoadingSpinner />;

  return (
    <section className="ozon-delivery-map-section">
      <div className="container ozon-delivery-map-section__container">          
        {phoneInput?
          <>
            <div className="phone-add-number-section">
                <div className="phone-add-number-section__form">
                      <div className="pans-form__title">Укажите номер телефона получателя:</div>
                      <input
                          type="tel"
                          className="pans-form__phone"
                          value={phone}
                          onChange={handleChange}
                          placeholder="+79991234567"
                        />
                      <div 
                          className="pans-form__botton"
                          onClick={() => deliveryCheckout({phone, pointDestination, priceGoods, setDeliveryPrice})}
                      >Расчитать стоимость доставки</div>
                </div>
            </div>
          </>
          :""
        }

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
          </form>

          <div className="ozon-delivery-search__info">
            {searching 
              ? "Ищем в базе данных..." 
              : `Найдено пунктов: ${points.length}`
            }
          </div>

          <div className="ozon-delivery-points">
            {points.length === 0 ? (
              <div className="ozon-delivery-points__empty">
                Ничего не найдено. Попробуйте уточнить адрес.
              </div>
            ) : (
              points.map((point) => (
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
                </div>
              ))
            )}
          </div>
        </div>

        {/* Правая часть: Карта */}
        <div className="ozon-delivery-map-section__map">
          <YMaps query={{ apikey: '34e50958-b7c2-4b13-963d-8e7f3b90843b' }}>
              {selectedPoint !== null?
                <>
                  <div className="ozon-delivery-map-section__info-poind">
                      <div 
                          className="ozon-delivery-map-section__button-next"
                          onClick={() => proceedToCheckout(selectedPoint.delivery_point_id)}
                      >Продолжить оформление</div>
                      <div 
                          className="ozon-delivery-map-section__button-close"
                          onClick={()=>{setSelectedPoint(null)}}
                      >X</div>
                      <div className="ozon-delivery-map-section__info-point">
                        <strong>Выбран пункт выдачи по адресу:</strong>
                        <div>{selectedPoint.address}</div>
                      </div>
                  </div>
                </>
                :
                ""
            }
            <Map
              
              instanceRef={mapRef}
              state={{
                center: selectedPoint
                  ? [selectedPoint.lat, selectedPoint.lng]
                  : points.length > 0
                    ? [points[0].lat, points[0].lng] 
                    : [55.755814, 37.617635],
                zoom: selectedPoint ? 15 : 10
              }}
              width="100%"
              height="100vh"
            >
              {points.map((point) => {
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
                    }}
                    onClick={() => selectPoint(point)}
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
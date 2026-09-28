
import React, { useEffect, useRef, useState } from 'react';
import "./ozonDeliveryMap.css";

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import ApiOzonService from '../js/ApiOzonService.js';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";


const OzonDeliveryMap = () => {

  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);

  const mapRef = useRef(null);


  /*
   * Загружаем только первые 30 ПВЗ
   */
  useEffect(() => {

    const loadDeliveryPoints = async () => {

      try {

        const response = await fetch(
          ApiOzonService + '/v1/DeliveryPointList',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: ["pickup"],
              pagination: {
                offset: 0,
                limit: 30
              }
            })
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        const deliveryPoints = data.delivery_points || [];

        setPoints(deliveryPoints);

        if (deliveryPoints.length > 0) {
          setSelectedPoint(deliveryPoints[0]);
        }

        console.log("Загружено ПВЗ:", deliveryPoints.length);

      } catch (error) {

        console.error(
          "Ошибка загрузки ПВЗ:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    loadDeliveryPoints();

  }, []);


  /*
   * Поиск по тексту
   *
   * Ищем одновременно:
   * - название
   * - адрес
   * - номер ПВЗ
   */
  const filteredPoints = points.filter((point) => {

    if (!searchQuery.trim()) {
      return true;
    }

    const query = searchQuery
      .toLowerCase()
      .trim();

    const name = (
      point.name || ""
    ).toLowerCase();

    const address = (
      point.address || ""
    ).toLowerCase();

    const number = (
      point.delivery_point_number || ""
    ).toLowerCase();

    return (
      name.includes(query) ||
      address.includes(query) ||
      number.includes(query)
    );

  });


  /*
   * Выбор ПВЗ
   */
  const selectPoint = (point) => {

    setSelectedPoint(point);

    if (mapRef.current) {

      mapRef.current.setCenter(
        [point.lat, point.lng],
        15,
        {
          duration: 300
        }
      );

    }

  };


  /*
   * Поиск
   *
   * Пока поиск работает по загруженным ПВЗ.
   * На следующем этапе можно подключить
   * геокодирование Яндекса и запрос ПВЗ
   * непосредственно вокруг найденного адреса.
   */
  const handleSearch = (event) => {

    event.preventDefault();

    setSearchQuery(searchText);

    const query = searchText
      .toLowerCase()
      .trim();

    if (!query) {
      return;
    }

    const foundPoint = points.find((point) => {

      const name = (
        point.name || ""
      ).toLowerCase();

      const address = (
        point.address || ""
      ).toLowerCase();

      const number = (
        point.delivery_point_number || ""
      ).toLowerCase();

      return (
        name.includes(query) ||
        address.includes(query) ||
        number.includes(query)
      );

    });


    /*
     * Если нашли ПВЗ —
     * выбираем его и центрируем карту
     */
    if (foundPoint) {

      selectPoint(foundPoint);

    }

  };


  if (loading) {
    return <LoadingSpinner />;
  }


  return (

    <section className="ozon-delivery-map-section">

      <div className="container ozon-delivery-map-section__container">


        {/* Левая часть */}

        <div className="ozon-delivery-map-section__left-block">

          <h3 className="ozon-delivery-map-section__title">
            Пункты выдачи Ozon
          </h3>


          {/* Поиск */}

          <form
            className="ozon-delivery-search"
            onSubmit={handleSearch}
          >

            <input
              type="text"
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
              placeholder="Город или адрес"
              className="ozon-delivery-search__input"
            />

            <button
              type="submit"
              className="ozon-delivery-search__button"
            >
              Найти
            </button>

          </form>


          {/* Информация */}

          <div className="ozon-delivery-search__info">

            {searchQuery
              ? `Найдено: ${filteredPoints.length}`
              : `Показаны ближайшие доступные ПВЗ: ${points.length}`
            }

          </div>


          {/* Список ПВЗ */}

          <div className="ozon-delivery-points">

            {filteredPoints.length === 0 ? (

              <div className="ozon-delivery-points__empty">

                По вашему запросу ПВЗ не найден.

              </div>

            ) : (

              filteredPoints.map((point) => (

                <div
                  key={point.delivery_point_id}

                  className={
                    selectedPoint?.delivery_point_id ===
                    point.delivery_point_id
                      ? "ozon-delivery__point ozon-delivery__point_selected"
                      : "ozon-delivery__point"
                  }

                  onClick={() =>
                    selectPoint(point)
                  }
                >

                  <strong>
                    {point.name}
                  </strong>

                  <div>
                    {point.address}
                  </div>

                  <div className="ozon-delivery__point-storage">

                    Хранение:{" "}
                    {point.storage_period_days} дней

                  </div>

                </div>

              ))

            )}

          </div>

        </div>


        {/* Карта */}

        <div className="ozon-delivery-map-section__map">

          <YMaps
            query={{
              apikey: 'ВАШ_API_КЛЮЧ_ЯНДЕКС_КАРТ'
            }}
          >

            <Map

              instanceRef={mapRef}

              state={{
                center:
                  selectedPoint
                    ? [
                        selectedPoint.lat,
                        selectedPoint.lng
                      ]

                    : points.length > 0
                      ? [
                          points[0].lat,
                          points[0].lng
                        ]

                      : [
                          55.755814,
                          37.617635
                        ],

                zoom:
                  selectedPoint
                    ? 15
                    : 10
              }}

              width="100%"
              height="100%"
            >

              {points.map((point) => {

                const isSelected =
                  selectedPoint?.delivery_point_id ===
                  point.delivery_point_id;


                return (

                  <Placemark

                    key={
                      point.delivery_point_id
                    }

                    geometry={[
                      point.lat,
                      point.lng
                    ]}


                    properties={{
                      balloonContentBody: `
                        <div>
                          <strong>
                            ${point.name}
                          </strong>

                          <div>
                            ${point.address}
                          </div>

                          <div style="margin-top:8px">
                            Хранение:
                            ${point.storage_period_days}
                            дней
                          </div>
                        </div>
                      `
                    }}


                    options={{
                      preset:
                        isSelected
                          ? 'islands#redDotIcon'
                          : 'islands#blueCircleDotIcon'
                    }}


                    onClick={() =>
                      selectPoint(point)
                    }

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
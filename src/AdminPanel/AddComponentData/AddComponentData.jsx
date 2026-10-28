import { use, useEffect, useState } from "react";
import "./addComponentData.css"
import { getValue } from "@testing-library/user-event/dist/utils";
import react from "react";


const AddComponentData =()=> {

    {/* --- Данные вводимые в форму для запоминания -- */}
    const [vendorCode, setVendorCode] = useState('');
    const [nameComponent, setNameComponent] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [bestseller, setBestseller] = useState(0);
    const [deliveryТime, setDeliveryТime] = useState(0);
    const [price, setPrice] = useState(0);
    const [chapter, setChapter] = useState('');
    const [linkPage, setLinkPage] = useState('');
    const [basketImgPath, setBasketImgPath] = useState('');
    const [imgLinkPage, setImgLinkPage] = useState(''); // Ссылка на основную картинку товара
    const [imgLinkIconCard, setImgLinkIconCard] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [origin, setOrigin] = useState('');
    const [ozonLink, setOzonLink] = useState('');
    // =====================================================
    const [dopImages, setDopImages] = useState([]);
    const [dopImagLink, setDopImagLink] = useState('');
    // =====================================================
    const [discriptionParam, setDiscriptionParam] = useState([]);
    const [discrParamName, setDiscrParamName] = useState('');
    const [discrParamParam, setDiscrParamParam] = useState('');
    // =====================================================
    const [warehouse, setWarehouse] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState("Санкт-Петербург"); // По умолчанию для селекта ставим "Санкт-Петербург", так как это первая опция
    const [warehouseQuantity, setWarehouseQuantity] = useState("");
    // =====================================================
    const [characteristics, setCharacteristics] = useState([]);
    const [charName, setCharName] = useState("");
    const [charValue, setCharValue] = useState("");
    // =====================================================
    const [file, setFile] = useState([]);
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    // =====================================================
    const addDataServer = () => {
        var reguest = {
            mainImagePage: imgLinkPage,
            vendorCode: vendorCode,
            nameComponent: nameComponent,
            manufacturer: manufacturer,
            quantity: quantity,
            deliveryТime: deliveryТime,
            price: price,
            bestseller: bestseller,
            chapter: chapter,
            linkPage: linkPage, 
            basketImgPath: basketImgPath,
            productDescription: productDescription,
            origin: origin,
            ozonLink: ozonLink,
            dopImages: dopImages,
            discriptionParam: discriptionParam,
            warehouse: warehouse,
            characteristics: characteristics,
            file: file
        };

        // Отправляем запрос на сервер
        try 
        {
            var response = await fetch(`${ApiUrl}/v1/AddNewProductDataSystem`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reguest),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.text);
                } else {
                    console.error("Ошибка при получении данных в ответе сервера API");
                }
        } catch (error) {
            console.error("Ошибка сети или API:", error);
        }
    };

    // Добавление формы ввода данных о ссылках на дополнительные картинки, (не более 3 шт.)
    const addDopImagesLink = (itemLink) => {
        if(itemLink === '') {return;}

        var newDopImagesArray = [
            ...dopImages,
            itemLink
        ]

        setDopImages(newDopImagesArray);

        setDopImagLink('');
    }

    // Добавляем данные в массив основных параметров товара в главной секции страницы товара
    const addDiscriptionParam = (itemName, itemParam) => {
        if(itemName === '' || itemParam === ''){return;}

        var newDiscriptionParamArray = [
            ...discriptionParam,
            {
                name: itemName,
                param: itemParam
            }
        ]

        setDiscriptionParam(newDiscriptionParamArray);
        setDiscrParamName('');
        setDiscrParamParam('');

    };

    // Добавляем наличие на складах
    const addWarehouse = (name, quantity) => {
        if (!quantity) return; // Не добавляем, если количество не заполнено
        
        setWarehouse([
            ...warehouse,
            { name: name, quantity: Number(quantity) }
        ]);
        
        // Сбрасываем только инпут количества после добавления
        setWarehouseQuantity("");
    };

    // Функция добавления новой характеристики в массив
    const addCharacteristic = (name, value) => {
    if (!name.trim() || !value.trim()) return; // Не добавляем пустые поля
    
    setCharacteristics([
        ...characteristics,
        { name: name.trim(), value: value.trim() }
    ]);
    
    // Очищаем инпуты после успешного добавления
    setCharName("");
    setCharValue("");
    };

    // Функция добавления нового файла в массив
    const addFile = (name, url) => {
    if (!name.trim() || !url.trim()) return; // Проверка на пустые поля
    
    setFile([
        ...file,
        { name: name.trim(), url: url.trim() }
    ]);
    
    // Очищаем инпуты после добавления
    setFileName("");
    setFileUrl("");
    };

    return(
        <>
            <div className="add-component-data__container">
                <h1 className="add-component-data__title">Добавление нового товара в базу данных:</h1>
                <div className="result-regust-data-block">
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Артикул товара:</div>
                        <input 
                            className="acd-data-block__input" 
                            value={vendorCode}
                            onChange={(e) => {
                                setVendorCode(e.target.value); 
                            }} 
                        />
                    </div>
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Наименование товара:</div>
                        <input 
                            className="acd-data-block__input" 
                            value={nameComponent}
                            onChange={(e) => {
                                setNameComponent(e.target.value); 
                            }} 
                        />
                    </div>
                </div>

                <div className="result-regust-data-block">
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Фирма производитель:</div>
                        <input 
                            className="acd-data-block__input" 
                            value={manufacturer}
                            onChange={(e) => {
                                setManufacturer(e.target.value); 
                            }} 
                        />
                    </div>
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Срана производитель:</div>
                        <input 
                            className="acd-data-block__input" 
                            value={origin}
                            onChange={(e) => {
                                setOrigin(e.target.value); 
                            }} 
                        />
                    </div>
                </div>

                <div className="result-regust-data-block">
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Количество на складе:</div>
                        <input 
                            type="number" 
                            className="acd-data-block__input acd-data-block__input_number" 
                            min={0} 
                            value={quantity}
                            onChange={(e) => {
                                setQuantity(e.target.value); 
                            }} 
                        />
                        <div className="acd-data-block__name">Бесцеллер?</div>
                        <input 
                            type="number" 
                            className="acd-data-block__input acd-data-block__input_number" 
                            min={0} 
                            max={1} 
                            value={bestseller}
                            onChange={(e) => {
                                setBestseller(e.target.value); 
                            }} 
                        />
                        <div className="acd-data-block__name">Дней доставки?</div>
                        <input 
                            type="number" 
                            className="acd-data-block__input acd-data-block__input_number" 
                            min={0} 
                            max={99} 
                            value={deliveryТime}
                            onChange={(e) => {
                                setDeliveryТime(e.target.value); 
                            }} 
                        />
                    </div>   
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Цена продажи товара:</div>
                        <input 
                            className="acd-data-block__input" 
                            min={0} 
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value); 
                            }} 
                        />
                    </div>
                </div>

                <div className="result-regust-data-block">
                   <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Каталог товара:</div>
                        <select 
                            className="acd-data-block__select acd-data-block__select_catalog" // Изменили класс для стилизации селекта
                            value={chapter}
                            onChange={(e) => {
                                setChapter(e.target.value); 
                            }} 
                        >
                            {/* Опция-заглушка по умолчанию */}
                            <option value="" disabled>Выберите каталог...</option>
                            
                            {/* Ваши варианты категорий */}
                            <option value="Модульное оборудование">Модульное оборудование</option>
                            <option value="Блоки питания">Блоки питания</option>
                            <option value="Средства монтажа">Средства монтажа</option>
                            <option value="Автоматические выключатели">Автоматические выключатели</option>
                            <option value="Программируемые контроллеры">Программируемые контроллеры</option>
                            <option value="Модули расширения">Модули расширения PLK</option>
                            <option value="Индикация">Индикация</option>
                            <option value="Реле и аксессуары">Реле и аксессуары</option>
                            <option value="Устройства плавного пуска">Устройства плавного пуска</option>
                            <option value="Средства измерения и учета">Средства измерения и учета</option>
                            <option value="Оборудование высоковольтное">Оборудование высоковольтное</option>
                            <option value="Преобразователи частоты">Преобразователи частоты</option>
                            <option value="Инструмент электромонтажный">Инструмент электромонтажный</option>
                            <option value="Корпуса">Корпуса</option>
                            <option value="Силовые контакторы">Силовые контакторы</option>
                            <option value="Типовые НКУ">Типовые НКУ</option>
                        </select>
                    </div>
                </div>

                <div className="result-regust-data-block">
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name acd-data-block__name_min">Ссылка на страницу товара: /SearchResults?vendorCode=LC1D25M7</div>
                        <input 
                            className="acd-data-block__input" 
                            value={linkPage}
                            onChange={(e) => {
                                setLinkPage(e.target.value); 
                            }} 
                        />
                    </div>
                </div>
                
                <div className="result-regust-data-block">
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Ссылка на основную картинку товара:</div>
                        <input 
                            className="acd-data-block__input" 
                            value={imgLinkPage}
                            onChange={(e) => {
                                // 2. Записываем текущее значение из поля ввода
                                setImgLinkPage(e.target.value); 
                            }} 
                        />
                    </div>
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Ссылка на картинку для корзины:</div>
                        <input 
                            className="acd-data-block__input" 
                            value={basketImgPath}
                            onChange={(e) => {
                                setBasketImgPath(e.target.value); 
                            }} 
                        />
                    </div>
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Ссылка на картинку для карточки:</div>
                        <input 
                            className="acd-data-block__input" 
                            value={imgLinkIconCard}
                            onChange={(e) => {
                                setImgLinkIconCard(e.target.value); 
                            }} 
                        />
                    </div>
                </div>

                <div className="result-regust-data-block">
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Описание товара:</div>
                        <textarea 
                            className="acd-data-block__input acd-data-block__input_textarea" 
                            value={productDescription}
                            onChange={(e) => {
                                setProductDescription(e.target.value); 
                            }} 
                        />
                    </div>
                </div>
            
                <div className="result-regust-data-block">
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Ссылка на страницу ОЗОН:</div>
                        <input 
                            className="acd-data-block__input" 
                            value={ozonLink}
                            onChange={(e) => {
                                setOzonLink(e.target.value); 
                            }}
                        />
                    </div>
                </div>

                <div className="result-regust-data-block">
                    <h3 className="add-component-data__title">Ссылки на дополнительные картинки товара:</h3>
                    {dopImages.map((item, index)=>{
                    return(
                            <>
                                <div className="add-component-data__data-block">
                                    <div className="acd-data-block__name">Дополнительная ссылка № {index+1}</div>
                                    <div className="acd-data-block__name">{item}</div>
                                </div>
                            </>
                        ); 
                    })}
                    {dopImages.length < 3 ?
                        <>
                            <div className="add-component-data__data-block">
                                <div className="acd-data-block__name">Дополнительная ссылка</div>
                                <input 
                                    className="acd-data-block__input" 
                                    value={dopImagLink}
                                    onChange={(e)=>{setDopImagLink(e.target.value)}}
                                />
                            </div>
                            <div 
                                className="acd-data-block__add-data-button"
                                onClick={()=>{addDopImagesLink(dopImagLink)}}
                            >+</div>
                        </>
                    :""}
                </div>

                <div className="result-regust-data-block">
                    <h3 className="add-component-data__title">Основные параметры товара в главной секции:</h3>
                    <div className="add-component-data__data-block">
                        <div className="acd-data-block__name">Наименование параметра:</div>
                        <div className="acd-data-block__name">Значение параметра:</div>
                    </div>
                    {discriptionParam.map((item, index)=>{
                        return(
                            <>
                                <div className="add-component-data__data-block">
                                    <div className="acd-data-block__name acd-data-block__name_result">{item.name}</div>
                                    <div className="acd-data-block__name acd-data-block__name_result">{item.param}</div>
                                </div>
                            </>
                        );
                    })}
                    {discriptionParam.length <= 10?
                        <>
                            <div className="add-component-data__data-block">
                                <input 
                                    className="acd-data-block__input 
                                    acd-data-block__input_param" 
                                    value={discrParamName}
                                    onChange={(e)=>setDiscrParamName(e.target.value)}
                                />
                                <input 
                                    className="acd-data-block__input" 
                                    value={discrParamParam}
                                    onChange={(e)=>setDiscrParamParam(e.target.value)}
                                
                                />
                            </div>
                            <div 
                                className="acd-data-block__add-data-button"
                                onClick={()=>{addDiscriptionParam(discrParamName, discrParamParam)}}
                            >+</div>
                        </>
                    :""}
                </div>
                
                <div className="result-regust-data-block">
                    <h2 className="add-component-data__title">Наличие на складах:</h2>
                    {/* 1. Вывод списка уже добавленных складов */}
                    {warehouse.map((item, index) => {
                        return (   
                            <>
                                <div className="add-component-data__data-block">
                                    <div className="acd-data-block__name">Наименование склада:</div>
                                    <div className="acd-data-block__name">Наличие на складе:</div>
                                </div>
                                <div key={index} className="add-component-data__data-block">
                                    <div className="acd-data-block__name acd-data-block__name_result">{item.name}</div>
                                    <div className="acd-data-block__name acd-data-block__name_result">{item.quantity} шт.</div>
                                </div>                            
                            </>
                        );
                    })}

                    {/* 2. Форма ввода нового склада (показывается, например, если добавлено меньше 10) */}
                    {warehouse.length <= 10 ? (
                        <>
                         
                            <div className="add-component-data__data-block">
                                <select 
                                    className="acd-data-block__select"
                                    value={selectedWarehouse}
                                    onChange={(e) => setSelectedWarehouse(e.target.value)}
                                >
                                    <option value="Санкт-Петербург"> Санкт-Петербург </option>
                                    <option value="ОЗОН"> ОЗОН </option>
                                </select>
                                <input 
                                    type="number" 
                                    className="acd-data-block__input acd-data-block__input_number" 
                                    min={0} 
                                    max={99} 
                                    value={warehouseQuantity}
                                    onChange={(e) => setWarehouseQuantity(e.target.value)}
                                />
                            </div>
                            <div 
                                className="acd-data-block__add-data-button"
                                onClick={() => addWarehouse(selectedWarehouse, warehouseQuantity)}
                            >+</div>
                        </>
                    ) : ""}                    
                </div>

                <div className="result-regust-data-block">
                    <h3 className="add-component-data__title">Характеристики товара:</h3>
                    {/* 1. Вывод списка уже добавленных характеристик */}
                    {characteristics.map((item, index) => {
                        return ( 
                            <>
                                <div className="add-component-data__data-block">
                                    <div className="acd-data-block__name">Наименование характеристики:</div>
                                    <div className="acd-data-block__name">Значение характеристики:</div>
                                </div>
                                <div key={index} className="add-component-data__data-block">
                                    <div className="acd-data-block__name acd-data-block__name_result">{item.name}</div>
                                    <div className="acd-data-block__name acd-data-block__name_result">{item.value}</div>
                                </div>
                            </>

                        );
                    })}

                    {/* 2. Форма для ввода новой характеристики (например, если их меньше 20) */}
                    {characteristics.length <= 20 ? (
                        <>
                           
                            <div className="add-component-data__data-block">
                                <input 
                                    className="acd-data-block__input acd-data-block__input_param" 
                                    value={charName}
                                    onChange={(e) => setCharName(e.target.value)}
                                    placeholder="Например, Материал"
                                />
                                <input 
                                    className="acd-data-block__input" 
                                    value={charValue}
                                    onChange={(e) => setCharValue(e.target.value)}
                                    placeholder="Например, Хлопок"
                                />
                            </div>
                            <div 
                                className="acd-data-block__add-data-button"
                                onClick={() => addCharacteristic(charName, charValue)}
                            >+</div>
                        </>
                    ) : ""}
                </div>    
                
                <div className="result-regust-data-block">
                    <h3 className="add-component-data__title">Ссылки на файлы документации:</h3>
                    {/* 1. Вывод списка уже добавленных документов */}
                    {file.map((item, index) => {
                        return (    
                            <>
                                <div className="add-component-data__data-block">
                                    <div className="acd-data-block__name">Наименование файла документации:</div>
                                    <div className="acd-data-block__name">Ссылка на файл:</div>
                                </div>
                                <div key={index} className="add-component-data__data-block">
                                    <div className="acd-data-block__name acd-data-block__name_result">{item.name}</div>
                                    <div className="acd-data-block__name acd-data-block__name_result">
                                        {/* Выводим ссылку как кликабельный тег <a> */}
                                        <a href={item.url} target="_blank" rel="noreferrer" className="acd-data-block__link">
                                            {item.url}
                                        </a>
                                    </div>
                                </div>
                            </> 
                        );
                    })}

                    {/* 2. Форма ввода нового файла (показывается, если файлов, например, меньше 10) */}
                    {file.length <= 10 ? (
                        <>
                       
                            <div className="add-component-data__data-block">
                                <input 
                                    className="acd-data-block__input acd-data-block__input_param" 
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    placeholder="Например, Инструкция по сборке"
                                />
                                <input 
                                    className="acd-data-block__input" 
                                    value={fileUrl}
                                    onChange={(e) => setFileUrl(e.target.value)}
                                    placeholder="Например, https://example.com"
                                />
                            </div>
                            <div 
                                className="acd-data-block__add-data-button"
                                onClick={() => addFile(fileName, fileUrl)}
                            >+</div>
                        </>
                    ) : ""}
               
                </div>

                <div className="result-regust-data-block">
                    <h3 className="add-component-data__title">Загружаемые картинки товара</h3>
                    <div className="add-component-data__img-block">
                        <img 
                            src={imgLinkPage} 
                            className="addcd-img-block__main-img"
                        />
                        <div className="addcd-img-block__dop-img-block">
                            {dopImages.map((item, index)=>{
                                return(
                                    <>
                                        <img 
                                            src={item} 
                                            className="addcd-img-block__dop-img"
                                        />
                                    </>
                                );
                            })}
                        </div> 
                    </div>                    
                </div>

                <div 
                    className="reguest-button"
                    onClick={addDataServer}
                >Записать данные товара</div>
            </div>
        </>
    );

};

export default AddComponentData;
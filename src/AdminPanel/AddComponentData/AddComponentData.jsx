import { use, useEffect, useState } from "react";
import "./addComponentData.css"
import { getValue } from "@testing-library/user-event/dist/utils";


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
    const [dopImages, setDopImages] = useState([]);
    const [dopImagLink, setDopImagLink] = useState('');
    const [discriptionParam, setDiscriptionParam] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [characteristics, setCharacteristics] = useState([]);
    const [file, setFile] = useState([]);


    const addDopImagesLink = () => {
        var newDopImagesArray = [
            ...dopImages,
            dopImagLink
        ]

        setDopImages(newDopImagesArray);

        setDopImagLink('');
    }

    return(
        <>
            <div className="add-component-data__container">
                <h1 className="add-component-data__title">Добавление нового товара в базу данных:</h1>
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
                <div className="add-component-data__data-block">
                    <div className="acd-data-block__name">Каталог товара:</div>
                    <input 
                        className="acd-data-block__input" 
                        value={chapter}
                        onChange={(e) => {
                            setChapter(e.target.value); 
                        }} 
                    />
                </div>
                <div className="add-component-data__data-block">
                    <div className="acd-data-block__name">Ссылка на страницу товара:</div>
                    <input 
                        className="acd-data-block__input" 
                        value={linkPage}
                        onChange={(e) => {
                            setLinkPage(e.target.value); 
                        }} 
                    />
                </div>
                <div className="add-component-data__data-block">
                    <div className="acd-data-block__name">Ссылка на картинку товара:</div>
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
                <div className="add-component-data__data-block">
                    <div className="acd-data-block__name">Описание товара:</div>
                    <input 
                        className="acd-data-block__input" 
                        value={productDescription}
                        onChange={(e) => {
                            setProductDescription(e.target.value); 
                        }} 
                    />
                </div>
                
                <br/><br/>
                
                <h2 className="add-component-data__title">Дополнительная информация:</h2>

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
                
                <br/><br/>
                
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
                            onClick={addDopImagesLink}
                        >+</div>
                    </>
                :""}


                <br/><br/><br/><br/>
                <h3 className="add-component-data__title">Основные параметры:</h3>
                <div className="add-component-data__data-block">
                    <div className="acd-data-block__name">Наименование параметра:</div>
                    <div className="acd-data-block__name">Значение параметра:</div>
                </div>
                <div className="add-component-data__data-block">
                    <input className="acd-data-block__input acd-data-block__input_param" />
                    <input className="acd-data-block__input" />
                </div>
                <div className="acd-data-block__add-data-button">+</div>

                <br/><br/>
                
                <h3 className="add-component-data__title">Наличие на складах:</h3>
                <div className="add-component-data__data-block">
                    <div className="acd-data-block__name">Наименование склада:</div>
                    <div className="acd-data-block__name">Наличие на складе:</div>
                </div>
                <div className="add-component-data__data-block">
                    <select className="acd-data-block__select">
                        <option> Санкт-Петербург </option>
                        <option> ОЗОН </option>
                    </select>
                    <input type="number" className="acd-data-block__input acd-data-block__input_number" min={0} max={99} />
                </div>
                <div className="acd-data-block__add-data-button">+</div>

                <br/><br/>

                <h3 className="add-component-data__title">Характеристики товара:</h3>
                <div className="add-component-data__data-block">
                    <div className="acd-data-block__name">Наименование характеристики:</div>
                    <div className="acd-data-block__name">Значение характеристики:</div>
                </div>
                <div className="add-component-data__data-block">
                    <input className="acd-data-block__input acd-data-block__input_param" />
                    <input className="acd-data-block__input" />
                </div>
                <div className="acd-data-block__add-data-button">+</div>

                <br/><br/>

                <h3 className="add-component-data__title">Ссылки на файлы документации:</h3>
                <div className="add-component-data__data-block">
                    <div className="acd-data-block__name">Наименование файла документации:</div>
                    <div className="acd-data-block__name">Ссылка на файл:</div>
                </div>
                <div className="add-component-data__data-block">
                    <input className="acd-data-block__input acd-data-block__input_param" />
                    <input className="acd-data-block__input" />
                </div>
                <div className="acd-data-block__add-data-button">+</div>

                <br/><br/><br/><br/>

                <h3 className="add-component-data__title">Основная картинка товара:</h3>
                <img 
                    src={imgLinkPage} 
                    className="viewing-and-image"
                />

                <br/><br/><br/><br/>

                <div className="reguest-button">Записать данные товара</div>
            </div>
        </>
    );

};

export default AddComponentData;
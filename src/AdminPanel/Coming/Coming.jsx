import "./coming.css";
import { useState, useEffect } from "react";


const Coming = ({ itemComponent, title, addDataFunction }) => {

    // Все товары
    const [items, setItems] = useState([]);
    // Поиск по номенклатуре товара
    const [search, setSearch] = useState("");
    // Результаты поиска
    const [filtered, setFiltered] = useState([]);
    // Выбранный элемент
    const [selected, setSelected] = useState(null);
    // Показываем поле результат или нет
    const [searchResult, setSearchResult] = useState(false);
    // Количество товара
    const [quantityGoods, setQuantityGoods] = useState(0);
    // Стоимость товара
    const [itemPrice, setItemPrice] = useState("");
    // Примечание и описание товара или условий поставки
    const [noteDiscription, setNoteDiscription] = useState("");


    // Получаем номенклатуру
   useEffect(() => {
        if (!Array.isArray(itemComponent)) return;

        setItems(prev => {
            const combined = [...prev, ...itemComponent];

            // Map по vendorCode
            const map = new Map();
            combined.forEach(i => map.set(i.vendorCode, i));

        return Array.from(map.values());
    });
    }, [itemComponent]);

    useEffect(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            setFiltered([]);
            return;
        }

        const result = items
        .filter(i =>
            typeof i.vendorCode === "string" &&
                i.vendorCode.toLowerCase().includes(query)
        )
        .slice(0, 10);

        setFiltered(result);
    }, [search, items]);


    return (
        <div className="coming-section__container">
            <h2 className="coming-section__title">{title}</h2>

            {/* ПОИСК */}
            <div className="coming-section__search-block">
                <input
                    type="text"
                    className="coming-section__search"
                    placeholder="Поиск по артикулу"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value); 
                        setSearchResult(true);
                    }}
                />

                {/* РЕЗУЛЬТАТЫ */}
                <div className={searchResult === false ? "cs-search-result_none" : "cs-search-result"}>
                    {filtered.map(item => (
                        <div
                            key={item.id}
                            className="cs-search-item"
                            onClick={() => {
                                setSelected(item);
                                setSearchResult(false);
                            }}
                        >
                            <div className="cs-search-result__result">
                                <strong>{item.vendorCode}</strong> — {item.nameComponent}
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>

            {/* ФОРМА */}
            <div className="coming-section__add-component-form">
                <div className="coming-section__article">Артикул</div>
                <div className="coming-section__name">Наименование</div>
                <div className="coming-section__number">Кол-во</div>
                <div className="coming-section__price">$, Общая</div>
                <div className="coming-section__discription">Описание поставки, важные моменты</div>
            </div>

            <div className="coming-section__add-component-form">
                <input
                    type="text"
                    className="coming-section__article"
                    value={selected?.vendorCode || ""}
                    readOnly
                />

                <input
                    type="text"
                    className="coming-section__name"
                    value={selected?.nameComponent || ""}
                    readOnly
                />

                <input 
                    type="number" 
                    className="coming-section__number" 
                    placeholder="0" 
                    min="0" 
                    onChange={(e)=>{setQuantityGoods(e.target.value)}}
                />
                <input 
                    type="text" 
                    className="coming-section__price" 
                    placeholder="$, без налогов"
                    onChange={(e)=>{setItemPrice(e.target.value)}}
                />
                <input 
                    type="text" 
                    className="coming-section__discription" 
                    placeholder="Примечание"
                    onChange={(e)=>{setNoteDiscription(e.target.value)}}
                />

                <button 
                    className="coming-section__button"
                    // Функцию получаем через пропс, в зависимости от задачи
                    onClick={
                        ()=> addDataFunction(
                                selected.vendorCode, 
                                selected.nameComponent,
                                quantityGoods,
                                itemPrice,
                                noteDiscription
                            )}
                >Записать</button>
            </div>
        </div>
    );
};

export default Coming;

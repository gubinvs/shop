import "./pageComponentCharacteristicsSection.css";



// Динамическая таблица с техническими характеристиками товара
const PageComponentCharacteristicsSection   = ({vendor, characteristics }) => {
    return(
        <>
            <section className="characteristics-section">
                <div className="container characteristics-section__container">
                    <h2 className="characteristics-section__title">Технические характеристики {vendor}</h2>
                    <div className="characteristics-section__table-block">
                        <ul className="characteristics-section__table-list">
                            {characteristics.map((item, index)=> {
                                {/* Проверка на чет нечет */}
                                const itemGrey = index % 2 === 0;

                                return(
                                    <>
                                        <li className="cs-table-list__item" key={index}>
                                            <div className={itemGrey? "cs-table-list-item__name item_grey" : "cs-table-list-item__name"}>{item.name}</div>
                                            <div className={itemGrey? "cs-table-list-item__param item_grey" : "cs-table-list-item__param"}>{item.characteristic}</div>
                                        </li>
                                    </>
                                );
                            })}
                            
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PageComponentCharacteristicsSection;
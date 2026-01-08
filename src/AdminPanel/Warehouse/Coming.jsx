import "./coming.css";



const Coming = () => {

    return(
        <>
            <div className="coming-section__container">
                <h2 className="coming-section__title">Оприходование товара:</h2>
                <div className="coming-section__search-block">
                    <input type="text" className="coming-section__search" placeholder="Поиск по артикулу" />
                    <div className="cs-search-result"></div> 
                </div>
                <div className="coming-section__add-component-form">
                    <input type="text" className="coming-section__article" id="" value="TM3AI8" readOnly />
                    <input type="text" className="coming-section__name" id="" value="Наименование комплектующего" readOnly />
                    <input type="number" className="coming-section__number" id="" placeholder="0" min="0"/>
                    <input type="text" className="coming-section__price" id="" placeholder="$, без налогов"/>
                    <input type="text" className="coming-section__discription" id="" placeholder="Примечание" />
                    <button className="coming-section__button">Записать</button>
                </div>
            </div>
        </>
    );

};

export default Coming;
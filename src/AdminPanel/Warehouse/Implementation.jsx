import "./implementation.css";



const Implementation =()=> {

    return (
        <>

        <div className="implementation-section__container">
            <h2 className="implementation-section__title">Реализация товара:</h2>
             <div className="implementation-section__search-block">
                    <input type="text" className="implementation-section__search" placeholder="Поиск по артикулу" />
                    <div className="i-search-result"></div> 
                </div>
                <div className="implementation-section__add-component-form">
                    <input type="text" className="implementation-section__article" id="" value="TM3AI8" readOnly />
                    <input type="text" className="implementation-section__name" id="" value="Наименование комплектующего" readOnly />
                    <input type="number" className="implementation-section__number" id="" placeholder="0" min="0"/>
                    <input type="text" className="implementation-section__price" id="" placeholder="$, без налогов"/>
                    <input type="text" className="implementation-section__discription" id="" placeholder="Примечание" />
                    <button className="implementation-section__button">Записать</button>
                </div>
        </div>
        
        </>
    );

};


export default Implementation;
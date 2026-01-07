import "./coming.css";



const Coming = ({itemComponent}) => {

    return(
        <>
            <div className="coming-section__container">
                <h2 className="coming-section__title">Оприходование товара:</h2>
                <input type="text" className="coming-section__search" placeholder="Поиск по артикулу" />
                <div className="cs-search-result"></div>
            </div>
        </>
    );

};

export default Coming;
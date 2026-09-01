import "./pageComponentDiscription.css";


// Компонент с описанием товара на странице товара (блок описания товара)

const PageComponentDiscription = ({discription}) => {

    return (
        <>
            <section className="discription-component-section">
                <div className="container discription-component-section__container">
                    <h2 className="discription-component-section__title">Описание</h2>
                    <div className="discription-component-section__discription">
                        {discription}
                    </div>
                </div>
            </section>
        </>
    );

};

export default PageComponentDiscription;
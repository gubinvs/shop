import "./pageComponentDocFileSection.css";



// Секция со ссылками на скачивание технической документации на товар
const PageComponentDocFileSection = ({file}) => {

    return (
        <>
            <section className="doc-file-section">
                <div className="container doc-file-section__container">
                    <h2 className="doc-file-section__title">Файлы и документы</h2>
                    <ul className="doc-file-section__list">
                        {file.map((item, index)=>{
                            return (
                                <>
                                    <li 
                                        key={index}
                                        className="doc-file-section__item"
                                    >
                                        <div className="dfs-item__name">{item.name}</div>
                                        <div 
                                            className="dfs-item__link"
                                            onClick={() => window.location.href = item.link}
                                        >Открыть</div>
                                    </li>
                                </>
                            );
                        })}
                        
                    </ul>
                </div>
            </section>
        </>
    );

};

export default PageComponentDocFileSection;
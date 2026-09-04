import "./newFooter.css";


const NewFooter = () => {
    return(
        <>
            <footer className="new-footer">
                <div className="container new-footer__container">
                    <img className="new-footer__logo-footer" src="/images/footer_logo_1920.svg" alt="#" />
                    <ul className="new-footer__link-list">
                        <li className="nf-link-list__item">Страница контактов</li>
                            <a href="/PersonalData" className="nf-ll-item__link">
                                <li className="nf-link-list__item">Политика обработки персональных данных</li>
                            </a>
                            <li className="nf-link-list__item"></li>
                    </ul>
                    <ul className="new-footer__contact-list">
                        <li className="nf-contact-list__item">Санкт-Петербург</li>
                        <li className="nf-contact-list__item">+7 (812) 921-59-71</li>
                        <li className="nf-contact-list__item">support@en-market.ru</li>
                    </ul>
                </div>
            </footer>
        </>
    );
};

export default NewFooter;
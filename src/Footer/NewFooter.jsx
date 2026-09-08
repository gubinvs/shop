import "./newFooter.css";


const NewFooter = () => {
    return(
        <>
            <footer className="new-footer">
                <div className="container new-footer__container">
                    <img className="new-footer__logo-footer" src="/images/footer_logo_1920.svg" alt="#" />
                    <ul className="new-footer__link-list">
                        <a href="/PersonalData" className="nf-ll-item__link">
                            <li className="nf-link-list__item">Обработка персональных данных</li>
                        </a>
                         <a href="/DeliveryAndPayment" className="nf-ll-item__link">
                            <li className="nf-link-list__item">Доставка и оплата</li>
                        </a>
                    </ul>
                    <ul className="new-footer__contact-list">
                        <a href="mailto:support@ec-market.ru">
                            <li className="nf-contact-list__item nf-contact-list__item_mail">support@ec-market.ru</li>
                        </a>
                        <a href="phone:+79119215971">
                            <li className="nf-contact-list__item nf-contact-list__item_phone">+7 (812) 921-59-71</li>
                        </a>
                    </ul>
                </div>
            </footer>
        </>
    );
};

export default NewFooter;
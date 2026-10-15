import "./contactPage.css";
import Fotter from "../Footer/NewFooter.jsx";



const ContactPage = () => {
    return(
        <>
            <section className="egrul-table-section">
                <div className="ets-file-block">
                    <div className="container ets-file-block__container">
                        <img 
                            className="egrul-table-section__logo" 
                            src="../../images/images-logo/logo-img-header.svg" 
                            alt="Логотип" 
                            onClick={()=>{window.location.href="/"}} 
                        />
                        
                        <a href="https://file.ec-market.ru/files/ipgubincard.pdf">
                            <img className="icon-file" src="../../images/icon/pdf-icon.png" alt="Скачать.pdf" />
                        </a>
                    </div>
                </div>
                <div className="ets-table-block">
                    <div className="container">
                        <h2 class="egrul-table-section__title">Корпоративная информация</h2>
                        <div class="egrul-table-section__list">
                            <div className="ets-table__item">
                                <div className="etst-item__title">Полное наименование</div>
                                <div className="etst-item__discr">Индивидуальный предприниматель <br/> Губин Владимир Сергеевич</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">Сокращенное наименование</div>
                                <div className="etst-item__discr">ИП Губин Владимир Сергеевич</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">Коммерческое обозначение (бренд)</div>
                                <div className="etst-item__discr">Компоненты энергии</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">ИНН</div>
                                <div className="etst-item__discr">590302376610</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">ОГРНИП</div>
                                <div className="etst-item__discr">325784700338340</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">Адрес местонахождения</div>
                                <div className="etst-item__discr">197371, г. Санкт-Петербург, ул. Парашютная, д. 34, стр. 1, кв. 851</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">ОКВЭД</div>
                                <div className="etst-item__discr">47.91.2, 52.21.1, 62.01, 63.11.1, 70.22, 82.99</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">Расчетный счет №</div>
                                <div className="etst-item__discr">40802 810 3 5571 0027166</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">Корреспондентский счет №</div>
                                <div className="etst-item__discr">30101 810 5 0000 0000653</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">Наименование банка</div>
                                <div className="etst-item__discr">ПАО СБЕРБАНК</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">БИК</div>
                                <div className="etst-item__discr">044030653</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">Телефон</div>
                                <div className="etst-item__discr">+7 (812) 921-59-71</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">E-mail</div>
                                <div className="etst-item__discr">gubinvs@gmail.com</div>
                            </div>
                            <div className="ets-table__item">
                                <div className="etst-item__title">ЭДО ID</div>
                                <div className="etst-item__discr">2BE5ac19fd465c94c5884077afd69cef7c1</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Fotter/>
        </>
    );
}

export default ContactPage;
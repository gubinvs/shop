import { useState } from "react";
import "./comingResult.css";

const ComingResult = ({ title, list }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // сколько строк на странице

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("ru-RU");
    };

    const totalPages = Math.ceil(list.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentList = list.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="coming-result-section__container">
            <h2 className="coming-result-section__title">{title}</h2>

            <div className="coming-result-section__result-table_header">
                <div className="crs-result-table__cell crs-result-table__header">Артикул</div>
                <div className="crs-result-table__cell crs-result-table__header">Наименование</div>
                <div className="crs-result-table__cell crs-result-table__header">Кол-во</div>
                <div className="crs-result-table__cell crs-result-table__header">$ , без налогов</div>
                <div className="crs-result-table__cell crs-result-table__header">Дата оформл.</div>
                <div className="crs-result-table__cell crs-result-table__header">Описание</div>
            </div>

            {currentList.map((x) => (
                <div className="coming-result-section__result-table_item" key={x.id}>
                    <div className="crs-result-table__cell crs-result-table__item">{x.vendorCode}</div>
                    <div className="crs-result-table__cell crs-result-table__item">{x.nameComponent}</div>
                    <div className="crs-result-table__cell crs-result-table__item">{x.quantity}</div>
                    <div className="crs-result-table__cell crs-result-table__item">
                        {new Intl.NumberFormat("ru-RU", {
                            style: "currency",
                            currency: "RUB",
                            minimumFractionDigits: 0,
                        }).format(x.price)}
                    </div>
                    <div className="crs-result-table__cell crs-result-table__item">
                        {formatDate(x.dateSave)}
                    </div>
                    <div className="crs-result-table__cell crs-result-table__item">
                        {x.noteDiscription}
                    </div>
                </div>
            ))}

            {/* Пагинация */}
            <div className="coming-result-section__pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    ←
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default ComingResult;

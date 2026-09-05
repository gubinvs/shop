import { useParams } from "react-router-dom";
import {  chapterPlk, chapterMplk, OpenSection, chapterContactor, chapterSch, chapterK, chapterBp
} from "../js/LinkSectionGroup.js";


// Промежуточный компонент для вычленения артикула из ссылки на страницу
// Если его нет получаем из url, в том случае если переходили с поисковиков по поддельным ссылкам
// важно артикул в названии страниц разделить символами ( -- и .html )
// .../products/kontaktor==LC1D18M7.html он может быть и таким /products/kontaktor==LC1D-18M7.html
// и таким /products/kontaktor==LC1D18.M7.html

const CatalogRoute = () => { 
    const { catalogFile } = useParams(); 
    const chapters = [
        {name: "chapterPlk", param: chapterPlk}, 
        {name: "chapterMplk", param:  chapterMplk}, 
        {name: "chapterContactor", param: chapterContactor}, 
        {name: "chapterSch", param: chapterSch}, 
        {name: "chapterK", param: chapterK}, 
        {name: "chapterBp", param: chapterBp}
    ];

    // Берём всё после "==" и до .html или .php 
    const linkParam = catalogFile?.match(/==(.+)\.(html|php)$/i)?.[1] ?? ""; 

    const nameCatalog = chapters.filter(item => item.name === linkParam);
    
    OpenSection(nameCatalog[0].param);
};

export default CatalogRoute;

import { useParams } from "react-router-dom";
import SearchResults from "./SearchResults.jsx";


// Если его нет получаем из url, в том случае если переходили с поисковиков по поддельным ссылкам
// важно артикул в названии страниц разделить символами ( -- и .html )
// .../products/schneider/kontaktor--LC1D18M7.html он может быть и таким /products/schneider/kontaktor--LC1D-18M7.html
// и таким /products/schneider/kontaktor--LC1D18.M7.html

const ProductRoute = () => { 
    const { productFile } = useParams(); 


    // Берём всё после "--" и до .html или .php 
    const vendorCode = productFile?.match(/--(.+)\.(html|php)$/i)?.[1] ?? ""; 
    
    return <SearchResults article={vendorCode} />; 
};


export default ProductRoute;
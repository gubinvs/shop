import "./loadingSpinner.css"; 




const LoadingSpinner = () => { 
    return ( 
        <div className="loading-spinner"> 
            <div className="loading-spinner__ring"></div> 
            <img src="images/images-logo/logo-img-header.svg" alt="Компоненты энергии" className="loading-spinner__logo" /> 
        </div> 
    ); 
}; 

export default LoadingSpinner;
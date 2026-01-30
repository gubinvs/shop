import React from "react";
import "./navigationBar.css";


const NavigationBar = () => {

    return (
        <div className="navigation-bar-max">
            <ul className="navigation-bar-max__navigation-list">
                <li className="nbm-navigation-list__item">
                    <img 
                        src="../images/dachbord_icon.svg" 
                        className="nbm-navigation-item__icon" 
                        alt="#"
                        onClick={()=>{window.location.href = "/AdminPanel"}} />
                </li> 
                <li className="nbm-navigation-list__item">
                    <img 
                        src="../images/full_14962594.png" 
                        className="nbm-navigation-item__icon" 
                        alt="#"
                        onClick={()=>{window.location.href = "/WarehousePage"}} />
                </li>
                <li className="nbm-navigation-list__item">
                    <img 
                        src="../images/add-component-icon.svg" 
                        className="nbm-navigation-item__icon" 
                        alt="#"
                        onClick={()=>{window.location.href = "/ComingPage"}} />
                </li>
                <li className="nbm-navigation-list__item">
                    <img 
                        src="../images/clear-component-icon.svg" 
                        className="nbm-navigation-item__icon" 
                        alt="#"
                        onClick={()=>{window.location.href = "/ConsumptionPage"}} />
                </li>
                  <li className="nbm-navigation-list__item">
                    <img 
                        src="../images/purchase-icon.svg" 
                        className="nbm-navigation-item__icon" 
                        alt="#"
                        onClick={()=>{window.location.href = "/PurchasePage"}} />
                </li>
                
            </ul>
        </div>
    );
};

export default NavigationBar;
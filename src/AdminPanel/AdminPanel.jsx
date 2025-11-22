import "../index.css";
import "./adminPanel.css";
import ApiUrl from "../js/ApiUrl.js";

/// Панель администратора:
/// Добавление в базу данных новых товаров

const AdminPanel =()=> {

    const token = "MySuperToken123";

    const updateKeazQuantityItem = () => {
        fetch(`${ApiUrl}/api/keaz/run?token=${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {

            console.log(JSON.stringify(data));
        });

        
    }


    return(
        <>
        <div className="container ">
            <h4>Обновление данных о цене и количестве на складах KEAZ:</h4>
            <button
                className="button-update"
                onClick={()=>{updateKeazQuantityItem()}
            }>Обновить данные</button>
        </div>
            
        </>
    );

};

export default AdminPanel;
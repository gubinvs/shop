import "./adminPanel.css"
import UploadManufacturerForm from "./UploadManufacturerForm.jsx";
import XmlUpload from "./XmlUpload.jsx";

/// Панель администратора:
/// Добавление в базу данных новых товаров

const AdminPanel =()=> {


    return(
        <>
            <UploadManufacturerForm />
            <XmlUpload />
        </>
    );

};

export default AdminPanel;
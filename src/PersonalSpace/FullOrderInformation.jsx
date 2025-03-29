import React, { useState, useEffect } from "react";
import ApiUrl from '../js/ApiUrl.js';



const FullOrderInformation = (numberOrder) => {

    // Всплывающее окно с полной информацией о заказе, компании и пользователе

   
    fetch(`${ApiUrl}/api/OrderDetails/${numberOrder}`)
    .then(response => response.json())
    .then(data => {
        // Оформляем данные о товарах
        const orderDetails = data.orders.map(order => `
        <tr>
            <td>${order.vendorCode}</td>
            <td>${order.nameItem}</td>
            <td>${order.priceItem} руб.</td>
            <td>${order.quantityItem}</td>
            <td>${order.dataOrder}</td>
            <td>${order.statusOrder}</td>
        </tr>
        `).join("");

        // Информация о пользователе
        const userDetails = `
        <h2>Информация о пользователе</h2>
        <table border="1" cellspacing="0" cellpadding="5">
            <tr><td><strong>Имя:</strong></td><td>${data.user.nameUser}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${data.user.email}</td></tr>
            <tr><td><strong>Телефон:</strong></td><td>${data.user.phoneUser}</td></tr>
        </table>
        `;

        // Информация о компании, если она есть
        const company = data.company || {
        nameCompany: "Нет данных",
        innCompany: "Нет данных",
        adressCompany: "Нет данных",
        phoneCompany: "Нет данных"
        };

        const companyDetails = `
        <h2>Информация о компании</h2>
        <table border="1" cellspacing="0" cellpadding="5">
            <tr><td><strong>Компания:</strong></td><td>${company.nameCompany}</td></tr>
            <tr><td><strong>ИНН:</strong></td><td>${company.innCompany}</td></tr>
            <tr><td><strong>Адрес:</strong></td><td>${company.adressCompany}</td></tr>
            <tr><td><strong>Телефон:</strong></td><td>${company.phoneCompany}</td></tr>
        </table>
        `;

        // Создаем окно с результатами
        const width = window.screen.width;
        const height = window.screen.height * 0.9;
    const newWindow = window.open("", "_blank", `width=${width},height=${height}`);
        // const newWindow = window.open("", "_blank", "width=800,height=600");
        newWindow.document.write(`
        <html>
            <head>
            <title>Детали заказа</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #2C3E50; }
                h2 { color: #2980B9; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                table, th, td { border: 1px solid #BDC3C7; }
                th, td { padding: 10px; text-align: left; }
                th { background-color: #ECF0F1; }
            </style>
            </head>
            <body>
            <h1>Детали заказа №${numberOrder}</h1>
            ${userDetails}
            ${companyDetails}
            <h2>Товары в заказе</h2>
            <table>
                <thead>
                <tr>
                    <th>Артикул</th>
                    <th>Название товара</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Дата заказа</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                ${orderDetails}
                </tbody>
            </table>
            </body>
        </html>
        `);
        newWindow.document.close();
    })
    .catch(error => {
        console.error("Ошибка при запросе:", error);
        alert("Произошла ошибка при получении данных компонентом React.");
    });
};

export default FullOrderInformation;
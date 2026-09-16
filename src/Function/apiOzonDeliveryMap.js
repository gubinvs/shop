

export const apiOzonDeliveryMap = () => {

    async function getDeliveryMap() {
        const requestBody = {
            // Заполнить согласно схеме Ozon /v1/delivery/map
        };

        const response = await fetch(
            `${OZON_API_URL}/v1/delivery/map`,
            {
                method: "POST",
                headers: {
                    "Client-Id": clientId,
                    "Api-Key": apiKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();

            throw new Error(
                `Ozon API error ${response.status}: ${errorText}`
            );
        }

        return await response.json();
    }

    getDeliveryMap()
        .then(data => {
            console.log("ПВЗ Ozon:", data);
        })
        .catch(error => {
            console.error("Ошибка получения ПВЗ:", error);
        });
};
interface Cords {
    lat: number;
    lng: number;
}

interface WeatherData {
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    };
}

export const getWeatherData = async (cords: Cords) => {
    const url2 = `https://archive-api.open-meteo.com/v1/archive?latitude=${cords.lat}&longitude=${cords.lng}&start_date=2022-12-30&end_date=2023-01-28&daily=temperature_2m_max&daily=temperature_2m_min&timezone=Europe%2FBerlin`;

    const result = await fetch(url2);

    const data = (await result.json()) as WeatherData;

    const meanTemperatures = data.daily.temperature_2m_max.map((max, index) => {
        // Round the mean temperature to the nearest integer
        return Math.round((max + data.daily.temperature_2m_min[index]) / 2);
    });

    const meanTemperaturesString = meanTemperatures.join(",");
    return meanTemperaturesString;
};

export const getCordinates = async (address: string) => {
    const token = "AIzaSyAiLlnoD8t9RMkoyLYyZFJswb08Q4Oi9f0";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${token}`;

    const response = await fetch(url);

    const data = await response.json();

    return data.results[0].geometry.location;
};

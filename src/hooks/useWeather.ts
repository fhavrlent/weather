import { useState } from "react";

export type Coordinates = {
  latitude: number;
  longitude: number;
  temperature?: number;
};

const isLatitude = (value: number) => value >= -90 && value <= 90;

const isLongitude = (value: number) => value >= -180 && value <= 180;

export const useWeather = () => {
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);

  const addWeather = (newCoordinates: Coordinates) =>
    setCoordinates([...coordinates, newCoordinates]);

  const removeWeather = (index: number) =>
    setCoordinates(coordinates.filter((_, i) => i !== index));

  const fetchWeather = async (
    latitude: string,
    longitude: string,
    showError: (message: string) => void
  ) => {
    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);

    if (!isLatitude(parsedLatitude) || !isLongitude(parsedLongitude)) {
      showError("Invalid latitude or longitude");
      return;
    }

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${parsedLatitude}&longitude=${parsedLongitude}&current_weather=true&timezone=Europe%2FBerlin`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const {
        current_weather: { temperature },
      } = await response.json();

      const newCoordinates: Coordinates = {
        latitude: parsedLatitude,
        longitude: parsedLongitude,
        temperature,
      };

      addWeather(newCoordinates);
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError("Unexpected error");
      }
    }
  };

  return { coordinates, addWeather, removeWeather, fetchWeather };
};

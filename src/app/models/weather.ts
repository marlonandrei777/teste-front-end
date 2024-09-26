export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    description: string;
  }>;
}

export interface FavoriteCity {
  name: string;
  temp: number;
  humidity: number;
  wind: number;
  description: string;
}

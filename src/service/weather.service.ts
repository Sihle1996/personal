import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'ad9730f9a8f889222bc9f714f2d8e7c2';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private airPollutionUrl = 'https://api.openweathermap.org/data/2.5/air_pollution';
  private geolocationUrl = 'http://api.openweathermap.org/geo/1.0/reverse';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.weatherUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }

  getWeatherByLocation(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.weatherUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
  }

  getAirPollution(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.airPollutionUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
  }

  getGeolocation(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.geolocationUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
  }

  public getApiKey(): string {
    return this.apiKey;
  }
}

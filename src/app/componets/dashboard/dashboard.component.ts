import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/service/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  weather: any;
  airPollution: any;
  cityName: string = '';
  latitude!: number;
  longitude!: number;
  mapUrl!: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getWeatherByLocation();
        this.getAirPollution();
        this.setMapUrl();
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getWeatherByLocation() {
    this.weatherService.getWeatherByLocation(this.latitude, this.longitude).subscribe(data => {
      this.weather = data;
    });
  }

  getWeather() {
    this.weatherService.getWeather(this.cityName).subscribe(data => {
      this.weather = data;
    });
  }

  getAirPollution() {
    this.weatherService.getAirPollution(this.latitude, this.longitude).subscribe(data => {
      this.airPollution = data.list[0];
    });
  }

  setMapUrl() {
    this.mapUrl = `https://tile.openweathermap.org/map/temp_new/${this.latitude}/${this.longitude}/10.png?appid=${this.weatherService.getApiKey()}`;
  }
}

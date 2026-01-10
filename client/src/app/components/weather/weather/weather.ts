import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { WeatherService } from '../../../services/weather/weather.service';
import { LocationService } from '../../../services/location/location-service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {
  // Expose Math object to template
  Math = Math;

  weatherData: any = null;
  loading = false;
  locationName: string = 'Locating...';
  expandedDayIndex: number | null = null;
  hoveredDayIndex: number | null = null;

  // New properties for dashboard UI
  currentWeather: any = null;
  todayHighlights: any = null;
  precipitationChartData: any[] = [];
  threeDayForecast: any[] = [];

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializeWeather();
  }

  onCardMouseEnter(index: number) {
    this.hoveredDayIndex = index;
  }

  onCardMouseLeave() {
    this.hoveredDayIndex = null;
  }

  toggleDay(index: number) {
    if (this.expandedDayIndex === index) {
      this.expandedDayIndex = null;
    } else {
      this.expandedDayIndex = index;
    }
  }

  async initializeWeather() {
    try {
      this.loading = true;
      const coords = await this.locationService.getCurrentLocation();

      this.locationName = this.locationService.address() || 'Current Location';
      if (!this.locationService.address()) {
        this.locationService.getAddress(coords.latitude, coords.longitude).add(() => {
          this.locationName = this.locationService.address() || 'Current Location';
        });
      }

      this.weatherService.getPastAndFutureWeather(coords.latitude, coords.longitude).subscribe({
        next: (res: any) => {
          console.log('Weather Forecast Data:', res);
          this.weatherData = this.processWeatherData(res);
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching weather:', err);
          this.loading = false;
        },
      });
    } catch (error) {
      console.error('Location error:', error);
      this.loading = false;
      this.locationName = 'Location Unavailable';
    }
  }

  processWeatherData(data: any) {
    if (!data || !data.daily || !data.hourly) return null;

    const daily = data.daily;
    const hourly = data.hourly;

    const days = daily.time.map((date: string, index: number) => {
      const dayStart = new Date(date).setHours(0, 0, 0, 0);
      const dayEnd = new Date(date).setHours(23, 59, 59, 999);

      const hours = hourly.time
        .map((t: string, i: number) => ({
          time: t,
          temp: hourly.temperature_2m[i],
          code: hourly.weathercode[i],
          icon: this.getWeatherIcon(hourly.weathercode[i]),
          precip: Math.round(Math.random() * 100), // Placeholder
        }))
        .filter((h: any) => {
          const time = new Date(h.time).getTime();
          return time >= dayStart && time <= dayEnd;
        });

      return {
        date: date,
        maxTemp: daily.temperature_2m_max[index],
        minTemp: daily.temperature_2m_min[index],
        precip: daily.precipitation_sum[index],
        code: daily.weathercode[index],
        icon: this.getWeatherIcon(daily.weathercode[index]),
        description: this.getWeatherDescription(daily.weathercode[index]),
        hourly: hours,
      };
    });

    // Extract current weather (today's data)
    // API returns: past_days=5 (indices 0-4) + today (index 5) + forecast_days=4 (indices 6-9)
    const todayIndex = 5; // This is today in the API response
    this.currentWeather = days[todayIndex] || days[0];

    // Extract 3-day forecast (today + next 2 days)
    this.threeDayForecast = days.slice(todayIndex, todayIndex + 3);

    // Extract precipitation chart data (next 8 hours from current time)
    const now = new Date();
    this.precipitationChartData = hourly.time
      .map((t: string, i: number) => ({
        time: t,
        precip: this.calculatePrecipProbability(hourly.weathercode[i]),
        hour: new Date(t).getHours(),
      }))
      .filter((h: any) => new Date(h.time) >= now)
      .slice(0, 8);

    // Extract today's highlights
    const currentHourIndex = hourly.time.findIndex((t: string) => new Date(t) >= now);

    // Calculate precipitation probability based on today's weather code and precipitation sum
    const precipitationSum = daily.precipitation_sum[todayIndex] || 0;
    const todayWeatherCode = daily.weathercode[todayIndex];
    let precipitationProbability = 0;

    // If there's actual precipitation, show high probability
    if (precipitationSum > 0) {
      precipitationProbability = Math.min(Math.round(precipitationSum * 10 + 50), 100);
    } else {
      // Otherwise, estimate based on weather code
      precipitationProbability = this.calculatePrecipProbability(todayWeatherCode);
    }

    this.todayHighlights = {
      precipitation: precipitationProbability,
      humidity: hourly.relativehumidity_2m?.[currentHourIndex] || 87,
      windSpeed: hourly.windspeed_10m?.[currentHourIndex] || 0,
      windDirection: hourly.winddirection_10m?.[currentHourIndex] || 0,
      sunrise: daily.sunrise?.[todayIndex] || new Date().toISOString(),
      sunset: daily.sunset?.[todayIndex] || new Date().toISOString(),
    };

    return {
      daily: days,
    };
  }

  calculatePrecipProbability(weatherCode: number): number {
    // Calculate precipitation probability based on weather code
    if (weatherCode >= 51 && weatherCode <= 67) return Math.floor(Math.random() * 30) + 60; // Rain: 60-90%
    if (weatherCode >= 71 && weatherCode <= 86) return Math.floor(Math.random() * 30) + 50; // Snow: 50-80%
    if (weatherCode >= 95) return Math.floor(Math.random() * 20) + 70; // Storm: 70-90%
    if (weatherCode >= 1 && weatherCode <= 3) return Math.floor(Math.random() * 30) + 10; // Partly cloudy: 10-40%
    return Math.floor(Math.random() * 10); // Clear: 0-10%
  }

  getWindDirection(degrees: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  getWeatherIcon(code: number): string {
    if (code === 0) return 'sun';
    if (code >= 1 && code <= 3) return 'partly-cloudy';
    if (code >= 45 && code <= 48) return 'cloudy';
    if (code >= 51 && code <= 67) return 'rain';
    if (code >= 71 && code <= 86) return 'snow';
    if (code >= 95) return 'storm';
    return 'sun';
  }

  getWeatherDescription(code: number): string {
    const descriptions: { [key: number]: string } = {
      0: 'Clear Sky',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Rime Fog',
      51: 'Light Drizzle',
      53: 'Drizzle',
      55: 'Heavy Drizzle',
      56: 'Freezing Drizzle',
      57: 'Heavy Freezing Drizzle',
      61: 'Light Rain',
      63: 'Rain',
      65: 'Heavy Rain',
      66: 'Freezing Rain',
      67: 'Heavy Freezing Rain',
      71: 'Light Snow',
      73: 'Snow',
      75: 'Heavy Snow',
      77: 'Snow Grains',
      80: 'Light Showers',
      81: 'Showers',
      82: 'Heavy Showers',
      85: 'Snow Showers',
      86: 'Heavy Snow Showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm + Hail',
      99: 'Severe Thunderstorm',
    };
    return descriptions[code] || 'Unknown';
  }

  isPrecipitation(icon: string): boolean {
    return ['rain', 'storm', 'snow'].includes(icon);
  }

  getDayOfWeek(date: string): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(date).getDay()];
  }

  getFormattedDate(date: string): string {
    const d = new Date(date);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${months[d.getMonth()]} ${d.getDate()}`;
  }
}

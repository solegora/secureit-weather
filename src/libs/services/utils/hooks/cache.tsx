export const weatherCache = {
  DATA_KEY: 'weather_forecast_data',
  TIME_KEY: 'weather_forecast_timestamp',
  TTL_MS: 5 * 60 * 1000, // 5 min

  get(): any[] | null {
    try {
      const data = localStorage.getItem(this.DATA_KEY);
      const timestamp = localStorage.getItem(this.TIME_KEY);
      if (!data || !timestamp) return null;

      if (Date.now() - parseInt(timestamp, 10) > this.TTL_MS) {
        this.clear();
        return null;
      }
      return JSON.parse(data);
    } catch (err) {
      console.warn('Error reading weather cache:', err);
      return null;
    }
  },

  set(data: any[]): void {
    try {
      localStorage.setItem(this.DATA_KEY, JSON.stringify(data));
      localStorage.setItem(this.TIME_KEY, Date.now().toString());
    } catch (err) {
      console.warn('Error writing weather cache:', err);
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(this.DATA_KEY);
      localStorage.removeItem(this.TIME_KEY);
    } catch (err) {
      console.warn('Error clearing weather cache:', err);
    }
  },
};



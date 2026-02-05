import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type Day = { date: string; temp: number; condition: string; icon: string };

interface WeatherState {
  days: Day[];
  selectedIndex: number;
  loading: boolean;
  error?: string;
}

const initialState: WeatherState = {
  days: [],
  selectedIndex: 3,
  loading: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeather: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<Day[]>) => {
      console.log(action.payload,'payload in success === olly');
      state.days = action.payload;
      state.loading = false;
    },
    fetchWeatherError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectDay: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
  },
});

export const { fetchWeather, fetchWeatherSuccess, fetchWeatherError, selectDay } =
  weatherSlice.actions;
export default weatherSlice.reducer;

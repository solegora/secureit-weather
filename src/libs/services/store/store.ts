import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import weatherReducer from '../slices/weatherSlice';
import { rootEpic } from './epics/weatherEpic';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: { weather: weatherReducer },
  middleware: (getDefault) => getDefault().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

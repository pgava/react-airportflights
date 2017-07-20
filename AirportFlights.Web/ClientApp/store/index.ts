import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as AirportFlights from './AirportFlights';

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState;
    weatherForecasts: WeatherForecasts.WeatherForecastsState;
    airportFlights: AirportFlights.AirportFlightsState;
};

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    airportFlights: AirportFlights.reducer
};

// IF YOU CHANGE airportFlights -> airpotFlights THE SIDE EFFECT IS THAT THE STATE IS NOT BOUND


// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
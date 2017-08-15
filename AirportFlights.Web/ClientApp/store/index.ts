import * as AirportFlights from './AirportFlights';
import * as Flight from './Flight';

// The top-level state object
export interface ApplicationState {
    airportFlights: AirportFlights.AirportFlightsState;
    flight: Flight.FlightState;
};

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    airportFlights: AirportFlights.reducer,
    flight: Flight.reducer
};

// IF YOU CHANGE airportFlights -> airpotFlights THE SIDE EFFECT IS THAT THE STATE IS NOT BOUND


// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

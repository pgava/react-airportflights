import { Reducer } from 'redux';
import { addTask } from 'domain-task';
import { AppThunkAction } from './';
import { FlightApi, Flight } from '../api/FlightApi';
import * as types from '../actions/actionTypes';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface FlightState {
    flight: Flight;
    saving: boolean;
    error: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface SaveFlightAction { type: typeof types.SAVE_FLIGHT, flight: Flight, saving: boolean }
interface SaveFlightDoneAction { type: typeof types.SAVE_FLIGHT_DONE, flight: Flight, saving: boolean, error: string }
interface GetFlightAction { type: typeof types.GET_FLIGHT}
interface GetFlightDoneAction { type: typeof types.GET_FLIGHT_DONE, flight: Flight, error: string }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SaveFlightAction | SaveFlightDoneAction | GetFlightAction | GetFlightDoneAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export function createSaveFlightDoneAction(flight: Flight, error: string): SaveFlightDoneAction {
    return { type: types.SAVE_FLIGHT_DONE, flight: flight, saving: false, error: error };
}

export function createSaveFlightAction(flight: Flight): SaveFlightAction {
    return { type: types.SAVE_FLIGHT, flight: flight, saving: true};
}

export function createGetFlightDoneAction(data: Flight, error: string): GetFlightDoneAction {
    return { type: types.GET_FLIGHT_DONE, flight: data, error: error };
}

export function createGetFlightAction(): GetFlightAction {
    return { type: types.GET_FLIGHT };
}

export const actionCreators = {
    saveFlight: (flight: Flight): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let createFlight = FlightApi.saveFlight(flight)
            .then(() => {
                dispatch(createSaveFlightDoneAction(flight, null));
            });
        addTask(createFlight);
        dispatch(createSaveFlightAction(flight));
    },
    getFlight: (flightId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = FlightApi.getFlight(flightId)
            .then(response => response.json() as Promise<Flight>)
            .then(data => {
                dispatch(createGetFlightDoneAction(data, null));
            });
        addTask(fetchTask);
        dispatch(createGetFlightAction());
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
const unloadedState: FlightState = { flight: null, saving: false, error: "" };

export const reducer: Reducer<FlightState> = (state: FlightState, action: KnownAction) => {
    switch (action.type) {
        case types.SAVE_FLIGHT:
            return {
                flight: Object.assign({}, state.flight),
                saving: false,
                error: ""
            };
        case types.SAVE_FLIGHT_DONE:
            return {
                flight: Object.assign({}, action.flight),
                saving: action.saving,
                error: action.error
            }
        case types.GET_FLIGHT:
            return {
                flight: Object.assign({}, state.flight),
                saving: false,
                error: "" 
            }
        case types.GET_FLIGHT_DONE: 
            return {
                flight: Object.assign({}, action.flight),
                saving: false,
                error: action.error
            }
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};


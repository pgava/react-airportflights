import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { push } from 'react-router-redux';
import * as types from '../actions/actionTypes';
import { GateApi, Gate } from '../api/GateApi';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface AirportFlightsState {
    isLoading: boolean;
    gates: Gate[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface GetAllFlightsAction { type: typeof types.GET_ALL_FLIGHTS}
interface ReceiveFlightsAction { type: typeof types.RECEIVE_FLIGHTS, isLoading: boolean, gates: Gate[] }
interface RedirectToAction { type: string, payload?}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = GetAllFlightsAction | ReceiveFlightsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export function createReceiveFlightsAction(data: Gate[], error: string): ReceiveFlightsAction {
    return { type: types.RECEIVE_FLIGHTS, isLoading: false, gates: data };
}

export function createGetAllFlightsAction(): GetAllFlightsAction {
    return { type: types.GET_ALL_FLIGHTS };
}

export function createGoToFlightAction(flightId: number): RedirectToAction {
    return push(`/flight/${flightId}`);
}

export function createGoToNewFlightAction(gateId: number): RedirectToAction {
    return push(`/flight?gateId=${gateId}`);
}

export const actionCreators = {
    getAllFlights: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        
        let fetchTask = GateApi.getAllFlights()
            .then(response => response.json() as Promise<Gate[]>)
            .then(data => {            
                dispatch(createReceiveFlightsAction(data, ""));
            });
        addTask(fetchTask); 
        dispatch(createGetAllFlightsAction());
    }, 
    goToFlight: (flightId: number, gateId?: number) => (dispatch, getState) => {
        if (flightId !== 0) {
            dispatch(createGoToFlightAction(flightId));
        } else {
            dispatch(createGoToNewFlightAction(gateId));
        }
    }

};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
const unloadedState: AirportFlightsState = { isLoading: true, gates: [] };

export const reducer: Reducer<AirportFlightsState> = (state: AirportFlightsState, action: KnownAction) => {

    switch (action.type) {
        case types.GET_ALL_FLIGHTS:
            return {
                isLoading: true,
                gates: [...state.gates] 
            };
        case types.RECEIVE_FLIGHTS:
            return {
                isLoading: action.isLoading,
                gates: [...action.gates] 
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};

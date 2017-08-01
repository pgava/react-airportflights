import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { push } from 'react-router-redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface AirportFlightsState {
    isLoading: boolean;
    gates: Gate[];
}

export interface Gate {
    gateId: number;
    gateName: string;
    flights: Flight[];
}

export interface Flight {
    flightId: number;
    gateId: number;
    flightNumber: string;
    description: string;
    arrival: string;
    departure: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface GetAllFlightsAction { type: 'GET_ALL_FLIGHTS'}
interface ReceiveFlightsAction { type: 'RECEIVE_FLIGHTS', isLoading: boolean, gates: Gate[] }
interface RedirectToAction { type: string, payload?}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = GetAllFlightsAction | ReceiveFlightsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
    getAllFlights: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        
        let fetchTask = fetch('/api/gate/GetAllFlights')
            .then(response => response.json() as Promise<Gate[]>)
            .then(data => {            

                dispatch({ type: 'RECEIVE_FLIGHTS', isLoading: false, gates: data});
        });
        addTask(fetchTask); 
        dispatch({ type: 'GET_ALL_FLIGHTS'});
    }, 
    goToFlight: (id: number) => (dispatch, getState) => {
        dispatch(push(`/flight/${id}`));
    }

};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
const unloadedState: AirportFlightsState = { isLoading: true, gates: [] };

export const reducer: Reducer<AirportFlightsState> = (state: AirportFlightsState, action: KnownAction) => {

    switch (action.type) {
        case 'GET_ALL_FLIGHTS':
            return {
                isLoading: true,
                gates: [...state.gates] 
            };
        case 'RECEIVE_FLIGHTS':
            return {
                isLoading: action.isLoading,
                gates: [...action.gates] 
            };

            //...state.filter(cat => cat.id !== action.cat.id),
            //Object.assign({}, action.cat)
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};

import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface AirportFlightsState {
    isLoading: boolean;
    flights: Flight[];
}

export interface Flight {
    id: number;
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
interface ReceiveFlights { type: 'RECEIVE_FLIGHTS', isLoading: boolean, flights: Flight[] }
interface CreateFlight { type: 'CREATE_FLIGHT' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = GetAllFlightsAction | CreateFlight | ReceiveFlights;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
    getAllFlights: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        
        let fetchTask = fetch('/api/gate/GetAllFlights')
            .then(response => response.json() as Promise<Flight[]>)
            .then(data => {            

                dispatch({ type: 'RECEIVE_FLIGHTS', isLoading: false, flights: data});
        });
        addTask(fetchTask); 
        dispatch({ type: 'GET_ALL_FLIGHTS'});
    },    
    createFlight: () => <CreateFlight>{ type: 'CREATE_FLIGHT' }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
const unloadedState: AirportFlightsState = { isLoading: true, flights: [] };

export const reducer: Reducer<AirportFlightsState> = (state: AirportFlightsState, action: KnownAction) => {

    switch (action.type) {
        case 'GET_ALL_FLIGHTS':
            return {
                isLoading: true,
                flights: state.flights
            };
        case 'RECEIVE_FLIGHTS':
            return {
                isLoading: action.isLoading,
                flights: action.flights
            };            
        case 'CREATE_FLIGHT':
            return {
                isLoading: false,
                flights: [{
                    id: 1,
                    flightNumber: "string",
                    description: "string",
                    arrival: "string",
                    departure: "string"
                }]
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};

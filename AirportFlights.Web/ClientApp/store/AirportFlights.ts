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
interface ReceiveFlights { type: 'RECEIVE_FLIGHTS', isLoading: boolean, gates: Gate[] }
interface CreateFlight { type: 'CREATE_FLIGHT' }
interface FlightCreated { type: 'FLIGHT_CREATED', flight: Flight }
interface RedirectTo { type: string, payload?}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = GetAllFlightsAction | CreateFlight | ReceiveFlights | FlightCreated;

type RedirectToAction = RedirectTo;

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
    createFlight2: () => (dispatch, getState) => {
        dispatch(push('/flight'));
    },
    createFlight: (flight: Flight): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const headers = { 'Content-Type': 'application/json' };
        let requestUrl = `/api/flight/${flight.flightId}`;
        let bodyUrl = JSON.stringify(flight);

        let createFlightReq = new Request(requestUrl,
            {
                method: 'PUT',
                headers: headers,
                body: bodyUrl
            });
        let createFlight = fetch(createFlightReq)
            .then(() => {
                flight.flightNumber = 'changed';
                dispatch({type: 'FLIGHT_CREATED', isLoading: false, flight: flight});
            });
        addTask(createFlight); 
        dispatch({ type: 'CREATE_FLIGHT' });
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
                gates: state.gates.slice()
            };
        case 'RECEIVE_FLIGHTS':
            return {
                isLoading: action.isLoading,
                gates: action.gates
            };            
        case 'CREATE_FLIGHT':
            return {
                isLoading: false,
                gates: state.gates.slice()
            };
        case 'FLIGHT_CREATED':
            let gates = state.gates.slice();
            for (let gateLoop in gates) {
                if (gates[gateLoop].gateId === action.flight.gateId) {
                    let gate = gates[gateLoop];
                    for (let flightLoop in gate.flights) {
                        let flight = gate.flights[flightLoop];
                        if (flight.flightId === action.flight.flightId) {
                            gate.flights[flightLoop] = action.flight;
                        }
                    }
                    //loop = loop + 1;
                    //action.flight.flightId = loop;
                    //gates[gateLoop].flights.push(action.flight);
                }
            }

            //...state.filter(cat => cat.id !== action.cat.id),
            //Object.assign({}, action.cat)

            return {
                isLoading: false,
                gates: gates
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || unloadedState;
};

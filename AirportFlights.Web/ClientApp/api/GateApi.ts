import { fetch } from 'domain-task';
import { Flight } from '../api/FlightApi';

export interface Gate {
    gateId: number;
    gateName: string;
    flights: Flight[];
}

export class GateApi {
    static getAllFlights() : Promise<any> {
        return fetch('/api/gate/GetAllFlights');
    }
}
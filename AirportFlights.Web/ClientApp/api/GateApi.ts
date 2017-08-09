import { fetch } from 'domain-task';

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

export class GateApi {
    static getAllFlights() : Promise<any> {
        return fetch('/api/gate/GetAllFlights');
    }
}
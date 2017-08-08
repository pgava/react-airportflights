import { fetch, addTask } from 'domain-task';

export interface Flight {
    flightId: number;
    gateId: number;
    flightNumber: string;
    description: string;
    arrival: string;
    departure: string;
    isCancel: boolean;
}

export class FlightApi {
    static saveFlight(flight: Flight) : Promise<any> {
        const headers = { 'Content-Type': 'application/json' };
        let requestUrl = `/api/flight/${flight.flightId}`;
        let method = 'PUT';
        if (flight.flightId === 0) {
            method = 'POST';
            requestUrl = '/api/flight';
        }
        let bodyUrl = JSON.stringify(flight);

        let createFlightReq = new Request(requestUrl,
            {
                method: method,
                headers: headers,
                body: bodyUrl
            });

        return fetch(createFlightReq);
    }

    static getFlight(flightId: number): Promise<any> {
        return fetch(`/api/flight?id=${flightId}`);
    }
}
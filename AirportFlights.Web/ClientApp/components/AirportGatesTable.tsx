import * as React from 'react';
import { Flight } from '../api/FlightApi';
import { Gate } from '../api/GateApi';

interface AirportFlightsTableParameters {
    flights: Flight[];
    onUpdate: (flight: Flight) => void;
}

interface AirportGatesTableParameters {
    gates: Gate[];
    onUpdate: (flight: Flight) => void;
}

const AirportFlightsTable = (parameters: AirportFlightsTableParameters) => {
    return <table className="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Arrive</th>
                <th>Leave</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {parameters.flights.map(flight =>
                    <tr key={flight.flightId}>
                        <td>{flight.flightNumber}</td>
                        <td>{flight.arrival}</td>
                        <td>{flight.departure}</td>
                        <td>
                        <button type="button" onClick={() => parameters.onUpdate(flight)
                            } className="btn btn-info btn-sm">Update</button>
                        </td>
                    </tr>
                )}         
        </tbody>
    </table>;
};

const AirportGatesTable = (parameters: AirportGatesTableParameters) => {
    return (
        <div>
            <h1></h1>
            <div className="col-md-12">
                {parameters.gates.map(gate =>
                    <div className="well well-lg" key={gate.gateId}>
                        <h2>{gate.gateName}</h2>
                        <AirportFlightsTable
                            flights={gate.flights}
                            onUpdate={parameters.onUpdate} />
                    </div>
                )}
            </div>;
        </div>
        );
};

export default AirportGatesTable;



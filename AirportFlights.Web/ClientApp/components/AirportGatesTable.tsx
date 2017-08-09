import * as React from 'react';

const AirportFlightsTable = ({ flights, onUpdate }) => {
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
            {flights.map(flight =>
                    <tr key={flight.flightId}>
                        <td>{flight.flightNumber}</td>
                        <td>{flight.arrival}</td>
                        <td>{flight.departure}</td>
                        <td>
                            <button type="button" onClick={() => onUpdate(flight)
                            } className="btn btn-info btn-sm">Update</button>
                        </td>
                    </tr>
                )}         
        </tbody>
    </table>;
};

const AirportGatesTable = ({ gates, onUpdate }) => {
    return (
        <div>
            <h1></h1>
            <div className="col-md-12">
                {gates.map(gate =>
                    <div className="well well-lg" key={gate.gateId}>
                        <h2>{gate.gateName}</h2>
                        <AirportFlightsTable
                            flights={gate.flights}
                            onUpdate={onUpdate} />
                    </div>
                )}
            </div>;
        </div>
        );
};

export default AirportGatesTable;



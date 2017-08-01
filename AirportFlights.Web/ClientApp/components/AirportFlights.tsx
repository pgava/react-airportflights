import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as AirportFlightsStore from '../store/AirportFlights';

type AirportFlightsProps = AirportFlightsStore.AirportFlightsState & typeof AirportFlightsStore.actionCreators;

class AirportFlights extends React.Component<AirportFlightsProps, void> {
    componentWillMount() {
        this.props.getAllFlights();
    }
    componentWillReceiveProps(nextProps) {
    }

    handleUpdate(flight) {        
        this.props.goToFlight();         
    }
    
    public render() {
        return <div>
            <h1></h1>
            {this.renderGateTable()}
        </div>;
    }

    renderGateTable() {
        return <div className="col-md-12">
               {this.props.gates.map(gate =>
                <div className="well well-lg" key={gate.gateId}>
                    <h2>{gate.gateName}</h2>
                        {this.renderFlightTable(gate.flights)}
                </div>
                )}
        </div>;
    }

    renderFlightTable(flights) {
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
                            <button type="button" onClick={() => this.handleUpdate(flight)
                            } className="btn btn-info btn-sm">Update</button>
                        </td>
                    </tr>
                   )}
                   </tbody>
               </table>;
    }
}
                     

export default connect(
    (state: ApplicationState) => {
        return state.airportFlights;
    },
    AirportFlightsStore.actionCreators
)(AirportFlights);


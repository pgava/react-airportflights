import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as AirportFlightsStore from '../store/AirportFlights';

type AirportFlightsProps = AirportFlightsStore.AirportFlightsState & typeof AirportFlightsStore.actionCreators;

class AirportFlights extends React.Component<AirportFlightsProps, void> {
    componentWillMount() {
        this.props.getAllFlights();
    }

    handleUpdate(flight) {
        alert(flight.flightNumber);
    }
    
    public render() {
        return <div>
            <h1>___</h1>
            {this.renderGateTable()}
        </div>;
    }

    renderGateTable() {
        return <div className="col-md-12">
            <div className="well well-lg ng-scope">
            <table className="table table-striped">
                   <thead>
                   <tr>
                       <th>Name</th>
                       <th>Arrive</th>
                       <th>Leave</th>
                       <th></th>
                   </tr>
                   </thead>
                   <tbody>
                {this.props.flights.map(flight =>
                    <tr key={flight.id}>
                        <td>{flight.flightNumber}</td>
                        <td>{flight.arrival}</td>
                        <td>{flight.departure}</td>                        
                        <td>
                            <button type="button" onClick={() => this.handleUpdate(flight)} className="btn btn-info btn-sm">Update</button>
                        </td>
                    </tr>
                )}
                   </tbody>
               </table>
            </div>
        </div>;
    }
}
                     

export default connect(
    (state: ApplicationState) => {
        return state.airportFlights;
    },
    AirportFlightsStore.actionCreators
)(AirportFlights);


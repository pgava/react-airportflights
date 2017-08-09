import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as AirportFlightsStore from '../store/AirportFlights';
import AirportGatesTable from './AirportGatesTable';

type AirportFlightsProps = AirportFlightsStore.AirportFlightsState & typeof AirportFlightsStore.actionCreators;

class AirportFlights extends React.Component<AirportFlightsProps, void> {
    componentWillMount() {
        this.props.getAllFlights();
    }
    componentWillReceiveProps(nextProps) {
    }

    handleUpdate = (flight) => {
        this.props.goToFlight(flight.flightId);
    }

    public render() {
        return <div>
            <AirportGatesTable
                gates={this.props.gates}
                onUpdate={this.handleUpdate} />
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return state.airportFlights;
    },
    AirportFlightsStore.actionCreators
)(AirportFlights);


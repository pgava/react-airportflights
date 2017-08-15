import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as FlightStore from '../store/Flight';
import FlightForm from './FlightForm';
import { Error, Status } from '../api/FlightApi';

type FlightProps = FlightStore.FlightState & typeof FlightStore.actionCreators & { params: { flightId: string, gateId: string } };

class Flight extends React.Component<FlightProps, FlightStore.FlightState> {

    constructor(props, context) {
        super(props, context);

        this.state = {
            flight: Object.assign({}, props.flight),
            saving: false,
            error: { flightNumber: "", description: "", arrival: "", departure: "" },
            status: { message: "", type:"" }
        };
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        let flightId = parseInt(this.props.params.flightId) || 0;
        let gateId = parseInt(this.props.params.gateId) || 0;
        if (flightId !== 0) {
            this.props.getFlight(flightId);
        } else {
            this.state.flight.gateId = gateId;
        }
    }

    componentWillReceiveProps(nextProps: FlightStore.FlightState): void {
        if (nextProps.flight !== null) {
            let flight = Object.assign({}, nextProps.flight);
            let error = Object.assign({}, nextProps.error);
            let status = Object.assign({}, nextProps.status);
            this.state.flight = flight;
            this.state.error = error;
            this.state.status = status;
            this.state.saving = nextProps.saving;
        }
    }
    
    onSubmit = e => {
        e.preventDefault();

        if (!this.flightFormIsValid()) {
            return;
        }

        this.props.saveFlight(this.state.flight);
    };

    updateFlightState = e => {
        const field = e.target.name;
        let flight = Object.assign({}, this.state.flight);
        let error = Object.assign({}, this.state.error);
        let status = Object.assign({}, this.state.status);
        flight[field] = e.target.value;
        return this.setState({ flight: flight, saving: this.state.saving, error: error, status: status });
    }

    flightFormIsValid = () => {
        let formIsValid = true;
        let errors: Error = { flightNumber: "", description: "", arrival: "", departure: "" };

        if (this.state.flight.flightNumber.length < 5) {
            errors.flightNumber = 'Flight Number must be at least 5 characters.';
            formIsValid = false;
        }

        let arrivaltime = new Date(this.state.flight.arrival);
        if (isNaN(arrivaltime.getFullYear())) {
            errors.arrival = 'Arrival time must in a valide date/time format.';
            formIsValid = false;
        }

        let departuretime = new Date(this.state.flight.departure);
        if (isNaN(departuretime.getFullYear())) {
            errors.departure = 'Departure time must in a valide date/time format.';
            formIsValid = false;
        }

        let flight = Object.assign({}, this.state.flight);
        let status = Object.assign({}, this.state.status);
        this.setState({ flight: flight, saving: false, error: errors, status: status });
        return formIsValid;
    }

    createFlightForm = () => {        
        return <div className="col-md-12">
            <FlightForm
                onChange={this.updateFlightState}
                onSave={this.onSubmit}
                flight={this.state.flight}
                saving={this.state.saving}
                error={this.state.error}
                status={this.state.status}
            />
    </div>;
    };

    public render() {
        return this.createFlightForm();
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.flight,     // Selects which state properties are merged into the component's props
    FlightStore.actionCreators              // Selects which action creators are merged into the component's props
)(Flight);

import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as FlightStore from '../store/Flight';

type FlightProps = FlightStore.FlightState & typeof FlightStore.actionCreators;

class Flight extends React.Component<FlightProps, FlightStore.FlightState> {
    state = {
        flight: {
            flightId: 0,
            gateId: 1,
            flightNumber: "",
            description: "",
            arrival: "",
            departure: ""
        },
        saved: false,
        error: ""
    };
    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        this.props.saveFlight(this.state.flight);
    };
    onChangeflightNumber = e => {
        const target = e.target;
        if (target instanceof HTMLInputElement) {
            let f = { ...this.state.flight};
            f.flightNumber = e.target.value;
            this.setState({ flight: f, saved: this.state.saved, error: this.state.error });
        }
    };
    onChangedescription= e => {
        const target = e.target;
        if (target instanceof HTMLInputElement) {
            let f = { ...this.state.flight };
            f.description = e.target.value;
            this.setState({ flight: f, saved: this.state.saved, error: this.state.error });
        }
    };
    onChangearrival = e => {
        const target = e.target;
        if (target instanceof HTMLInputElement) {
            let f = { ...this.state.flight };
            f.arrival = e.target.value;
            this.setState({ flight: f, saved: this.state.saved, error: this.state.error });
        }
    };
    onChangedeparture = e => {
        const target = e.target;
        if (target instanceof HTMLInputElement) {
            let f = { ...this.state.flight };
            f.departure = e.target.value;
            this.setState({ flight: f, saved: this.state.saved, error: this.state.error });
        }
    };
    public render() {
        const { state } = this;

        return <div>
            <h1>Flight3</h1>

            <form onSubmit={this.onSubmit}>
                <label> Number:
                    <input type="text" value={state.flight.flightNumber} onChange={this.onChangeflightNumber} />
                </label>
                <label> Description:
                    <input type="text" value={state.flight.description} onChange={this.onChangedescription} />
                </label>
                <label> Arrival:
                    <input type="text" value={state.flight.arrival} onChange={this.onChangearrival} />
                </label>
                <label> Departure:
                    <input type="text" value={state.flight.departure} onChange={this.onChangedeparture} />
                </label>

                <button type="submit">Save</button>
            </form>

        </div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.flight, // Selects which state properties are merged into the component's props
    FlightStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Flight);

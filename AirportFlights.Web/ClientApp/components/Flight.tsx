import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as FlightStore from '../store/Flight';

type FlightProps = FlightStore.FlightState & typeof FlightStore.actionCreators & { params: { flightId: string } };

class Flight extends React.Component<FlightProps, FlightStore.FlightState> {
    state = {
        flight: {
            flightId: 0,
            gateId: 1,
            flightNumber: "",
            description: "",
            arrival: "",
            departure: "",
            isCancel: false
        },
        saved: false,
        error: ""
    };

    componentWillMount() {
        // This method runs when the component is first added to the page
        let flightId = parseInt(this.props.params.flightId) || 0;
        this.props.getFlight(flightId);
    }

    componentWillReceiveProps(nextProps: FlightStore.FlightState): void {
        if (nextProps.flight !== null) {
            this.state.flight = nextProps.flight;
            this.state.saved = nextProps.saved;
            this.state.error = nextProps.error;            
        }
    }
    
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

    showResultSave = () => {
        return <div>
                   <div className="row">&nbsp;</div>
                   <div className="row">
                       <div className="col-sm-10">
                           <div className="alert alert-success" role="alert">
                               <strong>Saved!</strong> Flight details have been saved.
                           </div>
                       </div>
                   </div>
               </div>;
    };
  
    createFlightForm = (state) => {
        return <div className="col-md-12">
        <h1>Flight</h1>
        <div className="well well-lg">
            <form className="form-horizontal" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="flightNumber">Number</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id="flightNumber" value={state.flight.flightNumber} onChange={this.onChangeflightNumber} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="description">Description</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="description" value={state.flight.description} onChange={this.onChangedescription} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="arrival">Arrival</label>
                    <div className="col-sm-2">
                            <input type="text" className="form-control" id="arrival" value={state.flight.arrival} onChange={this.onChangearrival} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="departure">Departure</label>
                    <div className="col-sm-2">
                            <input type="text" className="form-control" id="departure" value={state.flight.departure} onChange={this.onChangedeparture} />
                    </div>
                </div>
                <button type="submit" className="btn btn-default">Save</button>
                {state.saved && this.showResultSave() }
            </form>
        </div>;
    </div>;
    };

    public render() {
        const { state } = this;

        return this.createFlightForm(state);
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.flight,     // Selects which state properties are merged into the component's props
    FlightStore.actionCreators              // Selects which action creators are merged into the component's props
)(Flight);

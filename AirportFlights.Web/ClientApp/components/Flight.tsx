import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as FlightStore from '../store/Flight';
import FlightForm from './FlightForm';

type FlightProps = FlightStore.FlightState & typeof FlightStore.actionCreators & { params: { flightId: string, gateId: string } };

class Flight extends React.Component<FlightProps, FlightStore.FlightState> {

    constructor(props, context) {
        super(props, context);

        this.state = {
            flight: Object.assign({}, props.flight),
            error: "",
            saving: false
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
            this.state.flight = nextProps.flight;
            this.state.saving = nextProps.saving;
            this.state.error = nextProps.error;            
        }
    }
    
    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        this.props.saveFlight(this.state.flight);
    };

    updateFlightState(event) {
        const field = event.target.name;
        let flight = Object.assign({}, this.state.flight);
        flight[field] = event.target.value;
        return this.setState({ flight: flight, saving: this.state.saving, error:this.state.error});
    }
  
    createFlightForm = () => {
        return <div className="col-md-12">

            <FlightForm                       
                onChange={this.updateFlightState}
                onSave={this.onSubmit}
                flight={this.state.flight}
                error={this.state.error}
                saving={this.state.saving}
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

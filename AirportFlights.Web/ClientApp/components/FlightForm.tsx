import * as React from 'react';
import TextInput from './common/TextInput';
import StatusBox from './common/StatusBox';
import {Flight, Error, Status} from '../api/FlightApi';

interface FligthFormParameters {
    flight: Flight;
    onSave: (e) => void;
    onChange: (e) => void;
    saving: boolean;
    error: Error;
    status: Status;
}

const FlightForm = (parameters: FligthFormParameters) => {
    return (
        <form>
            <h1>Flight</h1>
            <StatusBox
                message={parameters.status.message}
                type={parameters.status.type} />
            <TextInput
                name="flightNumber"
                label="Flight Number"
                value={parameters.flight.flightNumber}
                placeholder={"Flight Number"}
                onChange={parameters.onChange}
                error={parameters.error.flightNumber} />

            <TextInput
                name="description"
                label="Description"
                value={parameters.flight.description}
                placeholder={"Description"}
                onChange={parameters.onChange}
                error={parameters.error.description} />

            <TextInput
                name="arrival"
                label="Arrival"
                value={parameters.flight.arrival}
                placeholder={"Arrival"}
                onChange={parameters.onChange}
                error={parameters.error.arrival} />

            <TextInput
                name="departure"
                label="Departure"
                value={parameters.flight.departure}
                placeholder={"Departure"}
                onChange={parameters.onChange}
                error={parameters.error.departure} />

            <input
                type="submit"
                disabled={parameters.saving}
                value={parameters.saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={parameters.onSave} />

        </form>
    );
};

export default FlightForm;

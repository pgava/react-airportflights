import * as React from 'react';
import TextInput from './common/TextInput';

const FlightForm = ({ flight, onSave, onChange, saving, errors }) => {
    return (
        <form>
            <h1>Flight</h1>
            <TextInput
                name="flightNumber"
                label="Flight Number"
                value={flight.flightNumber}
                placeholder={"Flight Number"}
                onChange={onChange}
                error={errors.title} />

            <TextInput
                name="description"
                label="Description"
                value={flight.description}
                placeholder={"Description"}
                onChange={onChange}
                error={errors.title} />

            <TextInput
                name="arrival"
                label="Arrival"
                value={flight.arrival}
                placeholder={"Arrival"}
                onChange={onChange}
                error={errors.title} />

            <TextInput
                name="departure"
                label="Departure"
                value={flight.departure}
                placeholder={"Departure"}
                onChange={onChange}
                error={errors.title} />

            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave} />

        </form>
    );
};

export default FlightForm;

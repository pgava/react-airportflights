import * as React from 'react';
import { Router, Route, HistoryBase } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import AirportFlights from "./components/AirportFlights";
import Flight from './components/Flight';

export default <Route component={ Layout }>
    <Route path='/' components={{ body: Home }} />
    <Route path='/airportflights' components={{ body: AirportFlights }} />
    <Route path='/flight' components={{ body: Flight }} >
        <Route path='(:flightId)' />
    </Route>
</Route>;

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept();
}

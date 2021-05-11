import React from 'react';
// import { useQuery } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

// import { Country } from "./types/Country";
// import api from './api/Api'
import Home from './pages/Home';

export default function App() {

  // const { data } = useQuery<Country[]>(
  //   "countries",
  //   api
  // );

  return (
    <Router>
      <div>
        <Switch>
          {/* <Home countries={data} /> */}
          <Home/>
        </Switch>
      </div>
    </Router>
  );
};
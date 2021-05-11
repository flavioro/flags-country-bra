import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import style from "./App.module.scss";
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import SinglePage from './pages/SinglePage';


export default function App() {
  return (
    <Router>
      <div className={style.container}>

        <header className={style.header}>
          <div className={style.content}>
            <Link to='/'>Where in the world?</Link>

            <div>
              <ThemeToggle />
            </div>

          </div>
        </header>

        <div className={style.container}>
          <Switch>
            <Route path="/" exact >
              <Home />
            </Route>
            <Route path="/countries/:id" >
              <SinglePage />
            </Route>
            <Redirect to="/" />
          </Switch>

        </div>


      </div>
    </Router>
  );
};
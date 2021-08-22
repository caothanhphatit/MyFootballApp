import React from 'react'
import HomePage from './pages/Home'
import AboutUs from './pages/AboutUs';
import Layout from './pages/Layout'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/about-us">
          <Layout><AboutUs /></Layout>
        </Route>
        <Route exact path="/">
          <Layout><HomePage /></Layout>
        </Route>
      </Switch>
    </Router>
  )
}

export default App

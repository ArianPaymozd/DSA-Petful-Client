import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import AdoptionPage from '../AdpotionPage/AdoptionPage'
import LandingPage from '../LandingPage/LandingPage'
import './Root.css'

function Root() {
  return (
    <div className="App">
      <header className='App_header'>
        <Link to='/'><h1>Petful</h1></Link>
      </header>
      <main className="App_main">
        <Switch>
          <Route
          exact
          path={'/'}
          component={LandingPage}
          />
          <Route
          path={'/adopt'}
          component={AdoptionPage}
          />
        </Switch>
      </main>
    </div>
  )
}

export default Root

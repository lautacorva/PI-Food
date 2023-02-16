import './App.css';
import { Route, HashRouter, Switch } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer';
import LandingP from './paths/LandingP.jsx'
import Home from './paths/Home.jsx'
import Detail from './paths/Detail.jsx'
import Submit from './paths/Submit.jsx'

function App() {

  const location = useLocation()

  const history = useHistory()
  const navigateTo = (url) => {
    history.push(url)
  }

  return (
    <div className='App'>
      {location.pathname === '/' ? null : <Nav navigateTo={navigateTo} location={location} />}
      <HashRouter>
        <Switch>
          <Route exact path='/'>
            <LandingP navigateTo={navigateTo} />
          </Route>
          <Route path='/home'>
            <Home navigateTo={navigateTo} />
          </Route>
          <Route path='/recipes/:id'>
            <Detail navigateTo={navigateTo} />
          </Route>
          <Route path='/submit-your-recipe'>
            <Submit navigateTo={navigateTo} />
          </Route>
        </Switch>
      </HashRouter>
      {location.pathname === '/' ? null : <Footer />}
    </div>
  );
}

export default App;

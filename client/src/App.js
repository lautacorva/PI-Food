import './App.css';
import { Route, HashRouter, Switch } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import Nav from './components/Nav';
import LandingP from './paths/LandingP.jsx'
import Home from './paths/Home.jsx'
import Detail from './paths/Detail.jsx'
import Submit from './paths/Submit.jsx'

function App() {

  const location = useLocation()

  const history = useHistory()
  const navegateTo = (url) => {
    history.push(url)
  }

  return (
    <div className='App'>
      {location.pathname === '/' ? null : <Nav navegateTo={navegateTo} />}
      <HashRouter>
        <Switch>
          <Route exact path='/'>
            <LandingP navegateTo={navegateTo} />
          </Route>
          <Route path='/home'>
            <Home navegateTo={navegateTo} />
          </Route>
          <Route path='/recipes'>
            <Detail navegateTo={navegateTo} />
          </Route>
          <Route path='/submit-your-recipe'>
            <Submit navegateTo={navegateTo} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;

import './App.css';
import { Route, HashRouter, Switch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import LandingP from './paths/LandingP.jsx'
import Home from './paths/Home.jsx'
import Detail from './paths/Detail.jsx'
import Submit from './paths/Submit.jsx'

function App() {

  const history = useHistory()
  const navegateTo = (url) => {
    history.push(url)
  }

  return (
    <div className='App'>
      <HashRouter>
        <Switch>
          <Route exact path='/'>
            <LandingP navegateTo={navegateTo} />
          </Route>
          <Route path='/home'>
            <Home navegateTo={navegateTo} />
          </Route>
          <Route path='/recipes/:t'>
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

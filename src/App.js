import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './modules/MainRouter.js';

function App() {
  return (
    <Router>
      <Switch>
       <Route path="/" component={MainRouter}/>
      </Switch>
    </Router>
  );
}

export default App;

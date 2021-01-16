import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './Modules/MainRouter.js';

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

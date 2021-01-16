import './App.css';
import { Switch, Route } from 'react-router-dom';
import MainRouter from './modules/MainRouter.js';

function App() {
  return (
    <Switch>
      <Route path="/" component={MainRouter}/>
    </Switch>
  );
}

export default App;

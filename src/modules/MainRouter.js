import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import GravityMode from './GravityMode';
import FloatMode from './FloatMode';
import Main from './Main';

function MainRouter(props){

    const history = useHistory()

    return(
        <Switch>
            <Route exact path="/float">
                <FloatMode/>
            </Route> 
            <Route exact path="/gravity">
                <GravityMode history={history}/>
            </Route> 
            <Route path="/destroy"/>
            <Route path="/" component={Main}/>
        </Switch>
    )
}

export default MainRouter



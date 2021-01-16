import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GravityMode from './GravityMode';
import FloatMode from './FloatMode';
import Main from './Main';

function MainRouter(props){

    return(
        <Switch>
            <Route exact path="/float">
                <FloatMode />
            </Route> 
            <Route exact path="/gravity">
                <GravityMode/>
            </Route> 
            <Route path="/destroy"/>
            <Route path="/" component={Main}/>
        </Switch>
    )
}

export default MainRouter



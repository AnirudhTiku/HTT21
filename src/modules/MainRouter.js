import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GravityMode from './GravityMode';
import Main from './Main';

function MainRouter(props){

    return(
        <Switch>
            <Route exact path="/float">

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



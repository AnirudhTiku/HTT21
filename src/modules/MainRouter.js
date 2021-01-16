import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main';

export default function MainRouter(props){

    return(
        <Switch>
            <Route path="/float"/> 
            <Route path="/gravity"/>
            <Route path="/" component={Main}/>
        </Switch>
    )
}

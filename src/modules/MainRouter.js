import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Main from 'Main.js'

export default function MainRouter(props){

    return(
        <Switch>
            <Route path="/float"/> 
            <Route path="/gravity"/>
            <Route path="/" component={Main}/>
        </Switch>
    )
}

import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import GravityMode from './GravityMode';
import FloatMode from './FloatMode';
import Main from './Main';
import serverUrl from './constants.js'

function MainRouter(props) {

    const history = useHistory()

    if (!localStorage.getItem('user_id')) {
        let xhttp = new XMLHttpRequest();
        xhttp.addEventListener('load', () => {
            localStorage.setItem('user_id', JSON.parse(xhttp.responseText)['user_id'])
        })
        xhttp.open("GET", `${serverUrl}createUser`, true)
        xhttp.send();

        // fetch(`${serverUrl}createUser`)
        // .then((response)=>{
        //     debugger
        //     JSON.parse(response)
        // })
        // .then(data=>{
        //     localStorage.setItem('user_id', data['user_id'])

        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    }

    return (
        <Switch>
            <Route exact path="/float">
                <FloatMode />
            </Route>
            <Route exact path="/gravity">
                <GravityMode history={history} />
            </Route>
            <Route path="/destroy" />
            <Route path="/" component={Main} />
        </Switch>
    )
}

export default MainRouter



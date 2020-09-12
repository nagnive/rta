import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from '../components/login/login';
import User from '../components/users/user';
import AddUser from '../components/adduser/adduser';

function Routes(){
    return(
        <Switch>
            {/* <Route path='/' component={TestHTML}></Route> */}
            <Route path='/' exact component={Login} ></Route>
            <Route path='/user' exact component={User}></Route>
            <Route path='/adduser' exact component={AddUser}></Route>
        </Switch>
    );
}

export default Routes;
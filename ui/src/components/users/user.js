import React, { Component } from 'react';
import UserNav from './usernav';
import UserLayout from './userlayout';
import AddUsers from '../adduser/adduser';
import { Redirect } from 'react-router-dom';
import * as Constants from '../../constants';

class User extends Component {
    render(){
        return(
            <div>
                {
                    this.props.location.state === undefined ?
                    <Redirect to="/" />
                    : 
                    <div>
                        <UserNav role={this.props.location.state.userrole} 
                        isloggedin={this.props.location.state.isloggedin}/>
                        {
                            this.props.location.state.userrole.toString().toLowerCase() === Constants.NORMAL ?
                            <AddUsers role={this.props.location.state.userrole}/>
                            :
                            <UserLayout role={this.props.location.state.userrole}
                            isloggedin={this.props.location.state.isloggedin}/>
                        }
                    </div>
                }
               
            </div>
        )
    }
}

export default User;
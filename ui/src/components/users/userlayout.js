import React, { Component } from 'react';
import { Container} from 'react-bootstrap';
import ApproveUser from './approveusers';
import UserList from './userlist';

class UserLayout extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Container>
                    <ApproveUser role={this.props.role} />
                    <UserList role={this.props.role} />
                </Container>
            </div>
        )
    }
}

export default UserLayout;

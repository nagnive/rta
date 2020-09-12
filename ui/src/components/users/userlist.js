import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../../constants';
import { Row, Col, Jumbotron, Table, Alert, Badge } from 'react-bootstrap';

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            allusers: []
        }
    }

    componentDidMount(){
        if(this.props.role.toString().toLowerCase() === Constants.ADMIN)
        {
            this.getAllUserData();
        }
    }

    componentDidUpdate(){
        if(this.props.role.toString().toLowerCase() === Constants.ADMIN)
        {
            this.getAllUserData();
        }
    }

    getAllUserData(){
        var requrl =  Constants.API_URL + "Api/UserInfo/getallusers";
        console.log(requrl);
        setTimeout(() => {
            axios({
                method: "get",
                url: requrl,
              }).then(resp =>  {
                console.log(resp);
                this.setState({
                    allusers : resp.data
                });
              }).catch(error => {
                console.log(error);
              });
        }, 1000)
    }

    render(){
        return(
            <div>
                {
                    this.props.role.toString().toLowerCase() === Constants.ADMIN ?
                        <div>
                            <Row>
                                <Col>
                                    <h1>All Users</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Jumbotron>
                                        { 
                                            this.state.allusers.length > 0 ? 
                                                <Table striped bordered hover variant="dark">
                                                    <thead>
                                                        <tr>
                                                        <th>#</th>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>Email</th>
                                                        <th>Mobile</th>
                                                        <th>Status</th>
                                                        <th>User Role</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.allusers.map((item, i) =>
                                                                <tr key={i}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{item.FirstName}</td>
                                                                    <td>{item.LastName}</td>
                                                                    <td>{item.Email}</td>
                                                                    <td>{item.Mobile}</td>
                                                                    <td>
                                                                    {
                                                                        item.Status === Constants.NEWUSER ?
                                                                        <Badge variant="warning">New User</Badge> 
                                                                        :
                                                                        (item.Status === Constants.APPROVEUSER ? 
                                                                        <Badge variant="success">Pending</Badge>
                                                                        :
                                                                        (item.Status === Constants.INACTIVE ?
                                                                            <Badge variant="light">In Active</Badge>
                                                                        :
                                                                        <Badge variant="primary">Active</Badge>
                                                                        )
                                                                        )
                                                                    }
                                                                    </td>
                                                                    <td>
                                                                    {
                                                                        item.UserRole.toString().toLowerCase() === Constants.SUPER ?
                                                                        <Badge variant="warning" pill>Super</Badge> 
                                                                        :
                                                                        (item.UserRole.toString().toLowerCase() === Constants.ADMIN ? 
                                                                        <Badge variant="success" pill>Admin</Badge>
                                                                        :
                                                                        <Badge variant="primary" pill>Normal</Badge>
                                                                        )
                                                                    }
                                                                    </td>
                                                                </tr>
                                                                )
                                                        }
                                                    </tbody>
                                                </Table>
                                            :
                                                <Alert variant="success">
                                                    No users to list!
                                                </Alert>
                                        }
                                    </Jumbotron>
                                </Col>
                            </Row> 
                        </div>
                    :
                    <Row>
                    </Row>
                }
            </div>
        )
    }
}

export default UserList;
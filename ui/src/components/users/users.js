import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../../constants';
import { Container, Row, Col, Jumbotron, Table, Button, Alert, Badge } from 'react-bootstrap';

class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            allusers: []
        }
    }
    
    componentDidMount(){
        if(this.props.role.toString().toLowerCase() === Constants.ADMIN)
        {
            this.getAllUserData();
        }
        this.getApprovalData();
      }

componentDidUpdate()
{
    if(this.props.role.toString().toLowerCase() === Constants.ADMIN)
    {
        this.getAllUserData();
    }
}

    handleApprove(user)
    {
        this.props.role.toString().toLowerCase() === Constants.SUPER ? user.Status = Constants.ACTIVE : user.Status = Constants.APPROVEUSER;
        var requrl =  Constants.API_URL + "Api/UserInfo/approvedeny/"+this.props.role+"/"+user.UserId;
            setTimeout(() => {
                axios({
                    method: "put",
                    url: requrl,
                    data: user,
                    param: null
                }).then(resp =>  {
                    this.getApprovalData();
                }).catch(error => {
                    console.log(error);
                  });
            }, 1000);
    }

    handleDeny(user)
    {
        user.Status = Constants.INACTIVE;
        //var reqparam = {userrole: this.props.location.state.userrole, userid: user.UserId};
        var requrl =  Constants.API_URL + "Api/UserInfo/approvedeny/"+this.props.role+"/"+user.UserId;
            setTimeout(() => {
                axios({
                    method: "put",
                    url: requrl,
                    data: user,
                    param: null
                }).then(resp =>  {
                    this.getApprovalData();
                }).catch(error => {
                    console.log(error);
                  });
            }, 1000);
    }

      getApprovalData(){
        var reqparam = {userrole: this.props.role};
        var requrl =  Constants.API_URL + "Api/UserInfo/approvalusers/"+this.props.role;
        setTimeout(() => {
            axios({
                method: "get",
                url: requrl,
                data: null,
                param:reqparam
              }).then(resp =>  {
                this.setState({
                    users : resp.data
                });
              }).catch(error => {
                console.log(error);
              });
        }, 1000)
      }

      getAllUserData(){
        var requrl =  Constants.API_URL + "Api/UserInfo/getallusers";
        setTimeout(() => {
            axios({
                method: "get",
                url: requrl,
              }).then(resp =>  {
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
                <Container>
                    <Row>
                        <Col>
                            <h1>List Users</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Jumbotron>
                                { this.state.users.length > 0 ? 
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
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.users.map((item, i) =>
                                                    <tr key={i}>
                                                        <td>{item.UserId}</td>
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
                                                            <Badge variant="primary">Active</Badge>
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
                                                        <td>
                                                            <Button variant="primary" onClick={ ()=> this.handleApprove(item)}>Approve</Button>{' '}
                                                            <Button variant="danger" onClick={ ()=> this.handleDeny(item)}>Deny</Button>
                                                        </td>
                                                    </tr>
                                                    )
                                            }
                                        </tbody>
                                    </Table>
                                 :
                                    <Alert variant="success">
                                        All users are approved!
                                    </Alert>
                                }
                            </Jumbotron>
                        </Col>
                    </Row>

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
                                    { this.state.allusers.length > 0 ? 
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
                                                            <td>{item.UserId}</td>
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
                                            Use Normal User to add some users!
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
                </Container>
            </div>
        )
    }
}

export default Users;

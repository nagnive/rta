import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../../constants';
import { Row, Col, Jumbotron, Table, Button, Alert, Badge } from 'react-bootstrap';

class ApproveUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        this.getApprovalData();
    }

    handleApprove(user){
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
        console.log(requrl);
        setTimeout(() => {
            axios({
                method: "get",
                url: requrl,
                data: null,
                param:reqparam
              }).then(resp =>  {
                  console.log(resp);
                this.setState({
                    users : resp.data
                });
              }).catch(error => {
                console.log(error);
              });
        }, 1000)
    }

    render(){
        return(
            <div>
                <Row>
                    <Col>
                        <h1>Approve Now</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Jumbotron>
                        { 
                        this.state.users.length > 0 ? 
                            <Table striped bordered hover variant="dark" responsive>
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
                                                <td>{i+1}</td>
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
            </div>
        )
    }
}

export default ApproveUsers;
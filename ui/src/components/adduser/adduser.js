import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Jumbotron, Alert } from 'react-bootstrap';
import * as Constants from '../../constants';
class AddUsers extends Component {

state = {
    fname: "",
    lname: "", 
    email: "",
    mobile: "",
    add1:"",
    add2:"",
    role:"",
    status: Constants.NEWUSER,
    isAddSuccess: null
  }

handleSubmit = (event) => {
    event.preventDefault();
    let addReq = {
        firstname: this.state.fname,
        lastname: this.state.lname,
        email: this.state.email,
        mobile: this.state.mobile,
        address1: this.state.add1,
        address2: this.state.add2,
        userrole: this.state.role,
        status: this.state.status,
      };
      axios({
        method: "post",
        url: Constants.API_URL + "Api/UserInfo",
        data: addReq
      }).then(resp =>  {
          if(resp.status === 200)
          {
            this.setState({ 
                fname: "",
                lname: "", 
                email: "",
                mobile: "",
                add1:"",
                add2:"",
                role:"",
                status: Constants.NEWUSER,
                isAddSuccess: true
            });
          }
          else{
              this.setState({isAddSuccess: false});
          }
      }).catch(error => {
          console.log(error);
      });
}

validateForm = () =>  {
    return this.state.fname.length > 0 
    && this.state.lname.length > 0
    && this.state.email.length > 0
    && this.state.mobile.length > 0
    && this.state.add1.length > 0
    && this.state.add2.length > 0
    && this.state.role.length > 0;
  }

render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>Add Users</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Jumbotron>
                                {
                                    this.state.isAddSuccess === null ?
                                    console.log("init")
                                    :
                                    this.state.isAddSuccess ?
                                    <Alert variant="success" onClick={() => this.setState({isAddSuccess: null})} dismissible>
                                        <p>User added sucessfully</p>
                                    </Alert>
                                    :
                                    <Alert variant="Danger" onClick={() => this.setState({isAddSuccess: null})} dismissible>
                                        <p>Failed to add user</p>
                                    </Alert>
                                }
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" 
                                         value={this.state.fname}
                                         onChange={e => this.setState({fname:e.target.value})}
                                        placeholder="Enter First Name" />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridLastName">
                                        <Form.Label>LastName</Form.Label>
                                        <Form.Control type="text" 
                                        value={this.state.lname}
                                        onChange={e => this.setState({lname:e.target.value})}
                                        placeholder="Enter Last Name" />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" 
                                        value={this.state.email}
                                        onChange={e => this.setState({email:e.target.value})}
                                        placeholder="Enter email" />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridMobile">
                                        <Form.Label>Mobile</Form.Label>
                                        <Form.Control type="number" 
                                        value={this.state.mobile}
                                        onChange={e => this.setState({mobile:e.target.value})}
                                        placeholder="Enter Mobile Number" />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control 
                                        value={this.state.add1}
                                        onChange={e => this.setState({add1:e.target.value})}
                                        placeholder="1234 Main St" />
                                    </Form.Group>

                                    <Form.Group controlId="formGridAddress2">
                                        <Form.Label>Address 2</Form.Label>
                                        <Form.Control 
                                        value={this.state.add2}
                                        onChange={e => this.setState({add2:e.target.value})}
                                        placeholder="Apartment, studio, or floor" />
                                    </Form.Group>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridRole">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control as="select" 
                                        value={this.state.role}
                                        onChange={e => this.setState({role:e.target.value})}
                                        defaultValue="Select Role">
                                            <option>Select Role</option>
                                            <option>NormalUser</option>
                                            <option>AdminUser</option>
                                            <option>SuperUser</option>
                                        </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col xs="ms-auto">
                                            <Button variant="danger" block disabled={!this.validateForm()} className="text-center" type="submit">
                                                Submit
                                            </Button>
                                        </Col>
                                    </Form.Row>
                                    
                                </Form>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default AddUsers;

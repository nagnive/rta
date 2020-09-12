import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Jumbotron } from 'react-bootstrap';
import '../login/login.css';

class Login extends Component {
  state = {
    redirect: false,
    userrole: "",
    isloggedin: null
  }

  validateForm = () =>  {
    return this.state.userrole.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirect: true, isloggedin: true});
  }

  render () {
    const { redirect, userrole, isloggedin } = this.state;
   
     if (redirect) {
          return <Redirect
          to={{
            pathname: "/user",
            state: { userrole: userrole, isloggedin: isloggedin }
          }}
          />;
      }

     return (
      <div className="Login">
          <Container>
            <Row>
                <Col>
                  <Row className="text-center">
                    <Col>
                      <h2><Form.Label>Login</Form.Label></h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Jumbotron fluid>
                        <form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="userrole">
                            <Form.Control as="select" 
                            value={this.state.userrole}
                            onChange={e => this.setState({userrole: e.target.value})}>
                            <option>Select role</option>
                            <option>NormalUser</option>
                            <option>AdminUser</option>
                            <option>SuperUser</option>
                            </Form.Control>
                          </Form.Group>
                          <Button block disabled={!this.validateForm()} type="submit">
                            Login
                          </Button>
                        </form>
                      </Jumbotron>
                    </Col>
                  </Row>
                </Col>
              </Row>
          </Container>  
      </div>
    );
  }
} 


export default Login;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Image, Card } from 'react-bootstrap';
import '../login/login.css';
import logo from '../../assets/img/logo.png';

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
              <Col sm>
              </Col>
              <Col sm> 
                <Card className="text-center">
                  <Card.Header> 
                    <Image
                          src={logo}
                          width="40"
                          height="40"
                          alt="RTA logo" 
                          thumbnail />{' '}
                      <h2>Login</h2>
                    </Card.Header>
                  <Card.Body>
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
                        <Button variant="primary" block disabled={!this.validateForm()} type="submit">
                          Login
                        </Button>
                      </form>
                  </Card.Body>
                </Card>
              </Col>  
              <Col sm>
              </Col>
            </Row>  
          </Container> 
      </div>
    );
  }
} 


export default Login;
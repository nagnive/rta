import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import * as Constants from "../../constants";

class UserNav extends Component {
    state = {
        loggedinuser: ""
    }
    componentDidMount(){
        this.setState({ 
            loggedinuser : this.props.role.toString().toLowerCase() === Constants.NORMAL ? "Normal User" 
            :(this.props.role.toString().toLowerCase() === Constants.ADMIN ?  "Admin User" : "Super User") 
        });
    }

    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <strong className="mr-auto">User Admin Module</strong>
                </Navbar.Brand>
                <Nav className="mr-auto">
                
                </Nav>
                <Form inline>
                    {
                        this.state.loggedinuser === "" ? ""
                        :
                        <Navbar.Brand href="#home">Logged in as - <strong>{this.state.loggedinuser}</strong></Navbar.Brand>
                    }
                    <Button variant="light"><Link to="/">Logout</Link></Button>
                </Form>
          </Navbar>
        )
    }
}

export default UserNav;
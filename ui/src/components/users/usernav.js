import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import * as Constants from "../../constants";
import logo from '../../assets/img/logo.png';

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
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="#home">
                <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                    <strong className="mr-auto">User Admin Module</strong>
                </Navbar.Brand>
                <Navbar.Collapse>
                {
                    this.state.loggedinuser === "" ? ""
                    :
                    <Navbar.Text>
                        (Logged in as <strong>{this.state.loggedinuser}</strong>)
                    </Navbar.Text>
                }
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href="/">
                        <Button variant="light">Logout</Button>
                    </Nav.Link>
                </Navbar.Collapse>
          </Navbar>
        )
    }
}

export default UserNav;
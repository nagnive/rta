import React, { Component } from 'react';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
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
                    <Image
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="RTA logo"
                        thumbnail />{' '}
                    <strong className="mr-auto">User Admin Module</strong>
                </Navbar.Brand>
                {
                    this.state.loggedinuser === "" ? ""
                    :
                    <Navbar.Text>
                        (Logged in as <strong>{this.state.loggedinuser}</strong>)
                    </Navbar.Text>
                }
                <Nav  className="mr-auto">
                </Nav>
                <Nav>
                    <Nav.Link href="/" className="justify-content-end">
                        <Button variant="light">Logout</Button>
                    </Nav.Link>
                </Nav>
          </Navbar>
        )
    }
}

export default UserNav;
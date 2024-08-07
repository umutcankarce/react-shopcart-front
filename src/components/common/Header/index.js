import { Component } from "react";
import {Nav,Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import withRouter from "../../../withRouter";

export class Header extends Component { 

    constructor(props){
        super(props);
    }

    render(){ 
        const {location} = this.props;

        return (
            <>
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to={"/"}>iCart</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link active={(location.pathname==="/")} as={Link} to={"/"}>Anasayfa</Nav.Link>
            <Nav.Link active={(location.pathname==="/cart")} as={Link} to={"/cart"}>Sepet</Nav.Link>
            </Nav>
            </Navbar>   
            </>
        )
    }
}

export default withRouter(Header);
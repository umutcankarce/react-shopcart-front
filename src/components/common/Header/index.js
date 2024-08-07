import { Component } from "react";
import {Nav,Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import withRouter from "../../../withRouter";
import cartWrapper from "../../../cartWrapper";

export class Header extends Component { 

    constructor(props)
    {
        super(props);
    }

    render(){ 
        const {location,cart} = this.props;

        return (
            <>
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to={"/"}>iCart</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link active={(location.pathname==="/")} as={Link} to={"/"}>Anasayfa</Nav.Link>
            <Nav.Link active={(location.pathname==="/cart")} as={Link} to={"/cart"}>Sepetim ({cart.totalUniqueItems})</Nav.Link>
            </Nav>
            </Navbar>   
            </>
        )
    }
}

export default withRouter(cartWrapper(Header));
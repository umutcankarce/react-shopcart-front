import { Component } from "react";
import Header from "../../components/common/Header";
import withRouter from "../../withRouter";

export class Cart extends Component { 
    render(){ 
        return (
            <>
            <Header/>
            Sepet
            </>
        )
    }
}

export default withRouter(Cart);
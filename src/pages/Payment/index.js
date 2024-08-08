import { Component } from "react";
import Header from "../../components/common/Header";
import withRouter from "../../withRouter";
import cartWrapper from "../../cartWrapper";
import Notification from "../../RestAPI/Notification";

export class Payment extends Component { 

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {cart,navigate} = this.props;

        const {totalUniqueItems} = cart;

        if(totalUniqueItems === 0)
        {
            Notification.error({
                text: "Sepetinizde Ürün Yok."
            });
            navigate("/");
        }
    }

    render(){ 

        return (
            <>
            <Header/>
               Ödeme

            </>
        )
    }
}

export default withRouter(cartWrapper(Payment));
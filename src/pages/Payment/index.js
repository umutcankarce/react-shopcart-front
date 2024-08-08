import { Component } from "react";
import Header from "../../components/common/Header";
import withRouter from "../../withRouter";
import cartWrapper from "../../cartWrapper";
import Notification from "../../RestAPI/Notification";
import AppUrl from "../../RestAPI/AppUrl";
import RestClient from "../../RestAPI/RestClient";
import parse from "html-react-parser";

export class Payment extends Component { 

    constructor(props){
        super(props);

        this.state = { 
            isLoading : true,
            paymentForm : ''
        }
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
        else
        { 
            this.getPaymentForm();
        }
    }

    getPaymentForm = () => { 
        const {cart,navigate} = this.props;
        const {items,cartTotal} = cart;

        RestClient.postRequest(AppUrl.payment,{
            basket : items,
            totalPrice : cartTotal,
        }).then((res) => {
           const status = res.status;
           const result = res.data;

           if(status === 200){ 
            this.setState({
                isLoading:false,
                paymentForm : result.view
               });
            }else { 
              Notification.error(result);
              navigate("/");  
            }

        }).catch((err) => {
            console.log(err);
            Notification.error({
                text: "Bir Hata Oluştu."
            });
        });
    }

    render(){ 
        const {isLoading,paymentForm} = this.state;
        if(isLoading) { 
            return (
                <div className={"d-flex justify-content-center align-content-center vh-100"}>
                    Yükleniyor.
                </div>
            )
        } 

        return (
            <>
            <Header/>
                {(paymentForm !== '') ? (
                    parse(paymentForm)
                ) : (
                    <div className={"d-flex justify-content-center align-content-center vh-100"}>
                    Ödeme Formu Getirilemedi.
                </div>
                )}
            </>
        )
    }
}

export default withRouter(cartWrapper(Payment));
import { Component } from "react";
import Header from "../../components/common/Header";
import withRouter from "../../withRouter";
import { Container,Row,Col,Card,Button } from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";

export class Home extends Component { 

    constructor(props) {
        super(props);

        this.state = {
            isLoading : false,
            products : [],

        }

        
    }

    componentDidMount()
    { 
        this.getProducts();
    }

    getProducts = ()=>{
        RestClient.getRequest(AppUrl.home).then((res)=>{
         

            if (res.status===200){
                this.setState({
                    isLoading : false,
                    products : res.data
                })
            }

        }).catch((err)=>{
            console.log(err);
            Notification.error({
                text : "Bir Hata Oluştu Lütfen Daha Sonra Tekrar Deneyiniz"
            })
        })
    }

    productRender = (products) => {
        return products.map((item,index) => {
            return (
                <Col key={index} md={4} className={"mt-5"}>
                    <Card>
                    <Card.Body>
                    <Card.Title><b>{item.prd_name}</b></Card.Title>
                    <Card.Text>
                        <b>Fiyat</b> : <b>{item.prd_price}</b> ₺
                    </Card.Text>
                    <Button variant="success">Sepete Ekle</Button>
                    </Card.Body>
                    </Card>
                </Col>
            );
               
        });
    }   



    render(){ 

        const { isLoading,products } = this.state;
        
        if(isLoading){ 
            return (
                <div className={"d-flex justify-content-center align-items-center vh-100"}>
                    Yükleniyor.
                </div>
            )
        }
        
        return (
            <>
            <Header/>
            <Container className={"mt-5"}>
                <h3 className={"d-flex justify-content-center align-self-center"}>-Ürün Listesi-</h3>
                <Row className={"mt-5"}>
                        {(products.length===0) ? (<div className={"col-md-12 alert alert-danger text-center"}>Ürün Bulunamadı.</div>) : this.productRender(products)}
                </Row>
            </Container>
            </>
        )
    }
}

export default withRouter(Home);
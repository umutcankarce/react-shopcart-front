import { Component } from "react";
import Header from "../../components/common/Header";
import withRouter from "../../withRouter";
import { Container,Row,Col,Card,Button } from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import cartWrapper from "../../cartWrapper";

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

    addQuantity = (id,value)=>{
        const {products} = this.state;

        let newProducts = products.map((item,index)=>{
           return (item.prd_id===id) ? {...item,addQuantity : parseInt(value)} : item
        });
        
        // TODO NEW PRODUCT GELMİYOR

        //console.log(newProducts); 

        this.setState({
            products : newProducts
        })
    }

    addCart = (id) => {

        const {products} = this.state;
        const {cart} = this.props;
        let newProducts = products.map((item,index) => {
           if(item.prd_id === id){
            cart.addItem({
                id: item.prd_id,
                name : item.prd_name,
                price: item.prd_price
            },item.addQuantity);

            delete item.addQuantity;

           }

           return item;
        });

        this.setState({
            products : newProducts
        });
    }

    productRender = (products) => {
        const {cart} = this.props;

        if(!products || !products[0]?.data){
            return;
        }

        return products[0].data.map((item,index) => {
            return (
                <Col key={index} md={4} className={"mt-5"}>
                    <Card>
                    <Card.Body>
                    <Card.Title><b>{item.prd_name}</b></Card.Title>
                    <Card.Text>
                        <b>Fiyat</b> : <b>{item.prd_price}</b> ₺
                    </Card.Text> 
                    <input className={"form-control"} value={(item.addQuantity) ? item.addQuantity : ''} onChange={(event)=>this.addQuantity(item.prd_id,event.target.value)} type={"number"}/>
                    <Button className={"mt-3"} onClick={() => this.addCart(item.prd_id)} variant="success">Sepete Ekle</Button>
                    
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
                   Veriler Yükleniyor.
                </div>
            )
        }
        
        return (
            <>
            <Header/>
            <Container className={"mt-5"}>
                <h3 className={"d-flex justify-content-center align-self-center"}>Ürün Listesi</h3>
                <Row className={"mt-5"}>
                {this.productRender(products)}
                </Row>
            </Container>
            </>
        )
    }
}

export default withRouter(cartWrapper(Home));
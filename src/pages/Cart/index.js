import { Component } from "react";
import Header from "../../components/common/Header";
import withRouter from "../../withRouter";
import { Container,Row,Col,Table,Button,Card,Badge } from "react-bootstrap";
import cartWrapper from "../../cartWrapper";
import {Link} from "react-router-dom";
import { Helmet } from "react-helmet";
const KDV = 20;
export class Cart extends Component { 

    constructor(props){
        super(props);
    }

   

    cartRender = (items) => {
        const {cart} = this.props;
        const {updateItemQuantity,removeItem} = cart;


        return items.map((item,index) => { 
            return (
                <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity} Adet</td>
                <td>{item.price} ₺</td>
                <td>{item.quantity * item.price} ₺</td>
                <td>
                    <Button variant={"success"} className={"mx-2"} onClick={()=> updateItemQuantity(item.id,item.quantity+1) }>1 Arttır</Button>
                    <Button variant={"danger"} className={"mx-2"} onClick={()=>  updateItemQuantity(item.id,item.quantity-1) }>1 Azalt</Button>
                </td>
                <td>
                <Button variant={"danger"} className={"mx-2"} onClick={()=> removeItem(item.id) }>Sil</Button>
                </td>
                </tr>
            )
        });
    }

    render(){ 
        const {cart} = this.props;
        const {items,totalUniqueItems,cartTotal} = cart;
       


        return (
            <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sepetim - iCart</title>
            </Helmet>

            <Header/>
            <Container className={"mt-5"}>
            <h3 className={"mt-5 d-flex justify-content-center"}>Sepetim ({totalUniqueItems})</h3>
            <Row className={"mt-5"}>
                <Col md={12}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Ürün Adı</th>
                        <th>Ürün Adet</th>
                        <th>Ürün Fiyat</th>
                        <th>Ürün Toplam Fiyat</th>
                        <th>Adet İşlem</th>
                        <th>Sil</th>
                        </tr>
                    </thead>
                    <tbody>
                       {(totalUniqueItems == 0) ? (
                        <tr>
                        <td colSpan={12}>
                            <div className={"col-md-12 alert alert-danger text-center"}>
                                Herhangi Bir Ürün Bulunamadı.
                            </div>
                        </td>
                       </tr>
                    ) : this.cartRender(items) }
                    </tbody>
                    </Table>
                </Col>
            </Row>
            </Container>


             {(totalUniqueItems !== 0) && (
                <Container className={"mt-5"}>
                    <Row className={"mt-5"}>
                        <Col md={6}>
                        <Card>
                        <Card.Body>
                            <Card.Text>
                            Ara Toplam : <Badge className={"text-white p-2 ml-1 bg-success"}>{cartTotal} ₺</Badge>
                            <br />
                            <br />
                            Toplam Fiyat : <Badge className={"text-white p-2 ml-1 bg-success"}>{cartTotal * ((100+KDV)/100)} ₺</Badge>
                            <br/>
                            <br/>
                            KDV : <Badge className={"text-white p-2 ml-1 bg-danger"}>{KDV} %</Badge>
                            </Card.Text>
                        </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                    <Button as={Link} to={"/payment"} variant={"success"} className={"mt-3"}>Ödeme Yap</Button>
                </Container>
             )}       

            </>
        )
    }
}

export default withRouter(cartWrapper(Cart));
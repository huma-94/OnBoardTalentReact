//Adding Edit sale modal creates pop-page (Modal) for edit sales details


import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form, Container } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';



//Edit Sales modal class
export class EditSalesModal extends Component
    {
        constructor(props){
        super(props);
        this.state={snackbaropen: false,snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    snackbarClose = (event)=>{
        this.setState({snackbaropen:false});
    };

    //this is to Edit sales details

    handleSubmit(event){
        event.preventDefault();

        fetch('https://localhost:44338/api/Sales',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                Id:event.target.Id.value,
                ProductId: event.target.ProductId.value,
                CustomerId: event.target.CustomerId.value,
                StoreId: event.target.StoreId.value,
                DateSold: event.target.DateSold.value 
               
            })
        })
        .then(res=> res.json())
        .then((result)=>
        {
                   
          this.setState({snackbaropen:true,snackbarmsg:result});
             
        },
        (error)=>{
            this.setState({snackbaropen:true, snackbarmsg:'Failed'});
        }
        )

        
    }


    render(){
        return(
            <div className="container">
            <Snackbar
                anchorOrigin={{vertical:'bottom',horizontal:'center'}}
                open={this.state.snackbaropen}
                autoHideDuration={2000}
                onClose={this.snackbarClose}
                message={<span id="message-id">{this.state.snackbarmsg}</span>}
                action={[
                <IconButton
                    Key="close"
                    arial-label="Close"
                    color="inherit"
                    onClick={this.snackbarClose}>x
                </IconButton>
                ]}
            />


        <Modal
             {...this.props}
             size="lg"
             aria-labelledby="contained-modal-title-center"
             centered
        >   

        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edit Sales
            </Modal.Title>
        </Modal.Header>


        <Modal.Body>        
                <Row>
                    <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>

                    <Form.Group controlId="Id">
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                            type="text"
                            Name="sale Id"
                            required
                            disabled
                            defaultValue={this.props.salId}
                            placeholder="Sale Id"/>
                        </Form.Group>

                        <Form.Group controlId="ProductId">
                            <Form.Label> Product Id </Form.Label>
                            <Form.Control
                            type="text"
                            Name="Product Id"
                            required
                            defaultValue={this.props.salProductId}
                            placeholder="Enter Product Id"
                            />
                        </Form.Group>

                        <Form.Group controlId="CustomerId">
                            <Form.Label>Customer Id</Form.Label>
                            <Form.Control
                            type="text"
                            Name="Customer Id"
                            required
                            defaultValue={this.props.salCustomerId}
                            placeholder="Enter customer Id"/>
                        </Form.Group>

                        <Form.Group controlId="StoreId">
                            <Form.Label>Store Id</Form.Label>
                            <Form.Control
                            type="text"
                            Name="Store Id"
                            required
                            defaultValue={this.props.salStoreId}
                            placeholder="Enter Store Id"/>
                        </Form.Group>

                        <Form.Group controlId="DateSold">
                            <Form.Label>DateSold</Form.Label>
                            <Form.Control
                            type="text"
                            Name="Date Sold"
                            required
                            defaultValue={this.props.salDateSold}
                            placeholder="Enter Date of Sold"/>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Save 
                        </Button>


                    </Form>
                </Col>

            </Row>

       
        </Modal.Body>
             <Modal.Footer>
                <Button  variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>


</Modal>
</div>
        );

        
    }
}    
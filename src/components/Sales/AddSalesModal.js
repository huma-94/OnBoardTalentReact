//Add Sales modal creats pop-page (Modal) for adding a new sale to sales table.

import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form, Container } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

//Add Sales component class
export class AddSalesModal extends Component{
    constructor(props){
        super(props);
        this.state={snackbaropen: false,snackbarmsg: '',currDate:new Date()};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    snackbarClose = (event)=>{
        this.setState({snackbaropen:false});
    };

    //This is to add new sale details to sales table

    handleSubmit(event){
        event.preventDefault();

        fetch('https://localhost:44340/api/Sales',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                Id:null,
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
                arial-label="close"
                color="inherit"
                onClick={this.snackbarClose}>x
            </IconButton>
                ]}
         />


        <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Add New Sales
            </Modal.Title>
        </Modal.Header>


        <Modal.Body>
             <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Group controlId="ProductId">
                            <Form.Label> Product ID</Form.Label>
                            <Form.Control
                            type="text"
                            Name="Product Name"
                            required
                            placeholder="Enter product Id"/>
                        </Form.Group>


                        <Form.Group controlId="CustomerId">
                            <Form.Label>Customer Id</Form.Label>
                            <Form.Control
                            type="text"
                            Name="Customer Id"
                            required
                            placeholder="Enter customer Id"/>
                        </Form.Group>


                        <Form.Group controlId="StoreId">
                            <Form.Label>Store Id</Form.Label>
                            <Form.Control
                            type="text"
                            Name="Store Id"
                            required
                            placeholder="Enter Store Id"/>
                        </Form.Group>


                        <Form.Group controlId="DateSold">
                            <Form.Label>Date Sold</Form.Label>
                            <Form.Control
                            type="Date"
                            Name="Date Sold"
                            required
                            defaultValue={this.currDate}
                            placeholder="Enter Date Of Sold"/>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Add Sale
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
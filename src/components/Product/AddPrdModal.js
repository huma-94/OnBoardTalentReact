//Add Product modal creates pop-page (Modal) for adding a new product to product table.

import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form, Container } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


//Add product component class
export class AddPrdModal extends Component{
    constructor(props)
    {
        super(props);
        this.state={snackbaropen: false,snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    snackbarClose = (event)=>
    {
        this.setState({snackbaropen:false});
    };

    ////This is to add new product details to product table

    handleSubmit(event)
    {
        event.preventDefault();
        console.log(event.target.Name.value.length,event.target.Name.value.trim().length);
        if(event.target.Name.value.trim().length==0)
       { 
        console.log('Here');
        this.setState({snackbaropen:true,snackbarmsg:'Enter Valid Product Name'});
       }
       else if(event.target.Price.value.trim().length==0)
       {
        this.setState({snackbaropen:true,snackbarmsg:'Enter Valid Price'});

       }
       else{

        fetch('https://demotalent.azurewebsites.net/api/Product',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                Id:null,
                Name: event.target.Name.value,
                Price:event.target.Price.value
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
                {...this.props}      //Adding modal pop-up window for adding product to customer table
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
    >
    
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                     Create Product
                </Modal.Title>

                </Modal.Header>

                   <Modal.Body>
                     <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>

                            <Form.Group controlId="Name">
                                <Form.Label>NAME</Form.Label>
                                <Form.Control
                                type="text"
                                Name="Product Name"
                                required
                                placeholder="Enter product Name"
                               />
                            </Form.Group>

                            <Form.Group controlId="Price">
                               <Form.Label> PRICE</Form.Label>
                                 <Form.Control
                                 type="text"
                                 Name="Price"
                                 required
                                 placeholder="Enter Product Price"
                                />
                            </Form.Group>

                        <Button  variant="dark" className= 'ml-0 mt-2' onClick={this.props.onHide}>Cancel</Button>
                        <Button variant="success"  className= 'ml-3 mt-2'type="submit">Create</Button>

                    </Form>
                </Col>

            </Row>

       
        </Modal.Body>
     
</Modal>
</div>
        );

        
    }
}
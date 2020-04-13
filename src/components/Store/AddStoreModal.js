//Add store modal creates pop-page (Modal) for adding a new store to store table.

import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form, Container } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';



//Add store component class
export class AddStoreModal extends Component
    {
        constructor(props){
        super(props);
        this.state={snackbaropen: false,snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    snackbarClose = (event)=>
    {
        this.setState({snackbaropen:false});
    };


    //This is to add new store details to store table

    handleSubmit(event)
    {
        event.preventDefault();

        fetch('https://localhost:44340/api/Store',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                Id:null,
                Name: event.target.Name.value,
                Address:event.target.Address.value
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
          Add New Store
        </Modal.Title>

    </Modal.Header>
            <Modal.Body>
                 <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="Name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                type="text"
                                Name="Store Name"
                                required
                                placeholder="Enter Store Name"/>
                            </Form.Group>

                            <Form.Group controlId="Address">
                                <Form.Label>Addresss</Form.Label>
                                <Form.Control
                                type="text"
                                Name="Store Address"
                                required
                                placeholder="Enter Store Address"/>
                            </Form.Group>

                                <Button variant="primary" type="submit">
                                    Add Store
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
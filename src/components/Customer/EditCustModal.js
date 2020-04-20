//Adding Edit Customer modal creates pop-page (Modal) for edit customer details

import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form, Container } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


//Edit Customer modal class
export class EditCustModal extends Component{
    constructor(props){
        super(props);
        this.state={snackbaropen: false,snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    snackbarClose = (event)=>{
        this.setState({snackbaropen:false});
    };


    //this is to Edit customer details
    handleSubmit(event){
        event.preventDefault();
        //console.log(this.props.custId,event.target.Name.value,event.target.Address.value);

        fetch('https://demotalent.azurewebsites.net/api/Customer',{

             method:'PUT',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                Id:this.props.custId,
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
                    arial-label="Close"
                    color="inherit"
                    onClick={this.snackbarClose}>x
                </IconButton>
                ]}
            />


<Modal
            //Adding modal pop-up window for edit customers to customer table.
      {...this.props} 
      size="lg"
      aria-labelledby="contained-modal-title-center"
      centered
    >
<Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit  Customer
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
                            Name="Customer Name"
                            required
                            defaultValue={this.props.custName}
                            placeholder="Enter customer Name"
                            />
                         
                        </Form.Group>

                        <Form.Group controlId="Address">
                            <Form.Label>Addresss</Form.Label>
                            <Form.Control
                            type="text"
                            Name="Customer Address"
                            required
                            defaultValue={this.props.custAddress}
                            placeholder="Enter customer Address" 
                            />
                        </Form.Group>                       
                           
                            <Button className= 'ml-0 mt-2' variant="dark" onClick={this.props.onHide}>Cancel</Button>  
                            <Button  className= 'ml-3 mt-2' variant="success" type="submit"> Edit </Button>  
                    </Form>
                </Col>

            </Row>
       
</Modal.Body>
     
</Modal>
</div>
        );

        
    }
}    
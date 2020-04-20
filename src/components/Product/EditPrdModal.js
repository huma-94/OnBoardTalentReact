//Adding Edit product modal creates pop-page (Modal) for edit product details
import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form, Container } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


//Edit product modal class
export class EditPrdModal extends Component{
    constructor(props)
    {
        super(props);
        this.state={snackbaropen: false,snackbarmsg:''};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    snackbarClose = (event)=>
    {
        this.setState({snackbaropen:false});
    };


    //this is to Edit product details

    handleSubmit(event){
        event.preventDefault();
        console.log(this.props.prdId);

        fetch('https://demotalent.azurewebsites.net/api/Product',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                Id:this.props.prdId,
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

    <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Product
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
                            defaultValue={this.props.prdName}
                            placeholder="Enter Product Name"
                           />
                        </Form.Group>


                        <Form.Group controlId="Price">
                            <Form.Label>PRICE</Form.Label>
                            <Form.Control
                            type="text"
                            Name="Product Price"
                            required
                            defaultValue={this.props.prdPrice}
                            placeholder="Enter Product Price"
                           />
                           
                        </Form.Group>
                        <Button  variant="dark"   className= 'ml-0 mt-2'onClick={this.props.onHide}>Cancel</Button>
                        <Button variant="success"  className= 'ml-3 mt-2'type="submit">
                            Edit 
                        </Button>

                         </Form>
                    </Col>
             </Row>
       
        </Modal.Body>
             
    </Modal>
</div>
        );

        
    }
}    
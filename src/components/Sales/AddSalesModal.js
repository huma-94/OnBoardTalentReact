//Add Sales modal creats pop-page (Modal) for adding a new sale to sales table.
import React,{Component} from 'react';
import {Modal,Button,Form, Row,Col, Container } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { Dropdown,Label,ModalActions,Icon } from 'semantic-ui-react';
import DropdownItems from './Dropdown';

//to get a current date

const date = new Date().toISOString().slice(0,10);

//Add Sales component class
export class AddSalesModal extends Component{
    constructor(props){
        super(props);
        this.state={snackbaropen: false,snackbarmsg: '',currDate:new Date(),customerData:[],productData:[],storeData:[],
                    createModalOpen:'',
                    dateSold:'',
                    customer: '',
                    product:'',
                    store:''
                   
                };
        this.handleSubmit = this.handleSubmit.bind(this);
        

    }

    snackbarClose = (event)=>{
        this.setState({snackbaropen:false});
    };

    //This is to add new sale details to sales table

    getCustomerList = () => {
        fetch("https://demotalent.azurewebsites.net/api/Customer")
            .then(res => res.json())
            .then((data) => {
                let thisList = data
                    .sort((a, b) => a.Name > b.Name)
                    .map(list => { return { key: list.Id, text: list.Name, value: list.Id } })
                this.setState({
                    customerData: [{ value: '', display: '(Select Customer)' }].concat(thisList),
                    isLoading: false
                });
            })

            .catch(error => {
                if (error.response) {
                    console.log(error.responderEnd);
                }
            })
    }

    getProductList = () => {
        fetch('https://demotalent.azurewebsites.net/api/Product')
            .then(res => res.json())
            .then((data) => {
                let thisList = data
                    .sort((a, b) => a.Name > b.Name)
                    .map(list => { return { key: list.Id, text: list.Name, value: list.Id } })
                this.setState({
                    productData: [{ value: '', display: '(Select Product)' }].concat(thisList),
                    isLoading: false
                });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.responderEnd);
                }
            })
    }


    getStoreList = () => {
        fetch("https://demotalent.azurewebsites.net/api/Store")
            .then(res => res.json())
            .then((data) => {
                let thisList = data
                    .sort((a, b) => a.Name > b.Name)
                    .map(list => { return { key: list.Id, text: list.Name, value: list.Id } })
                this.setState({
                    storeData: [{ value: '', display: '(Select Store)' }].concat(thisList),
                    isLoading: false
                });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.responderEnd);
                }
            })
    }


componentDidMount()
{
    this.getCustomerList();
    this.getProductList();
    this.getStoreList();
    
}


createSale()
{
    console.log('Here');
}

    handleSubmit(event){
        event.preventDefault();
        console.log(date)
     
        fetch('https://demotalent.azurewebsites.net/api/Sales',{
            method:'POST',
            headers:{ 
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                Id:null,
                ProductId: this.state.product,
                CustomerId: this.state.customer,
                StoreId: this.state.store,
                DateSold: date
              
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

         //this.getCustomer();
         var custID=this.state.customerData.Id;
         //this.setState({cId: state.customerData.Id});
           
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
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            Create Sales
            </Modal.Title>
        </Modal.Header>


        <Modal.Body>
             <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>

                         <Form.Group controlId="DateSold">
                            <Form.Label>Date Sold</Form.Label>
                            <Form.Control 
                            value={date}
                            Name="Date Sold"
                            disabled />
                        </Form.Group>
            
                        <Form.Group controlId="ProductId">
                            <Form.Label> PRODUCT</Form.Label>
                                <Dropdown
                                        placeholder='Select Product'
                                        scrolling
                                        fluid
                                        selection
                                        search
                                        options={this.state.productData}
                                        value={this.state.product}
                                        onChange={(event, { name, value }) => this.setState({ product: value })}
                                />

                         </Form.Group>  

                         <Form.Group controlId="CustomerId">
                            <Form.Label> CUSTOMER</Form.Label>
                                           <Dropdown
                                        placeholder='Select Customer'
                                        scrolling
                                        fluid
                                        selection
                                        search
                                        options={this.state.customerData}
                                        value={this.state.customer}
                                        onChange={(event, { name, value }) => this.setState({ customer: value })}
                                    /> 
                                                         
                         </Form.Group>  

                        <Form.Group controlId="StoreId">
                            <Form.Label>STORE</Form.Label>
                             <Dropdown
                                        placeholder='Select Store'
                                        scrolling
                                        fluid
                                        selection
                                        search
                                        options={this.state.storeData}
                                        value={this.state.store}
                                        onChange={(event, { name, value }) => this.setState({ store : value })}
                                    /> 




                        </Form.Group>

                        <Button  variant="dark"   className= 'ml-2 mt-2'onClick={this.props.onHide}>Cancel</Button>

                        <Button variant="success"  className= 'ml-3 mt-2' type="submit">Create </Button>



                    </Form>
                </Col>

            </Row>
       
        </Modal.Body>
</Modal>  
</div>
        );

        
    }
}
//This is a Product page of the talent project//

import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import {EditPrdModal} from './EditPrdModal';
import { AddPrdModal } from './AddPrdModal';





//Product component class.
export class Product extends Component{

    constructor(props){
        super(props);
        this.state={prd:[],addModalShow :false , editModalShow : false}
    }



    ///This is to load customer details when react DOM is mounted

    componentDidMount()
    {
        this.getProduct();
    }


    //This function is to fetch the product details by implementing GET API method.

    //Refresh list call the API to get the product details list
    getProduct()
    {
        fetch('https://localhost:44338/api/Product')
        .then(response=>response.json())
        .then(data=> {
            this.setState({prd:data});
        }
            );
    }


    //Retrieve Product details upon update

    componentDidUpdate()
    {
        this.getProduct();
    }


     //Delete product details
     
   deleteprd(prdId)
   {
       if( window.confirm('Are you sure?'))
       {
           fetch('https://localhost:44338/api/Product/'+ prdId,{
            method:'DELETE',
            header:{'Accept ': 'application/json',
               'Content-Type':'application/json'
           }
           })   
       }
   }
     
    
   
   //This is to render the Product table
    render(){
        const{prd,prdId,prdName,prdPrice}= this.state;
        let addModalClose =() => this.setState({addModalShow : false});
        let editModalClose =() => this.setState({editModalShow : false});


     return(
        <div>
        <ButtonToolbar className= 'mt-3'>
            <Button 
            variant='primary'
            onClick={()=> this.setState({addModalShow:true})} >
            Add Product
             </Button>
            <AddPrdModal
            show={this.state.addModalShow}
            onHide={addModalClose}/>
        </ButtonToolbar>


            <Table className='mt-4' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th> 
                        <th>Action</th>                          
                    </tr>
                </thead>
                <tbody>
                    {prd.map(prd=>
                        <tr key={prd.Id}>
                        <td>{prd.Id}</td>
                        <td>{prd.Name}</td>
                        <td>{prd.Price}</td>
                        <td>
                       
            
                <ButtonToolbar>

            <Button
            className='m-2' variant="info" size="med"
            onClick = {() =>this.setState({editModalShow:true, prdId:prd.Id,prdName:prd.Name,prdPrice:prd.Price})}
            >
                Edit
            </Button>


            <Button className='m-2' size="med"
            onClick={() =>this.deleteprd(prd.Id)} variant="danger">
                Delete    
            </Button>


            <EditPrdModal
            show={this.state.editModalShow}
            onHide={editModalClose}
            //{()=>this.setState({editModalShow:false})}
            prdId={prdId}
            prdName={prdName}
            prdPrice={prdPrice}
            />                

        </ButtonToolbar>
                        </td>
                        </tr>
                        )}
                </tbody>


            </Table>

</div>
        )
    }


}
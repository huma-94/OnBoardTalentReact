//This is a Product page of the talent project//

import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import {EditPrdModal} from './EditPrdModal';
import { AddPrdModal } from './AddPrdModal';
import orderBy from 'lodash/orderBy';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';


const invertDirection = {
    asc :'desc',
    desc : 'asc'
}


//Product component class.
export class Product extends Component{

    constructor(props){
        super(props);
        this.state={prd:[],addModalShow :false , editModalShow : false,
                    columnToSort :'Id',sortDirection:'asc'}
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
        fetch('https://localhost:44340/api/Product')
        .then(response=>response.json())
        .then(data=> {
            this.setState({prd:orderBy(data,this.state.columnToSort,this.state.sortDirection)});
        });
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
           fetch('https://localhost:44340/api/Product/'+ prdId,{
            method:'DELETE',
            header:{'Accept ': 'application/json',
               'Content-Type':'application/json'
           }
           })   
       }
   }


   handleSort(props)
   {
      
      this.setState(state=>({
       columnToSort:props,
       sortDirection : state.columnToSort===props ? invertDirection[state.sortDirection] : "asc"
   
   }))

  this.state.prd=orderBy(this.state.prd,this.state.columnToSort,this.state.sortDirection);
       console.log(this.state.columnToSort,this.state.sortDirection);
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
                        <th><div 
                        onClick={()=>this.handleSort('Id')}>
                        <span>Id</span>                           
                        {this.state.columnToSort==='Id'?
                         this.state.sortDirection==='asc'?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>
                         :null }                       
                        </div></th>

                        <th><div 
                        onClick={()=>this.handleSort('Name')}>
                        <span>Name</span>                           
                        {this.state.columnToSort==='Name'?
                         this.state.sortDirection==='asc'?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>
                         :null }                       
                        </div></th>

                        <th><div 
                        onClick={()=>this.handleSort('Price')}>
                        <span>Price</span>                           
                        {this.state.columnToSort==='Price'?
                         this.state.sortDirection==='asc'?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>
                         :null }                       
                        </div></th> 

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
//This the sales page of talent project

import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import { AddSalesModal } from './AddSalesModal';
import {EditSalesModal} from './EditSalesModal';


//Sales Component class
export class Sales extends Component{

    constructor(props){
        super(props);
        this.state={sal:[], addModalShow :false , editModalShow : false}
    }

//This is to load sales details when react DOM is mounted
    componentDidMount()
    {
        this.getSales();
    }


 //This function is to fetch the sales details by implementing GET API method.

    //Refresh list call the API to get the sales details list


    getSales()
    {
        
        fetch('https://localhost:44338/api/Sales')
        .then(response=>response.json())
        .then(data=> {
            this.setState({sal:data});
        }
         );
    } 
    
    //Retreive sales details upon request 
     componentDidUpdate()
    {
        this.getSales();
    }


    //this is to delete sales details
    deletesal(salId)
    {
        if( window.confirm('Are you sure?'))
        {
            fetch('https://localhost:44338/api/Sales/'+salId,{
             method:'DELETE',
            header:{'Accept ': 'application/json',
                    'Content-Type':'application/json'
                }
                })

                .then(res=> res.json())
                .then((result)=>
                {          
                  alert('Successful');       
                },
                (error)=>{
                   alert('Failed');
                }
                )
            }
        }
     
    //This is to render sales details
    render()
    {
        
        const{sal,salId,salProductId,salCustomerId,salStoreId,salDateSold}= this.state;
        let addModalClose =() => this.setState({addModalShow : false});
        let editModalClose =() => this.setState({editModalShow : false});

      return(
        <div>
            <ButtonToolbar className= 'mt-3'>
                <Button 
                 variant='primary'
                 onClick={()=> this.setState({addModalShow:true})} >
                 Add Sales
                </Button>


              <AddSalesModal
               show={this.state.addModalShow}
               onHide={addModalClose}/>
           </ButtonToolbar>

                 <Table className='mt-4' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Customer Name</th> 
                        <th>Store Name</th> 
                        <th>Date Of Sale</th> 
                        <th>Action</th>                          
                    </tr>
                </thead>
                <tbody>
                    {sal.map(sal=>
                        <tr key={sal.Id}>
                         <td>{sal.Id}</td>
                        <td>{sal.PName}</td>
                        <td>{sal.CName}</td>
                        <td>{sal.SName}</td>
                        <td>{sal.DateSold}</td>
                        <td>
           <ButtonToolbar>

                 <Button
                    className='m-2' variant="info"
                    onClick = {() =>this.setState({editModalShow:true, salId:sal.Id,  salProductId:sal.ProductId,  salCustomerId:sal.CustomerId,   salStoreId:sal.StoreId, salDateSold:sal.DateSold })}
                    >
                    Edit
                </Button>


                <Button className='m-2'
                onClick={() =>this.deletesal(sal.Id)} variant="danger">
                Delete    
                </Button>


                <EditSalesModal
                show={this.state.editModalShow}
                onHide={editModalClose}
                //{()=>this.setState({editModalShow:false})}
                salId={salId}
                salProductId={salProductId}
                salCustomerId={salCustomerId}
                salStoreId={salStoreId}
                salDateSold={salDateSold}
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
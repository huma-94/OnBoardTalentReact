//This is a Customer page of the talent project//

import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import { AddCustModal } from './AddCustModal';//importing Customer Modal to 
import {EditCustModal} from './EditCustModal';//importing Customer Modal


//Customer component class 
export class Customer extends Component{

    constructor(props)
    {
        super(props);
        this.state={cust:[], addModalShow :false , editModalShow : false}
    }



 ///This is to load customer details when react DOM is mounted

    componentDidMount()
    {
        this.getCustomer();
    }



    //This function is to fetch the customer details by implementing GET API method.

    //Refresh list call the API to get the customer details list
    getCustomer()
    {
        
        fetch('https://localhost:44338/api/Customer')
        .then(response=>response.json())
        .then(data=> {
            this.setState({cust:data});
        });
    } 


    //Retrieve Customer details upon update
    componentDidUpdate()
    {
        this.getCustomer();
    }

   //Delete Customer details
    deleteCust(custId)
    {
        if( window.confirm('Are you sure?'))
        {
            fetch('https://localhost:44338/api/Customer/'+custId,
            {
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
             (error)=>
             {
                alert('Failed');

            }
            )
        }
    }
     
    //This is to render the customer table.

    render(){
        
        const{cust,custId,custName,custAddress}= this.state;
        let addModalClose =() => this.setState({addModalShow : false});
        let editModalClose =() => this.setState({editModalShow : false});

      return(
            <div>
        <ButtonToolbar className= 'mt-3'>

            <Button 
                 variant='primary'
                 onClick={()=> this.setState({addModalShow:true})} >
                Add Customer
            </Button>

            <AddCustModal
                show={this.state.addModalShow}
                 onHide={addModalClose}/>
        </ButtonToolbar>


         <Table className='mt-4' striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th> 
                        <th>Action</th>                          
                    </tr>
                </thead>
                <tbody>
                    {cust.map(cust=>
                        <tr key={cust.Id}>
                        <td>{cust.Id}</td>
                        <td>{cust.Name}</td>
                        <td>{cust.Address}</td>
                        <td>

                <ButtonToolbar>

                     <Button
                         className='m-2' variant="info"
                         onClick = {() =>this.setState({editModalShow:true, custId:cust.Id,custName:cust.Name,custAddress:cust.Address})}>
                         Edit
                     </Button>


                     <Button className='m-2'
                        onClick={() =>this.deleteCust(cust.Id)} variant="danger">
                         Delete    
                     </Button>


                     <EditCustModal
                         show={this.state.editModalShow}
                         onHide={editModalClose}
                         //{()=>this.setState({editModalShow:false})}
                         custId={custId}
                         custName={custName}
                         custAddress={custAddress}/>

                

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
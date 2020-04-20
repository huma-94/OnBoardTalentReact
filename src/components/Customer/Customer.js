//This is a Customer page of the talent project//

import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import { AddCustModal } from './AddCustModal';
import {EditCustModal} from './EditCustModal';
import orderBy from 'lodash/orderBy';
import BootstrapTable from 'react-bootstrap-table-next';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import paginationFactory,{ PaginationProvider } from 'react-bootstrap-table2-paginator';
import Pagination from '@material-ui/lab/Pagination';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const invertDirection = {
  asc :'desc',
  desc : 'asc'
}
const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from } to { to } of { size } Results
  </span>
);


//Customer component class 
export class Customer extends Component{

    constructor(props)
    {
        super(props);
        this.editClose.bind(this);
        this.state={cust:[], addModalShow :false , editModalShow : false,
                    columnToSort :'Id',sortDirection:'asc',activePage: 5,
                    columns: [
                      {  
                        dataField: 'Id',  
                        text: 'Id',
                        sort : false,
                        hidden:true
                        }, 

                        {  
                         dataField: 'Name',
                        text: 'Name',  
                        sort:true
                        }, 

                        {  
                          dataField: 'Address',
                               text: 'Address',  
                               sort: true  
                        },
                        {
                                dataField: "Actions",
                                text: "Actions",
                                formatter: this.linkAction,
                                sort: false
                                
                         } ]
 }

  }

   //this is for Edit and Delete button 
     linkAction = (cell, row, rowIndex, formatExtraData) => {
         return (
           <div>
           <Button className ='m-2' variant="info"
             onClick={() => {
                
               this.setState({editModalShow:true, custId:row.Id,custName:row.Name,custAddress:row.Address})

                 }} >
             Edit
           </Button>
                      <Button className='m-2' variant="danger"
           onClick={() => {
             this.deleteCust(row.Id);
             }} > Delete</Button>
         </div>
    );
};
    
//this.handleSort=this.handleSort.bind(this)

 ///This is to load customer details when react DOM is mounted

    componentDidMount()
    {
        this.getCustomer();
    }


    //This function is to fetch the customer details by implementing GET API method.

    //Refresh list call the API to get the customer details list
    
    getCustomer()
    {
        
        fetch('https://demotalent.azurewebsites.net/api/Customer')
        .then(response=>response.json())
        .then(data=> {
            this.setState({cust:orderBy(data,this.state.columnToSort,this.state.sortDirection)});
        });
    } 


    //Retrieve Customer details upon update
    componentDidUpdate()
   {
     this.getCustomer();
   
    }
      
    editClose()
    {
      console.log('In Customer');
    }

      
   //Delete Customer details

    deleteCust(custId)
    {
        if( window.confirm('Are you sure?'))
        {
            fetch('https://demotalent.azurewebsites.net/api/Customer/'+custId,
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
    
    handleSort(props)
    {
       
       this.setState(state=>({
        columnToSort:props,
        sortDirection : state.columnToSort===props ? invertDirection[state.sortDirection] : "asc"
    
    }))

   this.state.cust=orderBy(this.state.cust,this.state.columnToSort,this.state.sortDirection);
        console.log(this.state.columnToSort,this.state.sortDirection);
    }
  
  
    //This is to render the customer table.

    render(){
        
        const{cust,custId,custName,custAddress}= this.state;
        let addModalClose =() => this.setState({addModalShow : false});
        let editModalClose =() => this.setState({editModalShow : false});

        
            // alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false, // Hide the going to First and Last page button
            // hideSizePerPage: true, // Hide the sizePerPage dropdown always
            // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page

        const  options = {
            paginationSize: 4,
            pageStartIndex: 1,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            disablePageTitle: true,
            sizePerPageList: [{
              text: '5', value: 5
            }, {
              text: '10', value: 10
            }, {
              text: 'All', value:this.state.cust.length
            }] 
          };
             
      return(
            <div>
        <ButtonToolbar className= 'mt-3 mb-3'>

            <Button 
                 variant='primary'
                 onClick={()=> this.setState({addModalShow:true})} >
               New Customer
            </Button>

            <AddCustModal
                show={this.state.addModalShow}
                 onHide={addModalClose}/>
        </ButtonToolbar>

          <BootstrapTable 
                       bootstrap4
                       striped  
                       hover  
                       keyField='id'   
                       data={ this.state.cust }   
                       columns={ this.state.columns } 
                       pagination={ paginationFactory(options) }>

            </BootstrapTable> 
            
            <EditCustModal
                         show={this.state.editModalShow}
                         onHide={editModalClose}
                         custId={custId}
                         custName={custName}
                         custAddress={custAddress} />
               
 </div>           

        )
    }


}
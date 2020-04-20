//This the sales page of talent project

import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import { AddSalesModal } from './AddSalesModal';
import {EditSalesModal} from './EditSalesModal';
import orderBy from 'lodash/orderBy';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import paginationFactory,{ PaginationProvider } from 'react-bootstrap-table2-paginator';
import Pagination from '@material-ui/lab/Pagination';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';



const invertDirection = {
    asc :'desc',
    desc : 'asc'
}
const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing { from } to { to } of { size } Results
    </span>
  );

//Sales Component class
export class Sales extends Component
{

        constructor(props)
        {
             super(props);
             this.state={sal:[], addModalShow :false , editModalShow : false,
                                columnToSort :'Id',sortDirection:'asc',activePage: 5,
                                columns: [
                                    {  
                                      dataField: 'PName',
                                      text: 'Product',  
                                      sort:true
                                     }, 
                                     {  
                                       dataField: 'CName',
                                       text: 'Customer',  
                                       sort:true
                                     }, 

                                     {  
                                        dataField: 'SName',
                                        text: 'Store',  
                                        sort:true
                                     },  
                                     {  
                                        dataField: 'DateSold',
                                        text: 'DateSold',  
                                        type:Date,
                                        sort:false,
                                        hidden:true
                                      }, 
                                      
                                      {  
                                        dataField: 'DS',
                                        text: 'DateSold',  
                                        type:Date,
                                        sort:true,
                                        hidden:false
                                      },  


                                      {  
                                        dataField: 'ProductId',
                                        text: 'ProductId',  
                                        sort:true,
                                        hidden:true
                                      }, 

                                      {  
                                        dataField: 'CustomerId',
                                        text: 'CustomerId',  
                                        sort:true,
                                        hidden:true
                                      }, 

                                      {  
                                        dataField: 'StoreId',
                                        text: 'StoreId',  
                                        sort:true,
                                        hidden:true
                                      }, 


                                        
                                      {
                                        dataField: "Actions",
                                        text: "Actions",
                                        formatter: this.linkAction,
                                        sort: false
                                      }]
                        }

        }
    linkAction = (cell, row, rowIndex, formatExtraData) => {
         return (
            <div>
            <Button
                className='m-2' variant="info"
                 onClick = {() =>this.setState({editModalShow:true, salId:row.Id,  salProductId:row.ProductId,  
                    salCustomerId:row.CustomerId,salStoreId:row.StoreId, salDateSold:row.DateSold,
                    salPName:row.PName,salCName:row.CName,salSName:row.SName,salDS:row.DS })
                }
                    >
                    Edit
                </Button>
   
              
              
            <Button className='m-2' variant="danger"
              onClick={() => {
               this.deletesal(row.Id);
              }}
            >
              Delete
            </Button>
            </div>
            
   
       );
   };  
    

//This is to load sales details when react DOM is mounted
    componentDidMount()
    {
        this.getSales();
    }

 //This function is to fetch the sales details by implementing GET API method.

    //Refresh list call the API to get the sales details list


    getSales()
    {
        
        fetch('https://demotalent.azurewebsites.net/api/Sales')
        .then(response=>response.json())
        .then(data=> {
            this.setState({sal:orderBy(data,this.state.columnToSort,this.state.sortDirection)});
        });
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
            fetch('https://demotalent.azurewebsites.net/api/Sales/'+salId,{
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

        handleSort(props)
        {
           
           this.setState(state=>({
            columnToSort:props,
            sortDirection : state.columnToSort===props ? invertDirection[state.sortDirection] : "asc"
        
        }))
    
       this.state.sal=orderBy(this.state.sal,this.state.columnToSort,this.state.sortDirection);
            console.log(this.state.columnToSort,this.state.sortDirection);
        }
      
     
    //This is to render sales details
    render()
    {
        
        const{sal,salId,salProductId,salCustomerId,salStoreId,salDateSold,salPName,salCName,salSName,salDS
        }= this.state;
        let addModalClose =() => this.setState({addModalShow : false});
        let editModalClose =() => this.setState({editModalShow : false});
        
               
        const  options = {
            paginationSize: 4,
            pageStartIndex: 1,
            // alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false, // Hide the going to First and Last page button
            // hideSizePerPage: true, // Hide the sizePerPage dropdown always
            // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
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
              text: 'All', value:this.state.sal.length
            }] // A numeric array is also available. the purpose of above example is custom the text
          };
             

      return(
        <div>
            <ButtonToolbar className= 'mt-3 mb-3'>
                <Button 
                 variant='primary'
                 onClick={()=> this.setState({addModalShow:true})} >
                 New Sales
                </Button>


              <AddSalesModal
               show={this.state.addModalShow}
               onHide={addModalClose}/>
           </ButtonToolbar>

           <BootstrapTable 
                        bootstrap4
                        striped  
                        hover  
                        keyField='id'   
                        data={ this.state.sal }   
                       columns={ this.state.columns } 
                       pagination={ paginationFactory(options) }>

            </BootstrapTable>  
                <EditSalesModal
                show={this.state.editModalShow}
                onHide={editModalClose}
                salId={salId}
                salProductId={salProductId}
                salCustomerId={salCustomerId}
                salStoreId={salStoreId}
                salPName={salPName}
                salCName={salCName}
                salSName={salSName}
                salDateSold={salDateSold}
                salDS={salDS}
                 />

        
 </div>           

        )
    }


}
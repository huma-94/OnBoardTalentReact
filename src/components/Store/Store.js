//This is the store pages of the talent project
import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import { AddStoreModal } from './AddStoreModal';
import {EditStoreModal} from './EditStoreModal';
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




//this is store component class
export class Store extends Component{

    constructor(props){
        super(props);
        this.state={str:[], addModalShow :false , editModalShow : false,
            columnToSort :'Id',sortDirection:'asc',activePage: 5,
            columns: [
               /* {  
                   dataField: 'Id',  
                   text: 'Id',
                    sort : false
                },*/  
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
                 }
             ]
        
        
        
        
        }
    }

    
    linkAction = (cell, row, rowIndex, formatExtraData) => {
        return (
          <div>
          <Button
            className='m-2' variant="info"
            onClick = {() =>this.setState({editModalShow:true, strId:row.Id,strName:row.Name,strAddress:row.Address})}
            >
                Edit
            </Button>
                     <Button className='m-2' variant="danger"
          onClick={() => {
           this.deletestr(row.Id);
          }}
        >
          Delete
        </Button>
        </div>
        

            );
        };





    /////This is to load Store details when react DOM is mounted

    componentDidMount()
    {
        this.getStore();
    }


     //This function is to fetch the store details by implementing GET API method.

    //Refresh list call the API to get the store details list
    getStore(){
        
        fetch('https://demotalent.azurewebsites.net/api/Store')
        .then(response=>response.json())
        .then(data=> {
            this.setState({str:orderBy(data,this.state.columnToSort,this.state.sortDirection)});
        });
    }  
    
    
    //Retrieve Store details upon update
         componentDidUpdate()
            {
             this.getStore();
            }

    //Delete Store details    
        deletestr(strId)
        {
            if( window.confirm('Are you sure?'))
            {
                fetch('https://demotalent.azurewebsites.net/api/Store/'+strId,{
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
      
     
    //This is to render store table details
    render(){
        
        const{str,strId,strName,strAddress}= this.state;
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
              text: 'All', value:this.state.str.length
            }] // A numeric array is also available. the purpose of above example is custom the text
          };

      return(
            <div>
        <ButtonToolbar className= 'mt-3  mb-3'> 

            <Button 
            variant='primary'
            onClick={()=> this.setState({addModalShow:true})} >
            New Store
             </Button>

            <AddStoreModal
            show={this.state.addModalShow}
            onHide={addModalClose}/>
          </ButtonToolbar>

            <BootstrapTable 
                        bootstrap4
                        striped  
                        hover  
                        keyField='id'   
                        data={ this.state.str }   
                       columns={ this.state.columns } 
                       pagination={ paginationFactory(options) }>
            </BootstrapTable> 

                 <EditStoreModal
                     show={this.state.editModalShow}
                     onHide={editModalClose}
                      strId={strId}
                      strName={strName}
                      strAddress={strAddress}
                         />

                

        

             </div>           

        )
    }


}
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
import BootstrapTable from 'react-bootstrap-table-next';  
import paginationFactory from 'react-bootstrap-table2-paginator';  


const invertDirection = {
    asc :'desc',
    desc : 'asc'
}

const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing { from } to { to } of { size } Results
    </span>
  );

//Product component class.
export class Product extends Component{

    constructor(props){
        super(props);
        this.state={prd:[],addModalShow :false , editModalShow : false,
                    columnToSort :'Id',sortDirection:'asc',activePage:5,
                    columns: [
                    {  
                    dataField: 'Id',  
                    text: 'Id' ,
                    hidden:true,
                    sort: false,
                    }, 
                    {
                        dataField: 'Name',  
                        text: 'Name'  ,
                        sort: true   
                    },
                    {
                        dataField: 'Price',  
                        text: 'Price'  ,
                        sort: true   
                    },
                    {
                      dataField: "Actions",
                      text: "Actions",
                      formatter: this.linkFollow,
                      sort: false
                      
                    }
                    ],
                  
                }
    }

    linkFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
          <div>

          <Button className ='m-2' variant="info"
              onClick={() => {this.setState({editModalShow:true, prdId:row.Id,prdName:row.Name,prdPrice:row.Price})}}
           >
             Edit
           </Button>

        
         <Button className='m-2'
            onClick={() =>this.deleteprd(row.Id)} variant="danger">
                Delete    
            </Button>

         
            </div>

       

        );
      };







    ///This is to load customer details when react DOM is mounted

    componentDidMount()
    {
        this.getProduct();
    }


    //This function is to fetch the product details by implementing GET API method.

    //Refresh list call the API to get the product details list
    getProduct()
    {
        fetch('https://demotalent.azurewebsites.net/api/Product')
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
           fetch('https://demotalent.azurewebsites.net/api/Product/'+ prdId,{
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
              text: 'All', value:this.state.prd.length
            }] // A numeric array is also available. the purpose of above example is custom the text
          };




     return(
        <div>
                <ButtonToolbar className= 'mt-3  mb-3'>
                     <Button 
                         variant='primary'
                         onClick={()=> this.setState({addModalShow:true})} >
                         New Product
                     </Button>

                     <AddPrdModal
                         show={this.state.addModalShow}
                         onHide={addModalClose}/>
                 </ButtonToolbar>

        <BootstrapTable   
                        bootstrap4
                        striped  
                        hover  
                        keyField='id'   
                        data={ this.state.prd }   
                        columns={ this.state.columns }  
                        pagination={ paginationFactory(options) }
                         />  
                      
                        
            <EditPrdModal
            show={this.state.editModalShow}
            onHide={editModalClose}
            //{()=>this.setState({editModalShow:false})}
            prdId={prdId}
            prdName={prdName}
            prdPrice={prdPrice} />
  
           </div>            
        )
    }


}
//This is the store pages of the talent project
import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import { AddStoreModal } from './AddStoreModal';
import {EditStoreModal} from './EditStoreModal';
import orderBy from 'lodash/orderBy';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';


const invertDirection = {
    asc :'desc',
    desc : 'asc'
}


//this is store component class
export class Store extends Component{

    constructor(props){
        super(props);
        this.state={str:[], addModalShow :false , editModalShow : false,
            columnToSort :'Id',sortDirection:'asc' }
    }

    /////This is to load Store details when react DOM is mounted

    componentDidMount()
    {
        this.getStore();
    }


     //This function is to fetch the store details by implementing GET API method.

    //Refresh list call the API to get the store details list
    getStore(){
        
        fetch('https://localhost:44340/api/Store')
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
                fetch('https://localhost:44340/api/Store/'+strId,{
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

      return(
            <div>
        <ButtonToolbar className= 'mt-3'>
            <Button 
            variant='primary'
            onClick={()=> this.setState({addModalShow:true})} >
            Add Store
             </Button>
            <AddStoreModal
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
                        onClick={()=>this.handleSort('Address')}>
                        <span>Address</span>                           
                        {this.state.columnToSort==='Address'?
                         this.state.sortDirection==='asc'?<KeyboardArrowUpOutlinedIcon/>:<KeyboardArrowDownOutlinedIcon/>
                         :null }                       
                        </div></th> 
                        <th>Action</th>                          
                    </tr>
                </thead>
                <tbody>
                    {str.map(str=>
                        <tr key={str.Id}>
                        <td>{str.Id}</td>
                        <td>{str.Name}</td>
                        <td>{str.Address}</td>
                        <td>

        <ButtonToolbar>
            <Button
            className='m-2' variant="info"
            onClick = {() =>this.setState({editModalShow:true, strId:str.Id,strName:str.Name,strAddress:str.Address})}
            >
                Edit
            </Button>


            <Button className='m-2'
            onClick={() =>this.deletestr(str.Id)} variant="danger">
                Delete    
            </Button>

            <EditStoreModal
            show={this.state.editModalShow}
            onHide={editModalClose}
            //{()=>this.setState({editModalShow:false})}
            strId={strId}
            strName={strName}
            strAddress={strAddress}
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
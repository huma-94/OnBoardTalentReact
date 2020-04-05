//This is the store pages of the talent project


import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar}  from 'react-bootstrap';
import { AddStoreModal } from './AddStoreModal';
import {EditStoreModal} from './EditStoreModal';


//this is store component class
export class Store extends Component{

    constructor(props){
        super(props);
        this.state={str:[], addModalShow :false , editModalShow : false}
    }

    /////This is to load Store details when react DOM is mounted

    componentDidMount()
    {
        this.getStore();
    }


     //This function is to fetch the store details by implementing GET API method.

    //Refresh list call the API to get the store details list
    getStore(){
        
        fetch('https://localhost:44338/api/Store')
        .then(response=>response.json())
        .then(data=> {
            this.setState({str:data});
        }
         );
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
                fetch('https://localhost:44338/api/Store/'+strId,{
                 method:'DELETE',
                 header:{'Accept ': 'application/json',
                    'Content-Type':'application/json'
                }
                })   
            }
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
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th> 
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
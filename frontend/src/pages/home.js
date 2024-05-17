import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios'
import { Button } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../features/userSlice';
export const Home = ()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.users.user)
  
   useEffect(()=>{
     const getUserData = ()=>{
        axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
        const updatedArray = res.data.map(obj => ({ ...obj, status: "inactive" }));
         dispatch(setUser(updatedArray))
        }).catch((err)=>{
          console.log(err)
        })
     }
     if(!user.length){
     getUserData()
     }
   },[dispatch, user.length])

   console.log("user",user)
    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 200 },
        {
          field: 'status',
          headerName: 'Status',
          width: 200,
        },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 150,
          renderCell: (params) => (
            <strong>
              <button onClick={()=>navigate(`/edituser/${params.row.id}`)} >Edit</button>
            </strong>
          ),
        },
      ];
  return (
    <div style={{ justifyContent:'center', height: 400, width: '90%', margin:"100px"}}>
        <h3>User Data  <Button type="submit" variant="contained" color="primary" sx={{mx:"200px"}} onClick={()=>navigate('/adduser')}>Add User</Button></h3> 
      <DataGrid
        rows={user}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
       
      
    </div>
  );
}

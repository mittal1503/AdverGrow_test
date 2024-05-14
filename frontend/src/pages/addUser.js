import { InputLabel, MenuItem, Select, TextField ,Typography,Box,Button} from '@mui/material';
import React from 'react'
import {useForm} from 'react-hook-form';
import {useNavigate} from'react-router-dom';
import { useUser } from '../context/Usercontext';
export const Adduser = () => {
    const { user, setUser } = useUser();
    const{register,handleSubmit,formState:{errors}} = useForm();
    const navigate = useNavigate();   
    const onSubmit =(data)=>{
        const maxId = user.reduce((max, user) => Math.max(max, user.id), 0);
        const newUserId = maxId + 1; 
        const newUser = { id: newUserId, ...data }; 
        setUser((prevUsers) => [...prevUsers, newUser]); 
        console.log("user",user)
        navigate('/')
    }
    return (
      <div className="form-container">
          <h3 className="form-field"> Add User</h3>
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      
      <Box>

      <TextField
        {...register('name',{required:true,minLength:3})}
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ width: '300px' }}
      />
       
     {errors.name && <span id="first-name-error">first Name is required and must be more than 3 char</span> }
     </Box>
     <Box>
     <TextField
         {...register("phone",{required:true,minLength:3})}
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ width: '300px' }}
      />
      
      {errors.phone &&  <span id="first-name-error">Last Name is required and must be more than 3 char</span> }
      </Box>
      <Box>
     <TextField
        {...register("email",{required:true,pattern: /^\S+@\S+$/i})}
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ width: '300px' }}
      />
          {errors.email && (   <span id="email-error">Please enter an email address</span>   )}
          </Box>
          <Box>
        <TextField
        {...register('status')}
        select
        label="Status"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ width: '300px' }}
        defaultValue="active" 
      >
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </TextField>
      </Box>
       
      <Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
        </form>
      </div>
    );
}

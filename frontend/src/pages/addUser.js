import {  MenuItem, TextField ,Typography,Box,Button} from '@mui/material';
import React from 'react'
import {useForm} from 'react-hook-form';
import {useNavigate} from'react-router-dom';
import { useUser } from '../context/Usercontext';
import { styled } from '@mui/system';

const Span = styled('span')({
  color: 'red'
});

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
        sx={{ width: '300px',marginLeft:'20px' }}
      />
       
     {errors.name && <Span id="first-name-error">Name is required and must be more than 3 char</Span> }
     </Box>
     <Box>
     <TextField
         {...register("phone",{required:true,pattern:{value:/^\d{10}$/}})}
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ width: '300px' ,marginLeft:'20px'}}
      />
      
      {errors.phone &&  <Span id="first-name-error">phone number must be valid</Span> }
      </Box>
      <Box>
     <TextField
        {...register("email",{required:true,pattern: /^\S+@\S+$/i})}
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ width: '300px',marginLeft:'20px' }}
      />
    {errors.email && (   <Span id="email-error">Please enter an email address</Span>   )}
          </Box>
          <Box>
        <TextField
        {...register('status')}
        select
        label="Status"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ width: '300px',marginLeft:'20px' }}
        defaultValue="active" 
      >
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </TextField>
      </Box>
       
      <Box>
        <Button type="submit" variant="contained" color="primary" sx={{marginLeft:'100px',marginTop:"10px" }}>
          Submit
        </Button>
      </Box>
        </form>
      </div>
    );
}

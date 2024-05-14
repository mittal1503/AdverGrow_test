import { InputLabel, MenuItem, Select, TextField ,Typography,Box,Button, FormControl} from '@mui/material';
import React, { useEffect, useState } from 'react'
import {useForm, Controller } from 'react-hook-form';
import {useNavigate,useParams} from'react-router-dom';
import { useUser } from '../context/Usercontext';

export const Edituser = () => {
    const { user, setUser } = useUser();
    const [userData, setUserData] = useState(null);
    const { id } = useParams(); 
    const{register,handleSubmit,formState:{errors},setValue, control} = useForm();
    const navigate = useNavigate();   

    useEffect(() => {
        const currentUser = user.find(u => u.id === parseInt(id));
         console.log("statusss",register('status'),register('name'))
        if (currentUser) {
            console.log("currentUser: " ,currentUser.status)
            setUserData(currentUser);
            setValue('name', currentUser.name);
            setValue('phone', currentUser.phone);
            setValue('email', currentUser.email);
            setValue('status', currentUser.status);
        }
    }, [id, user, setValue]);

    const onSubmit =(data)=>{
        const updatedUser = { ...userData, ...data };
        setUser(prevUsers => prevUsers.map(u => (u.id === parseInt(id) ? updatedUser : u)));
        console.log("user",user)
        navigate('/');
    }
    return (
      <div className="form-container">
          <h3 className="form-field"> Edit User</h3>
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
       
     {errors.name && <span id="first-name-error">Name is required and must be more than 3 char</span> }
     </Box>
     <Box>
     <TextField
         {...register("phone",{required:true,minLength:10})}
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ width: '300px' }}
      />
      
      {errors.phone &&  <span id="first-name-error">phone is required must be more than 10 digit </span> }
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
          {errors.email && (   <span id="email-error">Please enter an valid email address</span>   )}
          </Box>
          <Box>
        <Select
        {...register('status')}
        label="Status"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ width: '300px' }}
      >
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </Select>
   
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

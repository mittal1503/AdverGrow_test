import { InputLabel, MenuItem, Select, TextField ,Typography,Box,Button, FormControl} from '@mui/material';
import React, { useEffect, useState } from 'react'
import {useForm, Controller } from 'react-hook-form';
import {useNavigate,useParams} from'react-router-dom';
import { useUser } from '../context/Usercontext';
import { styled } from '@mui/system';

const Span = styled('span')({
  color: 'red'
});

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
        sx={{ width: '300px' ,marginLeft:'20px'}}
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
        sx={{ width: '300px',marginLeft:'20px' }}
      />
      
      {errors.phone &&  <Span id="first-name-error">phone number must be valid </Span> }
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
          {errors.email && (   <Span id="email-error">Please enter an valid email address</Span>   )}
          </Box>
          <Box>
          <Controller
            render={({ field: { onChange, value } }) => (
                <Select
                        value={value}
                        onChange={onChange}
                        label="Status"
                        sx={{ width: '300px', marginLeft:'20px'}}
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                )}
                name="status"
                control={control}
                defaultValue=""
                
            />
  
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

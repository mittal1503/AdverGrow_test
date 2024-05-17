import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState:{user:[]},
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        },
       updateUser:(state,action)=>{
         const {id,newUser} = action.payload;
         const index = state.user.findIndex(u=>u.id === parseInt(id));
         (index !== -1)
          && state.user.splice(index,1,{...newUser})
                 
       },
       addUser:(state,action)=>{
          const User= action.payload;
          state.user.push(User);
       }
    }
})

export const {setUser,updateUser,addUser}= userSlice.actions
export default userSlice.reducer;
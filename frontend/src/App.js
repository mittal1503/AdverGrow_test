import './App.css';
import { Router } from './router.js';
import { createContext, useState } from 'react';
import { UserProvider } from './context/Usercontext.js';
function App() {
  const [user,setUser] = useState([])
  return (
   <>
 <UserProvider>
 <Router/>
 </UserProvider>
   
   </>
  );
}

export default App;

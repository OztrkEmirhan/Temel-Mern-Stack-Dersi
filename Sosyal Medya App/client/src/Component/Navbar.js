import React, {useState, useEffect} from 'react'
import {AppBar,Toolbar,Typography,Button, Avatar} from '@mui/material';
import {Link, useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as actionType from '../constants/actionTypes';


export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const navigate=useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
  
    navigate('/signin');
  
    setUser(null);
  };

  return (
    <AppBar sx={{margin:"30px 0",display:"flex",flexDirection:"row", justifyContent:"space-between",alignItems:"center",padding:"10px 50px" , backgroundColor:"#edede9", position:"static"}}>
	
		<div style={{display:"flex", alignItems:"center"}}>
    <Typography sx={{color:'black',textDecoration:'none'}} align="center" variant="h3" component={Link} to="/" >Öztürk Medya</Typography>
    </div>
    <Toolbar sx={{display:"flex", justifyContent:"flex-end"}}>
      {user?.result ? (
        <div style={{display:"flex", justifyContent:"space-around", width:"150px", alignItems:"center"}}>
          <Avatar>
            {user?.result.name.charAt(0)}
          </Avatar>
          <Button variant="contained" color="secondary" onClick={logout}>Çıkış</Button>
        </div>
      ):(
        <Button component={Link} to="/signin" variant="contained" color='secondary'>Giriş Yap</Button>
      )}
    </Toolbar>

    </AppBar>
  )
}



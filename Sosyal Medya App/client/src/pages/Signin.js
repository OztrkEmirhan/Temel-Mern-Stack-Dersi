import React,{useState} from 'react'
import {Container, Paper, Avatar, Typography, Grid, Button} from "@mui/material"
import {LockOutlined } from "@mui/icons-material"
import Input from '../Component/Input'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {signin} from '../actions/Auth';
import { useNavigate } from 'react-router-dom';

const initialState = {email:'', password:''}

export default function Signin() {

const dispatch = useDispatch();
const navigate = useNavigate();

const [form, setForm] = useState(initialState);
const [showPassword, setShowPassword] = useState(false);
const handleShowPassword = () => setShowPassword(!showPassword);

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = (e) => {
	e.preventDefault();

	dispatch(signin(form, navigate));
};
  return (
    <Container component="main" maxWidth="xs">
        <Paper sx={{marginTop: 10,display: 'flex',flexDirection: 'column',alignItems: 'center',padding: 2,}} elevation={3}>
            <Avatar >
                <LockOutlined />
            </Avatar>
            <Typography sx={{marginBottom:5}} component="h1" variant="h5">Giriş Yap</Typography>
            <form onSubmit={handleSubmit} >
                <Grid container spacing={2} >
                    <Input handleChange={handleChange} name="email" label="Email Adresiniz" type="email" />
                    <Input name="password" label="Parolanızı Giriniz" handleChange={handleChange} type={showPassword ? 'text' : 'password'} 
	                    handleShowPassword={handleShowPassword} />
                </Grid>
                <Button sx={{marginTop:5}} type="submit" fullWidth variant="contained" color="primary" >
                Giriş Yap
                </Button>
                <Grid sx={{marginTop:"10px"}}>
                    <Grid item>
                        <Button component={Link} to="/signup" variant="text" color='secondary' >
                            Hesabınız yok mu? Kayıt Ol
                        </Button>
                    </Grid> 
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}



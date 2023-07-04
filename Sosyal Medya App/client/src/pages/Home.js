import {Container,Grow, Grid, Paper,AppBar, TextField} from '@mui/material';
import Posts from "../Component/Posts";
import Form from '../Component/Form';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getPosts, getPostsBySearch} from '../actions/posts';
import Paginate from '../Component/Pagination';
import {useNavigate} from "react-router-dom"

function Home() {

    const dispatch = useDispatch();
    const navigate=useNavigate();
  const [currentId, setCurrentId] = useState(null);
  const [search,setSearch]=useState('') 

  useEffect(() => {
    dispatch(getPosts());

  }, [dispatch, currentId]);

  const searchPost=()=>{

    if(search.trim()){
      dispatch(getPostsBySearch({search}))
      navigate(`/posts/search?searchQuery=${search ||'none'}`)
    }else{
      navigate('/')
    }
  }
  
  
  const handleKeyPress=(e)=>{
    if(e.keyCode===13){
      searchPost()
    }
  }

  return (
    <Grow in>
    <Container>
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={8}>
          <Posts setCurrentId={setCurrentId}/>
        </Grid>
        <Grid item xs={12} sm={4}>
        <AppBar position='static' color="inherit" sx={{borderRadius: 4,marginBottom: '1rem',display: 'flex',padding: '8px',backgroundColor:'#e9ecef'}}>
	        <TextField onKeyDown={handleKeyPress} name="search" variant='outlined' label="Post Ara" fullWidth value={search} onChange={(e)=>setSearch(e.target.value)} />
        </AppBar>
          <Form setCurrentId={setCurrentId} currentId={currentId}/>
          <Paper elevation={6} sx={{borderRadius:4, marginTop:"1rem", padding:"16px"}}>
            <Paginate/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home

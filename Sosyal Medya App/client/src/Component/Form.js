import {Paper, TextField, Button, Typography} from '@mui/material'
import FileBase from 'react-file-base64'
import React, {useState, useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {createPost, updatePost} from '../actions/posts'

function Form({setCurrentId, currentId}) {

  const [postData,setPostData]=useState({
    title:'',
    message:'',
    tags:'',
    selectedFile:''
  })

  const dispatch=useDispatch();

  const user=JSON.parse(localStorage.getItem('profile'));

  const post=useSelector((state)=>currentId ? state.posts.find((p)=>p._id===currentId) : null);

  useEffect(()=>{
    if(post) setPostData(post);
  },[post])
  
  const handleSubmit=(e)=>{
    e.preventDefault();

    if(currentId){
      dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
    }else{
      dispatch(createPost({...postData,name:user?.result?.name}));
    }
    temizle();
  }

  const temizle=()=>{
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    setCurrentId(null);
  }

  if(!user?.result?.name){
    return(
      <Paper sx={{backgroundColor:"#edede9"}}>
        <Typography variant='h4' align='center'>Lütfen giriş yapınız</Typography>
      </Paper>
    )
  }


  return (
    <Paper sx={{backgroundColor:"#edede9"}}>
      <form style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}} onSubmit={handleSubmit} autoComplete="off" noValidate>
        <Typography sx={{marginBottom:"10px"}}>{currentId ? 'POST GÜNCELLE ' : 'POST EKLE'}</Typography>
        
        <TextField fullWidth sx={{marginBottom:2}} label="Title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField fullWidth sx={{marginBottom:2}} label="Message" multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField fullWidth sx={{marginBottom:2}} label="Tags (Virgül ile ayır)" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

        <div style={{width:'97%',margin:'10px auto'}}>
	        <FileBase  type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>

        <Button sx={{marginBottom:"10px"}} variant="contained" color='primary' size='large' type='submit' fullWidth> {currentId ? 'POST GÜNCELLE ' : 'POST EKLE'} </Button>
        <Button fullWidth onClick={temizle}>Temizle</Button>
      </form>
    </Paper>
  )
}

export default Form

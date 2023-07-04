import React from 'react'
import {useSelector} from 'react-redux'
import {Grid, CircularProgress} from '@mui/material'
import Post from './Post'


function Posts({setCurrentId}) {

  const posts = useSelector((state) => {
    console.log(state);
    return state.posts;
  })
  
  
  return (
      !posts.length ? <CircularProgress/> : (
        <Grid container alignItems="stretch" spacing={3}>
          {
            posts.map((post) => (
              <Grid key={post._id} item xs={12} sm={4}>
                <Post post={post} setCurrentId={setCurrentId}/>
              </Grid>
            ))
          }
        </Grid>
      ))
}

export default Posts

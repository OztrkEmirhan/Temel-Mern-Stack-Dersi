import React from 'react'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import "moment/locale/tr"
import {useDispatch} from 'react-redux'
import {deletePost, likePost} from '../actions/posts'
import {ThumbUp} from '@mui/icons-material'

function Post({post, setCurrentId}) {
    const dispatch = useDispatch();

  return (
    <Card sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", borderRadius:"15px", height:"100%" , position:"relative", backgroundColor:"#edede9"}}>
        <CardMedia sx={{height:0, paddingTop:"56.25%", backgroundColor:"rgba (0,0,0,0.5)", backgroundBlendMode:"darken" }} image={post.selectedFile} title={post.title} />
        <div style={{position:"absolute", top:"20px", left:"20px", color:"white"}}>
            <Typography variant='h6'>{post.name}</Typography>
            <Typography variant='body2'>{moment(post.createdAt).locale("tr").fromNow()}</Typography>
        </div>

        <div>  
	    <Button sx={{position:"absolute", top:"20px", right:"5px", color:"white"}} onClick={() => setCurrentId(post._id)}>
	        <MoreHorizIcon/>
	    </Button> 
        </div>

        <div>
            <Typography sx={{display:"flex", justifyContent:"space-between", margin:"10p" }} variant="body2" color="gray">
                {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography sx={{padding:"0 10px"}} gutterBottom variant="h5" component="h2"> {post.title}</Typography>
            <CardContent>
                <Typography color="gray"> {post.message}</Typography>
            </CardContent> 
            <CardActions sx={{padding:"0 8px 8px 8px " , display:"flex", justifyContent:"space-between"}}>

            <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))}>
                <ThumbUp size='small' /> &nbsp;{post.likeCount}
            </Button>

            <Button onClick={() => dispatch(deletePost(post._id))}>
                <DeleteIcon fontSize='small'/>
            </Button>

            </CardActions>
        </div>
    </Card>
  )
}

export default Post

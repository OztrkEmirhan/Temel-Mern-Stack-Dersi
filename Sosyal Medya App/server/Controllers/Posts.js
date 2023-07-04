import PostMessage from "../Modells/PostMessage.js";
import mongoose from "mongoose";

const getPosts=async (req,res)=>{

  const {page}=req.query;

  try {
      const LIMIT=4;
      const startIndex=(Number(page)-1)*LIMIT;

      const total=await postMessage.countDocuments({})

      const posts=await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)

      res.status(200).json({data:posts,currentPage:page,numberOfPage:Math.ceil(total/LIMIT)})

  } catch (error) {
      res.status(404).json({message:error.message})
  }
}

const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator:req.UserId, createdAt: new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('No post with that id');

  const updatedPost = await PostMessage.findByIdAndUpdate(_id,post , { new: true });

  res.status(200).json(updatedPost);
}

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).send('No post with that id');
  await PostMessage.findByIdAndRemove(id);
  res.status(200).json({ message: 'Post deleted successfully' });
}

const likePost=async (req,res)=>{
  const {id}=req.params;
  if(!req.userId) return res.json({message:'Kullanıcı girişi yapmalısınız'})
  if(!mongoose.Types.ObjectId.isValid(id))  res.status(404).send('Post Bulunamadı')
  const post=await PostMessage.findById(id)
  const index=post.likes.findIndex((id)=>id===String(req.userId))
  if(index===-1){
    post.likes.push(req.userId)
  }else{
    post.likes=post.likes.filter((id)=>id!==String(req.userId))
  }
  const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true})
  res.status(200).json(updatedPost)
}

const getPostsBySearch=async (req,res)=>{
  const {searchQuery}=req.query;
  //console.log(searchQuery);
  try {
      const title=new RegExp(searchQuery,'i') // ALİ ali Ali
      const posts=await PostMessage.find({title})
      res.json({data:posts})
  } catch (error) {
      res.status(404).json({message:error.message})
  }
}

export {getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch};


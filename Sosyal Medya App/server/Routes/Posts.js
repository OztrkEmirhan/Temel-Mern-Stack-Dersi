import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch } from "../Controllers/posts.js";
import auth from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get('/search',getPostsBySearch)
router.post("/", createPost);
router.patch("/:id",auth, updatePost);
router.delete("/:id",auth, deletePost);
router.patch('/:id/likePost',likePost);


export default router;
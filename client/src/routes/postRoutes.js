import express from "express";
import PostController from "../controllers/postController.js";

const postRouter = express.Router();

//lista todos os posts
postRouter.get("/posts", PostController.getPosts);

//lista um post pelo id
postRouter.get("/posts/:id", PostController.getPostByID);

//cria post
postRouter.post('/posts', PostController.createPost);

//atualiza post pelo id
postRouter.put("/posts/:id", PostController.updatePostByID)

//deleta post pelo id
postRouter.delete("/posts/:id", PostController.deletePostByID)


export default postRouter;
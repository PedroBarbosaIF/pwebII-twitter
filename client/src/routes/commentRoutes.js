import express from "express";
import CommentController from "../controllers/commentController.js";

const commentRouter = express.Router();

//lista comments
commentRouter.get("/comments", CommentController.getComments);

//lista comment pelo id #############NAO USADO MAIS#################
//commentRouter.get("/comments/:id", CommentController.getCommentByID);

//lista comments pelo postID
commentRouter.get("/comments/:postID", CommentController.getCommentsByPostID);

//cria comment NAO USADO MAIS
//commentRouter.post("/posts/:id", CommentController.createComment);

//cria comentário
commentRouter.post('/comments', CommentController.createComment)

//atualiza comment pelo id
commentRouter.put("/comments/:id", CommentController.updateCommentByID);

//deleta comment pelo id
commentRouter.delete("/comments/:id", CommentController.deleteCommentByID);

export default commentRouter;

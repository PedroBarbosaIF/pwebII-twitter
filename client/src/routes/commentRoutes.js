import express from 'express';
import CommentController from '../controllers/commentController.js';

const commentRouter = express.Router();

//lista comments
commentRouter.get('/comments', CommentController.getComments)

//lista comment pelo id
commentRouter.get('/comments/:id', CommentController.getCommentByID)

//cria comment
commentRouter.post('/posts/:id', CommentController.createComment);

//atualiza comment pelo id
commentRouter.put('/comments/:id', CommentController.updateCommentByID);

//deleta comment pelo id
commentRouter.delete('/comments/:id', CommentController.deleteCommentByID);

export default commentRouter;
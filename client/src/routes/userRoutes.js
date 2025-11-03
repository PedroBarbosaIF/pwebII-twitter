import express from "express";
import UserController from "../controllers/userController.js";
const userRouter = express.Router();

//lista todos os posts
userRouter.get("/users", UserController.getUsers);

//lista um post pelo id
userRouter.get("/users/:id", UserController.getUserByID);

//cria post
userRouter.post('/users', UserController.createUser);

//cria post
userRouter.post('/auth', UserController.createUser);

//atualiza post pelo id
userRouter.put("/users/:id", UserController.updateUserByID)

//deleta post pelo id
userRouter.delete("/users/:id", UserController.deleteUserByID)


export default userRouter;
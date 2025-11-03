import express from 'express';
import postRouter from './postRoutes.js';
import commentRouter from './commentRoutes.js';
import userRouter from './userRoutes.js';

const arrayRouters = [postRouter, commentRouter, userRouter]

function routes(app) {
    app.get('/', (req,res) => {
        res.send("api para projeto Mordecai(PWEB twitter)")
    })

    app.use(express.json(), arrayRouters);
}

export default routes;
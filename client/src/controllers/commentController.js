import comment from "../models/Comment.js";

class CommentController {
    //lista todos os comentários
    static async getComments(req, res) {
        try {
            const comments = await comment.find();
            res.status(200).json(comments);
        } catch (e) {
            res.status(500).json({
                message: `listing comments failed`,
                error: e.message,
            });
        }
    }

    //lista comentário pelo id NAO USADO MAIS
    static async getCommentByID(req, res) {
        try {
            const id = req.params.id;
            const specificComment = await comment.findById(id);
            res.status(200).json(specificComment);
        } catch (e) {
            res.status(500).json({
                message: `listing comment by id failed`,
                error: e.message,
            });
        }
    }

    //lista todos os comentários pelo postID
    static async getCommentsByPostID(req, res) {
        try {
            const postID = req.params.postID
            const comments = await comment.find({postID: postID});
            res.status(200).json(comments);
        } catch (e) {
            res.status(500).json({
                message: `listing comments failed`,
                error: e.message,
            });
        }
    }

    //cria comentário
    static async createComment(req, res) {
        /*
        try {
            const postID = new mongoose.Types.ObjectId(req.params.id);
            //united define o comentário a ser criado pela requisição com o postID
            const united = await comment.create({
                ...req.body,
                postID: postID,
            });
            res.status(200).json({
                message: "comment was created",
                comment: united,
            });
        } catch (e) {
            res.status(500).json({
                message: `creating comment failed`,
                error: e.message,
            });
        }
        */
        try {
            const commentToCreate = await comment.create(req.body);
            res.status(200).json({
                message: "comment was created",
                comment: commentToCreate,
            });
        } catch (e) {
            res.status(500).json({
                message: `creating comment failed`,
                error: e.message,
            });
        }
    }

    //atualiza comentário pelo id
    static async updateCommentByID(req, res) {
        try {
            const id = req.params.id;
            const oldComment = await comment.findByIdAndUpdate(id, req.body);
            const newComment = await comment.findById(id);
            res.status(200).json({
                message: "comment was updated",
                oldComment: oldComment,
                newComment: newComment,
            });
        } catch (e) {
            res.status(500).json({
                message: `updating comment failed`,
                error: e.message,
            });
        }
    }

    //deleta comentário pelo id
    static async deleteCommentByID(req, res) {
        try {
            const id = req.params.id;
            const commentToDelete = await comment.findByIdAndDelete(id);
            res.status(200).json({
                message: "comment was deleted",
                comment: commentToDelete,
            });
        } catch (e) {
            res.status(500).json({
                message: `deleting comment failed`,
                error: e.message,
            });
        }
    }
}

export default CommentController;

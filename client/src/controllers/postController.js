import post from "../models/Post.js";
import comment from "../models/Comment.js";

class PostController {
    //lista todos os posts
    static async getPosts(req, res) {
        try {
            const posts = await post.find().populate("user", "username");
            res.status(200).json(posts);
        } catch (e) {
            res.status(500).json({
                message: `listing posts failed`,
                error: e.message,
            });
        }
    }

    //lista post pelo id
    static async getPostByID(req, res) {
        try {
            const id = req.params.id;
            // popular user para incluir username ao buscar por id
            const especificPost = await post
                .findById(id)
                .populate("user", "username");
            res.status(200).json(especificPost);
        } catch (e) {
            res.status(500).json({
                message: `listing post by id failed`,
                error: e.message,
            });
        }
    }

    //cria post
    static async createPost(req, res) {
        try {
            if (req.body.user == null) {
                const postToCreate = await post.create({
                    ...req.body,
                    user: "6907a1c1c755c695899a633d",
                });
                res.status(200).json({
                    message: "post was created",
                    post: postToCreate,
                });
            } else {
                const postToCreate = await post.create(req.body);
                res.status(200).json({
                    message: "post was created",
                    post: postToCreate,
                });
            }
        } catch (e) {
            res.status(500).json({
                message: `creating post failed`,
                error: e.message,
            });
        }
    }

    //atualiza post pelo id
    static async updatePostByID(req, res) {
        try {
            const id = req.params.id;
            const oldPost = await post.findByIdAndUpdate(id, req.body);
            const newPost = await post.findById(id);
            res.status(200).json({
                message: "post was updated",
                oldPost: oldPost,
                newPost: newPost,
            });
        } catch (e) {
            res.status(500).json({
                message: `updating post failed`,
                error: e.message,
            });
        }
    }

    //deleta post pelo id e seus comentários
    static async deletePostByID(req, res) {
        try {
            const id = req.params.id;
            const postToDelete = await post.findByIdAndDelete(id);
            // Deleta todos os comentários relacionados a este post
            await comment.deleteMany({ postID: id });
            res.status(200).json({
                message: "post and related comments were deleted",
                post: postToDelete,
            });
        } catch (e) {
            res.status(500).json({
                message: `deleting post failed`,
                error: e.message,
            });
        }
    }
}

export default PostController;

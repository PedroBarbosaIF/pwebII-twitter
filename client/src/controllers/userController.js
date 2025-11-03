import user from "../models/User.js";
import bcrypt from "bcryptjs";

class UserController {
    //lista todos os users
    static async getUsers(req, res) {
        try {
            const users = await user.find();
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json({
                message: `listing users failed`,
                error: e.message,
            });
        }
    }

    //lista userr pelo id
    static async getUserByID(req, res) {
        try {
            const id = req.params.id;
            const especificUser = await user.findById(id);
            res.status(200).json(especificUser);
        } catch (e) {
            res.status(500).json({
                message: `listing user by id failed`,
                error: e.message,
            });
        }
    }

    //cria user
    static async createUser(req, res) {
        try {
            // Hashear a senha antes de salvar
            const { password, username } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const userToCreate = await user.create({
                username,
                password: hashedPassword,
            });
            res.status(200).json({
                message: "user was created",
                post: userToCreate,
            });
        } catch (e) {
            res.status(500).json({
                message: `creating user failed`,
                error: e.message,
            });
        }
    }

    //atualiza post pelo id
    static async updateUserByID(req, res) {
        try {
            const id = req.params.id;
            // Se o request trouxer uma nova senha, hasheá-la antes de atualizar
            const updateBody = { ...req.body };
            if (updateBody.password) {
                const salt = await bcrypt.genSalt(10);
                updateBody.password = await bcrypt.hash(
                    updateBody.password,
                    salt
                );
            }
            const oldUser = await user.findByIdAndUpdate(id, updateBody);
            const newUser = await user.findById(id);
            res.status(200).json({
                message: "user was updated",
                oldUser: oldUser,
                newUser: newUser,
            });
        } catch (e) {
            res.status(500).json({
                message: `updating user failed`,
                error: e.message,
            });
        }
    }

    //deleta user
    static async deleteUserByID(req, res) {
        try {
            const id = req.params.id;
            const userToDelete = await user.findByIdAndDelete(id);
            res.status(200).json({
                message: "user was deleted",
                user: userToDelete,
            });
        } catch (e) {
            res.status(500).json({
                message: `deleting user failed`,
                error: e.message,
            });
        }
    }
}

export default UserController;

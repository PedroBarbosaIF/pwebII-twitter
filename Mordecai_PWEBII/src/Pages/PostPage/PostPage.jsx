import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import PostPageCard from "../../Components/PostPageCardPost/PostPageCard";
import PostPageCardComment from "../../Components/PostPageComment/PostPageCardComment";
import "./style.css";
import CommentForm from "../../Components/CommentForm/CommentForm";
import Navbar from "../../Components/Navbar/Navbar";

export default function PostPage() {
    let { id } = useParams();

    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);

    /*
    const addComment = () =>{
        api.post("/comments", {
            commentBody: newComment,
            postId: id,
        }).then((response) =>{
            const commentToAdd = {commentBody: newComment};
            setComments([...comments, commentToAdd])
            console.log("Comentário adionado com sucesso")
            console.log(newComment);
        })
    }
    */

    useEffect(() => {
        api.get(`/posts/${id}`).then((response) => {
            setPostObject(response.data);
            console.log(response.data);
        });

        api.get(`comments/${id}`).then((response) => {
            setComments(response.data);
            console.log(response.data);
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className="postPage">
                <div className="leftSide">
                    <PostPageCard
                        title={postObject.title}
                        text={postObject.text}
                        username={postObject.user?.username}
                    />
                </div>

                <div className="rightSide">
                    <CommentForm
                        onSubmit={async (text) => {
                            try {
                                const response = await api.post("/comments", {
                                    text: text,
                                    postID: id,
                                });

                                // O backend retorna { message, comment }
                                if (response.data.comment) {
                                    setComments([
                                        ...comments,
                                        response.data.comment,
                                    ]);
                                    console.log(response.data);
                                } else {
                                    // fallback: recarrega todos os comentários
                                    const updated = await api.get(
                                        `comments/${id}`
                                    );
                                    setComments(updated.data);
                                }
                            } catch (err) {
                                alert("Erro ao enviar comentário");
                            }
                        }}
                    />
                    <div className="listOfComments">
                        {comments.map((comment, key) => {
                            return (
                                <div className="" key={comment._id}>
                                    <PostPageCardComment
                                        id={comment._id}
                                        text={comment.text}
                                        onRemove={async (commentId) => {
                                            if (
                                                window.confirm(
                                                    "Tem certeza que deseja remover este comentário?"
                                                )
                                            ) {
                                                await api.delete(
                                                    `/comments/${commentId}`
                                                );
                                                setComments(
                                                    comments.filter(
                                                        (c) =>
                                                            c._id !== commentId
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

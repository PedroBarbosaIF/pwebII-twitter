import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import PostPageCard from "../../Components/PostPageCard/PostPageCard";

export default function PostPage() {
    let { id } = useParams();

    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

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
            <div className="postPage">
                <div className="leftSide">
                    <PostPageCard
                        title={postObject.title}
                        text={postObject.text}
                    />
                </div>

                {/*<div className="rightSide">
                    <div className="addCommentContainer">
                        <input
                            type="text"
                            placeholder="Digite o comentário"
                            value={newComment}
                            onChange={(event) => {
                                setNewComment(event.target.value);
                            }}
                        />
                    </div>
                    <button onClick={addComment}>Add Comentário</button>

                    <div className="listOfComments">
                        {comments.map((comment, key) => {
                            return (
                                <div className="comment">
                                    {comment.commentBody}
                                </div>
                            );
                        })}
                    </div>
                </div>*/}
            </div>
        </>
    );
}

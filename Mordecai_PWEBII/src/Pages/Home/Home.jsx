import { useEffect, useState } from "react";
import PostForm from "../../Components/PostForm/PostForm";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

import HomePost from "../../Components/HomePost/HomePost";

export default function Home() {
    const [listOfPosts, setOfPosts] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        api.get("/posts").then((response) => {
            console.log(response.data);
            setOfPosts(response.data);
        });
    }, []);

    return (
        <>
            <div className="w-full flex flex-row justify-around">
                {/*DIV POSts*/}
                <div className="w-full flex flex-col items-center gap-6 py-4">
                    {listOfPosts.map((post) => {
                        return (
                            <HomePost
                                key={post._id}
                                id={post._id}
                                title={post.title}
                                text={post.text}
                                onClick={() => {
                                    navigate(`/post/${post._id}`);
                                }}
                                onRemove={async (id) => {
                                    if (
                                        window.confirm(
                                            "Tem certeza que deseja remover este post?"
                                        )
                                    ) {
                                        await api.delete(`/posts/${id}`);
                                        setOfPosts(
                                            listOfPosts.filter(
                                                (p) => p._id !== id
                                            )
                                        );
                                    }
                                }}
                            />
                        );
                    })}
                </div>

                {/*DIV FORMULARIO*/}
                <div className="form">
                    <PostForm
                        onPostCreated={async () => {
                            const response = await api.get("/posts");
                            setOfPosts(response.data);
                        }}
                    />
                </div>
            </div>
        </>
    );
}

/*
{listOfPosts.map((post) => {
                return (
                    <HomePost
                        id={post.id}
                        title={post.title}
                        text={post.text}
                    />
                );
            })}
*/

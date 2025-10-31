import { useEffect, useState } from "react";
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
            <div className="flex flex-col gap-2 items-center">
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
                        />
                    );
                })}
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

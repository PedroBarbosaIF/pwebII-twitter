import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import PostForm from "../../Components/PostForm/PostForm";
import api from "../../services/api";
import Navbar from "../../Components/Navbar/Navbar";

export default function CreatePost() {
    const [listOfPosts, setOfPosts] = useState([]);

    useEffect(() => {
        api.get("/posts").then((response) => {
            console.log(response.data);
            setOfPosts(response.data);
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-row justify-center my-30">
                <PostForm
                    onPostCreated={async () => {
                        const response = await api.get("/posts");
                        setOfPosts(response.data);
                    }}
                />
            </div>
        </>
    );
}

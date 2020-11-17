import React, {useEffect, useState} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createPost } from '../graphql/mutations';

function CreatePost() {

    const [postOwnerId, setPostOwnerId] = useState("");
    const [postOwnerUsername, setPostOwnerUsername] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");

    useEffect(() => {
        // Do stuff later
        Auth.currentUserInfo()
            .then((user) => {
                setPostOwnerId(user.attributes.sub);
                setPostOwnerUsername(user.username);
            })
    }, [])

    const handleChangePost = (e) => {
        e.preventDefault();

        let name = e.target.name;

        if (name === "postTitle") {
            setPostTitle(e.target.value);
        } else if (name === "postBody") {
            setPostBody(e.target.value);
        }
    }

    const handleAddPost = async (e) => {
        e.preventDefault();

        const input = {
            postOwnerId: postOwnerId,
            postOwnerUsername: postOwnerUsername,
            postTitle: postTitle,
            postBody: postBody,
            createdAt: new Date().toISOString()
        }
        console.log(input);
        // Making call to database to add the given post (input object)
        API.graphql(graphqlOperation(createPost, {input})).then(() => {
            console.log("success");
        })
        .catch((e) => {
            console.log(e);
        })

        // Clean up fields
        setPostTitle("");
        setPostBody("");
    }

    return (
        <div>
            <form className="add-post" onSubmit={handleAddPost}>
                <input style={{font: '19px'}} type="text" placeholder="Title" name="postTitle" required onChange={handleChangePost} value={postTitle} />
                <textarea type="text" name="postBody" rows="3" cols="40" required placeholder="New Blog Post" onChange={handleChangePost} value={postBody} />
                <input type="submit" className="btn" style={{font: '19px'}} />
            </form>
        </div>
    )
}

export default CreatePost

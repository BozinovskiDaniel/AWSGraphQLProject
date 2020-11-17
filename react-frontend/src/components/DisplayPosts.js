import React, {useEffect, useState} from 'react'
import Post from './Post';

// GraphQL
import {listPosts} from '../graphql/queries';
import {onCreatePost} from '../graphql/subscriptions';
import  {API, graphqlOperation} from 'aws-amplify';

function DisplayPosts() {

    const [posts, setPosts] = useState([]);

    // On component mounts
    useEffect(() => {
        getPosts();

        var createPostListener = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: postData => {
                const newPost = postData.value.data.onCreatePost;
                const prevPosts = posts.filter((p) => p.id !== newPost.id);
                console.log(prevPosts);
                const updatedPosts = [newPost, ...prevPosts];
                setPosts(updatedPosts); // Update the states posts
            }
        });
    }, [])

    const getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts));
        setPosts(result.data.listPosts.items);
        console.log(JSON.stringify(result.data.listPosts.items));
    }

    return (
        <div>
            {posts ? (
                posts.map((post) => {
                    return (<div className="post">
                        <Post post={post} />
                    </div>)
                })
            ): null}
        </div>
    )
}

export default DisplayPosts

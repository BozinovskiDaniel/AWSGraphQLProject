import React from 'react'

import DeletePost from './DeletePost';
import EditPost from './EditPost';

function Post(props) {
    const {post} = props;
    return (
        <div>
            <h1>{post.postTitle}</h1>
            
            <span>
            Wrote by: {post.postOwnerUsername}
            <br />
            {" on "}
            {post.createdAt}
            </span>

            <p className="post-body">
                {post.postBody}
            </p>

            <br/>

            <span>
                <DeletePost />
                <EditPost />
            </span>

        </div>
    )
}

export default Post

// 

import React from 'react';
import LikeButton from './LikeButton';
import {getHeaders} from './utils';

import { useState } from "react";

export default function Post({post, token}) {

    const [actualPost, setActualPost] = useState(post);

    async function requeryPost() {
        // get a fresh copy of the post
            const response = await fetch(`api/posts/${post.id}`, {
            method: "GET",
            headers: getHeaders(token)
        });
        const data = await response.json();
        console.log(data);
        // to make the screen redraw after requerying the post,
        // we need to set a state variable:
        setActualPost(data);
    }

    // JSX representation of a post
    return (
        <section className="card">
            <img src={actualPost.image_url} alt={actualPost.caption}/>
            <div>{actualPost.caption}</div>
            <div className="buttons">
                <LikeButton 
                post={actualPost} 
                token={token}
                requeryPost={requeryPost} />
            </div>
        </section>
    )
}

import React from 'react';
import {getHeaders} from './utils';


export default function LikeButton({actualLike, post, token, requeryPost}) {
    // some logic at the top:
    const likeId = post.current_user_like_id;
    const postId = post.id;

    async function likeUnlike() {
        if (likeId) {
            const response = await fetch(`/api/posts/likes/${likeId}`, {
                method: "DELETE",
                headers: getHeaders(token)
            });
            const data = await response.json();
            console.log(data);
            requeryPost();
        } else {
            // code to like a post:
            console.log('like!')
            const postData = {
                "post_id": postId
            };
            const response = await fetch("/api/posts/likes/", {
                method: "POST",
                headers: getHeaders(token),
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log(data);
            requeryPost();
        }
    }

    // return some JSX:
    return (
    actualLike ? 
    <button class="icon-button" aria-label="Like Button" onClick={likeUnlike} aria-checked="true">
        <i class="fas fa-heart"></i>
    </button>
    :
    <button class="icon-button" aria-label="Like Button" onClick={likeUnlike} aria-checked="false">
        <i class="far fa-heart"></i>
    </button>
    );
}
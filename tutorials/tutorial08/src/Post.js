// Job of this component is to display a post
// and to allow users to interact with the post

import React from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
import {getHeaders} from './utils';

import { useState } from "react";

export default function Post({post, token}) {

    let showComments;

    const [actualPost, setActualPost] = useState(post);
    const [actualLike, setActualLike] = useState(post.current_user_like_id);
    const [likeAmount, setLikeAmount] = useState(post.likes.length);
    const [actualBookmark, setActualBookmark] = useState(post.current_user_bookmark_id);
    const [actualComments, setActualComments] = useState(post.comments.length);
    const [newestComment, setNewestComment] = useState(post.comments[post.comments.length - 1]);

    async function requeryPost() {
        // get a fresh copy of the post
            const response = await fetch(`/api/posts/${post.id}`, {
            method: "GET",
            headers: getHeaders(token)
        });
        const data = await response.json();
        // to make the screen redraw after requerying the post,
        // we need to set a state variable:
        setActualPost(data);
        setActualLike(data.current_user_like_id);
        setLikeAmount(data.likes.length);
        setActualBookmark(data.current_user_bookmark_id);
        setActualComments(data.comments.length);
        setNewestComment(data.comments[data.comments.length - 1]);
    }


    if(actualComments === 0) {
        showComments = '';
    } 

    if(actualComments > 1) {
        showComments = <section id="view-all-comments"> <button class="button">View all {actualComments} comments</button>
        <p>
            <strong>{newestComment.user.username} </strong> 
            {newestComment.text}
        </p> </section>;
    }

    if(actualComments === 1) {
        showComments =
        <p>
             <strong>{newestComment.user.username} </strong> 
             {newestComment.text}
         </p>;
    }
   
    // JSX representation of a Post
    return (
    <section id={'post_' + actualPost.id} class="post" key={post.id}>
        <div class="header">
            <h3>{post.user.username}</h3>
                <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
        </div>
    <img src={post.image_url} alt="sigh" width="300" height="300"></img>
    <div class="info">
        <div class="buttons">
            <div>
                <LikeButton actualLike={actualLike} post={actualPost} token={token} requeryPost={requeryPost} />
                <button class="icon-button"><i class="far fa-comment"></i></button>
                <button class="icon-button"><i class="far fa-paper-plane"></i></button>
            </div>
            <div>
                <BookmarkButton actualBookmark={actualBookmark} post={actualPost} token={token} requeryPost={requeryPost} />
            </div>
    </div>
    <p class="likes"><strong>{likeAmount} likes</strong></p>
        <div class="caption">
            <p>
                <strong>{post.user.username} </strong>
                {post.caption}
            </p>
        </div>
        <div class="comments">
            {showComments}
            <p class="timestamp">{post.display_time}</p>
        </div>
    </div>
        <AddComment token={token} post={actualPost} requeryPost={requeryPost}/>
    </section>
    )
}
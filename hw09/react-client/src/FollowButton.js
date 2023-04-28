import React from 'react';
import {getHeaders} from './utils';


export default function FollowButton({actualFollow, suggestion, token, requerySuggestion}) {
    // some logic at the top:
    const followId = suggestion.id;

    async function followUnfollow() {
        if (followId) {
            const response = await fetch(`/api/following/${followId}`, {
                method: "DELETE",
                headers: getHeaders(token)
            });
            const data = await response.json();
            console.log(data);
            requerySuggestion();
        } else {
            // code to follow a suggestion:
            console.log('follow!')
            const postData = {
                "user_id": followId
            };
            const response = await fetch("/api/following/", {
                method: "POST",
                headers: getHeaders(token),
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log(data);
            requerySuggestion();
        }
    }

    // return some JSX:
    return (
    actualFollow ?
    <button role="switch" class="link_following" onClick={followUnfollow} aria-checked="false"
        aria-label={'Follow ' + suggestion.username}>follow
    </button>
    :
    <button role="switch" class="link_following" onClick={followUnfollow} aria-checked="true"
        aria-label={'Unfollow ' + suggestion.username}>unfollow
    </button>
    );
}
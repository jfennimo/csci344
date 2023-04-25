// Job of this component is to display a single Suggestion

import React from 'react';
import FollowButton from './FollowButton';
import {getHeaders} from './utils';

import { useState } from "react";

export default function Suggestion({ suggestion, token }) {

    const [actualSuggestion, setActualSuggestion] = useState(suggestion);
    const [actualFollow, setActualFollow] = useState(suggestion.id);

    async function requerySuggestion() {
        // get a fresh copy of the post
            const response = await fetch(`/api/suggestions/${suggestion.id}`, {
            method: "GET",
            headers: getHeaders(token)
        });
        const data = await response.json();
        // to make the screen redraw after requerying the post,
        // we need to set a state variable:
        setActualSuggestion(data);
        setActualFollow(data.suggestion.id);
    }

    return (
        <section id={'suggestion_' + actualSuggestion.id}>
            <img src={suggestion.image_url} class="pic" alt={suggestion.username} />
            <div>
                <p>{suggestion.username}</p>
                <p>suggested for you</p>
            </div>
            <div>
                <FollowButton actualFollow={actualFollow} suggestion={actualSuggestion} token={token} requerySuggestion={requerySuggestion}/>
            </div>
        </section>
    )
}
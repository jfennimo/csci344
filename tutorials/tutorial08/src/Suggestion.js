// Job of this component is to display a single Suggestion

import React from 'react';

export default function Suggestion({suggestion}) {
    return (
        <section id="suggestion">
            <img src={suggestion.image_url} class="pic" alt={suggestion.username}/>
                <div>
                    <p>{suggestion.username}</p>
                    <p>suggested for you</p>
                </div>
                <div>
                    <button role="switch" class="link_following" aria-checked="false"
                        aria-label="Follow {suggestion.username}">follow</button>
                </div>
        </section>
    )
}
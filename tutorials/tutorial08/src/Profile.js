// The job of Profile is to show the image and username
// of the person who is logged into the system:
// TODO: assume the the user is passed into this component as a prop:


import React from 'react';

export default function Profile({profile}) {
    // some logic here:
    console.log(profile);


    // return some JSX
    if (!profile) {
        return;
    }
    return (
        <header>
            <img src={profile.thumb_url} />
            <h3>{profile.username}</h3>
        </header>
    )
}
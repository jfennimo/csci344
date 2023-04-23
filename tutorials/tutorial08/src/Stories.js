// The job of Stories is to display stories.

import React from 'react';
import Story from './Story';

import { useState, useEffect } from "react";
import {getHeaders} from './utils';

export default function Stories({token}) {
    // logic here
    const [stories, setStories] = useState([]);


    useEffect(() => {
        async function fetchStories() {
            const response = await fetch('api/stories', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setStories(data);
        }
        fetchStories();
    }, [token]);

    if(stories.length === 0) {
        return '';
    } 

    // return some JSX
    return (
        <>
            {
                stories.map(story => {
                    return (
                        <Story story={story} />
                    )
                })
            }
        </>
    );
}

    // useEffect(() => {
    //     async function fetchPosts() {
    //         const response = await fetch('/api/posts', {
    //             headers: getHeaders(token)
    //         });
    //         const data = await response.json();
    //         setPosts(data);
    //     }
    //     fetchPosts();
    // }, [token]);

    // if (posts.length === 0) {
    //     return <div id="posts"></div>
    // }
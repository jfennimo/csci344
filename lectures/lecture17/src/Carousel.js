import React from "react";
import { useState, useEffect } from 'react';

export default function Carousel({gallery}) {

    console.log(gallery);

    useEffect(() => {

        async function getMerch() {
            const request = await fetch(gallery.endpoint);
            const data = await request.json();
            console.log(data);
        }
        getMerch();

    }, [gallery]); //only re-fetch if gallery has changed

    const [idx, setIdx] = useState(0);
    
    function previous() {
        console.log('previous');
        setIdx(idx - 1);
    }

    function next() {
        console.log('next');
        setIdx(idx + 1);
    }

    // ------------------------------------------------------------
    // Your Tasks:
    // ------------------------------------------------------------
    // 1. Use the useEffect hook (effect as in "side effect")
    //    to fetch photos from the gallery's corresponding endpoint
    // 2. First argument is the function, second argument is the
    //    dependencies
    // 3. When data comes back from the server, save the
    //    resulting data in a variable. Then set the idx variable to 0.

    return (
        <div className="carousel">

            <div class="carousel-inner">
                <img src="https://via.placeholder.com/400/771796" />
            </div>

            <div class="navigation">
                <button onClick={previous}>Previous</button>
                <button onClick={next}>Next</button>
            </div>
        </div>
    )

}
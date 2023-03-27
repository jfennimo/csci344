import React from "react";
import { useState } from 'react';

export default function Carousel({gallery}) {
    // create a state variable to trigger the React screen redraw functionality:
    const [index, setIndex] = useState(0);
    console.log(index);

    // some logic at the top
    const currentImageURL = gallery.images[index];

    function previous() {
        // console.log('previous');
        (index === 0) ? setIndex(gallery.images.length - 1) : setIndex(index - 1);
    }

    function next() {
        (index === gallery.images.length - 1) ? setIndex(0) : setIndex(index + 1); 
    }

    // return some JSX:
    return (
        <div className="carousel">
            <h1>{gallery.name}</h1>
            <img src={currentImageURL} />
            <button onClick={previous}>previous</button>
            <button onClick={next}>next</button>
        </div>
    )

}
/**
 * The job of Galleries is to show users the avaialble galleries,
 * and let them select the one they want to look at.
 */

import React from "react";

export default function Galleries({ galleries, setGalleryIndex }) {
    // some logic at the top: 
    console.log(galleries);

    function chooseGallery() {
        console.log("choose new gallery!");
        setGalleryIndex(idx);
    }


    // return some JSX: 
    return (
        <section>
            <h2>Available Galleries</h2>
            {
                galleries.map(gallery, idx) => {
                    return (
                        <button onClick={chooseGallery}>Click here to show {gallery.name} </button>
                    )
                })
            }
        </section>
    )
}

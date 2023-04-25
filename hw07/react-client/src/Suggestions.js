// The job of Suggestions is to display suggestions

import React from 'react';
import Suggestion from './Suggestion';

import { useState, useEffect } from "react";
import {getHeaders} from './utils';

export default function Suggestions({token}) {
    // logic here
    const [suggestions, setSuggestions] = useState([]);


    useEffect(() => {
        async function fetchSuggestions() {
            const response = await fetch('api/suggestions', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setSuggestions(data);
        }
        fetchSuggestions();
    }, [token]);

    if(suggestions.length === 0) {
        return '';
    } 

    // return some JSX
    return (
        <>
            {
                suggestions.map(suggestion => {
                    return (
                        <Suggestion suggestion={suggestion} />
                    )
                })
            }
        </>
    );
    // return (
    //     <div className="suggestions">
    //         <div>
    //             Suggestions go here...
    //         </div>
    //     </div>
    // )
}
import React from 'react';
import NavLinks from './NavLinks';
import Profile from './Profile';
import Suggestions from './Suggestions';
import Stories from './Stories';
import Posts from './Posts';

import { useState, useEffect } from "react";
import {getHeaders} from './utils';


export default function App ({token}) { 
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            const response = await fetch('/api/profile', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setProfile(data)
        }
        fetchProfile();
    }, [token]);

    console.log('access token:', token);
    
    return (
        <div>
            
            {/* Navbar */}
            <nav className="main-nav">
                <h1>Photo App</h1>
                <NavLinks profile={profile} />
            </nav>
           
           {/* Right Panel */}
            <aside>
                <header class="user">
                    <Profile profile={profile} />
                </header>
                <div class="suggestions">
                    <Suggestions token={token} />
                </div>
            </aside>

            <main class="content">
                <header class="stories">
                    <Stories token={token}/>
                </header>
                <section class="card">
                    <Posts token={token} />
                </section>
            </main>

        </div>
    );
    
}
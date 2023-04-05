// Maximize: shift + ⌘ + [
// Minimize: shift + ⌘ + ]

/********************/
/* Global Variables */
/********************/
// import { getAccessToken } from "./utilities";

let token;
const rootURL = 'https://photo-app-secured.herokuapp.com';
const username = "joel";
const password = "joel_password";

async function getAccessToken(rootURL, username, password) {
    const postData = {
        "username": username,
        "password": password
    };
    const endpoint = `${rootURL}/api/token`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    return data.access_token;
}

/******************/
/* Your Functions */
/******************/

// yayy got the image formatting fixed
const showUser = async () => {
    const endpoint = `${rootURL}/api/profile`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();
    console.log('Profile:', data);
    document.querySelector('.user').insertAdjacentHTML('beforeend',
        `<div>
    <img src="${data.image_url}">
    <h2>${data.username}</h2>
    </div>`)
}

const showSuggestions = async (token) => {
    const endpoint = `${rootURL}/api/suggestions/`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Suggestions: ', data);
    const htmlChunk = data.map(suggestionToHtml).join('')
    document.querySelector('.suggestions').innerHTML = htmlChunk;

}

const suggestionToHtml = (suggestion) => {
    return `
    <section id="suggestion">
    <img src="${suggestion.image_url}" class="pic" alt="${suggestion.username}">
        <div>
            <p>${suggestion.username}</p>
            <p>suggested for you</p>
            </div>
            <div>
                <button role="switch" class="link following" aria-checked="false"
                    aria-label="Follow ${suggestion.username}">follow</button>
            </div>
    </section>`
}

const showStories = async () => {
    const endpoint = `${rootURL}/api/stories`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log(data);
    const htmlChunk = data.map(storyToHtml).join('');
    document.querySelector('.stories').innerHTML = htmlChunk;
}

const storyToHtml = story => {
    return `<section class="story">
        <img src="${story.user.thumb_url}" />
        <p>${story.user.username}</p>
    </section>
    `
}

const targetElementAndReplace = (selector, newHTML) => {
    const div = document.createElement('div');
    div.innerHTML = newHTML;
    const newEl = div.firstElementChild;
    const oldEl = document.querySelector(selector);
    oldEl.parentElement.replaceChild(newEl, oldEl);
}

const initPage = async () => {
    // set the token as a global variable 
    // (so that all of your other functions can access it):
    token = await getAccessToken(rootURL, username, password);
    console.log(token);

    // then use the access token provided to access data on the user's behalf
    showUser(token);
    showSuggestions(token);
    showStories(token);
    // showPosts(token);

    // query for the user's profile
    // query for suggestions
}

/******************************************/
/* Invoke initPage to kick everything off */
/******************************************/
initPage();
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

    // `<img src="https://picsum.photos/60/60?q=11" class="pic" />
    // <h2>gibsonjack</h2>`
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
    const htmlString = data.map(storyToHtml).join('');
    document.querySelector('.stories').innerHTML = htmlString;
}

const storyToHtml = story => {
    return `<div>
        <img src="${story.user.thumb_url}" class="pic"/>
        <p>${story.user.username}</p>
        </div>
    `
}

const showPosts = async () => {
    // 1. go out to the internet and grab our posts
    // 2. save the resulting data to a variable
    // 3. transform the data into an HTML represention
    // 4. display it:
    const endpoint = `${rootURL}/api/posts`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Posts:', data);

    const arrayOfHTML = data.map(postToHtml);
    const htmlString = arrayOfHTML.join('');
    document.querySelector('.card').innerHTML = htmlString;
}

const postToHtml = post => {
    return `
    <div class="header">
    <h3>${post.user.username}</h3>
    <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
</div>
<img src="${post.image_url}" alt="sigh" width="300" height="300">
<div class="info">
    <div class="buttons">
        <div>
            <button class="icon-button"><i class="far fa-heart"></i></button>
            <button class="icon-button"><i class="far fa-comment"></i></button>
            <button class="icon-button"><i class="far fa-paper-plane"></i></button>
        </div>
        <div>
            <button class="icon-button"><i class="far fa-bookmark"></i></button>
        </div>
    </div>
    <p class="likes"><strong>${post.likes.length} likes</strong></p>
    <div class="caption">
        <p>
            <strong>${post.user.username}</strong> 
            ${post.caption}<button class="button">more</button>
        </p>
    </div>
    <div class="comments">
        <p>
            <strong>lizzie</strong> 
            Here is a comment text text text text text text text text.
        </p>
        <p>
            <strong>vanek97</strong> 
            Here is another comment text text text.
        </p>
        <p class="timestamp">${post.display_time}</p>
    </div>
</div>
<div class="add-comment">
    <div class="input-holder">
        <i class="far fa-smile"></i>
        <input type="text" placeholder="Add a comment...">
    </div>
    <button class="button">Post</button>
</div>
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
    showPosts(token);

    // query for the user's profile
    // query for suggestions
}

/******************************************/
/* Invoke initPage to kick everything off */
/******************************************/
initPage();
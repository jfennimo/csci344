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

const getLikeButton = post => {
    if(post.current_user_like_id) {
        return `
        <button class="icon-button" onclick="unlikePost(${post.current_user_like_id}, ${post.id})">
            <i class="fas fa-heart"></i>
        </button>
        `;
    } else {
        return `
        <button class="icon-button" onclick="likePost(${post.id})">
            <i class="far fa-heart"></i>
        </button>
        `;
    }
}

const getBookmarkButton = post => {
    if (post.current_user_bookmark_id) {
        return `
        <button class="icon-button" onclick="unbookmarkPost(${post.current_user_bookmark_id}, ${post.id})">
            <i class="fa-solid fa-bookmark"></i>
        </button>
        `;
    } else {
        return `
        <button class="icon-button" onclick="createBookmark(${post.id})">
            <i class="fa-regular fa-bookmark"></i>
        </button>
        `;
    }
}

const postToHtml = post => {

    const numComments = post.comments.length;
    const newestComment = post.comments[numComments - 1];
    
    if(numComments > 1) {
        showComments = `<section id="view-all-comments" onclick="openModal(${post.id})"> <button class="button">View all ${numComments} comments</button></section>
        <p>
            <strong>${newestComment.user.username}</strong> 
            ${newestComment.text}
        </p>`;
    } else {
        showComments = `<p>
            <strong>${newestComment.user.username}</strong> 
            ${newestComment.text}
        </p>
        `
    }

    return `
    <div class="header">
    <h3>${post.user.username}</h3>
    <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
</div>
<img src="${post.image_url}" alt="sigh" width="300" height="300">
<div class="info">
    <div class="buttons">
        <div>
            ${getLikeButton(post)}
            <button class="icon-button"><i class="far fa-comment"></i></button>
            <button class="icon-button"><i class="far fa-paper-plane"></i></button>
        </div>
        <div>
            ${getBookmarkButton(post)}
        </div>
    </div>
    <p class="likes"><strong>${post.likes.length} likes</strong></p>
    <div class="caption">
        <p>
            <strong>${post.user.username}</strong> 
            ${post.caption}
        </p>
    </div>
    <div class="comments">
        ${showComments}
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

const openModal = (id) => {
    const modalElement = document.querySelector('.modal-bg');

    console.log('pls work');
    // shows the modal:
    modalElement.classList.remove('hidden');

    // accessibility:
    modalElement.setAttribute('aria-hidden', 'false');

    // puts the focus on the "close" button:
    document.querySelector('.close').focus();

    modalInfo(id);
}

const closeModal = () => {
    const modalElement = document.querySelector('.modal-bg');

    // hides the modal:
    modalElement.classList.add('hidden');

    // accessibility:
    modalElement.setAttribute('aria-hidden', 'false');
}

const modalInfo = async (id) => {
    // UGHASDUFH RIGHT HERE
    const endpoint = `${rootURL}/api/posts/${id}`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Posts:', data);

    document.querySelector('.modal-body').innerHTML = 
    `<img class="fixed" src="${data.image_url}" />
    <section class="the-comments">
        <div class="top">
            <img src="${data.user.image_url}">
            <strong>${data.user.username}</strong>
            <p>
                ${data.caption}
            </p>
            <p class="timestamp">${data.display_time}</p>
        </div>
        <div class="row">
            <strong>${data.user.username}</strong>
            
        </div>
    </section>`;

    document.querySelector(".row").innerHTML = '';
    data.comments.forEach(modalComments);
}

const modalComments = (data) => {
    document.querySelector('.row').insertAdjacentHTML('beforeend',
    `
    <div>
    <p>
        <strong>${data.user.username}</strong> 
        ${data.text}
    </p>
    <p class="timestamp">${data.display_time}</p>
    </div>
    `
    )
}

// function ensures that if the tabbing gets to the end of the 
// modal, it will loop back up to the beginning of the modal:
document.addEventListener('focus', function(event) {

    const modalElement = document.querySelector('.modal-bg');
    console.log('focus');
    if (modalElement.getAttribute('aria-hidden') === 'false' && !modalElement.contains(event.target)) {
        console.log('back to top!');
        event.stopPropagation();
        document.querySelector('.close').focus();
    }
}, true);


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
}

/******************************************/
/* Invoke initPage to kick everything off */
/******************************************/
initPage();
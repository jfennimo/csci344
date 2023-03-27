/**
 * Your logic here (do it however you want).
 * 
 * The things you have to have:
 *    1. A function (i.e., "Event Handler") to initiate the search.
 *    2. Logic to take the user inputs to build the search query.
 *    3. Logic to send the search query to the relevant server.
 *    4. Logic to display the results to the screen.
 * 
 * Provider-specific instructions:
 *    1. If you choose Yelp, allow your user to input both a search term
 *       and a location.
 *          * See API Tutor for guidance: https://www.apitutor.org/
 *          * Sample query: https://www.apitutor.org/yelp/simple/v3/businesses/search?location=Asheville,%20NC&term=pizza
 * 
 *    2. If you choose Spotify, allow your user to specify both a search term 
 *       and a resource type (album, artist, or track).
 *          * See API Tutor for guidance: https://www.apitutor.org/
 *          * Sample query: https://www.apitutor.org/spotify/simple/v1/search?q=beyonce&type=track
 * 
 *    3. If you choose Twitter, allow your user to specify both a search term
 *       and a result_type (mixed, recent, or popular).
 *          * See API Tutor for guidance: https://www.apitutor.org/
 *          * Sample query: https://www.apitutor.org/twitter/simple/1.1/search/tweets.json?q=cats&result_type=popular
 */


// const rootURL="https://www.apitutor.org/spotify/simple/v1/search",showResults=async a=>{a.preventDefault();const e=document.querySelector("#term").value,t=document.querySelector("#resource_type").value;let n=`${rootURL}?q=${e}&type=${t}`;const o=await fetch(n),r=await o.json();let s;console.log(r),s="track"===t?r.map(dataToTrackCard).join(""):"artist"===t?r.map(dataToArtistCard).join(""):r.map(dataToAlbumCard).join(""),document.querySelector(".results").innerHTML="",document.querySelector(".results").insertAdjacentHTML("beforeend",s)},dataToTrackCard=a=>`<section class="card"><div class="pic" style="background-image: url('${a.album.image_url}')"></div><div class="info"> <h2>${a.name}</h2> <p>${a.artist.name}</p> <audio controls> <source src="${a.preview_url}" type="audio/mp3"> Your browser does not support the audio element. </audio></div></section>`,dataToArtistCard=a=>`<section class="card"><div class="pic" style="background-image: url('${a.image_url}')"></div><div class="info"> <h2>${a.name}</h2> <p>Popularity: <strong>${a.popularity}</strong></p> <a href="${a.spotify_url}">Listen on Spotify</a></div></section>`,dataToAlbumCard=a=>`<section class="card"><div class="pic album" style="background-image: url('${a.image_url}')"></div><div class="info"> <h2>${a.name}</h2> <p><a href="${a.spotify_url}">Listen on Spotify</a></p></div></section>`;

const rootURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// ?q=beyonce&type=artist

// + 1. Figure out what the user selected/ typed into the inputs:
// + 2. Build the URL String
// 3. Send the request off to the server.
// 4. Process and display the bata by looping through the results

const showResults = async (ev) => {
    console.log('clicked');
    const term = document.querySelector('#term').value;
    const resourceType = document.querySelector('#resource_type').value;
    console.log(term, resourceType);

    const endpoint = `${rootURL}?q=${term}&type=${resourceType}`;
    console.log(endpoint);

    const request = await fetch(endpoint);
    const jsonData = await request.json();

    console.log(jsonData);

    // if statement for resource type
    if (resourceType === "track") {
    const htmlOutput = jsonData.map(trackToHtml).join('');
    document.querySelector('#result').innerHTML = htmlOutput;
    }
    else if(resourceType === "artist") {
    const htmlOutput = jsonData.map(artistToHtml).join('');
    document.querySelector('#result').innerHTML = htmlOutput;
    }
    else if(resourceType === "album") {
    const htmlOutput = jsonData.map(albumToHtml).join('');
    document.querySelector('#result').innerHTML = htmlOutput;
    }

}

const trackToHtml = track => {
    return `
            <section class="track">
                <img src="${track.album.image_url}"/>
                <h2>${track.name}<h2/>
                <audio controls> <source src="${track.preview_url}" type="audio/mp3"></audio>
            </section>
    `
}

const artistToHtml = artist => {
    return `
            <section class="artist">
                <img src="${artist.image_url}" />
                <h2>${artist.name}<h2/>
                <p>Popularity: <strong>${artist.popularity}</strong></p>
                <a href="${artist.spotify_url}">Listen on Spotify</a>
            </section>
    `
}

const albumToHtml = album => {
    return `
            <section class="album">
                <img src="${album.image_url}" />
                <h2>${album.name}<h2/>
                <p><a href="${album.spotify_url}">Listen on Spotify</a></p>
             </section>
    `
}

// const trackToHtml = track => {
//     return `
//             <section class="track">
//                 <div class="pic" style="background-image: url('${track.album.image_url}')"></div>
//                 <div class="info"> <h2>${track.name}</h2>
//                 <p>${track.name}</p> <audio controls>
//                 <source src="${track.preview_url}" type="audio/mp3">
//                 Your browser does not support the audio element.
//                 </audio></div>
//             </section>
//     `
// }

// const artistToHtml = artist => {
//     return `
//             <section class="artist">
//                 <div class="pic" style="background-image: url('${artist.image_url}')"></div>
//                 <div class="info"> <h2>${artist.name}</h2> 
//                 <p>Popularity: <strong>${artist.popularity}</strong></p>
//                 <a href="${artist.spotify_url}">Listen on Spotify</a></div>
//             </section>
//     `
// }


// const albumToHtml = album => {
//     return `
//             <section class="album">
//                 <div class="pic album" style="background-image: url('${album.image_url}')"></div>
//                 <div class="info"> <h2>${album.name}</h2> 
//                 <p><a href="${album.spotify_url}">Listen on Spotify</a></p></div>
//             </section>
//     `
// }


// I'm sorry, I genuinely tried my best. I did the quiz review as well, I'm just low on overall practice.
// I'll try my best to get caught up over spring break.


// 1.A. Define getStatuses here:
//      Sample endpoint: 
//      https://www.apitutor.org/twitter/simple/1.1/search/tweets.json?q=cats&count=3 


// I've tried inserting my number of statuses variable in the arguments but I'm unsure what's wrong
const getStatuses = async (searchTerm, callback) => {

    const url = `https://www.apitutor.org/twitter/simple/1.1/search/tweets.json?q=${searchTerm}`;
    const count = `https://www.apitutor.org/twitter/simple/1.1/search/tweets.json?q=cats&${statuses}`;
    console.log(url);
    console.log(count);
    const response = await fetch(url);
    const response2 = await fetch(count);
    const data = await response.json();
    const data2 = await response2.json();

    console.log(data);
    console.log(data2);

    //...and when they return, invoke the callback function
    // with the returned data (list of tweets) as an argument.
    callback(data, data2);
}




// 1.B. Define getUserDetails here:
//      Sample endpoint: 
//      https://www.apitutor.org/twitter/1.1/users/show.json?screen_name=oprah


const getUserDetails = async (username) => {

    const url = `https://www.apitutor.org/twitter/1.1/users/show.json?screen_name=${username}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    return username;
}



/****************/
/* Testing Code */
/****************/

// Helper functions:
const pauseToBePolite = async () => {
    console.log('Pausing for half a second to be polite (and also because Twitter throttles requests)...');
    await new Promise(r => setTimeout(r, 500));
}

const testGetStatuses = async () => {
    await pauseToBePolite();
    console.log('Should display 10 statuses about flowers:', await getStatuses('flowers', 10));
    
    await pauseToBePolite();
    console.log('Should display 5 statuses about cats:', await getStatuses('cats', 5));
}

const testGetUserDetails = async () => {
    await pauseToBePolite();
    console.log('Should display Oprah:', await getUserDetails('oprah'));
    
    await pauseToBePolite();
    console.log('Should display UNCA Athletics:', await getUserDetails('UNCAvlBulldogs'));
}

// uncomment this line when you've finished with Q1A:
testGetStatuses() 

// uncomment this line when you've funished with Q1B:
testGetUserDetails()



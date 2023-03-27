const success = result => { 
    console.log('success:', result);
};

const failure = result => {
    console.log('failure:', result);
}

const doSomethingWithADelay = new Promise(age => {
    setTimeout(() => callback("done"), 1000);
});

doSomethingWithADelay
    .then(success);
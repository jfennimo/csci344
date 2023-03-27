// Part 1: Set up the helper functions:
// 1. Implement two filter functions (which should return either true or false):
//      * filterClassFull: to filter out the closed courses (if applicable)
//      * filterTermMatched: to only match courses relevant to the search term
// 2. Implement the dataToHTML function, which takes a course object as an
//    argument and returns an HTML string that represents the course.

// Part 2: Within the showData function, use the array's filter, map, join
//         methods, and any relevant DOM methods, to build the interface.
// 1. Use the array's built in "filter" method, which takes a filter
//    function as an argument and returns an array of objects that 
//    match the criteria.
//          * Note that you can chain filter functions together.
// 2. Use the array's built in "map" method to generate an array of 
//    HTML strings.
// 3. Join the array of strings on the empty string or new line character
//    to create one large HTML string.
// 4. Clear out the existing courses in the DOM and insert
//    the HTML string into the DOM.

const search = ev => {
    ev.preventDefault(); // overrides default button action

    // Get user's preferences:
    const searchTerm = document.querySelector('#search_term').value;
    const openOnly = document.querySelector('#is_open').checked;
    // Pass the user's preferences into the showData function
    showData(searchTerm, openOnly);
}

// Part 1.1a
const filterClassFull = course => {

    // holds if class is open or not
    const openOnly = document.querySelector('#is_open').checked;

     //returns open classes 
    if(openOnly){
        return course.Classification.Open
    }else {
        return true;
    }
    
}

// Part 1.1b
const filterTermMatched = course => {

    //holds search term and changes to lowercase
    const searchTerm = document.querySelector('#search_term').value.toLowerCase();

    //holds instructor name and changes to lowercase
   const instructor = course.Instructors[0].Name.toLowerCase();
    if (
        course.Title.toLowerCase().includes(searchTerm) ||
        instructor.includes(searchTerm)
    ) {
        return true;
    } else {
        return false;
    }
}


// Part 1.2
const dataToHTML = course => {
    const instructor = course.Instructors[0].Name; 
    let seatsAvailable = Math.max(course.EnrollmentMax - course.EnrollmentCurrent, 0);

    // HTML Templet 
    return `
            <section class="course">
                <h2> ${course.Code}: ${course.Title} </h2>
                <p>
                ${
                    seatsAvailable ? 
                    `<i class="fa-solid fa-circle-check"></i> Open` :
                     `<i class="fa-solid fa-circle-xmark"></i> Closed`
                }
                  &bull; 10498 &bull; Seats Available: ${Math.max(course.EnrollmentMax - course.EnrollmentCurrent, 0)}
                 </p>
                <p>
                 ${ course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
                 </p>
                <p><strong> ${instructor} </strong></p>

             </section>
             `;

            }

// class CoolArray extends Array {

//     mapChase(functionToApplyEachItemOfTheArray) {
//     const copy = [];
//     for (const item of this) {
//         const result = functionToApplyEachItemOfTheArray(item);
//         copy.push(result);
//     }
//     return copy;
//     }
// }

// function doubleNumber(num) {
//     return 2 + num;
// }
// function squareNumber(num) {
//     return num * num;
// }

// const testArray = new CoolArray(1, 2, 4, 7, 9, 11);
// console.log(testArray.length);
// console.log(testArray.mapChase(doubleNumber));
// console.log(testArray.mapChase(squareNumber));


// Part 2
const showData = (searchTerm, openOnly) => {
    console.log(searchTerm, openOnly);
    console.log(data); // imported from course-data.js
    // Your code here:
    
    /*
    1. filter out by search term
    2. filter out by whether open or closed
    3. take the matched courses and convert them all to an HTML array
    4. join that array of strings into one big megastring
    5. insert megastring into DOM
    */

    // behind the scenes, "filter" method is invoking the "filterTermMatched(item)"
    // function on every item in the array.

    const dataThatMatchesQuery = data.filter(filterTermMatched);
    console.log("List of Data Matching Query:", dataThatMatchesQuery);

    const onlyShowOpenClassesIfSpecified = dataThatMatchesQuery.filter(filterClassFull);
    console.log("List of Open Classes:", onlyShowOpenClassesIfSpecified);

    const listOfHTMLChunks= onlyShowOpenClassesIfSpecified.map(dataToHTML);
    console.log("List of Strings:", listOfHTMLChunks);

    const megaString = listOfHTMLChunks.join('\n');
    console.log(megaString);

    // Clear out the old results:
    document.querySelector('.courses').innerHTML = "";

    document.querySelector('.courses').insertAdjacentHTML('beforeend', megaString);

     // document.querySelector('.courses').insertAdjacentHTML(
    //     'beforeend', data.filter(
    //     filterTermMatched
    // ).filter(
    //     filterClassFull
    // ).map(
    //     dataToHTML
    // ).join('')
    // );
    
}

class SuperArray extends Array {

    map1(callback) {
        const newArray = [];
        for(let i = 0; i < this.length; i++) {

                // first argument is the current element in the array
                // second argument is the position
                // third argument is the array itself
                newArray.push (
                callback(this[i], i, this)
            )
        }
        return newArray;
    }

    filter1(callback) {
        // TODO
        const newArray = new SuperArray();

        for(let i = 0; i < this.length; i++) {

            // if it matches, add it to the array copy
            if(callback(this[i])) {
                // what do I add to the new array?
                newArray.push(this[i]);
            }
        }

        return newArray;
    }

    reduce1(callback) {
        // TODO
    }

}

function dataTransform(item) {
    return item ** 3;
}

const myArray = new SuperArray(1, 2, 3, 4, 5);
const newArray = myArray.map1();
console.log(newArray);

function isEven(item, idx, originalArray) {
    return item % 2 == 0;
}

function isEven(item, idx, originalArray) {
    return item % 2 == 1;
}

console.log("Actual:", myArray.filter1(isEven));
console.log("Expected:", [2, 4]);

console.log("Actual:", myArray.filter1(isOdd));
console.log("Expected:", [1, 3, 5]);

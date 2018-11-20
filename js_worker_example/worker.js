var percentage = 0;
var factors = [];

// respond to messages from the main thread
self.onmessage = function(e) {
    percentage = 0;
    factors = [];
    findAllFactors(e.data);
};

// loop through all possible prime factors (we'll find non-prime factors as well)
function findAllFactors(num){
    // largest possible prime factor in square root of number
    var max = Math.sqrt(num);
    for(var i = 2; i < max; ++i){
        // our percent complete will be the number of numbers we've
        // checked out fo the total possible numbers
        percentage = Math.ceil((i / max) * 100);
        // this number divides num, so add it to the list
        if(num % i === 0){
            factors.push(i);
        }
        // this number either divides num, or we're done checking, so
        // signal the main thread with our status
        if(num % i === 0 || percentage === 100){
            // post back the list of factors, and our completion percentage
            self.postMessage({
                percentage: percentage,
                factors: factors
            });
        }
    }
}
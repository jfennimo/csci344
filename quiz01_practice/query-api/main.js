const search = async () => {
    // modify this query
    const response = await fetch(`https://www.apitutor.org/yelp/simple/v3/businesses/search?location=Asheville,NC&term=tacos`);
    const restaurants = await response.json();
    console.log(restaurants);
}

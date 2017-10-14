var searchUrl = "https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty";
var reviewUrl = "https://api.airbnb.com/v2/reviews?client_id=3092nxybyb0otqw18e8nh5nty"
var options = {
    method: 'GET',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
        "Access-Control-Allow-Origin": "*"
    }
}

exports.LoadProperties = function(cityName, offset = 0) {
    let offsetStr = "";
    if(offset) {
        offsetStr = "&_offset=" + offset;
    }
    return fetch(searchUrl + "&" + "location=" + encodeURIComponent(cityName) + "&_limit=50" + offsetStr, options)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json.search_results;
        })
}

exports.LoadReviews = function(propertyId, offset = 0) {
    let offsetStr = "";
    if(offset) {
        offsetStr = "&_offset=" + offset;
    }
    return fetch(reviewUrl +"&listing_id=" + propertyId + "&role=all" + "&_limit=10" + offsetStr, options)
    .then(response => {
        return response.json();
    })
    .then(json => {
        return json.reviews;
    })
}
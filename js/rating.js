rating = function(index, rate){
    var show = document.getElementById("rating_" + index.toString());

    star = parseInt(rate, 10)
    show.innerHTML = rate;
    if(star <= 1)
        show.innerHTML = show.innerHTML + '<i class="fa fa-star" aria-hidden="true"></i>';
    else
        for(var i = 0; i < star; i++)
            show.innerHTML = show.innerHTML + '<i class="fa fa-star" aria-hidden="true"></i>';
}

module.exports = rating;
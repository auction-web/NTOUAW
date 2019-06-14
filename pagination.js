pagination = function(page){
    var show = document.getElementById("pagination");
    var show_2 = document.getElementById("pagination_bottom");

    var i = 0;
    if(page >= 2){
        show.innerHTML = ''
        show_2.innerHTML = ''

        for(i = Number(page) - 1; i < page + 3; i++){
            if(i == Number(page)){
                show.innerHTML = show.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="changepage(' + i + ')">0' + i + '.</a></li>'
                show_2.innerHTML = show_2.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="changepage(' + i + ')">0' + i + '.</a></li>'
            }
            else{
                show.innerHTML = show.innerHTML +　'<li class="page-item"><a class="page-link" onclick="changepage(' + i + ')">0' + i + '.</a></li>'
                show_2.innerHTML = show_2.innerHTML +　'<li class="page-item"><a class="page-link" onclick="changepage(' + i + ')">0' + i + '.</a></li>'
            }
        }
    }
    else{
        show.innerHTML = ''
        show_2.innerHTML = ''

        for(i = Number(page); i < page + 4; i++){
            if(i == Number(page)){
                show.innerHTML = show.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="changepage(' + i + ')">0' + i + '.</a></li>'
                show_2.innerHTML = show_2.innerHTML +　'<li class="page-item active"><a class="page-link" onclick="changepage(' + i + ')">0' + i + '.</a></li>'
            }
            else{
                show.innerHTML = show.innerHTML +　'<li class="page-item"><a class="page-link" onclick="changepage(' + i + ')">0' + i + '.</a></li>'
                show_2.innerHTML = show_2.innerHTML +　'<li class="page-item"><a class="page-link" onclick="changepage(' + i + ')">0' + i + '.</a></li>'
            }
        }
    }
}

module.exports = pagination;
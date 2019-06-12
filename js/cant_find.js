cant_find = function(page){
    var pagination = require("./pagination");

	if(!document.getElementById('single_product')){
 		var temp = document.getElementById('Products');
		temp.innerHTML = "<p>Can't Find</p>";
	}

	var show_1 = document.getElementById('Products');
	var div_1 = document.createElement("div");
	div_1.className = "pageNumber_down col-12 ";
	div_1.innerHTML = 
		'<div class="pageNumber_down col-12 ">' + 
        '<!-- Pagination -->' + 
        '<nav aria-label="navigation">' + 
            '<ul class="pagination justify-content-end mt-15" id = "pagination_bottom">' + 
                /*'<li class="page-item active"><a class="page-link" href="javascript:changepage(1);">01.</a></li>' + 
                '<li class="page-item"><a class="page-link" href="javascript:changepage(2);">02.</a></li>' + 
                '<li class="page-item"><a class="page-link" href="javascript:changepage(3);">03.</a></li>' + 
                '<li class="page-item"><a class="page-link" href="javascript:changepage(4);">04.</a></li>' + */
            '</ul>' + 
        '</nav>' + 
    '</div>';
    show_1.appendChild(div_1);

    pagination(Number(page));
}

module.exports = cant_find;
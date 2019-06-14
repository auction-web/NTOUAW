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
          
            '</ul>' + 
        '</nav>' + 
    '</div>';
    show_1.appendChild(div_1);

    pagination(Number(page));
}

module.exports = cant_find;
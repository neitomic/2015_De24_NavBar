(function(){

	$.get("menu", function(data, status){
		$("#demo-container").html(data);

		var html_code = document.getElementById("html-code");
        var formatted_html = html_beautify(data, { indent_size : 2, max_preserve_newlines: -1 });
        html_code.textContent = formatted_html;
        hljs.highlightBlock(html_code);

		var convertedHtml = replace(data,"a","div");
		$("#sortable-list").html(convertedHtml);
		$('.sortable').nestedSortable({
			forcePlaceholderSize: true,
			handle: 'div',
			helper:	'clone',
			items: 'li',
			opacity: .6,
			placeholder: 'placeholder',
			revert: 250,
			tabSize: 25,
			tolerance: 'pointer',
			toleranceElement: 'div',
			maxLevels: 3,
			listType: "ul",
			stop: function(){
				updateMenu();
			}
		});
	});

	$("#sortable-list").on("click","a", function(){
		$(this).parent().parent().remove();
		updateMenu();
	})

	$("#sortable-list").on("click",".menu", function(){
		$("#sortable-list .menu").not(this).removeClass("menu-active");
		$(this).toggleClass("menu-active");
	})

	$("#sidebar .input-group button").click(function(){
		var newMenu = $("#sidebar .input-group input[type=text]").val();
		var parent = $("#sortable-list .menu-active");
		if(parent.length > 0){
			if(parent.parent().find("ul").length > 0){
				var html = "<li><div href='#' class='menu'>"+newMenu+"<a href='#' class='pull-right'>X</a></div></li>";
				parent.parent().find("ul").eq(0).append(html);
			} else {
				var html = "<ul><li><div href='#' class='menu'>"+newMenu+"<a href='#' class='pull-right'>X</a></div></li></ul>";
				console.log(html);
				parent.parent().append(html);
			}
		} else {
			var html = "<li><div href='#' class='menu'>"+newMenu+"<a href='#' class='pull-right'>X</a></div></li>";
			$("ul.sortable").append(html);
		}
		updateMenu();
	})

	function updateMenu(){
		var rawHtml = $("#sortable-list").html();
		rawHtml = rawHtml.replace(" ui-sortable","").replace(' style="display: list-item;"','');
		var converted = replace(rawHtml,"div","a");
		$("#demo-container").html(converted);

		$.post(
			"menu",
			{
				"updated_menu": converted
			},
			function(data, status){
				console.log(data);
			}
			);
	}

	function replace(html, raw, replace){
		var tempElement = $(html);
		tempElement.find(".menu").removeClass("menu-active");
		tempElement.find(raw).replaceWith(function(){
			var replacement = $("<"+replace+">").html($(this).html());
			for (var i = 0; i < this.attributes.length; i++){
				replacement.attr(this.attributes[i].name, this.attributes[i].value);
			}
			return replacement;
		});
		if(tempElement.find(".menu a").length > 0){
			tempElement.find(".menu a").remove();
		} else {
			tempElement.find(".menu").append("<a href='#' class='pull-right'>X</a>");
		}
	// tempElement.find("li.has-sub").removeClass("has-sub");
	// tempElement.find("li > ul").parent().addClass("has-sub");
	return tempElement[0].outerHTML;
};

})()


(function(){

	$.get("menu", function(json, status){
        var data = $.parseJSON(json);
        updateEditor(data.html);

		var convertedHtml = replace(data.html,"a","div");
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
				updateHtml();
			}
		});
	});

	$("#sortable-list").on("click","a", function(){
		$(this).parent().parent().remove();
        updateHtml();
	});

	$("#sortable-list").on("click",".menu", function(){
		$("#sortable-list .menu").not(this).removeClass("menu-active");
		$(this).toggleClass("menu-active");
	});

	$("#sidebar .input-group button").click(function(){
		var newMenu = $("#sidebar .input-group input[type=text]").val();
		var parent = $("#sortable-list .menu-active");
		if(parent.length > 0){
			if(parent.parent().find("ul").length > 0){
				var html = "<li><div class='menu'>"+newMenu+"<a href='#' class='pull-right'><i class='fa fa-times'></i></a></div></li>";
				parent.parent().find("ul").eq(0).append(html);
			} else {
				var html = "<ul><li><div class='menu'>"+newMenu+"<a href='#' class='pull-right'><i class='fa fa-times'></i></a></div></li></ul>";
				console.log(html);
				parent.parent().append(html);
			}
		} else {
			var html = "<li><div class='menu'>"+newMenu+"<a href='#' class='pull-right'><i class='fa fa-times'></i></a></div></li>";
			$("ul.sortable").append(html);
		}
		updateHtml();
	});

	function updateHtml(){
		var rawHtml = $("#sortable-list").html();
		rawHtml = rawHtml.split(" ui-sortable").join("").split(' style="display: list-item;"').join('');
		var converted = replace(rawHtml,"div","a");
		updateEditor(converted);

		$.post(
			"menu/html",
			{
				"updated_html": converted
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
			tempElement.find(".menu").append("<a href='#' class='pull-right'><i class='fa fa-times'></i></a>");
		}
	// tempElement.find("li.has-sub").removeClass("has-sub");
	// tempElement.find("li > ul").parent().addClass("has-sub");
	return tempElement[0].outerHTML;
    }

    function updateEditor(html)
    {
        $("#demo-container").html(html);
        var html_code = document.getElementById("html-code");
        var formatted_html = html_beautify(html, { indent_size : 2, max_preserve_newlines: -1 });
        html_code.textContent = formatted_html;
        hljs.highlightBlock(html_code);
    }

})();


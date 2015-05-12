$.get("menu", function(data, status){
	$("#cssmenu").html(data);
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
		toleranceElement: '> div',
		maxLevels: 3,
		listType: "ul",
		relocate: function(){
			console.log("relocate");
			var rawHtml = $("#sortable-list").html();
			rawHtml = rawHtml.replace("ui-sortable","").replace('style="display: list-item;"','');
			var converted = replace(rawHtml,"div","a");
			$("#cssmenu").html(converted);

			$.post(
				"menu",
				{
					"updated_menu": converted
				},
				function(data, status){
					console.log(data);
				}
			)
		}
	});
});

function replace(html, raw, replace){
	var tempElement = $(html);
	tempElement.find(raw).replaceWith(function(){
		var replacement = $("<"+replace+">").html($(this).html());
		for (var i = 0; i < this.attributes.length; i++){
			replacement.attr(this.attributes[i].name, this.attributes[i].value);
		}
		return replacement;
	});
	return tempElement[0].outerHTML;
};
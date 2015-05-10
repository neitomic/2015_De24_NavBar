$.get("menu", function(data, status){
	$("#sortable-list").html(data);
	replace(".sortable","a","div");
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
		maxLevels: 4,
		listType: "ul",
		relocate: function(){
			console.log('Relocated item');
		}
	});
});

function replace(parent, raw, replace){
	$(""+parent+" "+raw).replaceWith(function() {
		var replacement = $("<"+replace+">").html($(this).html());
		for (var i = 0; i < this.attributes.length; i++){
			replacement.attr(this.attributes[i].name, this.attributes[i].value);
		}
		return replacement;
	});
};
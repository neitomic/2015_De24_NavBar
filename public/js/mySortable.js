$.get("menu", function(data, status){
	$("#sortable-list").html(data);
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
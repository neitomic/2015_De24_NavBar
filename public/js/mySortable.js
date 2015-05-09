$.get("menu", function(data, status){
	var json = data;
	printHtml(json.menu, $("#struct"));
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

function printHtml(json, parent){
	for(var i=0; i<json.length; i++){
		var html = "<li id='"+json[i].id+"'><div class='menu'>"+json[i].title+"</div></li>";
		parent.append(html);

		if(json[i].sub_menu !== undefined){
			$("#"+json[i].id).append("<ul id='subitem-"+json[i].id+"'></ul>");
			var par = $("#subitem-"+json[i].id);
			printHtml(json[i].sub_menu, par);
		}
	}
}
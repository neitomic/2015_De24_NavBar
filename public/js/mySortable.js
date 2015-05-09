$.get("menu", function(data, status){
    console.log(data);
	var json = data;
	printHtml(json, $("#struct"));
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
		change: function(){
			console.log('Relocated item');
		}
	});
});

function printHtml(json, parent){
	for(var i=0; i<json.length; i++){
		var html = "<li><div id='"+json[i].id+"' class='menu'>"+json[i].title+"</div></li>";
		parent.append(html);

		if(json[i].sub_menu.length>0){
			$("#"+json[i].id).parent().append("<ol id='subitem-"+json[i].id+"'></ol>");
			var par = $("#subitem-"+json[i].id);
			printHtml(json[i].sub_menu, par);
		}
	}
}
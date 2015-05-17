


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


function updatePreview(style) {

    mbHeight = style["menu-height"];
    //MENU BAR COLORS AND BORDERS	
    borderWidth = style["menu-border-width"];
    borderColor = style["menu-border-color"];
    borderStyle = style["menu-border-style"];
//MENU BAR CORNERS
    allRadius = style["menu-corner-radius"];
//MENU BAR BACKGROUND
    backgroundColor = style["menu-solid-background"];
    gradientStart = style["menu-gradient-start"];
    gradientEnd = style["menu-gradient-end"];
//MENU BAR BOX SHADOWS	
    shadowHOffset = style["menu-shadow-h-length"];
    shadowVOffset = style["menu-shadow-v-length"];
    shadowBlur = style["menu-shadow-blur-radius"];
    shadowColor = style["menu-shadow-color"];
//MENU BAR MARGINS PADDING
    Margintop = style["menu-margin-top"];
    Marginright = style["menu-margin-right"];
    Marginbottom = style["menu-margin-bottom"];
    Marginleft = style["menu-margin-left"];
    Paddingtop = style["menu-padding-top"];
    Paddingright = style["menu-padding-right"];
    Paddingbottom = style["menu-padding-bottom"];
    Paddingleft = style["menu-padding-left"];
//TOP MENU CORNERS
    topBRadius = style["top-corner-radius"];
//TOP MENU FONTS
    fontColortop = style["top-font-color"];
    fontSizetop = style["top-font-size"];
    fontWeighttop = style["top-font-weight"];
    fontStyletop = style["top-font-style"];
    fontNametop = style["top-font"];
//TOP MENU SHADOWS
    fontHtop = style["top-font-shadow-h-length"];
    fontVtop = style["top-font-shadow-v-length"];
    fontBtop = style["top-font-shadow-blur-radius"];
    fontShadowtop = style["top-font-shadow-color"];
//TOP MENU MARGINS PADDING
    topMargintop = style["top-margin-top"];
    topMarginright = style["top-margin-right"];
    topMarginbottom = style["top-margin-bottom"];
    topMarginleft = style["top-margin-left"];
    topPaddingtop = style["top-padding-top"];
    topPaddingright = style["top-padding-right"];
    topPaddingbottom = style["top-padding-bottom"];
    topPaddingleft = style["top-padding-left"];
//SUB MENU BORDERS	
    borderWidthsub = style["sub-border-width"];
    borderColorsub = style["sub-border-color"];
    borderStylesub = style["sub-border-style"];
    submenuWidth = style["sub-menu-width"];
//SUB BAR CORNERS
    allRadiussub = style["sub-corner-radius"];
//SUB MENU BACKGROUND
    backgroundColorsub = style["sub-solid-background"];
    gradientStartsub = style["sub-gradient-start"];
    gradientEndsub = style["sub-gradient-end"];
//SUB MENU SHADOWS BOX
    hShadowsub = style["sub-box-shadow-h-length"];
    vShadowsub = style["sub-box-shadow-v-length"];
    bShadowsub = style["sub-box-blur-radius"];
    colorShadowsub = style["sub-box-shadow-color"];
//SUB MENU FONTS
    fontColorsub = style["sub-font-color"];
    fontSizesub = style["sub-font-size"];
    fontWeightsub = style["sub-font-weight"];
    fontStylesub = style["sub-font-style"];
    fontNamesub = style["sub-font"];
//SUB MENU SHADOWS
    fontHsub = style["sub-font-shadow-h-length"];
    fontVsub = style["sub-font-shadow-v-length"];
    fontBsub = style["sub-font-shadow-blur-radius"];
    fontShadowsub = style["sub-font-shadow-color"];
//HOVER MENU SUB MENU
    textColorhover = style["sub-hover-text-color"];
    backgroundColorhover = style["sub-hover-solid-background"];
    gradientStarthover = style["sub-hover-gradient-start"];
    gradientEndhover = style["sub-hover-gradient-end"];
    fontHhover = style["sub-hover-font-shadow-h-length"];
    fontVhover = style["sub-hover-font-shadow-v-length"];
    fontBhover = style["sub-hover-font-shadow-blur-radius"];
    fontShadowhover = style["sub-hover-font-shadow-color"];
//HOVER MENU TOP MENU
    textColorhovertop = style["top-hover-text-color"];
    backgroundColorhovertop = style["top-hover-solid-color"];
    gradientStarthovertop = style["top-hover-gradient-start"];
    gradientEndhovertop = style["top-hover-gradient-end"];
    fontHhovertop = style[ "top-hover-font-shadow-h-length"];
    fontVhovertop = style["top-hover-font-shadow-v-length"];
    fontBhovertop = style["top-hover-font-shadow-blur-radius"];
    fontShadowhovertop = style["top-hover-font-shadow-color"];
//TOP HOVER BAR CORNERS
    Paddingtophover = style["top-hover-padding-top"];
    Paddingrighthover = style["top-hover-padding-right"];
    Paddingbottomhover = style["top-hover-padding-bottom"];
    Paddinglefthover = style["top-hover-padding-left"];
//SUB MENU PADDING
    subPaddingtop = style["sub-padding-top"];
    subPaddingright = style["sub-padding-right"];
    subPaddingbottom = style["sub-padding-bottom"];
    subPaddingleft = style["sub-padding-left"];
//STYLE CHANGE
//demoContainerDiv.style.backgroundColor=demoBackgroundColor;
//DROP-DOWN
    dropDownAdd = style["top-padding-top"];
    dropDownAddHover = style["top-hover-padding-top"];
    dropDownMinusHover = style["top-hover-padding-bottom"];

    defaultDrop = "18";
    newTop = +defaultDrop + +dropDownAdd + +dropDownAddHover + +dropDownMinusHover;


    this.css = '#demo-container #menu-bar {\n';
    this.css += '  width: 95%;\n';
    this.css += '  margin: ' + Margintop + ' ' + Marginright + ' ' + Marginbottom + ' ' + Marginleft + ';\n';
    this.css += '  padding: ' + Paddingtop + ' ' + Paddingright + ' ' + Paddingbottom + ' ' + Paddingleft + ';\n';
    this.css += '  height: ' + mbHeight + ';\n';
    this.css += '  line-height: 100%;\n';
    this.css += '  border-radius: ' + allRadius + ';\n';
    this.css += '  -webkit-border-radius: ' + allRadius + ';\n';
    this.css += '  -moz-border-radius: ' + allRadius + ';\n';
    this.css += '  box-shadow: ' + shadowHOffset + ' ' + shadowVOffset + ' ' + shadowBlur + ' ' + shadowColor + ';\n';
    this.css += '  -webkit-box-shadow: ' + shadowHOffset + ' ' + shadowVOffset + ' ' + shadowBlur + ' ' + shadowColor + ';\n';
    this.css += '  -moz-box-shadow: ' + shadowHOffset + ' ' + shadowVOffset + ' ' + shadowBlur + ' ' + shadowColor + ';\n';
    if (document.getElementById("solid-back").checked == true) {
        this.css += '  background: ' + backgroundColor + ';\n';
    } else {
        this.css += '  background: ' + backgroundColor + ';\n';
        this.css += '  background: linear-gradient(top,  ' + gradientStart + ',  ' + gradientEnd + ');\n';
        this.css += '  background: -ms-linear-gradient(top,  ' + gradientStart + ',  ' + gradientEnd + ');\n';
        this.css += '  background: -webkit-gradient(linear, left top, left bottom, from(' + gradientStart + '), to(' + gradientEnd + '));\n';
        this.css += '  background: -moz-linear-gradient(top,  ' + gradientStart + ',  ' + gradientEnd + ');\n';
    }
    this.css += '  border: ' + borderStyle + ' ' + borderWidth + ' ' + borderColor + ';\n';
    this.css += '  position:relative;\n';
    this.css += '  z-index:999;\n';
    this.css += '}\n';
    this.css += '#demo-container #menu-bar li {\n';
    this.css += '  margin: ' + topMargintop + ' ' + topMarginright + ' ' + topMarginbottom + ' ' + topMarginleft + ';\n';
    this.css += '  padding: ' + topPaddingtop + ' ' + topPaddingright + ' ' + topPaddingbottom + ' ' + topPaddingleft + ';\n';
    this.css += '  float: left;\n';
    this.css += '  position: relative;\n';
    this.css += '  list-style: none;\n';
    this.css += '}\n';
// main level link
    this.css += '#demo-container #menu-bar a {\n';
    this.css += '  font-weight: ' + fontWeighttop + ';\n';
    this.css += '  font-family: ' + fontNametop + ';\n';
    this.css += '  font-style: ' + fontStyletop + ';\n';
    this.css += '  font-size: ' + fontSizetop + ';\n';
    this.css += '  color: ' + fontColortop + ';\n';
    this.css += '  text-decoration: none;\n';
    this.css += '  display: block;\n';
    this.css += '  padding: ' + Paddingtophover + ' ' + Paddingrighthover + ' ' + Paddingbottomhover + ' ' + Paddinglefthover + ';\n';
    this.css += '  margin: 0;\n';
    this.css += '  margin-bottom: ' + topMarginbottom + ';\n';
    this.css += '  border-radius: ' + topBRadius + ';\n';
    this.css += '  -webkit-border-radius: ' + topBRadius + ';\n';
    this.css += '  -moz-border-radius: ' + topBRadius + ';\n';
    this.css += '  text-shadow: ' + fontHtop + ' ' + fontVtop + ' ' + fontBtop + ' ' + fontShadowtop + ';\n';
    this.css += '}\n';

    this.css += '#demo-container #menu-bar li ul li a {\n';
    this.css += '  margin: 0;\n';
    this.css += '}\n';

// main level link hover
    this.css += '#demo-container #menu-bar .active a, #demo-container #menu-bar li:hover > a {\n';
    if (document.getElementById("solid-back-hover-top").checked == true) {
        this.css += '  background: ' + backgroundColorhovertop + ';\n';
    } else {
        this.css += '  background: ' + backgroundColorhovertop + ';\n';
        this.css += '  background: linear-gradient(top,  ' + gradientStarthovertop + ',  ' + gradientEndhovertop + ');\n';
        this.css += '  background: -ms-linear-gradient(top,  ' + gradientStarthovertop + ',  ' + gradientEndhovertop + ');\n';
        this.css += '  background: -webkit-gradient(linear, left top, left bottom, from(' + gradientStarthovertop + '), to(' + gradientEndhovertop + '));\n';
        this.css += '  background: -moz-linear-gradient(top,  ' + gradientStarthovertop + ',  ' + gradientEndhovertop + ');\n';
    }
    this.css += '  color: ' + textColorhovertop + ';\n';
    this.css += '  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .2);\n';
    this.css += '  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .2);\n';
    this.css += '  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);\n';
    this.css += '  text-shadow: ' + fontHhovertop + ' ' + fontVhovertop + ' ' + fontBhovertop + ' ' + fontShadowhovertop + ';\n';
    this.css += '}\n';
// sub levels link hover
    this.css += '#demo-container #menu-bar ul li:hover a, #demo-container #menu-bar li:hover li a {\n';
    this.css += '  background: none;\n';
    this.css += '  border: none;\n';
    this.css += '  color: #666;\n';
    this.css += '  -box-shadow: none;\n';
    this.css += '  -webkit-box-shadow: none;\n';
    this.css += '  -moz-box-shadow: none;\n';
    this.css += '}\n';
    this.css += '#demo-container #menu-bar ul a:hover {\n';
    if (document.getElementById("solid-back-hover").checked == true) {
        this.css += '  background: ' + backgroundColorhover + ' !important;\n';
    } else {
        this.css += '  background: ' + backgroundColorhover + ' !important;\n';
        this.css += '  background: linear-gradient(top,  ' + gradientStarthover + ',  ' + gradientEndhover + ') !important;\n';
        this.css += '  background: -ms-linear-gradient(top,  ' + gradientStarthover + ',  ' + gradientEndhover + ') !important;\n';
        this.css += '  background: -webkit-gradient(linear, left top, left bottom, from(' + gradientStarthover + '), to(' + gradientEndhover + ')) !important;\n';
        this.css += '  background: -moz-linear-gradient(top,  ' + gradientStarthover + ',  ' + gradientEndhover + ') !important;\n';
    }
    this.css += '  color: ' + textColorhover + ' !important;\n';
    this.css += '  border-radius: 0;\n'
    this.css += '  -webkit-border-radius: 0;\n';
    this.css += '  -moz-border-radius: 0;\n';
    this.css += '  text-shadow: ' + fontHhover + ' ' + fontVhover + ' ' + fontBhover + ' ' + fontShadowhover + ';\n';
    this.css += '}\n';
// level 2 list
    this.css += '#demo-container #menu-bar li:hover > ul {\n';
    this.css += '  display: block;\n';
    this.css += '}\n';
    this.css += '#demo-container #menu-bar ul {\n';
    if (document.getElementById("solid-back-sub").checked == true) {
        this.css += '  background: ' + backgroundColorsub + ';\n';
    } else {
        this.css += '  background: ' + backgroundColorsub + ';\n';
        this.css += '  background: linear-gradient(top,  ' + gradientStartsub + ',  ' + gradientEndsub + ');\n';
        this.css += '  background: -ms-linear-gradient(top,  ' + gradientStartsub + ',  ' + gradientEndsub + ');\n';
        this.css += '  background: -webkit-gradient(linear, left top, left bottom, from(' + gradientStartsub + '), to(' + gradientEndsub + '));\n';
        this.css += '  background: -moz-linear-gradient(top,  ' + gradientStartsub + ',  ' + gradientEndsub + ');\n';
    }
    this.css += '  display: none;\n';
    this.css += '  margin: 0;\n';
    this.css += '  padding: 0;\n';
    this.css += '  width: ' + submenuWidth + ';\n';
    this.css += '  position: absolute;\n';
    this.css += '  top: ' + newTop + 'px;\n';
    this.css += '  left: 0;\n';
    this.css += '  border: ' + borderStylesub + ' ' + borderWidthsub + ' ' + borderColorsub + ';\n';
    this.css += '  border-radius: ' + allRadiussub + ';\n';
    this.css += '  -webkit-border-radius: ' + allRadiussub + ';\n';
    this.css += '  -moz-border-radius: ' + allRadiussub + ';\n';
    this.css += '  -webkit-box-shadow: ' + hShadowsub + ' ' + vShadowsub + ' ' + bShadowsub + ' ' + colorShadowsub + ';\n';
    this.css += '  -moz-box-shadow: ' + hShadowsub + ' ' + vShadowsub + ' ' + bShadowsub + ' ' + colorShadowsub + ';\n';
    this.css += '  box-shadow: ' + hShadowsub + ' ' + vShadowsub + ' ' + bShadowsub + ' ' + colorShadowsub + ';\n';
    this.css += '}\n';
// dropdown
    this.css += '#demo-container #menu-bar ul li {\n';
    this.css += '  float: none;\n';
    this.css += '  margin: 0;\n';
    this.css += '  padding: 0;\n';
    this.css += '}\n';
    this.css += '#demo-container #menu-bar ul a {\n';
    this.css += '  padding:' + subPaddingtop + ' ' + subPaddingright + ' ' + subPaddingbottom + ' ' + subPaddingleft + ';\n';
    this.css += '  color:' + fontColorsub + ' !important;\n';
    this.css += '  font-size:' + fontSizesub + ';\n';
    this.css += '  font-style:' + fontStylesub + ';\n';
    this.css += '  font-family:' + fontNamesub + ';\n';
    this.css += '  font-weight: ' + fontWeightsub + ';\n';
    this.css += '  text-shadow: ' + fontHsub + ' ' + fontVsub + ' ' + fontBsub + ' ' + fontShadowsub + ';\n';
    this.css += '}\n';
// rounded corners for first and last child
    this.css += '#demo-container #menu-bar ul li:first-child > a {\n';
    this.css += '  border-top-left-radius: ' + allRadiussub + ';\n';
    this.css += '  -webkit-border-top-left-radius: ' + allRadiussub + ';\n';
    this.css += '  -moz-border-radius-topleft: ' + allRadiussub + ';\n';
    this.css += '  border-top-right-radius: ' + allRadiussub + ';\n';
    this.css += '  -webkit-border-top-right-radius: ' + allRadiussub + ';\n';
    this.css += '  -moz-border-radius-topright: ' + allRadiussub + ';\n';
    this.css += '}\n';
    this.css += '#demo-container #menu-bar ul li:last-child > a {\n';
    this.css += '  border-bottom-left-radius: ' + allRadiussub + ';\n';
    this.css += '  -webkit-border-bottom-left-radius: ' + allRadiussub + ';\n';
    this.css += '  -moz-border-radius-bottomleft: ' + allRadiussub + ';\n';
    this.css += '  border-bottom-right-radius: ' + allRadiussub + ';\n';
    this.css += '  -webkit-border-bottom-right-radius: ' + allRadiussub + ';\n';
    this.css += '  -moz-border-radius-bottomright: ' + allRadiussub + ';\n';
    this.css += '}\n';
// properly align level 3 sub-menu
    this.css += '#demo-container #menu-bar ul li ul {\n';
    this.css += '  top: 0;\n';
    this.css += '  left: 99.5%;\n';
    this.css += '  z-index: 999;\n';
    this.css += '}\n';
// clearfix
    this.css += '#demo-container #menu-bar:after {\n';
    this.css += '  content: ".";\n';
    this.css += '  display: block;\n';
    this.css += '  clear: both;\n';
    this.css += '  visibility: hidden;\n';
    this.css += '  line-height: 0;\n';
    this.css += '  height: 0;\n';
    this.css += '}\n';
    this.css += '#demo-container #menu-bar {\n';
    this.css += '  display: inline-block;\n';
    this.css += '}\n';
    this.css += '  html[xmlns] #demo-container #menu-bar {\n';
    this.css += '  display: block;\n';
    this.css += '}\n';
    this.css += '* html #demo-container #menu-bar {\n';
    this.css += '  height: 1%;\n';
    this.css += '}';

    var css_code = document.getElementById("css-code");
    if (css_code.innerText) {
        css_code.innerText = this.css.replace(new RegExp('#demo-container', 'g'), '');
    } else {
        css_code.textContent = this.css.replace(new RegExp('#demo-container', 'g'), '');
    }
    //css_code.className = css_code.className.replace('\bprettyprinted\b', '');
    //prettyPrint();
    hljs.highlightBlock(css_code);

    $('style').remove();
    $('head').append('<style type="text/css">' + this.css + '</style>');
    return this.css;

}

function updateStyle (style) {
//MENU BAR COLORS AND BORDERS	
    borderWidth = document.getElementById("border-width").innerHTML + "px";
    borderColor = document.getElementById("bc-color").value;
    borderStyle = document.getElementById("border-style").value;
//MENU BAR CORNERS
    allRadius = document.getElementById("radius-value").innerHTML + "px";
//MENU BAR BACKGROUND
	if(document.getElementById("solid-back-sub").checked == true){
		backgroundMode = "solid";
	}else{
		backgroundMode = "gradient";
	}

    backgroundColor = document.getElementById("back-color").value;
    gradientStart = document.getElementById("start-color").value;
    gradientEnd = document.getElementById("end-color").value;
//MENU BAR BOX SHADOWS	
    shadowHOffset = document.getElementById("h-length-value").innerHTML + "px";
    shadowVOffset = document.getElementById("v-length-value").innerHTML + "px";
    shadowBlur = document.getElementById("b-length-value").innerHTML + "px";
    shadowColor = document.getElementById("s-color").value;
//MENU BAR MARGINS PADDING
    Margintop = document.getElementById("margin-top").innerHTML + "px";
    Marginright = document.getElementById("margin-right").innerHTML + "px";
    Marginbottom = document.getElementById("margin-bottom").innerHTML + "px";
    Marginleft = document.getElementById("margin-left").innerHTML + "px";
    Paddingtop = document.getElementById("padding-top").innerHTML + "px";
    Paddingright = document.getElementById("padding-right").innerHTML + "px";
    Paddingbottom = document.getElementById("padding-bottom").innerHTML + "px";
    Paddingleft = document.getElementById("padding-left").innerHTML + "px";
//TOP MENU CORNERS
    topBRadius = document.getElementById("radius-top").innerHTML + "px";
//TOP MENU FONTS
    fontColortop = document.getElementById("font-color-top").value;
    fontSizetop = document.getElementById("font-size-top").innerHTML + "px";
    fontWeighttop = document.getElementById("font-weight-top").value;
    fontStyletop = document.getElementById("font-style-top").value;
    fontNametop = document.getElementById("font-name-top").value;
//TOP MENU SHADOWS
    fontHtop = document.getElementById("h-length-top").innerHTML + "px";
    fontVtop = document.getElementById("v-length-top").innerHTML + "px";
    fontBtop = document.getElementById("b-length-top").innerHTML + "px";
    fontShadowtop = document.getElementById("shadow-color-top").value;
//TOP MENU MARGINS PADDING
    topMargintop = document.getElementById("top-margin-top").innerHTML + "px";
    topMarginright = document.getElementById("top-margin-right").innerHTML + "px";
    topMarginbottom = document.getElementById("top-margin-bottom").innerHTML + "px";
    topMarginleft = document.getElementById("top-margin-left").innerHTML + "px";
    topPaddingtop = document.getElementById("top-padding-top").innerHTML + "px";
    topPaddingright = document.getElementById("top-padding-right").innerHTML + "px";
    topPaddingbottom = document.getElementById("top-padding-bottom").innerHTML + "px";
    topPaddingleft = document.getElementById("top-padding-left").innerHTML + "px";
//SUB MENU BORDERS	
    borderWidthsub = document.getElementById("border-width-sub").innerHTML + "px";
    borderColorsub = document.getElementById("bc-color-sub").value;
    borderStylesub = document.getElementById("border-style-sub").value;
    submenuWidth = document.getElementById("width-sub").innerHTML + "px";
//SUB BAR CORNERS
    allRadiussub = document.getElementById("radius-sub").innerHTML + "px";
//SUB MENU BACKGROUND
    backgroundColorsub = document.getElementById("back-color-sub").value;
    gradientStartsub = document.getElementById("start-color-sub").value;
    gradientEndsub = document.getElementById("end-color-sub").value;
//SUB MENU SHADOWS BOX
    hShadowsub = document.getElementById("h-shadow-sub").innerHTML + "px";
    vShadowsub = document.getElementById("v-shadow-sub").innerHTML + "px";
    bShadowsub = document.getElementById("b-shadow-sub").innerHTML + "px";
    colorShadowsub = document.getElementById("s-color-sub").value;
//SUB MENU FONTS
    fontColorsub = document.getElementById("font-color-sub").value;
    fontSizesub = document.getElementById("font-size-sub").innerHTML + "px";
    fontWeightsub = document.getElementById("font-weight-sub").value;
    fontStylesub = document.getElementById("font-style-sub").value;
    fontNamesub = document.getElementById("font-name-sub").value;
//SUB MENU SHADOWS
    fontHsub = document.getElementById("h-length-sub").innerHTML + "px";
    fontVsub = document.getElementById("v-length-sub").innerHTML + "px";
    fontBsub = document.getElementById("b-length-sub").innerHTML + "px";
    fontShadowsub = document.getElementById("shadow-color-sub").value;
//HOVER MENU SUB MENU
    textColorhover = document.getElementById("text-color-hover").value;
    backgroundColorhover = document.getElementById("back-color-hover").value;
    gradientStarthover = document.getElementById("start-color-hover").value;
    gradientEndhover = document.getElementById("end-color-hover").value;
    fontHhover = document.getElementById("h-shadow-hover").innerHTML + "px";
    fontVhover = document.getElementById("v-shadow-hover").innerHTML + "px";
    fontBhover = document.getElementById("b-shadow-hover").innerHTML + "px";
    fontShadowhover = document.getElementById("s-color-hover").value;
//HOVER MENU TOP MENU
    textColorhovertop = document.getElementById("text-color-hover-top").value;
    backgroundColorhovertop = document.getElementById("back-color-hover-top").value;
    gradientStarthovertop = document.getElementById("start-color-hover-top").value;
    gradientEndhovertop = document.getElementById("end-color-hover-top").value;
    fontHhovertop = document.getElementById("h-shadow-hover-top").innerHTML + "px";
    fontVhovertop = document.getElementById("v-shadow-hover-top").innerHTML + "px";
    fontBhovertop = document.getElementById("b-shadow-hover-top").innerHTML + "px";
    fontShadowhovertop = document.getElementById("s-color-hover-top").value;
//TOP HOVER BAR CORNERS
    Paddingtophover = document.getElementById("padding-top-hover").innerHTML + "px";
    Paddingrighthover = document.getElementById("padding-right-hover").innerHTML + "px";
    Paddingbottomhover = document.getElementById("padding-bottom-hover").innerHTML + "px";
    Paddinglefthover = document.getElementById("padding-left-hover").innerHTML + "px";
//SUB MENU PADDING
    subPaddingtop = document.getElementById("sub-padding-top").innerHTML + "px";
    subPaddingright = document.getElementById("sub-padding-right").innerHTML + "px";
    subPaddingbottom = document.getElementById("sub-padding-bottom").innerHTML + "px";
    subPaddingleft = document.getElementById("sub-padding-left").innerHTML + "px";
//STYLE CHANGE
//demoContainerDiv.style.backgroundColor=demoBackgroundColor;
//DROP-DOWN
    dropDownAdd = document.getElementById("top-padding-top").innerHTML;
    dropDownAddHover = document.getElementById("padding-top-hover").innerHTML;
    dropDownMinusHover = document.getElementById("padding-bottom-hover").innerHTML;

	style["menu-height"] = mbHeight ;
	//MENU BAR COLORS AND BORDERS	
	 style["menu-border-width"] = borderWidth ;
	 style["menu-border-color"] = borderColor ;
	 style["menu-border-style"] = borderStyle ;
	//MENU BAR CORNERS
	 style["menu-corner-radius"] = allRadius ;
	//MENU BAR BACKGROUND
	 style["menu-solid-background"] = backgroundColor ;
	 style["menu-gradient-start"] = gradientStart ;
	 style["menu-gradient-end"] = gradientEnd ;
	//MENU BAR BOX SHADOWS	
	 style["menu-shadow-h-length"] = shadowHOffset ;
	 style["menu-shadow-v-length"] = shadowVOffset ;
	 style["menu-shadow-blur-radius"] = shadowBlur ;
	 style["menu-shadow-color"] = shadowColor ;
	//MENU BAR MARGINS PADDING
	 style["menu-margin-top"] = Margintop ;
	 style["menu-margin-right"] = Marginright ;
	 style["menu-margin-bottom"] = Marginbottom ;
	 style["menu-margin-left"] = Marginleft ;
	 style["menu-padding-top"] = Paddingtop ;
	 style["menu-padding-right"] = Paddingright ;
	 style["menu-padding-bottom"] = Paddingbottom ;
	 style["menu-padding-left"] = Paddingleft ;
	//TOP MENU CORNERS
	 style["top-corner-radius"] = topBRadius ;
	//TOP MENU FONTS
	 style["top-font-color"] = fontColortop ;
	 style["top-font-size"] = fontSizetop ;
	 style["top-font-weight"] = fontWeighttop ;
	 style["top-font-style"] = fontStyletop ;
	 style["top-font"] = fontNametop ;
	//TOP MENU SHADOWS
	 style["top-font-shadow-h-length"] = fontHtop ;
	 style["top-font-shadow-v-length"] = fontVtop ;
	 style["top-font-shadow-blur-radius"] = fontBtop ;
	 style["top-font-shadow-color"] = fontShadowtop ;
	//TOP MENU MARGINS PADDING
	 style["top-margin-top"] = topMargintop ;
	 style["top-margin-right"] = topMarginright ;
	 style["top-margin-bottom"] = topMarginbottom ;
	 style["top-margin-left"] = topMarginleft ;
	 style["top-padding-top"] = topPaddingtop ;
	 style["top-padding-right"] = topPaddingright ;
	 style["top-padding-bottom"] = topPaddingbottom ;
	 style["top-padding-left"] = topPaddingleft ;
	//SUB MENU BORDERS	
	 style["sub-border-width"] = borderWidthsub ;
	 style["sub-border-color"] = borderColorsub ;
	 style["sub-border-style"] = borderStylesub ;
	 style["sub-menu-width"] = submenuWidth ;
	//SUB BAR CORNERS
	 style["sub-corner-radius"] = allRadiussub ;
	//SUB MENU BACKGROUND
	 style["sub-solid-background"] = backgroundColorsub ;
	 style["sub-gradient-start"] = gradientStartsub ;
	 style["sub-gradient-end"] = gradientEndsub ;
	//SUB MENU SHADOWS BOX
	 style["sub-box-shadow-h-length"] = hShadowsub ;
	 style["sub-box-shadow-v-length"] = vShadowsub ;
	 style["sub-box-blur-radius"] = bShadowsub ;
	 style["sub-box-shadow-color"] = colorShadowsub ;
	//SUB MENU FONTS
	 style["sub-font-color"] = fontColorsub ;
	 style["sub-font-size"] = fontSizesub ;
	 style["sub-font-weight"] = fontWeightsub ;
	 style["sub-font-style"] = fontStylesub ;
	 style["sub-font"] = fontNamesub ;
	//SUB MENU SHADOWS
	 style["sub-font-shadow-h-length"] = fontHsub ;
	 style["sub-font-shadow-v-length"] = fontVsub ;
	 style["sub-font-shadow-blur-radius"] = fontBsub ;
	 style["sub-font-shadow-color"] = fontShadowsub ;
	//HOVER MENU SUB MENU
	 style["sub-hover-text-color"] = textColorhover ;
	 style["sub-hover-solid-background"] = backgroundColorhover ;
	 style["sub-hover-gradient-start"] = gradientStarthover ;
	 style["sub-hover-gradient-end"] = gradientEndhover ;
	 style["sub-hover-font-shadow-h-length"] = fontHhover ;
	 style["sub-hover-font-shadow-v-length"] = fontVhover ;
	 style["sub-hover-font-shadow-blur-radius"] = fontBhover ;
	 style["sub-hover-font-shadow-color"] = fontShadowhover ;
	//HOVER MENU TOP MENU
	 style["top-hover-text-color"] = textColorhovertop ;
	 style["top-hover-solid-color"] = backgroundColorhovertop ;
	 style["top-hover-gradient-start"] = gradientStarthovertop ;
	 style["top-hover-gradient-end"] = gradientEndhovertop ;
	 style[ "top-hover-font-shadow-h-length"] = fontHhovertop ;
	 style["top-hover-font-shadow-v-length"] = fontVhovertop ;
	 style["top-hover-font-shadow-blur-radius"] = fontBhovertop ;
	 style["top-hover-font-shadow-color"] = fontShadowhovertop ;
	//TOP HOVER BAR CORNERS
	 style["top-hover-padding-top"] = Paddingtophover ;
	 style["top-hover-padding-right"] = Paddingrighthover ;
	 style["top-hover-padding-bottom"] = Paddingbottomhover ;
	 style["top-hover-padding-left"] = Paddinglefthover ;
	//SUB MENU PADDING
	 style["sub-padding-top"] = subPaddingtop ;
	 style["sub-padding-right"] = subPaddingright ;
	 style["sub-padding-bottom"] = subPaddingbottom ;
	 style["sub-padding-left"] = subPaddingleft ;
	//STYLE CHANGE
	//demoBackgroundColor = demoContainerDiv.style.backgroundColor;
	//DROP-DOWN
	 style["top-padding-top"] = dropDownAdd ;
	 style["top-hover-padding-top"] = dropDownAddHover ;
	 style["top-hover-padding-bottom"] = dropDownMinusHover ;

}
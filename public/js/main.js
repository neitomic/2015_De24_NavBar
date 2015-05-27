var menu_style;
var from_server = true;
var last_saved_html, last_saved_style;

PNotify.prototype.options.styling = "fontawesome";
PNotify.prototype.options.delay = 3000;

$("#demo-container").on("click", "a", function (e) {
    e.preventDefault();
});

$.get("menu", function (json, status) {
    var data = $.parseJSON(json);
    menu_style = $.parseJSON(data.style);

    //last_saved_html = beautify(data.html);
    //last_saved_style = data.style;
    //updateEditor(data.html);

    var convertedHtml = replace(data.html, "a", "div");
    $("#sortable-list").html(convertedHtml);

    updateHtml();
    updateUI();

    from_server = false;
    updateCSS();

    toggleSaving();

    $('.sortable').nestedSortable({
        forcePlaceholderSize: true,
        handle: 'div',
        helper: 'clone',
        items: 'li',
        opacity: .6,
        placeholder: 'placeholder',
        revert: 250,
        tabSize: 25,
        tolerance: 'pointer',
        toleranceElement: 'div',
        maxLevels: 3,
        listType: "ul",
        stop: function () {
            updateHtml();
        }
    });
});

$("#sortable-list").on("click", "a", function () {
    $(this).parent().parent().remove();
    updateHtml();
});

$("#sortable-list").on("click", ".menu", function () {
    $("#sortable-list .menu").not(this).removeClass("menu-active");
    $(this).toggleClass("menu-active");

    if ($(this).hasClass("menu-active")) {
        $("#item-title").val($(this).text());
        $("#item-link").val($(this).attr("href"));
    }
    else {
        $("#item-title").val("");
        $("#item-link").val("");
    }
});

$("#sidebar .input-group button").click(function () {
    var textBox = $("#sidebar .input-group input[type=text]");
    var newMenu = textBox.val();
    if (newMenu.trim()) {
        var parent = $("#sortable-list .menu-active");
        if (parent.length > 0) {
            if (parent.parent().find("ul").length > 0) {
                var html = "<li><div class='menu' href='#'>" + newMenu + "<a href='#' class='pull-right'><i class='fa fa-times'></i></a></div></li>";
                parent.parent().find("ul").eq(0).append(html);
            } else {
                var html = "<ul><li><div class='menu' href='#'>" + newMenu + "<a href='#' class='pull-right'><i class='fa fa-times'></i></a></div></li></ul>";
                console.log(html);
                parent.parent().append(html);
            }
        } else {
            var html = "<li><div class='menu' href='#'>" + newMenu + "<a href='#' class='pull-right'><i class='fa fa-times'></i></a></div></li>";
            $("ul.sortable").append(html);
        }
        updateHtml();
    }
    textBox.val("");
});

$(".slider").slider({
    change: function (event, ui) {
        if (from_server) {
            var id = $(this).attr('id');
            id = id.replace('slider_', '');
            $("#" + id).text(ui.value);
        }
        updatePreview();
    }
});

$("#item-title,#item-link").change(function () {
    var active_menu = $("#sortable-list .menu-active").first();
    var textBox = $(this);
    var id = textBox.attr("id");
    var value = textBox.val().trim();
    if (id === "item-title") {
        if (value) {
            active_menu.html(value + "<a href='#' class='pull-right'><i class='fa fa-times'></i></a>");
        }
        textBox.val(value);
    } else if (id === "item-link") {
        if (value) {
            active_menu.attr("href", value);
            textBox.val(value);
        } else {
            active_menu.attr("href", "#");
            textBox.val("#");
        }
    }
    updateHtml();
});

function save() {
    var structureHtml = $("#sortable-list").html();
    var html = toPreviewHtml(structureHtml, true);
    var style = JSON.stringify(menu_style);

    $("#btn-save").html("<i class='fa fa-spinner fa-pulse'></i> Saving...");

    $.post("menu",
        {
            "updated_html": html,
            "updated_style": style
        },
        function (data, status) {
            if (status == "success") {
                last_saved_html = toPreviewHtml(structureHtml);
                last_saved_style = style;
                new PNotify({
                    text: "Your menu is successfully saved to the database.",
                    type: "success",
                    animate_speed: "fast"
                });
            }
            else {
                new PNotify({
                    text: "Some errors occurred while we saving your menu. Please try again later.",
                    type: "error",
                    animate_speed: "fast"
                });
            }
            $("#btn-save").html("<i class='fa fa-save'></i> Save");
            toggleSaving();
        }
    );
}

function updateHtml() {
    var structureHtml = $("#sortable-list");
    structureHtml.find("ul:not(:has(li))").remove();
    structureHtml.find(".has-sub").removeClass("has-sub");
    structureHtml.find("li:has(ul)").addClass("has-sub");

    //var structHtml = $("#sortable-list").html();
    //structHtml = structHtml.split(" ui-sortable").join("").split(' style="display: list-item;"').join('');
    //var converted = replace(rawHtml, "div", "a");
    //updateEditor(converted);

    var previewHtml = toPreviewHtml(structureHtml.html());
    //previewHtml = beautify(previewHtml);
    var htmlCode = document.getElementById("html-code");
    htmlCode.textContent = previewHtml;
    hljs.highlightBlock(htmlCode);

    var demoContainer = $("#demo-container");
    demoContainer.html(previewHtml);
    demoContainer.find("#menu-bar > li.has-sub > a").append("&nbsp;&nbsp;<i class='fa fa-caret-down'></i>");
    demoContainer.find("#menu-bar ul > li.has-sub > a").append("<i class='fa fa-caret-right pull-right'></i>");

    if (from_server) {
        last_saved_html = previewHtml;
    }
    else {
        toggleSaving();
    }
}

function replace(html, raw, replace) {
    var tempElement = $(html);
    tempElement.find(".menu").removeClass("menu-active");
    tempElement.find(raw).replaceWith(function () {
        var replacement = $("<" + replace + ">").html($(this).html());
        for (var i = 0; i < this.attributes.length; i++) {
            replacement.attr(this.attributes[i].name, this.attributes[i].value);
        }
        return replacement;
    });
    if (tempElement.find(".menu a").length > 0) {
        tempElement.find(".menu a").remove();
    } else {
        tempElement.find(".menu").append("<a href='#' class='pull-right'><i class='fa fa-times'></i></a>");
    }
    // tempElement.find("li.has-sub").removeClass("has-sub");
    // tempElement.find("li > ul").parent().addClass("has-sub");
    return tempElement[0].outerHTML;
}

function updatePreview() {
    if (!from_server) {
        updateStyle();
        updateCSS();
    }
}

function updateEditor(html) {
    var html_code = document.getElementById("html-code");
    var formatted_html = html.split(' class="menu"').join("");
    formatted_html = formatted_html.split(' class="sortable"').join("");
    formatted_html = formatted_html.split(' class=""').join("");
    formatted_html = beautify(formatted_html);

    html_code.textContent = formatted_html;
    $("#demo-container").html(formatted_html);
    hljs.highlightBlock(html_code);
    toggleSaving();
}

function toPreviewHtml(structureHtml, forSaving) {
    if (forSaving === undefined)
        forSaving = false;

    var previewHtml = structureHtml.split(" ui-sortable").join("").split(' style="display: list-item;"').join('');
    previewHtml = replace(previewHtml, "div", "a");
    if (forSaving) {
        return beautify(previewHtml);
    }

    previewHtml = previewHtml.split(' class="menu"').join("");
    previewHtml = previewHtml.split(' class="sortable"').join("");
    previewHtml = previewHtml.split(' class=""').join("");
    return beautify(previewHtml);
}

function toggleSaving() {
    var html = toPreviewHtml($("#sortable-list").html());
    var savable = last_saved_html !== html || last_saved_style !== JSON.stringify(menu_style);
    $("#btn-save").prop("disabled", !savable);
}

function beautify(html) {
    return html_beautify(html, {indent_size: 2, max_preserve_newlines: -1});
}

function updateUI() {
    if (!from_server) return;

    //mbHeight = menu_style["menu-height"];
    //MENU BAR COLORS AND BORDERS
    borderWidth = menu_style["menu-border-width"];
    borderColor = menu_style["menu-border-color"];
    borderStyle = menu_style["menu-border-style"];
//MENU BAR CORNERS
    allRadius = menu_style["menu-corner-radius"];
//MENU BAR BACKGROUND
    backgroundColor = menu_style["menu-solid-background"];
    gradientStart = menu_style["menu-gradient-start"];
    gradientEnd = menu_style["menu-gradient-end"];
//MENU BAR BOX SHADOWS
    shadowHOffset = menu_style["menu-shadow-h-length"];
    shadowVOffset = menu_style["menu-shadow-v-length"];
    shadowBlur = menu_style["menu-shadow-blur-radius"];
    shadowColor = menu_style["menu-shadow-color"];
//MENU BAR MARGINS PADDING
    Margintop = menu_style["menu-margin-top"];
    Marginright = menu_style["menu-margin-right"];
    Marginbottom = menu_style["menu-margin-bottom"];
    Marginleft = menu_style["menu-margin-left"];
    Paddingtop = menu_style["menu-padding-top"];
    Paddingright = menu_style["menu-padding-right"];
    Paddingbottom = menu_style["menu-padding-bottom"];
    Paddingleft = menu_style["menu-padding-left"];
//TOP MENU CORNERS
    topBRadius = menu_style["top-corner-radius"];
//TOP MENU FONTS
    fontColortop = menu_style["top-font-color"];
    fontSizetop = menu_style["top-font-size"];
    fontWeighttop = menu_style["top-font-weight"];
    fontStyletop = menu_style["top-font-style"];
    fontNametop = menu_style["top-font"];
//TOP MENU SHADOWS
    fontHtop = menu_style["top-font-shadow-h-length"];
    fontVtop = menu_style["top-font-shadow-v-length"];
    fontBtop = menu_style["top-font-shadow-blur-radius"];
    fontShadowtop = menu_style["top-font-shadow-color"];
//TOP MENU MARGINS PADDING
    topMargintop = menu_style["top-margin-top"];
    topMarginright = menu_style["top-margin-right"];
    topMarginbottom = menu_style["top-margin-bottom"];
    topMarginleft = menu_style["top-margin-left"];
    topPaddingtop = menu_style["top-padding-top"];
    topPaddingright = menu_style["top-padding-right"];
    topPaddingbottom = menu_style["top-padding-bottom"];
    topPaddingleft = menu_style["top-padding-left"];
//SUB MENU BORDERS
    borderWidthsub = menu_style["sub-border-width"];
    borderColorsub = menu_style["sub-border-color"];
    borderStylesub = menu_style["sub-border-style"];
    submenuWidth = menu_style["sub-menu-width"];
//SUB BAR CORNERS
    allRadiussub = menu_style["sub-corner-radius"];
//SUB MENU BACKGROUND
    backgroundColorsub = menu_style["sub-solid-background"];
    gradientStartsub = menu_style["sub-gradient-start"];
    gradientEndsub = menu_style["sub-gradient-end"];
//SUB MENU SHADOWS BOX
    hShadowsub = menu_style["sub-box-shadow-h-length"];
    vShadowsub = menu_style["sub-box-shadow-v-length"];
    bShadowsub = menu_style["sub-box-blur-radius"];
    colorShadowsub = menu_style["sub-box-shadow-color"];
//SUB MENU FONTS
    fontColorsub = menu_style["sub-font-color"];
    fontSizesub = menu_style["sub-font-size"];
    fontWeightsub = menu_style["sub-font-weight"];
    fontStylesub = menu_style["sub-font-style"];
    fontNamesub = menu_style["sub-font"];
//SUB MENU SHADOWS
    fontHsub = menu_style["sub-font-shadow-h-length"];
    fontVsub = menu_style["sub-font-shadow-v-length"];
    fontBsub = menu_style["sub-font-shadow-blur-radius"];
    fontShadowsub = menu_style["sub-font-shadow-color"];
//HOVER MENU SUB MENU
    textColorhover = menu_style["sub-hover-text-color"];
    backgroundColorhover = menu_style["sub-hover-solid-background"];
    gradientStarthover = menu_style["sub-hover-gradient-start"];
    gradientEndhover = menu_style["sub-hover-gradient-end"];
    fontHhover = menu_style["sub-hover-font-shadow-h-length"];
    fontVhover = menu_style["sub-hover-font-shadow-v-length"];
    fontBhover = menu_style["sub-hover-font-shadow-blur-radius"];
    fontShadowhover = menu_style["sub-hover-font-shadow-color"];
//HOVER MENU TOP MENU
    textColorhovertop = menu_style["top-hover-text-color"];
    backgroundColorhovertop = menu_style["top-hover-solid-color"];
    gradientStarthovertop = menu_style["top-hover-gradient-start"];
    gradientEndhovertop = menu_style["top-hover-gradient-end"];
    fontHhovertop = menu_style["top-hover-font-shadow-h-length"];
    fontVhovertop = menu_style["top-hover-font-shadow-v-length"];
    fontBhovertop = menu_style["top-hover-font-shadow-blur-radius"];
    fontShadowhovertop = menu_style["top-hover-font-shadow-color"];
//TOP HOVER BAR CORNERS
    Paddingtophover = menu_style["top-hover-padding-top"];
    Paddingrighthover = menu_style["top-hover-padding-right"];
    Paddingbottomhover = menu_style["top-hover-padding-bottom"];
    Paddinglefthover = menu_style["top-hover-padding-left"];
//SUB MENU PADDING
    subPaddingtop = menu_style["sub-padding-top"];
    subPaddingright = menu_style["sub-padding-right"];
    subPaddingbottom = menu_style["sub-padding-bottom"];
    subPaddingleft = menu_style["sub-padding-left"];
//STYLE CHANGE
//demoContainerDiv.style.backgroundColor=demoBackgroundColor;
//DROP-DOWN
    dropDownAdd = menu_style["top-padding-top"];
    dropDownAddHover = menu_style["top-hover-padding-top"];
    dropDownMinusHover = menu_style["top-hover-padding-bottom"];

    defaultDrop = "18";
    newTop = +defaultDrop + +dropDownAdd + +dropDownAddHover + +dropDownMinusHover;

    menuBgMode = menu_style["menu-background-mode"];
    topHoverBgMode = menu_style["top-hover-background-mode"];
    subBgMode = menu_style["sub-background-mode"];
    subHoverBgMode = menu_style["sub-hover-background-mode"];

    //$("#slider_mb-height").slider("value", mbHeight);
//MENU BAR COLORS AND BORDERS
    $("#slider_border-width").slider("value", borderWidth);
    document.getElementById("bc-color").value = borderColor;
    document.getElementById("border-style").value = borderStyle;
//MENU BAR CORNERS
    $("#slider_radius-value").slider("value", allRadius);
//MENU BAR BACKGROUND
    document.getElementById("back-color").value = backgroundColor;
    document.getElementById("start-color").value = gradientStart;
    document.getElementById("end-color").value = gradientEnd;
//MENU BAR BOX SHADOWS
    $("#slider_h-length-value").slider("value", shadowHOffset);
    $("#slider_v-length-value").slider("value", shadowVOffset);
    $("#slider_b-length-value").slider("value", shadowBlur);
    document.getElementById("s-color").value = shadowColor;
//MENU BAR MARGINS PADDING
    $("#slider_margin-top").slider("value", Margintop);
    $("#slider_margin-right").slider("value", Marginright);
    $("#slider_margin-bottom").slider("value", Marginbottom);
    $("#slider_margin-left").slider("value", Marginleft);
    $("#slider_padding-top").slider("value", Paddingtop);
    $("#slider_padding-right").slider("value", Paddingright);
    $("#slider_padding-bottom").slider("value", Paddingbottom);
    $("#slider_padding-left").slider("value", Paddingleft);
//TOP MENU CORNERS
    $("#slider_radius-top").slider("value", topBRadius);
//TOP MENU FONTS
    document.getElementById("font-color-top").value = fontColortop;
    $("#slider_font-size-top").slider("value", fontSizetop);
    document.getElementById("font-weight-top").value = fontWeighttop;
    document.getElementById("font-style-top").value = fontStyletop;
    document.getElementById("font-name-top").value = fontNametop;
//TOP MENU SHADOWS
    $("#slider_h-length-top").slider("value", fontHtop);
    $("#slider_v-length-top").slider("value", fontVtop);
    $("#slider_b-length-top").slider("value", fontBtop);
    document.getElementById("shadow-color-top").value = fontShadowtop;
//TOP MENU MARGINS PADDING
    $("#slider_top-margin-top").slider("value", topMargintop);
    $("#slider_top-margin-right").slider("value", topMarginright);
    $("#slider_top-margin-bottom").slider("value", topMarginbottom);
    $("#slider_top-margin-left").slider("value", topMarginleft);
    $("#slider_top-padding-top").slider("value", topPaddingtop);
    $("#slider_top-padding-right").slider("value", topPaddingright);
    $("#slider_top-padding-bottom").slider("value", topPaddingbottom);
    $("#slider_top-padding-left").slider("value", topPaddingleft);
//SUB MENU BORDERS
    $("#slider_border-width-sub").slider("value", borderWidthsub);
    document.getElementById("bc-color-sub").value = borderColorsub;
    document.getElementById("border-style-sub").value = borderStylesub;
    $("#slider_width-sub").slider("value", submenuWidth);
    console.log($("#slider_width-sub").slider("value"));
    console.log(submenuWidth);
//SUB BAR CORNERS
    $("#slider_radius-sub").slider("value", allRadiussub);
//SUB MENU BACKGROUND
    document.getElementById("back-color-sub").value = backgroundColorsub;
    document.getElementById("start-color-sub").value = gradientStartsub;
    document.getElementById("end-color-sub").value = gradientEndsub;
//SUB MENU SHADOWS BOX
    $("#slider_h-shadow-sub").slider("value", hShadowsub);
    $("#slider_v-shadow-sub").slider("value", vShadowsub);
    $("#slider_b-shadow-sub").slider("value", bShadowsub);
    document.getElementById("s-color-sub").value = colorShadowsub;
//SUB MENU FONTS
    document.getElementById("font-color-sub").value = fontColorsub;
    $("#slider_font-size-sub").slider("value", fontSizesub);
    document.getElementById("font-weight-sub").value = fontWeightsub;
    document.getElementById("font-style-sub").value = fontStylesub;
    document.getElementById("font-name-sub").value = fontNamesub;
//SUB MENU SHADOWS
    $("#slider_h-length-sub").slider("value", fontHsub);
    $("#slider_v-length-sub").slider("value", fontVsub);
    $("#slider_b-length-sub").slider("value", fontBsub);
    document.getElementById("shadow-color-sub").value = fontShadowsub;
//HOVER MENU SUB MENU
    document.getElementById("text-color-hover").value = textColorhover;
    document.getElementById("back-color-hover").value = backgroundColorhover;
    document.getElementById("start-color-hover").value = gradientStarthover;
    document.getElementById("end-color-hover").value = gradientEndhover;
    $("#slider_h-shadow-hover").slider("value", fontHhover);
    $("#slider_v-shadow-hover").slider("value", fontVhover);
    $("#slider_b-shadow-hover").slider("value", fontBhover);
    document.getElementById("s-color-hover").value = fontShadowhover;
//HOVER MENU TOP MENU
    document.getElementById("text-color-hover-top").value = textColorhovertop;
    document.getElementById("back-color-hover-top").value = backgroundColorhovertop;
    document.getElementById("start-color-hover-top").value = gradientStarthovertop;
    document.getElementById("end-color-hover-top").value = gradientEndhovertop;
    $("#slider_h-shadow-hover-top").slider("value", fontHhovertop);
    $("#slider_v-shadow-hover-top").slider("value", fontVhovertop);
    $("#slider_b-shadow-hover-top").slider("value", fontBhovertop);
    document.getElementById("s-color-hover-top").value = fontShadowhovertop;
//TOP HOVER BAR CORNERS
    $("#slider_padding-top-hover").slider("value", Paddingtophover);
    $("#slider_padding-right-hover").slider("value", Paddingrighthover);
    $("#slider_padding-bottom-hover").slider("value", Paddingbottomhover);
    $("#slider_padding-left-hover").slider("value", Paddinglefthover);
//SUB MENU PADDING
    $("#slider_sub-padding-top").slider("value", subPaddingtop);
    $("#slider_sub-padding-right").slider("value", subPaddingright);
    $("#slider_sub-padding-bottom").slider("value", subPaddingbottom);
    $("#slider_sub-padding-left").slider("value", subPaddingleft);

    document.getElementById("solid-back").checked = menuBgMode == "solid";
    document.getElementById("gradient-back").checked = menuBgMode == "gradient";

    document.getElementById("solid-back-hover-top").checked = topHoverBgMode == "solid";
    document.getElementById("gradient-back-hover-top").checked = topHoverBgMode == "gradient";

    document.getElementById("solid-back-sub").checked = subBgMode == "solid";
    document.getElementById("gradient-back-sub").checked = subBgMode == "gradient";

    document.getElementById("solid-back-hover").checked = subHoverBgMode == "solid";
    document.getElementById("gradient-back-hover").checked = subHoverBgMode == "gradient";

    last_saved_style = JSON.stringify(menu_style);
}

function updateCSS() {
    if (typeof menu_style == "undefined" || from_server)
        return;

    //mbHeight = menu_style["menu-height"] + "px";
    //MENU BAR COLORS AND BORDERS
    borderWidth = menu_style["menu-border-width"] + "px";
    borderColor = menu_style["menu-border-color"];
    borderStyle = menu_style["menu-border-style"];
//MENU BAR CORNERS
    allRadius = menu_style["menu-corner-radius"] + "px";
//MENU BAR BACKGROUND
    backgroundColor = menu_style["menu-solid-background"];
    gradientStart = menu_style["menu-gradient-start"];
    gradientEnd = menu_style["menu-gradient-end"];
//MENU BAR BOX SHADOWS
    shadowHOffset = menu_style["menu-shadow-h-length"] + "px";
    shadowVOffset = menu_style["menu-shadow-v-length"] + "px";
    shadowBlur = menu_style["menu-shadow-blur-radius"] + "px";
    shadowColor = menu_style["menu-shadow-color"];
//MENU BAR MARGINS PADDING
    Margintop = menu_style["menu-margin-top"] + "px";
    Marginright = menu_style["menu-margin-right"] + "px";
    Marginbottom = menu_style["menu-margin-bottom"] + "px";
    Marginleft = menu_style["menu-margin-left"] + "px";
    Paddingtop = menu_style["menu-padding-top"] + "px";
    Paddingright = menu_style["menu-padding-right"] + "px";
    Paddingbottom = menu_style["menu-padding-bottom"] + "px";
    Paddingleft = menu_style["menu-padding-left"] + "px";
//TOP MENU CORNERS
    topBRadius = menu_style["top-corner-radius"] + "px";
//TOP MENU FONTS
    fontColortop = menu_style["top-font-color"];
    fontSizetop = menu_style["top-font-size"] + "px";
    fontWeighttop = menu_style["top-font-weight"];
    fontStyletop = menu_style["top-font-style"];
    fontNametop = menu_style["top-font"];
//TOP MENU SHADOWS
    fontHtop = menu_style["top-font-shadow-h-length"] + "px";
    fontVtop = menu_style["top-font-shadow-v-length"] + "px";
    fontBtop = menu_style["top-font-shadow-blur-radius"] + "px";
    fontShadowtop = menu_style["top-font-shadow-color"];
//TOP MENU MARGINS PADDING
    topMargintop = menu_style["top-margin-top"] + "px";
    topMarginright = menu_style["top-margin-right"] + "px";
    topMarginbottom = menu_style["top-margin-bottom"] + "px";
    topMarginleft = menu_style["top-margin-left"] + "px";
    topPaddingtop = menu_style["top-padding-top"] + "px";
    topPaddingright = menu_style["top-padding-right"] + "px";
    topPaddingbottom = menu_style["top-padding-bottom"] + "px";
    topPaddingleft = menu_style["top-padding-left"] + "px";
//SUB MENU BORDERS
    borderWidthsub = menu_style["sub-border-width"] + "px";
    borderColorsub = menu_style["sub-border-color"];
    borderStylesub = menu_style["sub-border-style"];
    submenuWidth = menu_style["sub-menu-width"] + "px";
//SUB BAR CORNERS
    allRadiussub = menu_style["sub-corner-radius"] + "px";
//SUB MENU BACKGROUND
    backgroundColorsub = menu_style["sub-solid-background"];
    gradientStartsub = menu_style["sub-gradient-start"];
    gradientEndsub = menu_style["sub-gradient-end"];
//SUB MENU SHADOWS BOX
    hShadowsub = menu_style["sub-box-shadow-h-length"] + "px";
    vShadowsub = menu_style["sub-box-shadow-v-length"] + "px";
    bShadowsub = menu_style["sub-box-blur-radius"] + "px";
    colorShadowsub = menu_style["sub-box-shadow-color"];
//SUB MENU FONTS
    fontColorsub = menu_style["sub-font-color"];
    fontSizesub = menu_style["sub-font-size"] + "px";
    fontWeightsub = menu_style["sub-font-weight"];
    fontStylesub = menu_style["sub-font-style"];
    fontNamesub = menu_style["sub-font"];
//SUB MENU SHADOWS
    fontHsub = menu_style["sub-font-shadow-h-length"] + "px";
    fontVsub = menu_style["sub-font-shadow-v-length"] + "px";
    fontBsub = menu_style["sub-font-shadow-blur-radius"] + "px";
    fontShadowsub = menu_style["sub-font-shadow-color"];
//HOVER MENU SUB MENU
    textColorhover = menu_style["sub-hover-text-color"];
    backgroundColorhover = menu_style["sub-hover-solid-background"];
    gradientStarthover = menu_style["sub-hover-gradient-start"];
    gradientEndhover = menu_style["sub-hover-gradient-end"];
    fontHhover = menu_style["sub-hover-font-shadow-h-length"] + "px";
    fontVhover = menu_style["sub-hover-font-shadow-v-length"] + "px";
    fontBhover = menu_style["sub-hover-font-shadow-blur-radius"] + "px";
    fontShadowhover = menu_style["sub-hover-font-shadow-color"];
//HOVER MENU TOP MENU
    textColorhovertop = menu_style["top-hover-text-color"];
    backgroundColorhovertop = menu_style["top-hover-solid-color"];
    gradientStarthovertop = menu_style["top-hover-gradient-start"];
    gradientEndhovertop = menu_style["top-hover-gradient-end"];
    fontHhovertop = menu_style["top-hover-font-shadow-h-length"] + "px";
    fontVhovertop = menu_style["top-hover-font-shadow-v-length"] + "px";
    fontBhovertop = menu_style["top-hover-font-shadow-blur-radius"] + "px";
    fontShadowhovertop = menu_style["top-hover-font-shadow-color"];
//TOP HOVER BAR CORNERS
    Paddingtophover = menu_style["top-hover-padding-top"] + "px";
    Paddingrighthover = menu_style["top-hover-padding-right"] + "px";
    Paddingbottomhover = menu_style["top-hover-padding-bottom"] + "px";
    Paddinglefthover = menu_style["top-hover-padding-left"] + "px";
//SUB MENU PADDING
    subPaddingtop = menu_style["sub-padding-top"] + "px";
    subPaddingright = menu_style["sub-padding-right"] + "px";
    subPaddingbottom = menu_style["sub-padding-bottom"] + "px";
    subPaddingleft = menu_style["sub-padding-left"] + "px";
//STYLE CHANGE
//demoContainerDiv.style.backgroundColor=demoBackgroundColor;
//DROP-DOWN
    dropDownAdd = menu_style["top-padding-top"] + "px";
    dropDownAddHover = menu_style["top-hover-padding-top"] + "px";
    dropDownMinusHover = menu_style["top-hover-padding-bottom"] + "px";

    defaultDrop = "18";
    newTop = +defaultDrop + +dropDownAdd + +dropDownAddHover + +dropDownMinusHover;

    menuBgMode = menu_style["menu-background-mode"];
    topHoverBgMode = menu_style["top-hover-background-mode"];
    subBgMode = menu_style["sub-background-mode"];
    subHoverBgMode = menu_style["sub-hover-background-mode"];

    this.css = '#demo-container #menu-bar {\n';
    this.css += '  width: 95%;\n';
    this.css += '  margin: ' + Margintop + ' ' + Marginright + ' ' + Marginbottom + ' ' + Marginleft + ';\n';
    this.css += '  padding: ' + Paddingtop + ' ' + Paddingright + ' ' + Paddingbottom + ' ' + Paddingleft + ';\n';
    //this.css += '  height: ' + mbHeight + ';\n';
    this.css += '  line-height: 100%;\n';
    this.css += '  border-radius: ' + allRadius + ';\n';
    this.css += '  -webkit-border-radius: ' + allRadius + ';\n';
    this.css += '  -moz-border-radius: ' + allRadius + ';\n';
    this.css += '  box-shadow: ' + shadowHOffset + ' ' + shadowVOffset + ' ' + shadowBlur + ' ' + shadowColor + ';\n';
    this.css += '  -webkit-box-shadow: ' + shadowHOffset + ' ' + shadowVOffset + ' ' + shadowBlur + ' ' + shadowColor + ';\n';
    this.css += '  -moz-box-shadow: ' + shadowHOffset + ' ' + shadowVOffset + ' ' + shadowBlur + ' ' + shadowColor + ';\n';
    if (menuBgMode == "solid") {
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
    if (topHoverBgMode == "solid") {
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
    //this.css += '  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);\n';
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
    if (subHoverBgMode == "solid") {
        this.css += '  background: ' + backgroundColorhover + ' !important;\n';
    } else {
        this.css += '  background: ' + backgroundColorhover + ' !important;\n';
        this.css += '  background: linear-gradient(top,  ' + gradientStarthover + ',  ' + gradientEndhover + ') !important;\n';
        this.css += '  background: -ms-linear-gradient(top,  ' + gradientStarthover + ',  ' + gradientEndhover + ') !important;\n';
        this.css += '  background: -webkit-gradient(linear, left top, left bottom, from(' + gradientStarthover + '), to(' + gradientEndhover + ')) !important;\n';
        this.css += '  background: -moz-linear-gradient(top,  ' + gradientStarthover + ',  ' + gradientEndhover + ') !important;\n';
    }
    this.css += '  color: ' + textColorhover + ' !important;\n';
    this.css += '  border-radius: 0;\n';
    this.css += '  -webkit-border-radius: 0;\n';
    this.css += '  -moz-border-radius: 0;\n';
    this.css += '  text-shadow: ' + fontHhover + ' ' + fontVhover + ' ' + fontBhover + ' ' + fontShadowhover + ';\n';
    this.css += '}\n';
// level 2 list
    this.css += '#demo-container #menu-bar li:hover > ul {\n';
    this.css += '  display: block;\n';
    this.css += '}\n';
    this.css += '#demo-container #menu-bar ul {\n';
    if (subBgMode == "solid") {
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
    hljs.highlightBlock(css_code);

    $('style').remove();
    $('head').append('<style type="text/css">' + this.css + '</style>');
    return this.css;
}

function updateStyle() {

    if (typeof menu_style == "undefined" || from_server)
        return;

    //mbHeight = +document.getElementById("mb-height").innerHTML;
//MENU BAR COLORS AND BORDERS
    borderWidth = +document.getElementById("border-width").innerHTML;
    borderColor = document.getElementById("bc-color").value;
    borderStyle = document.getElementById("border-style").value;
//MENU BAR CORNERS
    allRadius = +document.getElementById("radius-value").innerHTML;
//MENU BAR BACKGROUND
    backgroundColor = document.getElementById("back-color").value;
    gradientStart = document.getElementById("start-color").value;
    gradientEnd = document.getElementById("end-color").value;
//MENU BAR BOX SHADOWS
    shadowHOffset = +document.getElementById("h-length-value").innerHTML;
    shadowVOffset = +document.getElementById("v-length-value").innerHTML;
    shadowBlur = +document.getElementById("b-length-value").innerHTML;
    shadowColor = document.getElementById("s-color").value;
//MENU BAR MARGINS PADDING
    Margintop = +document.getElementById("margin-top").innerHTML;
    Marginright = +document.getElementById("margin-right").innerHTML;
    Marginbottom = +document.getElementById("margin-bottom").innerHTML;
    Marginleft = +document.getElementById("margin-left").innerHTML;
    Paddingtop = +document.getElementById("padding-top").innerHTML;
    Paddingright = +document.getElementById("padding-right").innerHTML;
    Paddingbottom = +document.getElementById("padding-bottom").innerHTML;
    Paddingleft = +document.getElementById("padding-left").innerHTML;
//TOP MENU CORNERS
    topBRadius = +document.getElementById("radius-top").innerHTML;
//TOP MENU FONTS
    fontColortop = document.getElementById("font-color-top").value;
    fontSizetop = +document.getElementById("font-size-top").innerHTML;
    fontWeighttop = document.getElementById("font-weight-top").value;
    fontStyletop = document.getElementById("font-style-top").value;
    fontNametop = document.getElementById("font-name-top").value;
//TOP MENU SHADOWS
    fontHtop = +document.getElementById("h-length-top").innerHTML;
    fontVtop = +document.getElementById("v-length-top").innerHTML;
    fontBtop = +document.getElementById("b-length-top").innerHTML;
    fontShadowtop = document.getElementById("shadow-color-top").value;
//TOP MENU MARGINS PADDING
    topMargintop = +document.getElementById("top-margin-top").innerHTML;
    topMarginright = +document.getElementById("top-margin-right").innerHTML;
    topMarginbottom = +document.getElementById("top-margin-bottom").innerHTML;
    topMarginleft = +document.getElementById("top-margin-left").innerHTML;
    topPaddingtop = +document.getElementById("top-padding-top").innerHTML;
    topPaddingright = +document.getElementById("top-padding-right").innerHTML;
    topPaddingbottom = +document.getElementById("top-padding-bottom").innerHTML;
    topPaddingleft = +document.getElementById("top-padding-left").innerHTML;
//SUB MENU BORDERS
    borderWidthsub = +document.getElementById("border-width-sub").innerHTML;
    borderColorsub = document.getElementById("bc-color-sub").value;
    borderStylesub = document.getElementById("border-style-sub").value;
    submenuWidth = +document.getElementById("width-sub").innerHTML;
//SUB BAR CORNERS
    allRadiussub = +document.getElementById("radius-sub").innerHTML;
//SUB MENU BACKGROUND
    backgroundColorsub = document.getElementById("back-color-sub").value;
    gradientStartsub = document.getElementById("start-color-sub").value;
    gradientEndsub = document.getElementById("end-color-sub").value;
//SUB MENU SHADOWS BOX
    hShadowsub = +document.getElementById("h-shadow-sub").innerHTML;
    vShadowsub = +document.getElementById("v-shadow-sub").innerHTML;
    bShadowsub = +document.getElementById("b-shadow-sub").innerHTML;
    colorShadowsub = document.getElementById("s-color-sub").value;
//SUB MENU FONTS
    fontColorsub = document.getElementById("font-color-sub").value;
    fontSizesub = +document.getElementById("font-size-sub").innerHTML;
    fontWeightsub = document.getElementById("font-weight-sub").value;
    fontStylesub = document.getElementById("font-style-sub").value;
    fontNamesub = document.getElementById("font-name-sub").value;
//SUB MENU SHADOWS
    fontHsub = +document.getElementById("h-length-sub").innerHTML;
    fontVsub = +document.getElementById("v-length-sub").innerHTML;
    fontBsub = +document.getElementById("b-length-sub").innerHTML;
    fontShadowsub = document.getElementById("shadow-color-sub").value;
//HOVER MENU SUB MENU
    textColorhover = document.getElementById("text-color-hover").value;
    backgroundColorhover = document.getElementById("back-color-hover").value;
    gradientStarthover = document.getElementById("start-color-hover").value;
    gradientEndhover = document.getElementById("end-color-hover").value;
    fontHhover = +document.getElementById("h-shadow-hover").innerHTML;
    fontVhover = +document.getElementById("v-shadow-hover").innerHTML;
    fontBhover = +document.getElementById("b-shadow-hover").innerHTML;
    fontShadowhover = document.getElementById("s-color-hover").value;
//HOVER MENU TOP MENU
    textColorhovertop = document.getElementById("text-color-hover-top").value;
    backgroundColorhovertop = document.getElementById("back-color-hover-top").value;
    gradientStarthovertop = document.getElementById("start-color-hover-top").value;
    gradientEndhovertop = document.getElementById("end-color-hover-top").value;
    fontHhovertop = +document.getElementById("h-shadow-hover-top").innerHTML;
    fontVhovertop = +document.getElementById("v-shadow-hover-top").innerHTML;
    fontBhovertop = +document.getElementById("b-shadow-hover-top").innerHTML;
    fontShadowhovertop = document.getElementById("s-color-hover-top").value;
//TOP HOVER BAR CORNERS
    Paddingtophover = +document.getElementById("padding-top-hover").innerHTML;
    Paddingrighthover = +document.getElementById("padding-right-hover").innerHTML;
    Paddingbottomhover = +document.getElementById("padding-bottom-hover").innerHTML;
    Paddinglefthover = +document.getElementById("padding-left-hover").innerHTML;
//SUB MENU PADDING
    subPaddingtop = +document.getElementById("sub-padding-top").innerHTML;
    subPaddingright = +document.getElementById("sub-padding-right").innerHTML;
    subPaddingbottom = +document.getElementById("sub-padding-bottom").innerHTML;
    subPaddingleft = +document.getElementById("sub-padding-left").innerHTML;
//STYLE CHANGE
//demoContainerDiv.style.backgroundColor=demoBackgroundColor;
//DROP-DOWN
//    dropDownAdd = +document.getElementById("top-padding-top").innerHTML;
//    dropDownAddHover = +document.getElementById("padding-top-hover").innerHTML;
//    dropDownMinusHover = +document.getElementById("padding-bottom-hover").innerHTML;

    menuBgMode = document.getElementById("solid-back").checked == true ? "solid" : "gradient";
    topHoverBgMode = document.getElementById("solid-back-hover-top").checked ? "solid" : "gradient";
    subBgMode = document.getElementById("solid-back-sub").checked ? "solid" : "gradient";
    subHoverBgMode = document.getElementById("solid-back-hover").checked ? "solid" : "gradient";

    //menu_style["menu-height"] = mbHeight;
    //MENU BAR COLORS AND BORDERS
    menu_style["menu-border-width"] = borderWidth;
    menu_style["menu-border-color"] = borderColor;
    menu_style["menu-border-style"] = borderStyle;
    //MENU BAR CORNERS
    menu_style["menu-corner-radius"] = allRadius;
    //MENU BAR BACKGROUND
    menu_style["menu-solid-background"] = backgroundColor;
    menu_style["menu-gradient-start"] = gradientStart;
    menu_style["menu-gradient-end"] = gradientEnd;
    //MENU BAR BOX SHADOWS
    menu_style["menu-shadow-h-length"] = shadowHOffset;
    menu_style["menu-shadow-v-length"] = shadowVOffset;
    menu_style["menu-shadow-blur-radius"] = shadowBlur;
    menu_style["menu-shadow-color"] = shadowColor;
    //MENU BAR MARGINS PADDING
    menu_style["menu-margin-top"] = Margintop;
    menu_style["menu-margin-right"] = Marginright;
    menu_style["menu-margin-bottom"] = Marginbottom;
    menu_style["menu-margin-left"] = Marginleft;
    menu_style["menu-padding-top"] = Paddingtop;
    menu_style["menu-padding-right"] = Paddingright;
    menu_style["menu-padding-bottom"] = Paddingbottom;
    menu_style["menu-padding-left"] = Paddingleft;
    //TOP MENU CORNERS
    menu_style["top-corner-radius"] = topBRadius;
    //TOP MENU FONTS
    menu_style["top-font-color"] = fontColortop;
    menu_style["top-font-size"] = fontSizetop;
    menu_style["top-font-weight"] = fontWeighttop;
    menu_style["top-font-style"] = fontStyletop;
    menu_style["top-font"] = fontNametop;
    //TOP MENU SHADOWS
    menu_style["top-font-shadow-h-length"] = fontHtop;
    menu_style["top-font-shadow-v-length"] = fontVtop;
    menu_style["top-font-shadow-blur-radius"] = fontBtop;
    menu_style["top-font-shadow-color"] = fontShadowtop;
    //TOP MENU MARGINS PADDING
    menu_style["top-margin-top"] = topMargintop;
    menu_style["top-margin-right"] = topMarginright;
    menu_style["top-margin-bottom"] = topMarginbottom;
    menu_style["top-margin-left"] = topMarginleft;
    menu_style["top-padding-top"] = topPaddingtop;
    menu_style["top-padding-right"] = topPaddingright;
    menu_style["top-padding-bottom"] = topPaddingbottom;
    menu_style["top-padding-left"] = topPaddingleft;
    //SUB MENU BORDERS
    menu_style["sub-border-width"] = borderWidthsub;
    menu_style["sub-border-color"] = borderColorsub;
    menu_style["sub-border-style"] = borderStylesub;
    menu_style["sub-menu-width"] = submenuWidth;
    //SUB BAR CORNERS
    menu_style["sub-corner-radius"] = allRadiussub;
    //SUB MENU BACKGROUND
    menu_style["sub-solid-background"] = backgroundColorsub;
    menu_style["sub-gradient-start"] = gradientStartsub;
    menu_style["sub-gradient-end"] = gradientEndsub;
    //SUB MENU SHADOWS BOX
    menu_style["sub-box-shadow-h-length"] = hShadowsub;
    menu_style["sub-box-shadow-v-length"] = vShadowsub;
    menu_style["sub-box-blur-radius"] = bShadowsub;
    menu_style["sub-box-shadow-color"] = colorShadowsub;
    //SUB MENU FONTS
    menu_style["sub-font-color"] = fontColorsub;
    menu_style["sub-font-size"] = fontSizesub;
    menu_style["sub-font-weight"] = fontWeightsub;
    menu_style["sub-font-style"] = fontStylesub;
    menu_style["sub-font"] = fontNamesub;
    //SUB MENU SHADOWS
    menu_style["sub-font-shadow-h-length"] = fontHsub;
    menu_style["sub-font-shadow-v-length"] = fontVsub;
    menu_style["sub-font-shadow-blur-radius"] = fontBsub;
    menu_style["sub-font-shadow-color"] = fontShadowsub;
    //HOVER MENU SUB MENU
    menu_style["sub-hover-text-color"] = textColorhover;
    menu_style["sub-hover-solid-background"] = backgroundColorhover;
    menu_style["sub-hover-gradient-start"] = gradientStarthover;
    menu_style["sub-hover-gradient-end"] = gradientEndhover;
    menu_style["sub-hover-font-shadow-h-length"] = fontHhover;
    menu_style["sub-hover-font-shadow-v-length"] = fontVhover;
    menu_style["sub-hover-font-shadow-blur-radius"] = fontBhover;
    menu_style["sub-hover-font-shadow-color"] = fontShadowhover;
    //HOVER MENU TOP MENU
    menu_style["top-hover-text-color"] = textColorhovertop;
    menu_style["top-hover-solid-color"] = backgroundColorhovertop;
    menu_style["top-hover-gradient-start"] = gradientStarthovertop;
    menu_style["top-hover-gradient-end"] = gradientEndhovertop;
    menu_style["top-hover-font-shadow-h-length"] = fontHhovertop;
    menu_style["top-hover-font-shadow-v-length"] = fontVhovertop;
    menu_style["top-hover-font-shadow-blur-radius"] = fontBhovertop;
    menu_style["top-hover-font-shadow-color"] = fontShadowhovertop;
    //TOP HOVER BAR CORNERS
    menu_style["top-hover-padding-top"] = Paddingtophover;
    menu_style["top-hover-padding-right"] = Paddingrighthover;
    menu_style["top-hover-padding-bottom"] = Paddingbottomhover;
    menu_style["top-hover-padding-left"] = Paddinglefthover;
    //SUB MENU PADDING
    menu_style["sub-padding-top"] = subPaddingtop;
    menu_style["sub-padding-right"] = subPaddingright;
    menu_style["sub-padding-bottom"] = subPaddingbottom;
    menu_style["sub-padding-left"] = subPaddingleft;
    //STYLE CHANGE
    //demoBackgroundColor = demoContainerDiv.style.backgroundColor;
    //DROP-DOWN
    // menu_style["top-padding-top"] = dropDownAdd ;
    // menu_style["top-hover-padding-top"] = dropDownAddHover ;
    // menu_style["top-hover-padding-bottom"] = dropDownMinusHover ;

    menu_style["menu-background-mode"] = menuBgMode;
    menu_style["top-hover-background-mode"] = topHoverBgMode;
    menu_style["sub-background-mode"] = subBgMode;
    menu_style["sub-hover-background-mode"] = subHoverBgMode;

    toggleSaving();
}

function resetMenu() {
    $.get("menu/default", function (json, status) {
        var data = $.parseJSON(json);
        menu_style = $.parseJSON(data.style);
        from_server = true;

        var convertedHtml = replace(data.html, "a", "div");
        $("#sortable-list").html(convertedHtml);

        updateHtml();
        updateUI();

        from_server = false;
        updateCSS();

        $('.sortable').nestedSortable({
             forcePlaceholderSize: true,
             handle: 'div',
             helper: 'clone',
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
}

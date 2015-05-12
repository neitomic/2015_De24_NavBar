function shadeColor(color, percent) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

//main color
$("#color-picker-background").change(
    function () {
        var newBackgroundColor = $(this).val();
        $("#cssmenu, #cssmenu a").css("background", newBackgroundColor);
    }
)

$("#color-picker-forceground").change(
    function () {
        var currBackgroundColor = $("#cssmenu").css("background");
        var newForceColor = $(this).val();
        var newForceHoverColor = shadeColor(newForceColor, 80);

        $("#cssmenu").css("border-bottom-color", newForceColor);
        $("#cssmenu ul ul").css("border-top-color", newForceColor);

        $("#cssmenu .active >a,#cssmenu ul ul li >a ").css("background", newForceColor);

        $("#cssmenu>ul>li").not("#cssmenu ul li.active").hover(
            function () {
                $(this).find(">a").css("background", newForceColor);
            },
            function () {
                $(this).find(">a").css("background", currBackgroundColor);
            }
        );

        $("#cssmenu ul  ul li").hover(
            function () {
                $(this).find(">a").css("background", newForceHoverColor);
            },
            function () {
                $(this).find(">a").css("background", newForceColor);
            }
        );
    }
);
//END: main menu

//BEGIN : main menu font-size, text color
$("#menu-font").change(
    function () {
        $("#cssmenu > ul > li > a").css("font-size", $(this).val() + "px");
    }
);

$("#menu-color").change(
    function () {
        $("#cssmenu > ul > li > a").css("color", $(this).val());
    }
);

$("#menu-hover").change(
    function () {
        var currColor = $("#cssmenu > ul > li > a").css("color");
        var newColor = $(this).val();
        $("#cssmenu > ul > li").hover(
            function () {
                $(this).find(">a").css("color", newColor);
            },
            function () {
                $(this).find(">a").css("color", currColor);
            }
        );
    }
);
//END : main menu font-size, text color


//========   for sub-menu  ============

$("#sub-font").change(
    function () {
        $("#cssmenu > ul > li >ul >li  a").css("font-size", $(this).val() + "px");
    }
);

$("#sub-color").change(
    function () {
        $("#cssmenu > ul > li >ul >li  a").css("color", $(this).val());
    }
);

$("#sub-hover").change(
    function () {
        var currColor = $("#cssmenu > ul > li >ul >li  a").css("color");
        var newColor = $(this).val();
        $("#cssmenu > ul > li >ul >li a").hover(
            function () {
                $(this).css("color", newColor);
            },
            function () {
                $(this).css("color", currColor);
            }
        );
    }
);

$("#sub-background").change(
    function () {
        var newSubBackground = $(this).val();
        var newSubHoverColor = shadeColor(newSubBackground, 80);
        $("#cssmenu ul ul li a").css("background", newSubBackground);
        $("#cssmenu ul ul li").hover(
            function () {
                $(this).find(">a").css("background", newSubHoverColor);
            },
            function () {
                $(this).find(">a").css("background", newSubBackground);
            }
        );
    }
);
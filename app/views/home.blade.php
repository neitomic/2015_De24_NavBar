@extends('layout')

@section('title')
    Ltweb2015
@stop

@section('custom-styles')
    <link rel="stylesheet" href="{{ asset('css/lib/font-awesome-4.3.0/css/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
    <link rel="stylesheet" href="{{ asset('css/menu-editor/fading.css') }}">
    <link rel="stylesheet" href="{{ asset('css/menu-editor/main.css') }}">
    <link rel="stylesheet" href="{{ asset('css/menu-editor/jquery-ui.css') }}">
    <link rel="stylesheet" href="{{ asset('css/lib/highlight/github.css') }}">
    <style type="text/css">
        #demo-container #menu-bar {
            width: 95%;
            margin: 0px 0px 0px 0px;
            padding: 7px 6px 4px 6px;
            height: 43px;
            line-height: 100%;
            border-radius: 0px;
            -webkit-border-radius: 0px;
            -moz-border-radius: 0px;
            box-shadow: 0px 0px 0px #666666;
            -webkit-box-shadow: 0px 0px 0px #666666;
            -moz-box-shadow: 0px 0px 0px #666666;
            background: #35748B;
            border: solid 0px #949494;
            position: relative;
            z-index: 999;
        }

        #demo-container #menu-bar li {
            margin: 0px 0px 6px 0px;
            padding: 0px 0px 0px 0px;
            float: left;
            position: relative;
            list-style: none;
        }

        #demo-container #menu-bar a {
            font-weight: bold;
            font-family: arial;
            font-style: normal;
            font-size: 12px;
            color: #E7E5E5;
            text-decoration: none;
            display: block;
            padding: 6px 20px 6px 20px;
            margin: 0;
            margin-bottom: 6px;
            border-radius: 0px;
            -webkit-border-radius: 0px;
            -moz-border-radius: 0px;
            text-shadow: 0px 0px 0px #549EFF;
        }

        #demo-container #menu-bar li ul li a {
            margin: 0;
        }

        #demo-container #menu-bar .active a, #demo-container #menu-bar li:hover > a {
            background: #0399D4;
            background: linear-gradient(top, #EBEBEB, #A1A1A1);
            background: -ms-linear-gradient(top, #EBEBEB, #A1A1A1);
            background: -webkit-gradient(linear, left top, left bottom, from(#EBEBEB), to(#A1A1A1));
            background: -moz-linear-gradient(top, #EBEBEB, #A1A1A1);
            color: #444444;
            -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            text-shadow: 0px 2px 3px #FFFFFF;
        }

        #demo-container #menu-bar ul li:hover a, #demo-container #menu-bar li:hover li a {
            background: none;
            border: none;
            color: #666;
            -box-shadow: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
        }

        #demo-container #menu-bar ul a:hover {
            background: #0399D4 !important;
            background: linear-gradient(top, #04ACEC, #0186BA) !important;
            background: -ms-linear-gradient(top, #04ACEC, #0186BA) !important;
            background: -webkit-gradient(linear, left top, left bottom, from(#04ACEC), to(#0186BA)) !important;
            background: -moz-linear-gradient(top, #04ACEC, #0186BA) !important;
            color: #FFFFFF !important;
            border-radius: 0;
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
            text-shadow: 2px 2px 3px #FFFFFF;
        }

        #demo-container #menu-bar li:hover > ul {
            display: block;
        }

        #demo-container #menu-bar ul {
            background: #DDDDDD;
            background: linear-gradient(top, #FFFFFF, #CFCFCF);
            background: -ms-linear-gradient(top, #FFFFFF, #CFCFCF);
            background: -webkit-gradient(linear, left top, left bottom, from(#FFFFFF), to(#CFCFCF));
            background: -moz-linear-gradient(top, #FFFFFF, #CFCFCF);
            display: none;
            margin: 0;
            padding: 0;
            width: 185px;
            position: absolute;
            top: 30px;
            left: 0;
            border: solid 1px #B4B4B4;
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            -webkit-box-shadow: 2px 2px 3px #222222;
            -moz-box-shadow: 2px 2px 3px #222222;
            box-shadow: 2px 2px 3px #222222;
        }

        #demo-container #menu-bar ul li {
            float: none;
            margin: 0;
            padding: 0;
        }

        #demo-container #menu-bar ul a {
            padding: 10px 0px 10px 15px;
            color: #424242 !important;
            font-size: 12px;
            font-style: normal;
            font-family: arial;
            font-weight: normal;
            text-shadow: 2px 2px 3px #FFFFFF;
        }

        #demo-container #menu-bar ul li:first-child > a {
            border-top-left-radius: 10px;
            -webkit-border-top-left-radius: 10px;
            -moz-border-radius-topleft: 10px;
            border-top-right-radius: 10px;
            -webkit-border-top-right-radius: 10px;
            -moz-border-radius-topright: 10px;
        }

        #demo-container #menu-bar ul li:last-child > a {
            border-bottom-left-radius: 10px;
            -webkit-border-bottom-left-radius: 10px;
            -moz-border-radius-bottomleft: 10px;
            border-bottom-right-radius: 10px;
            -webkit-border-bottom-right-radius: 10px;
            -moz-border-radius-bottomright: 10px;
        }

        #demo-container #menu-bar ul li ul {
            top: 0;
            left: 99.5%;
            z-index: 999;
        }

        #demo-container #menu-bar:after {
            content: ".";
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 0;
            height: 0;
        }

        #demo-container #menu-bar {
            display: inline-block;
        }

        html[xmlns] #demo-container #menu-bar {
            display: block;
        }

        * html #demo-container #menu-bar {
            height: 1%;
        }
    </style>
@stop

@section('content')
    <div class="row">
        <div class="col-sm-2" id="sidebar">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Add item">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button">
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>
            <!-- /input-group -->

            <div id="sortable-list"></div>
        </div>
        <div class="col-sm-10" id="content">
            <!-- Single Page -->
            <section class="page">

                <!--Start Generator-->
                <div class="examples">
                    <div class="topic">Menu Preview</div>
                    <div id="demo-container"></div>
                </div>

                <div class="examples">
                    <div class="topic">Menu Options</div>
                    <!-- Tabs Navigation -->
                    <ul id="editor-tabs" class="tabs nav nav-tabs">
                        <li class="active"><a href="#editor-tab1" data-toggle="tab"><i
                                        class="fa fa-pencil-square-o"></i> Menu Bar</a></li>
                        <li><a href="#editor-tab2" data-toggle="tab"><i class="fa fa-pencil-square-o"></i> Top Menu</a>
                        </li>
                        <li><a href="#editor-tab3" data-toggle="tab"><i class="fa fa-pencil-square-o"></i> Top Menu
                                Hover</a></li>
                        <li><a href="#editor-tab4" data-toggle="tab"><i class="fa fa-pencil-square-o"></i> Sub Menu</a>
                        </li>
                        <li><a href="#editor-tab5" data-toggle="tab"><i class="fa fa-pencil-square-o"></i> Sub Menu
                                Hover</a></li>
                    </ul>

                    <div id="editor-tab-contents" class="tab-content">
                        <div class="tab-pane fade in active" id="editor-tab1">
                            <br>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Corner Radius</h3>

                                        <p>
                                            <label for="radius-value">Radius All Corners:</label>
                                            <strong class="text-info"><span
                                                        id="radius-value">24</span>px</strong>
                                        </p>

                                        <div id="slider_radius-value" class="slider radius"></div>
                                    </div>
                                    <div class="content-box">
                                        <h3>Background</h3>
                                        <input type="radio" name="background-menu" value="solid"
                                               id="solid-back" onchange="updatePreview()"/><label
                                                for="solid-back">&nbsp;Solid Background</label>

                                        <p>
                                            <label for="back-color">Background Color : </label>
                                            <input class="form-control  color {hash:true}"
                                                   id="back-color" value="#8b8b8b" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                        <input type="radio" name="background-menu" value="gradient"
                                               id="gradient-back" checked="checked"
                                               onchange="updatePreview()"/><label for="gradient-back">
                                            &nbsp;Gradient Background</label>

                                        <p>
                                            <label for="start-color">Start Color : </label>
                                            <input class="form-control  color {hash:true}"
                                                   id="start-color" value="#a9a9a9" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>

                                        <p>
                                            <label for="end-color">End Color : </label>
                                            <input class="form-control  color {hash:true}"
                                                   id="end-color" value="#7a7a7a" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Colors and Border</h3>

                                        <p>
                                            <label for="border-width">Bottom Width:</label>
                                            <strong class="text-info"><span
                                                        id="border-width">1</span>px</strong>
                                        </p>

                                        <div id="slider_border-width" class="slider border"></div>
                                        <p>
                                            <label for="border-style">Border Style : </label>
                                            <select class="form-control" onchange="updatePreview()"
                                                    id="border-style">
                                                <option value="solid">Solid</option>
                                                <option value="dashed">Dashed</option>
                                                <option value="dotted">Dotted</option>
                                                <option value="double">Double</option>
                                                <option value="groove">Groove</option>
                                                <option value="inset">Inset</option>
                                                <option value="outset">Outset</option>
                                                <option value="ridge">Ridge</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label for="bc-color">Border Color : </label>
                                            <input class="form-control  color {hash:true}"
                                                   id="bc-color" value="#6d6d6d" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>

                                        <h3>Menu Bar Height</h3>

                                        <p>
                                            <label for="mb-height">Menu Bar Height : </label>
                                            <strong class="text-info"><span id="mb-height">40</span>px</strong>
                                        </p>

                                        <div id="slider_mb-height" class="slider height"></div>

                                    </div>
                                    <div class="content-box">
                                        <h3>Menu Bar Shadow</h3>

                                        <p>
                                            <label for="h-length-value">Horizontal Length:</label>
                                            <strong class="text-info"><span
                                                        id="h-length-value">2</span>px</strong>
                                        </p>

                                        <div id="slider_h-length-value" class="slider shadow"></div>
                                        <p>
                                            <label for="v-length-value">Vertical Length:</label>
                                            <strong class="text-info"><span
                                                        id="v-length-value">2</span>px</strong>
                                        </p>

                                        <div id="slider_v-length-value" class="slider shadow"></div>
                                        <p>
                                            <label for="b-length-value">Blur Radius:</label>
                                            <strong class="text-info"><span
                                                        id="b-length-value">3</span>px</strong>
                                        </p>

                                        <div id="slider_b-length-value" class="slider blur"></div>
                                        <p>
                                            <label for="s-color">Shadow Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="s-color" value="#666666" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Padding</h3>

                                        <p>
                                            <label for="padding-top">Padding Top:</label>
                                            <strong class="text-info"><span
                                                        id="padding-top">6</span>px</strong>
                                        </p>

                                        <div id="slider_padding-top" class="slider padding6"></div>
                                        <p>
                                            <label for="padding-right">Padding Right:</label>
                                            <strong class="text-info"><span
                                                        id="padding-right">6</span>px</strong>
                                        </p>

                                        <div id="slider_padding-right"
                                             class="slider padding6"></div>
                                        <p>
                                            <label for="padding-bottom">Padding Bottom:</label>
                                            <strong class="text-info"><span
                                                        id="padding-bottom">4</span>px</strong>
                                        </p>

                                        <div id="slider_padding-bottom"
                                             class="slider padding7"></div>
                                        <p>
                                            <label for="padding-left">Padding Left:</label>
                                            <strong class="text-info"><span
                                                        id="padding-left">6</span>px</strong>
                                        </p>

                                        <div id="slider_padding-left" class="slider padding6"></div>
                                    </div>
                                    <div class="content-box">
                                        <h3>Margins</h3>

                                        <p>
                                            <label for="margin-top">Margin Top:</label>
                                            <strong class="text-info"><span id="margin-top">0</span>px</strong>
                                        </p>

                                        <div id="slider_margin-top" class="slider padding"></div>
                                        <p>
                                            <label for="margin-right">Margin Right:</label>
                                            <strong class="text-info"><span
                                                        id="margin-right">0</span>px</strong>
                                        </p>

                                        <div id="slider_margin-right" class="slider padding"></div>
                                        <p>
                                            <label for="margin-bottom">Margin Bottom:</label>
                                            <strong class="text-info"><span
                                                        id="margin-bottom">0</span>px</strong>
                                        </p>

                                        <div id="slider_margin-bottom" class="slider padding"></div>
                                        <p>
                                            <label for="margin-left">Margin Left:</label>
                                            <strong class="text-info"><span
                                                        id="margin-left">0</span>px</strong>
                                        </p>

                                        <div id="slider_margin-left" class="slider padding"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="editor-tab2">
                            <br>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Fonts</h3>

                                        <p>
                                            <label for="font-name-top">Font : </label>
                                            <select class="form-control" onchange="updatePreview()"
                                                    id="font-name-top">
                                                <option value="arial">Arial</option>
                                                <option value="'arial black'">Arial Black</option>
                                                <option value="'comic sans ms'">Comic Sans MS
                                                </option>
                                                <option value="'courier new'">Courier New</option>
                                                <option value="georgia">Georgia</option>
                                                <option value="helvetica">Helvetica</option>
                                                <option value="impact">Impact</option>
                                                <option value="'times new roman'">Times New Roman
                                                </option>
                                                <option value="'trebuchet ms'">Trebuchet MS</option>
                                                <option value="verdana">Verdana</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label for="font-style-top">Font Style : </label>
                                            <select class="form-control" onchange="updatePreview()"
                                                    id="font-style-top">
                                                <option value="normal">Normal</option>
                                                <option value="italic">Italic</option>
                                                <option value="oblique">Oblique</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label for="font-weight-top">Font Weight : </label>
                                            <select class="form-control" onchange="updatePreview()"
                                                    id="font-weight-top">
                                                <option value="normal">Normal</option>
                                                <option selected="selected" value="bold">Bold
                                                </option>
                                                <option value="bolder">Bolder</option>
                                                <option value="lighter">Lighter</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label for="font-size-top">Font Size:</label>
                                            <strong class="text-info"><span
                                                        id="font-size-top">12</span>px</strong>
                                        </p>

                                        <div id="slider_font-size-top"
                                             class="slider fontsize"></div>
                                        <p>
                                            <label for="font-color-top">Font Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="font-color-top" value="#e7e5e5" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>

                                    </div>
                                    <div class="content-box">
                                        <h3>Font Shadow</h3>

                                        <p>
                                            <label for="h-length-top">Horizontal Length:</label>
                                            <strong class="text-info"><span
                                                        id="h-length-top">2</span>px</strong>
                                        </p>

                                        <div id="slider_h-length-top" class="slider shadow"></div>
                                        <p>
                                            <label for="v-length-top">Vertical Length:</label>
                                            <strong class="text-info"><span
                                                        id="v-length-top">2</span>px</strong>
                                        </p>

                                        <div id="slider_v-length-top" class="slider shadow"></div>
                                        <p>
                                            <label for="b-length-top">Blur Radius:</label>
                                            <strong class="text-info"><span
                                                        id="b-length-top">3</span>px</strong>
                                        </p>

                                        <div id="slider_b-length-top" class="slider blur"></div>
                                        <p>
                                            <label for="shadow-color-top">Shadow Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="shadow-color-top" value="#000000" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Padding</h3>

                                        <p>
                                            <label for="top-padding-top">Padding Top:</label>
                                            <strong class="text-info"><span
                                                        id="top-padding-top">0</span>px</strong>
                                        </p>

                                        <div id="slider_top-padding-top"
                                             class="slider padding"></div>
                                        <p>
                                            <label for="top-padding-right">Padding Right:</label>
                                            <strong class="text-info"><span
                                                        id="top-padding-right">6</span>px</strong>
                                        </p>

                                        <div id="slider_top-padding-right"
                                             class="slider padding6"></div>
                                        <p>
                                            <label for="top-padding-bottom">Padding Bottom:</label>
                                            <strong class="text-info"><span id="top-padding-bottom">0</span>px</strong>
                                        </p>

                                        <div id="slider_top-padding-bottom"
                                             class="slider padding"></div>
                                        <p>
                                            <label for="top-padding-left">Padding Left:</label>
                                            <strong class="text-info"><span
                                                        id="top-padding-left">6</span>px</strong>
                                        </p>

                                        <div id="slider_top-padding-left"
                                             class="slider padding6"></div>
                                    </div>
                                    <div class="content-box">
                                        <h3>Margins</h3>

                                        <p>
                                            <label for="top-margin-top">Margin Top:</label>
                                            <strong class="text-info"><span
                                                        id="top-margin-top">0</span>px</strong>
                                        </p>

                                        <div id="slider_top-margin-top"
                                             class="slider padding"></div>
                                        <p>
                                            <label for="top-margin-right">Margin Right:</label>
                                            <strong class="text-info"><span
                                                        id="top-margin-right">0</span>px</strong>
                                        </p>

                                        <div id="slider_top-margin-right"
                                             class="slider padding"></div>
                                        <p>
                                            <label for="top-margin-bottom">Margin Bottom:</label>
                                            <strong class="text-info"><span
                                                        id="top-margin-bottom">6</span>px</strong>
                                        </p>

                                        <div id="slider_top-margin-bottom"
                                             class="slider padding6"></div>
                                        <p>
                                            <label for="top-margin-left">Margin Left:</label>
                                            <strong class="text-info"><span
                                                        id="top-margin-left">0</span>px</strong>
                                        </p>

                                        <div id="slider_top-margin-left"
                                             class="slider padding"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Corner Radius</h3>

                                        <p>
                                            <label for="radius-top">Radius All Corners:</label>
                                            <strong class="text-info"><span
                                                        id="radius-top">10</span>px</strong>
                                        </p>

                                        <div id="slider_radius-top" class="slider radius1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="editor-tab3">
                            <br>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Hover Text Color</h3>

                                        <p>
                                            <label for="text-color-hover-top">Text Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="text-color-hover-top" value="#444444"
                                                   type="text" onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                    <div class="content-box">
                                        <h3>Background</h3>
                                        <input type="radio" name="background-hover-top"
                                               value="solid-hover-top" id="solid-back-hover-top"
                                               onchange="updatePreview()"/><label
                                                for="solid-back-hover-top">&nbsp;Solid
                                            Background</label>

                                        <p>
                                            <label for="back-color-hover-top">Background Color
                                                : </label>
                                            <input class="form-control  color {hash:true}"
                                                   id="back-color-hover-top" value="#0399d4"
                                                   type="text" onchange="updatePreview()"/>
                                        </p>
                                        <input type="radio" name="background-hover-top"
                                               value="gradient-hover-top"
                                               id="gradient-back-hover-top" checked="checked"
                                               onchange="updatePreview()"/><label
                                                for="gradient-back-hover-top">&nbsp;Gradient
                                            Background</label>

                                        <p>
                                            <label for="start-color-hover-top">Start Color
                                                : </label>
                                            <input class="form-control  color {hash:true}"
                                                   id="start-color-hover-top" value="#ebebeb"
                                                   type="text" onchange="updatePreview()"/>
                                        </p>

                                        <p>
                                            <label for="end-color-hover-top">End Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="end-color-hover-top" value="#a1a1a1"
                                                   type="text" onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Hover Font Shadow</h3>

                                        <p>
                                            <label for="h-shadow-hover-top">Horizontal
                                                Length:</label>
                                            <strong class="text-info"><span id="h-shadow-hover-top">2</span>px</strong>
                                        </p>

                                        <div id="slider_h-shadow-hover-top"
                                             class="slider shadow"></div>
                                        <p>
                                            <label for="v-shadow-hover-top">Vertical Length:</label>
                                            <strong class="text-info"><span id="v-shadow-hover-top">2</span>px</strong>
                                        </p>

                                        <div id="slider_v-shadow-hover-top"
                                             class="slider shadow"></div>
                                        <p>
                                            <label for="b-shadow-hover-top">Blur Radius:</label>
                                            <strong class="text-info"><span id="b-shadow-hover-top">3</span>px</strong>
                                        </p>

                                        <div id="slider_b-shadow-hover-top"
                                             class="slider blur"></div>
                                        <p>
                                            <label for="s-color-hover-top">Shadow Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="s-color-hover-top" value="#ffffff"
                                                   type="text" onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Padding</h3>

                                        <p>
                                            <label for="padding-top-hover">Padding Top:</label>
                                            <strong class="text-info"><span
                                                        id="padding-top-hover">6</span>px</strong>
                                        </p>

                                        <div id="slider_padding-top-hover"
                                             class="slider padding6"></div>
                                        <p>
                                            <label for="padding-right-hover">Padding Right:</label>
                                            <strong class="text-info"><span
                                                        id="padding-right-hover">20</span>px</strong>
                                        </p>

                                        <div id="slider_padding-right-hover"
                                             class="slider padding3"></div>
                                        <p>
                                            <label for="padding-bottom-hover">Padding
                                                Bottom:</label>
                                            <strong class="text-info"><span
                                                        id="padding-bottom-hover">6</span>px</strong>
                                        </p>

                                        <div id="slider_padding-bottom-hover"
                                             class="slider padding6"></div>
                                        <p>
                                            <label for="padding-left-hover">Padding Left:</label>
                                            <strong class="text-info"><span id="padding-left-hover">20</span>px</strong>
                                        </p>

                                        <div id="slider_padding-left-hover"
                                             class="slider padding3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="editor-tab4">
                            <br>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Fonts</h3>

                                        <p>
                                            <label for="font-name-sub" style="width:100px">Font
                                                : </label>
                                            <select class="form-control" onchange="updatePreview()"
                                                    id="font-name-sub">
                                                <option value="arial">Arial</option>
                                                <option value="'arial black'">Arial Black</option>
                                                <option value="'comic sans ms'">Comic Sans MS
                                                </option>
                                                <option value="'courier new'">Courier New</option>
                                                <option value="georgia">Georgia</option>
                                                <option value="helvetica">Helvetica</option>
                                                <option value="impact">Impact</option>
                                                <option value="'times new roman'">Times New Roman
                                                </option>
                                                <option value="'trebuchet ms'">Trebuchet MS</option>
                                                <option value="verdana">Verdana</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label for="font-style-sub">Font Style : </label>
                                            <select class="form-control" onchange="updatePreview()"
                                                    id="font-style-sub">
                                                <option value="normal">Normal</option>
                                                <option value="italic">Italic</option>
                                                <option value="oblique">Oblique</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label for="font-weight-sub">Font Weight : </label>
                                            <select class="form-control" onchange="updatePreview()"
                                                    id="font-weight-sub">
                                                <option value="normal">Normal</option>
                                                <option value="bold">Bold</option>
                                                <option value="bolder">Bolder</option>
                                                <option value="lighter">Lighter</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label for="font-size-sub">Font Size:</label>
                                            <strong class="text-info"><span
                                                        id="font-size-sub">12</span>px</strong>
                                        </p>

                                        <div id="slider_font-size-sub"
                                             class="slider fontsize"></div>
                                        <p>
                                            <label for="font-color-sub">Font Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="font-color-sub" value="#424242" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>

                                    </div>
                                    <div class="content-box">
                                        <h3>Font Shadow</h3>

                                        <p>
                                            <label for="h-length-sub">Horizontal Length:</label>
                                            <strong class="text-info"><span
                                                        id="h-length-sub">2</span>px</strong>
                                        </p>

                                        <div id="slider_h-length-sub" class="slider shadow"></div>
                                        <p>
                                            <label for="v-length-sub">Vertical Length:</label>
                                            <strong class="text-info"><span
                                                        id="v-length-sub">2</span>px</strong>
                                        </p>

                                        <div id="slider_v-length-sub" class="slider shadow"></div>
                                        <p>
                                            <label for="b-length-sub">Blur Radius:</label>
                                            <strong class="text-info"><span
                                                        id="b-length-sub">3</span>px</strong>
                                        </p>

                                        <div id="slider_b-length-sub" class="slider blur"></div>
                                        <p>
                                            <label for="shadow-color-sub">Shadow Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="shadow-color-sub" value="#ffffff" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                    <div class="content-box">
                                        <h3>Corner Radius</h3>

                                        <p>
                                            <label for="radius-sub">Radius All Corners:</label>
                                            <strong class="text-info"><span
                                                        id="radius-sub">10</span>px</strong>
                                        </p>

                                        <div id="slider_radius-sub" class="slider radius1"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Background</h3>
                                        <input type="radio" name="background-sub" value="solid-sub"
                                               id="solid-back-sub" onchange="updatePreview()"/><label
                                                for="solid-back-sub">&nbsp;Solid Background</label>

                                        <p>
                                            <label for="back-color-sub">Background Color : </label>
                                            <input class="form-control  color {hash:true}"
                                                   id="back-color-sub" value="#dddddd" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                        <input type="radio" name="background-sub"
                                               value="gradient-sub" id="gradient-back-sub"
                                               checked="checked" onchange="updatePreview()"/><label
                                                for="gradient-back-sub">&nbsp;Gradient
                                            Background</label>

                                        <p>
                                            <label for="start-color-sub">Start Color : </label>
                                            <input class="form-control  color {hash:true}"
                                                   id="start-color-sub" value="#ffffff" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>

                                        <p>
                                            <label for="end-color-sub">End Color : </label>
                                            <input class="form-control  color {hash:true}"
                                                   id="end-color-sub" value="#cfcfcf" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                    <div class="content-box">
                                        <h3>Border</h3>

                                        <p>
                                            <label for="border-width-sub">Border Width:</label>
                                            <strong class="text-info"><span
                                                        id="border-width-sub">1</span>px</strong>
                                        </p>

                                        <div id="slider_border-width-sub"
                                             class="slider border"></div>
                                        <p>
                                            <label for="border-style-sub">Border Style : </label>
                                            <select class="form-control" onchange="updatePreview()"
                                                    id="border-style-sub">
                                                <option value="solid">Solid</option>
                                                <option value="dashed">Dashed</option>
                                                <option value="dotted">Dotted</option>
                                                <option value="double">Double</option>
                                                <option value="groove">Groove</option>
                                                <option value="inset">Inset</option>
                                                <option value="outset">Outset</option>
                                                <option value="ridge">Ridge</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label for="bc-color-sub">Border Color : </label>
                                            <input class="form-control  color {hash:true}"
                                                   id="bc-color-sub" value="#b4b4b4" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                        <hr/>
                                        <p>
                                            <label for="width-sub">Sub Menu Width : </label>
                                            <strong class="text-info"><span
                                                        id="width-sub">185</span>px</strong>
                                        </p>

                                        <div id="slider_width-sub" class="slider width"></div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Sub Menu Box Shadow</h3>

                                        <p>
                                            <label for="h-shadow-sub">Horizontal Length:</label>
                                            <strong class="text-info"><span
                                                        id="h-shadow-sub">2</span>px</strong>
                                        </p>

                                        <div id="slider_h-shadow-sub" class="slider shadow"></div>
                                        <p>
                                            <label for="v-shadow-sub">Vertical Length:</label>
                                            <strong class="text-info"><span
                                                        id="v-shadow-sub">2</span>px</strong>
                                        </p>

                                        <div id="slider_v-shadow-sub" class="slider shadow"></div>
                                        <p>
                                            <label for="b-shadow-sub">Blur Radius:</label>
                                            <strong class="text-info"><span
                                                        id="b-shadow-sub">3</span>px</strong>
                                        </p>

                                        <div id="slider_b-shadow-sub" class="slider blur"></div>
                                        <p>
                                            <label for="s-color-sub">Shadow Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="s-color-sub" value="#222222" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                    <div class="content-box">
                                        <h3>Padding</h3>

                                        <p>
                                            <label for="sub-padding-top">Padding Top:</label>
                                            <strong class="text-info"><span
                                                        id="sub-padding-top">10</span>px</strong>
                                        </p>

                                        <div id="slider_sub-padding-top"
                                             class="slider padding4"></div>
                                        <p>
                                            <label for="sub-padding-right">Padding Right:</label>
                                            <strong class="text-info"><span
                                                        id="sub-padding-right">0</span>px</strong>
                                        </p>

                                        <div id="slider_sub-padding-right"
                                             class="slider padding"></div>
                                        <p>
                                            <label for="sub-padding-bottom">Padding Bottom:</label>
                                            <strong class="text-info"><span id="sub-padding-bottom">10</span>px</strong>
                                        </p>

                                        <div id="slider_sub-padding-bottom"
                                             class="slider padding4"></div>
                                        <p>
                                            <label for="sub-padding-left">Padding Left:</label>
                                            <strong class="text-info"><span
                                                        id="sub-padding-left">15</span>px</strong>
                                        </p>

                                        <div id="slider_sub-padding-left"
                                             class="slider padding5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="editor-tab5">
                            <br>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Hover Text Color</h3>

                                        <p>
                                            <label for="text-color-hover">Text Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="text-color-hover" value="#ffffff" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                    <div class="content-box">
                                        <h3>Background</h3>
                                        <input type="radio" name="background-hover"
                                               value="solid-hover" id="solid-back-hover"
                                               onchange="updatePreview()"/><label
                                                for="solid-back-hover">&nbsp;Solid
                                            Background</label>

                                        <p>
                                            <label for="back-color-hover">Background Color
                                                : </label>
                                            <input class="form-control  color {hash:true}"
                                                   id="back-color-hover" value="#0399d4" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                        <input type="radio" name="background-hover"
                                               value="gradient-hover" id="gradient-back-hover"
                                               checked="checked" onchange="updatePreview()"/><label
                                                for="gradient-back-hover">&nbsp;Gradient
                                            Background</label>

                                        <p>
                                            <label for="start-color-hover">Start Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="start-color-hover" value="#04acec"
                                                   type="text" onchange="updatePreview()"/>
                                        </p>

                                        <p>
                                            <label for="end-color-hover">End Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="end-color-hover" value="#0186ba" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="content-box">
                                        <h3>Hover Font Shadow</h3>

                                        <p>
                                            <label for="h-shadow-hover">Horizontal Length:</label>
                                            <strong class="text-info"><span
                                                        id="h-shadow-hover">2</span>px</strong>
                                        </p>

                                        <div id="slider_h-shadow-hover" class="slider shadow"></div>
                                        <p>
                                            <label for="v-shadow-hover">Vertical Length:</label>
                                            <strong class="text-info"><span
                                                        id="v-shadow-hover">2</span>px</strong>
                                        </p>

                                        <div id="slider_v-shadow-hover" class="slider shadow"></div>
                                        <p>
                                            <label for="b-shadow-hover">Blur Radius:</label>
                                            <strong class="text-info"><span
                                                        id="b-shadow-hover">3</span>px</strong>
                                        </p>

                                        <div id="slider_b-shadow-hover" class="slider blur"></div>
                                        <p>
                                            <label for="s-color-hover">Shadow Color : </label>
                                            <input class="form-control  color {pickerPosition:'top',hash:true}"
                                                   id="s-color-hover" value="#ffffff" type="text"
                                                   onchange="updatePreview()"/>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="examples">
                    <div class="topic">Source Code</div>
                    <!-- Tabs Navigation-->
                    <ul id="code-tabs" class="tabs nav nav-tabs">
                        <li class="active">
                            <a href="#code-tab1" data-toggle="tab">
                                <i class="fa fa-code"></i> HTML
                            </a>
                        </li>
                        <li>
                            <a href="#code-tab2" data-toggle="tab">
                                <i class="fa fa-css3"></i> CSS
                            </a>
                        </li>
                    </ul>

                    <div id="code-tab-contents" class="tab-content">
                        <div class="tab-pane fade in active" id="code-tab1">
<pre>
    <code id="html-code" class="html">
        &lt;ul id="menu-bar"&gt;
        &lt;li class="active"&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Products&lt;/a&gt;
        &lt;ul&gt;
        &lt;li&gt;&lt;a href="#"&gt;Products Sub Menu 1&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Products Sub Menu 2&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Products Sub Menu 3&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Products Sub Menu 4&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Services&lt;/a&gt;
        &lt;ul&gt;
        &lt;li&gt;&lt;a href="#"&gt;Services Sub Menu 1&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Services Sub Menu 2&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Services Sub Menu 3&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Services Sub Menu 4&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Contact Us&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    </code>
</pre>
                        </div>

                        <div class="tab-pane fade" id="code-tab2">
<pre>
    <code id="css-code" class="css">
        #demo-container #menu-bar {
        margin: 0px 0px 0px 0px;
        padding: 6px 6px 0px 6px;
        height: 34px;
        line-height: 100%;
        border-radius: 24px;
        -webkit-border-radius: 24px;
        -moz-border-radius: 24px;
        box-shadow: 2px 2px 3px #666666;
        -webkit-box-shadow: 2px 2px 3px #666666;
        -moz-box-shadow: 2px 2px 3px #666666;
        background: #8B8B8B;
        background: -webkit-gradient(linear, left top, left bottom, from(#A9A9A9), to(#7A7A7A));
        background: -moz-linear-gradient(top,  #A9A9A9,  #7A7A7A);
        border: solid 1px #6D6D6D;
        }
        #demo-container #menu-bar li {
        margin: 0px 6px 0px 6px;
        padding: 0px 0px 6px 0px;
        float: left;
        position: relative;
        list-style: none;
        }
        #demo-container #menu-bar a {
        font-weight: bold;
        font-family: arial;
        font-style: normal;
        font-size: 12px;
        color: #E7E5E5;
        text-decoration: none;
        display: block;
        padding: 8px 20px 8px 20px;
        margin: 0;
        border-radius: 10px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        text-shadow: 2px 2px 3px #000000;
        }
        #demo-container #menu-bar .active a, #demo-container #menu-bar li:hover &#62; a {
        background: #0399D4;
        background: -webkit-gradient(linear, left top, left bottom, from(#EBEBEB), to(#A1A1A1));
        background: -moz-linear-gradient(top,  #EBEBEB,  #A1A1A1);
        color: #444444;
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        text-shadow: 2px 2px 3px #FFFFFF;
        }
        #demo-container #menu-bar ul li:hover a, #demo-container #menu-bar li:hover li a {
        background: none;
        border: none;
        color: #666;
        -box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        }
        #demo-container #menu-bar ul a:hover {
        background: #0399D4 !important;
        background: -webkit-gradient(linear, left top, left bottom, from(#04ACEC), to(#0186BA)) !important;
        background: -moz-linear-gradient(top,  #04ACEC,  #0186BA) !important;
        color: #FFFFFF !important;
        border-radius: 0;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        text-shadow: 2px 2px 2px #FFFFFF;
        }
        #demo-container #menu-bar ul {
        background: #DDDDDD;
        background: -webkit-gradient(linear, left top, left bottom, from(#FFFFFF), to(#CFCFCF));
        background: -moz-linear-gradient(top,  #FFFFFF,  #CFCFCF);
        display: none;
        margin: 0;
        padding: 0;
        width: 185px;
        position: absolute;
        top: 30px;
        left: 0;
        border: solid 1px #B4B4B4;
        border-radius: 10px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        -webkit-box-shadow: 2px 2px 3px #222222;
        -moz-box-shadow: 2px 2px 3px #222222;
        box-shadow: 2px 2px 3px #222222;
        }
        #demo-container #menu-bar li:hover &#62; ul {
        display: block;
        }
        #demo-container #menu-bar ul li {
        float: none;
        margin: 0;
        padding: 0;
        }
        #demo-container #menu-bar ul a {
        padding:10px 0px 10px 15px;
        color:#424242 !important;
        font-size:12px;
        font-style:normal;
        font-family:arial;
        font-weight: normal;
        text-shadow: 2px 2px 3px #FFFFFF;
        }
        #demo-container #menu-bar ul li:first-child &#62; a {
        border-top-left-radius: 10px;
        -webkit-border-top-left-radius: 10px;
        -moz-border-radius-topleft: 10px;
        border-top-right-radius: 10px;
        -webkit-border-top-right-radius: 10px;
        -moz-border-radius-topright: 10px;
        }
        #demo-container #menu-bar ul li:last-child &#62; a {
        border-bottom-left-radius: 10px;
        -webkit-border-bottom-left-radius: 10px;
        -moz-border-radius-bottomleft: 10px;
        border-bottom-right-radius: 10px;
        -webkit-border-bottom-right-radius: 10px;
        -moz-border-radius-bottomright: 10px;
        }
        #demo-container #menu-bar:after {
        content: ".";
        display: block;
        clear: both;
        visibility: hidden;
        line-height: 0;
        height: 0;
        }
        #demo-container #menu-bar {
        display: inline-block;
        }
        html[xmlns] #demo-container #menu-bar {
        display: block;
        }
        * html #demo-container #menu-bar {
        height: 1%;
        }
    </code>
</pre>
                        </div>
                    </div>
                </div>

                <!--<div class="examples">
                    <div class="topic">HTML Code</div>

                </div>
                <!--End Generator-->
            </section>
            <!-- End Single Page -->

        </div>
    </div>
@stop

@section('custom-scripts')
    <script src="{{ asset('js/lib/jquery-1.11.3.min.js') }}"></script>
    <script src="{{ asset('js/lib/bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/lib/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('js/lib/modernizr.min.js') }}"></script>
    <script src="{{ asset('js/lib/highlight/highlight.pack.js') }}"></script>
    <script src="{{ asset('js/lib/beautify-html.js')}}"></script>

    <script src="{{ asset('js/menu-editor/jscolor/jscolor.js') }}"></script>
    <script src="{{ asset('js/menu-editor/values.js') }}"></script>
    <script src="{{ asset('js/menu-editor/menu.js') }}"></script>
    <script src="{{ asset('js/menu-editor/plugins.js') }}"></script>
    <script src="{{ asset('js/menu-editor/main.js') }}"></script>

    <script src="{{asset('js/jquery.mjs.nestedSortable.js')}}"></script>
    <script src="{{asset('js/mySortable.js')}}"></script>
    <!--<script src="{{asset('js/customizeMenu.js')}}"></script>-->

    <script>
        $(document).ready(function()
        {
            updatePreview();
        });
    </script>
@stop
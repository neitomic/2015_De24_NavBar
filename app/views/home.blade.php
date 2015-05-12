@extends('layout')

@section('title')
    Ltweb2015
@stop

@section('custom-styles')
	<link rel="stylesheet" href="{{asset('css/ltweb.css')}}">
	<link rel="stylesheet" href="{{asset('css/menu-style.css')}}">
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
            </div><!-- /input-group -->

            <div id="sortable-list"></div>
        </div>
        <div class="col-sm-10" id="content">
            <div class="row" id="editable">
                <div class="col-sm-2 edit-panel">
                    <h4>Edit item</h4>
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" id="title">
                        </div>
                        <div class="form-group">
                            <label for="link">Link</label>
                            <input type="text" id="link">
                        </div>
                    </div>
                </div>
                <div class="col-sm-1 edit-panel">
                    <h4>Color</h4>
                    <div>
                        <input type="color" id="color-picker">
                    </div>
                </div>
                <div class="col-sm-3 edit-panel">
                    <h4>Menu setting</h4>
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="menu-font">Font-size</label>
                            <input type="text" id="menu-font">
                        </div>
                        <div class="form-group">
                            <label for="menu-color">Text color</label>
                            <input type="color" id="menu-color">
                            <label for="menu-hover">Text hover</label>
                            <input type="color" id="menu-hover">
                        </div>
                    </div>
                </div>
                <div class="col-sm-5 edit-panel">
                    <h4>Sub-menu setting</h4>
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="sub-font">Font-size</label>
                            <input type="text" id="sub-font">
                        </div>
                        <div class="form-group">
                            <label for="sub-color">Text color</label>
                            <input type="color" id="sub-color">
                            <label for="sub-hover">Text hover</label>
                            <input type="color" id="sub-hover">
                            <label for="sub-background">Background</label>
                            <input type="color" id="sub-background">
                        </div>
                    </div>
                </div>
            </div>

            <div class="btn-group" role="group" aria-label="..." id="view">
                <button type="button" class="btn btn-primary">Preview</button>
                <button type="button" class="btn btn-primary">HTML</button>
                <button type="button" class="btn btn-primary">CSS</button>
                <button type="button" class="btn btn-primary">Javascript</button>
            </div>

            <div id="menu-bar">
                <div id='cssmenu'>

                </div>
            </div>

        </div>
    </div>
@stop

@section('custom-scripts')
	<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.2.min.js"></script>
	<script src="http://code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>
	<script src="{{asset('js/jquery.mjs.nestedSortable.js')}}"></script>
	<script src="{{asset('js/mySortable.js')}}"></script>
@stop
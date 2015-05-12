@extends('layout')

@section('title')
    Login
@stop

@section('custom-styles')
    <link rel="stylesheet" href="{{ asset('css/auth_style.css') }}">
@stop

@section('content')
    <div class="content">
        <div class="title">Login Required</div>
        {{ Form::open(['url' => 'login', 'method' => 'post']) }}
        {{ Form::label('username', 'UserName') }}
        {{ Form::text('username', null, ['class' => 'form-control']) }}
        {{ Form::label('password', 'Password') }}
        {{ Form::password('password', ['class' => 'form-control']) }}
        {{ Form::submit('Login', ['class' => 'btn btn-primary']) }}
        {{ HTML::link('/register', 'Register', ['class' => 'btn btn-default']) }}
        {{ Form::close() }}
    </div>
@stop

@section('custom-scripts')
    <script src='http://codepen.io/assets/libs/fullpage/jquery.js'></script>
@stop

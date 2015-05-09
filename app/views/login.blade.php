<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{asset('css/login_style.css')}}" media="screen" type="text/css" />
</head>
<body>
<div id="login">
    <h1>Login Required</h1>
    {{ Form::open(['url' => 'login', 'method' => 'post']) }}
    {{ Form::label('username', 'UserName') }}
    {{ Form::text('username', null, ['class' => 'form-control']) }}
    {{ Form::label('password', 'Password') }}
    {{ Form::password('password', ['class' => 'form-control']) }}
    {{ Form::submit('Login', ['class' => 'btn btn-primary']) }}
    {{ Form::close() }}
</div>
<script src='http://codepen.io/assets/libs/fullpage/jquery.js'></script>
</body>
</html>